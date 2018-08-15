import droll from 'droll'
import {
	ADD_ATTACK,
	REMOVE_ATTACK,
	UPDATE_ATTACK,
	ADD_ATTACK_OPTION,
	REMOVE_ATTACK_OPTION
} from '../actions/attacker'
import { mergeOptions } from '../data/options'

function attackOptions(state=[], action) {
	switch(action.type) {
		case ADD_ATTACK_OPTION:
			return mergeOptions(state, action.option)
		case REMOVE_ATTACK_OPTION:
			return state.filter( (option) => option.id !== action.option.id)
		default:
			return state
	}
}

export default function attacker(state=[], action) {
	switch(action.type) {
		case ADD_ATTACK:
			return state.concat([action.attack])
		case REMOVE_ATTACK:
			return state.filter((attack) => attack.id !== action.attack.id)
		case UPDATE_ATTACK:
			return state.map( (attack) => attack.id !== action.attack.id
				? attack
				: Object.assign({}, attack, parseAttack(action.attack)))
		case ADD_ATTACK_OPTION:
			return state.map( (attack) => attack.id !== action.attack.id
				? attack
				: {...attack, options: attackOptions(attack.options, action)})
		case REMOVE_ATTACK_OPTION:
			return state.map( (attack) => attack.id !== action.attack.id
				? attack
				: {...attack, options: attackOptions(attack.options, action)})
		default:
			return state
	}
}

function parseAttack(attack) {
	let newAttack = {id: attack.id}
	if (attack.type !== undefined) {
		newAttack.type = attack.type
	}
	newAttack = parseAttackCount(newAttack, attack)
	if(attack.skill !== undefined) {
		const skill = parseInt(attack.skill, 10)
		newAttack.skill = isNaN(skill) ? 0 : skill
	}
	newAttack = parseStrength(newAttack, attack)
	if(attack.ap !== undefined) {
		const ap = parseInt(attack.ap, 10)
		newAttack.ap = isNaN(ap) ? 0 : Math.abs(ap)
	}
	newAttack = parseDamage(newAttack, attack)
	return newAttack
}

function parseAttackCount(newAttack, attack) {
	let changes = Object.assign({}, newAttack)
	const attackCount = attack.attackCount
	changes.attackCount = attackCount
	if(attack.attackCount !== undefined) {
		if (droll.roll(attackCount)) {
			changes.attackCountDice = attackCount
			changes.attackCountNumber = false
		} else {
			const intAttackCount = parseInt(attackCount, 10)
			if (isNaN(intAttackCount)) {
				changes.attackCountDice = false
				changes.attackCountNumber = false
			} else {
				changes.attackCountDice = false
				changes.attackCountNumber = intAttackCount
			}
		}
	}
	return changes
}

function parseStrength(newAttack, attack) {
	let changes = Object.assign({}, newAttack)
	const strength = attack.strength
	changes.strength = strength
	if(attack.strength !== undefined) {
		if (droll.roll(strength)) {
			changes.strengthDice = strength
			changes.strengthNumber = false
		} else {
			const intStrength = parseInt(strength, 10)
			if (isNaN(intStrength)) {
				changes.strengthDice = false
				changes.strengthNumber = false
			} else {
				changes.strengthDice = false
				changes.strengthNumber = intStrength
			}
		}
	}
	return changes
}

function parseDamage(newAttack, attack) {
	let changes = Object.assign({}, newAttack)
	const damage = attack.damage
	changes.damage = damage
	if(attack.damage !== undefined) {
		if (droll.roll(damage)) {
			changes.damageDice = damage
			changes.damageNumber = false
		} else {
			const intDamage = parseInt(damage, 10)
			if (isNaN(intDamage)) {
				changes.damageDice = false
				changes.damageNumber = false
			} else {
				changes.damageDice = false
				changes.damageNumber = intDamage
			}
		}
	}
	return changes
}