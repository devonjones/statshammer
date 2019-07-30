import { calculateStats } from './stats'
export const UPDATE_COMBAT = 'UPDATE_COMBAT'

export function updateCombatImpl(combat) {
    return {
        type: UPDATE_COMBAT,
        combat
    }
}

export function updateCombat(attack) {
    return (dispatch, getState) => {
        dispatch(updateCombatImpl(attack))
        const { attacker, defender, combat } = getState()

        dispatch(calculateStats(attacker, defender, combat))
    }
}