import {
	UPDATE_COMBAT
} from '../actions/combat'

export default function combat(state={}, action) {
	switch(action.type) {
		case UPDATE_COMBAT:
            return Object.assign({}, state, action.combat)
		default:
			return state
	}
}
