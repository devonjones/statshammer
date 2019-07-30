import { generateId } from '../utils/utils'
import { addAttack, updateAttack } from './attacker'
import { addDefense, updateDefense } from './defender'
import { updateCombat } from './combat'

export function handleInitialData() {
    const attackId = generateId()
    const defenseId = generateId()
    return (dispatch) => {
        dispatch(updateCombat({
            type: "stationary"
        }))
        dispatch(addAttack({id: attackId}))
        dispatch(updateAttack({
            id: attackId,
            type: { value: 'rapid_fire', label: 'Rapid Fire' },
            attackCount: "1",
            skill: "3",
            strength: "4",
            ap: "0",
            damage: "1"
        }))
        dispatch(addDefense({id: defenseId}))
        dispatch(updateDefense({
            id: defenseId,
            equiv: "meq",
            toughness: "4",
            wounds: "1",
            save: "3",
            invulnsave: "0"
        }))
    }
}