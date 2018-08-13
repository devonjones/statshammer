import { calculateStats } from './stats'

export const ADD_DEFENSE = 'ADD_DEFENDER'
export const UPDATE_DEFENSE = 'UPDATE_DEFENDER'

export function addDefense(defense) {
    return {
        type: ADD_DEFENSE,
        defense
    }
}

export function updateDefenseImpl(defense) {
    return {
        type: UPDATE_DEFENSE,
        defense
    }
}


export function updateDefense(defense) {
    return (dispatch, getState) => {
        dispatch(updateDefenseImpl(defense))
        const { attacker, defender } = getState()

        dispatch(calculateStats(attacker, defender))
    }
}