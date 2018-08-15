import {
	ADD_DEFENSE,
	UPDATE_DEFENSE,
	ADD_DEFENSE_OPTION,
	REMOVE_DEFENSE_OPTION
} from '../actions/defender'
import { mergeOptions } from '../data/options'

function defenseOptions(state=[], action) {
	switch(action.type) {
		case ADD_DEFENSE_OPTION:
			return mergeOptions(state, action.option)
		case REMOVE_DEFENSE_OPTION:
			return state.filter( (option) => option.id !== action.option.id)
		default:
			return state
	}
}

export default function defender(state={}, action) {
	switch(action.type) {
		case ADD_DEFENSE:
			return action.defense
			//return state.concat([action.defense])
		case UPDATE_DEFENSE:
			return Object.assign({}, state, parseDefense(action.defense))
			//return state.map( (defense) => defense.id !== action.defense.id
			//	? defense
			//	: Object.assign({}, defense, parseDefense(action.defense)))
		case ADD_DEFENSE_OPTION:
			return {...action.defense, options: defenseOptions(action.defense.options, action)}
		case REMOVE_DEFENSE_OPTION:
			return {...action.defense, options: defenseOptions(action.defense.options, action)}
		default:
			return state
	}
}

function parseDefense(defense) {
	let newDefense = {id: defense.id}
	if(defense.toughness !== undefined) {
		const toughness = parseInt(defense.toughness, 10)
		newDefense.toughness = isNaN(toughness) ? 0 : toughness
	}
	if(defense.wounds !== undefined) {
		const wounds = parseInt(defense.wounds, 10)
		newDefense.wounds = isNaN(wounds) ? 0 : wounds
	}
	if(defense.save !== undefined) {
		const save = parseInt(defense.save, 10)
		newDefense.save = isNaN(save) ? 0 : save
	}
	if(defense.invulnsave !== undefined) {
		const invulnsave = parseInt(defense.invulnsave, 10)
		newDefense.invulnsave = isNaN(invulnsave) ? 0 : invulnsave
	}
	if(defense.equiv !== undefined) {
		if(defense.equiv === "") {
			newDefense.equiv = undefined
		} else {
			newDefense.equiv = defense.equiv
		}
	}
	return newDefense
}
