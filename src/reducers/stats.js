import {
	STATS_CALCULATED
} from '../actions/stats'

import {
	ADD_ATTACK
} from '../actions/attacker'

export default function stats(state=[], action) {
	switch(action.type) {
		case STATS_CALCULATED:
            return action.stats
        case ADD_ATTACK:
            return []
		default:
			return state
	}
}
