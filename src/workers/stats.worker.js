/* eslint "no-restricted-globals": 0 */
import { statsCalculated  } from '../actions/stats'
import droll from 'droll'

function compareArrays(array1, array2) {
    if(array1.length !== array2.length) {
        return false
    }
    for(let i = 0; i < array1.length; i++) {
        if(array1[i] instanceof Array) {
            if (!compareArrays(array1[i], array2[i])) {
                return false
            }
        } else {
            if(!(array1[i] === array2[i])) {
                return false
            }
        }
    }
    return true
}

function copyArray(arr) {
    let newarr = [];
    arr.forEach((a) => {
        newarr.push(a.slice())
    })
    return newarr
}

function stage_options(aoptions, doptions, stage) {
    let newopts = []
    if(aoptions) {
        newopts.push(...aoptions.filter((option) => option.stage === stage))
    }
    if(doptions)  {
        newopts.push(...doptions.filter((option) => option.stage === stage))
    }
    const retval = {}
    newopts.forEach((opt) => {
        if("optid" in opt)  {
            retval[opt.type] = opt
        } else {
            let arr = retval[opt.type]
            if(!arr) {
                arr = []
            }
            arr.push(opt)
            retval[opt.type] = arr
        }
    })
    return retval
}

function sum_modifiers(options) {
    let retval = 0
    if(options.modifier) {
        options.modifier.forEach((modifier) => {
            retval += modifier.value
        })
    }
    return retval
}

function recursiveCheckLength(arr) {
    if(arr instanceof Array) {
        if(arr.length === 0) {
            return false
        }
        for(let i = 0; i < arr.length; i++) {
            const interior = recursiveCheckLength(arr[i])
            if(!interior) {
                return false
            }
        }
    }
    return true
}

function checkPercentages(a1, a2) {
    if(!recursiveCheckLength(a1)) {
        return false
    }
    if(!recursiveCheckLength(a2)) {
        return false
    }
    const pa1 = percentize(a1)
    const pa2 = percentize(a2)
    return compareArrays(pa1, pa2)
}
function percentize(aoa) {
    const totals = aoa.map((arr) => arr.reduce((total, num) => total + num))

    let retval = []
    aoa.forEach((arr, index) => {
        retval.push(arr.map((v) => {
            return Math.round(v/totals[index]*1000)/10
        }))
    })
    return retval
}

// Respond to message from parent thread
self.addEventListener('message', (event) => {
    const data = event.data;
    const attacker = data.attacker
    const defender = data.defender
    const combat = data.combat
    const result = iterate(attacker, defender, combat)
    self.postMessage(statsCalculated(result))
})

function shots(attacker) {
    const shots = attacker.map((attack) => {
        if(attack.attackCountDice) {
            const roll = droll.roll(attack.attackCountDice)
            return roll.total
        } else if(attack.attackCountNumber) {
            return attack.attackCountNumber
        } else {
            return 0
        }
    })
    return shots
}

function roll_with_rerolls(rolls, target, options) {
    const modifiers = sum_modifiers(options)
    if ("automatic" in options) {
        return Array.from({length: rolls}, (v, k) => true)
    }
    return droll.roll(`${rolls}d6`).rolls.map((roll) => {
        if(roll === 1) {
            if ("reroll_one" in options || "reroll_missed" in options) {
                const reroll1 = droll.roll('1d6').total
                return (reroll1 + modifiers) >= target
            } else {
                return (roll + modifiers) >= target
            }
        }
        const result = (roll + modifiers) >= target
        if(!result && "reroll_missed" in options) {
            const rerollm = droll.roll('1d6').total
            if(rerollm === 1) {
                return false
            }
            return (rerollm + modifiers) >= target
        } else {
            return result
        }
    })
}

function roll_with_rerolls_one_fail(rolls, target, options) {
    const modifiers = sum_modifiers(options)
    if ("automatic" in options) {
        return Array.from({length: rolls}, (v, k) => true)
    }
    return droll.roll(`${rolls}d6`).rolls.map((roll) => {
        if(roll === 1) {
            if ("reroll_one" in options || "reroll_missed" in options) {
                const reroll1 = droll.roll('1d6').total
                if(reroll1 === 1) {
                    return false
                }
                return (reroll1 + modifiers) >= target
            } else {
                return false
            }
        }
        const result = (roll + modifiers) >= target
        if(!result && "reroll_missed" in options) {
            const rerollm = droll.roll('1d6').total
            if(rerollm === 1) {
                return false
            }
            return (rerollm + modifiers) >= target
        } else {
            return result
        }
    })
}

function hits(attacker, defender, shots) {
    /*
     Hit Roll:
     Each time a model makes an attack, roll a dice. If the roll is equal to or
     greater than the attacking model’s Ballistic Skill characteristic, then it
     scores a hit with the weapon it is using. If not, the attack fails and the
     attack sequence ends.
     A roll of 1 always fails, irrespective of any modifiers that may apply.
    */
    const hits = shots.map((shot, index) => {
        if(shot) {
            const options = stage_options(attacker[index].options, defender.options, 'hits')
            return roll_with_rerolls_one_fail(shot, attacker[index].skill, options)
        } else {
            return []
        }
    })
    const hitTotals = hits.map((hit) => hit.filter(x => x).length)
    return hitTotals
}

function strength(attack) {
    if(attack.strengthDice) {
        const roll = droll.roll(attack.strengthDice)
        return roll.total
    } else if(attack.strengthNumber) {
        return attack.strengthNumber
    } else {
        return 1
    }
}

function wounds(attacker, defender, hits) {
    /*
        Wound Roll:
        If an attack scores a hit, you will then need to roll another dice to
        see if the attack successfully wounds the target. The roll required is
        determined by comparing the attacking weapon’s Strength characteristic
        with the target’s Toughness characteristic, as shown on the following
        table:

        WOUND ROLL
        ATTACK’S STRENGTH VS TARGET’S TOUGHNESS              D6 ROLL REQUIRED
        ---------------------------------------------------  ----------------
        Is the Strength TWICE (or more) than the Toughness?  2+
        Is the Strength GREATER than the Toughness?          3+
        Is the Strength EQUAL to the Toughness?              4+
        Is the Strength LOWER than the Toughness?            5+
        Is the Strength HALF (or less) than the Toughness?   6+

        If the roll is less than the required number, the attack fails and the
        attack sequence ends. A roll of 1 always fails, irrespective of any
        modifiers that may apply.
    */
    function target(str, tough) {
        if(str >= tough * 2) {
            return 2
        } else if (str > tough) {
            return 3
        } else if (str === tough) {
            return 4
        } else if (str < tough) {
            return 5
        } else if (str < tough/2) {
            return 6
        }
    }

    const wounds = hits.map((hit, index) => {
        if(hit) {
            const thresh = target(strength(attacker[index]), defender.toughness)
            const options = stage_options(attacker[index].options, defender.options, 'wounds')
            return roll_with_rerolls_one_fail(hit, thresh, options)
        } else {
            return []
        }
    })
    const woundTotals = wounds.map((wound) => wound.filter(x => x).length)
    return woundTotals
}

function calculate_save(defense, attack) {
    const save_options = stage_options(attack.options, defense.options, 'saves')
    const invuln_options = stage_options(attack.options, defense.options, 'invulnsaves')
    const save = defense.save + attack.ap
    const invuln = defense.invuln
    let target = save
    let options = save_options
    if(invuln && (invuln + sum_modifiers(save_options)) < (save + sum_modifiers(invuln_options))) {
        target = invuln
        options = invuln_options
    }
    return { target, options }
}

function save(attacker, defender, wounds) {
    /*
     Saving Throw:
     The player commanding the target unit then makes a saving throw by rolling
     a dice and modifying the roll by the Armour Penetration characteristic of
     the weapon that caused the damage. For example, if the weapon has an
     Armour Penetration of -1, then 1 is subtracted from the saving throw roll.
     If the result is equal to, or greater than, the Save characteristic of
     the model the wound was allocated to, then the damage is prevented and the
     attack sequence ends. If the result is less than the model’s Save
     characteristic, then the saving throw fails and the model suffers damage.
     A roll of 1 always fails, irrespective of any modifiers that may apply.
    */
    
   const unsaved = wounds.map((wound, index) => {
        if(wound) {
            const { target, options } = calculate_save(defender, attacker[index])
            return roll_with_rerolls(wound, target, options).map((result) => !result)
        } else {
            return []
        }
    })
    const unsavedTotals = unsaved.map((un) => un.filter(x => x).length)
    return unsavedTotals
}

function disgustingly_resilient(damage, attack, defense, options) {
    if("disgustingly_resilient" in options) {
        const dr_options = stage_options(attack.options, defense.options, 'damage_dr')
        const newDamage = damage.map((d) => {
            let newDam = 0;
            droll.roll(`${d}d6`).rolls.forEach((roll) => {
                if(roll === 1 && "reroll_one" in dr_options) {
                    const reroll1 = droll.roll(`1d6`).total
                    if(reroll1 < options.disgustingly_resilient.value) {
                        newDam += 1
                    }
                } else if(roll < options.disgustingly_resilient.value) {
                    if("reroll_missed" in dr_options) {
                        const rerollm = droll.roll(`1d6`).total
                        if(rerollm < options.disgustingly_resilient.value) {
                            newDam += 1
                        }
                    } else {
                        newDam += 1
                    }
                }
            })
            return newDam
        })
        return newDamage
    } else {
        return damage
    }
}

function damage(attacker, defender, unsaved) {
    /*
     Inflict Damage:
     The damage inflicted is equal to the Damage characteristic of the weapon
     used in the attack. A model loses one wound for each point of damage it
     suffers. If a model’s wounds are reduced to 0, it is either slain or
     destroyed and removed from play. If a model loses several wounds from a
     single attack and is destroyed, any excess damage inflicted by that
     attack is lost and has no effect.
    */
    const damage = unsaved.map((un, index) => {
        const options = stage_options(attacker[index].options, defender.options, 'damage')
        let retval = []
        if(un) {
            for(let i = 0; i < un; i++) {
                if(attacker[index].damageDice) {
                    retval.push(droll.roll(attacker[index].damageDice).total)
                } else if(attacker[index].damageNumber) {
                    retval.push(attacker[index].damageNumber)
                }
            }
        }
        return disgustingly_resilient(retval, attacker[index], defender, options)
    })
    const damageTotal = damage.map((d) => {
        if (d.length > 0) {
            return d.reduce((total, num) => total + num)
        } else {
            return 0
        }
    })
    return {
        damageValues: damage,
        damageTotals: damageTotal
    }
}

function allocate(attacker, defender, damageValues) {
    const allocate = damageValues.map((damages, index) => {
        let curr = defender.wounds
        let kills = 0
        damages.forEach((dmg) => {
            curr -= dmg
            if(curr < 1) {
                kills += 1
                curr = defender.wounds
            }
        })
        return kills
    })
    return allocate
}

function iteration(attacker, defender) {
    let results = {}
    results.shots = shots(attacker)
    results.hits = hits(attacker, defender, results.shots)
    results.wounds = wounds(attacker, defender, results.hits)
    results.unsaved = save(attacker, defender, results.wounds)
    const { damageValues, damageTotals } = damage(attacker, defender, results.unsaved)
    results.damage = damageTotals
    results.allocate = allocate(attacker, defender, damageValues)
    return results
}

function iterate(attacker, defender, combat) {
    let testShots = attacker.map(() => [])
    let testHits = attacker.map(() => [])
    let testWounds = attacker.map(() => [])
    let testUnsaved = attacker.map(() => [])
    let testDamage = attacker.map(() => [])
    let testAllocate = attacker.map(() => [])
    let converge = false
    let i = 0;
    do {
        let shots = copyArray(testShots)
        let hits = copyArray(testHits)
        let wounds = copyArray(testWounds)
        let unsaved = copyArray(testUnsaved)
        let damage = copyArray(testDamage)
        let allocate = copyArray(testAllocate)
        i++
        for(let i = 0; i < 100; i++) {
            const result = iteration(attacker, defender)
            testShots = reduceStats(testShots, result.shots)
            testHits = reduceStats(testHits, result.hits)
            testWounds = reduceStats(testWounds, result.wounds)
            testUnsaved = reduceStats(testUnsaved, result.unsaved)
            testDamage = reduceStats(testDamage, result.damage)
            testAllocate = reduceStats(testAllocate, result.allocate)
        }
        if(checkPercentages(shots, testShots)) {
            if(checkPercentages(hits, testHits)) {
                if(checkPercentages(wounds, testWounds)) {
                    if(checkPercentages(unsaved, testUnsaved)) {
                        if(checkPercentages(damage, testDamage)) {
                            if(checkPercentages(allocate, testAllocate)) {
                                converge = true
                            }
                        }
                    }
                }
            }
        }
    } while (!converge)
    const result = {
        shots: percentize(testShots),
        hits: percentize(testHits),
        wounds: percentize(testWounds),
        unsaved: percentize(testUnsaved),
        damage: percentize(testDamage),
        allocate: percentize(testAllocate)
    }
    console.log(i*100)
    const retresults = reduceResults(result, attacker)
    retresults.meta = {iterations: i*100}
    return retresults
}

function reduceResults(results, attacker) {
    const retarr = attacker.map((attack) => { return {id: `${attack.id}-stats`}})
    const shots = results.shots.map((shots) => { return {shots: shots}})
    const hits = results.hits.map((hits) => { return {hits: hits}})
    const wounds = results.wounds.map((wounds) => { return {wounds: wounds}})
    const unsaved = results.unsaved.map((un) => { return {unsaved: un}})
    const damage = results.damage.map((d) => { return {damage: d}})
    const allocate = results.allocate.map((a) => { return {allocate: a}})
    retarr.map((o, i) => {
        let o1 = Object.assign(o, shots[i])
        let o2 = Object.assign(o1, hits[i])
        let o3 = Object.assign(o2, wounds[i])
        let o4 = Object.assign(o3, unsaved[i])
        let o5 = Object.assign(o4, damage[i])
        return Object.assign(o5, allocate[i])
    })
    return retarr
}

function reduceStats(testarr, values) {
    let retarr = copyArray(testarr)
    values.forEach((value, index) => {
        if(retarr[index][value] === undefined) {
            retarr[index][value] = 1
        } else {
            retarr[index][value] += 1
        }
    })
    return retarr
}
