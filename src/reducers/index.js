import { combineReducers } from 'redux';
import attacker from './attacker'
import defender from './defender'
import combat from './combat'
import stats from './stats'

export default combineReducers({
	attacker,
	defender,
	combat,
	stats
})