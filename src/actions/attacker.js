import { calculateStats } from './stats'

export const ADD_ATTACK = 'ADD_ATTACK'
export const UPDATE_ATTACK = 'UPDATE_ATTACK'

export function addAttack(attack) {
    return {
        type: ADD_ATTACK,
        attack
    }
}

export function updateAttackImpl(attack) {
    return {
        type: UPDATE_ATTACK,
        attack
    }
}


export function updateAttack(attack) {
    return (dispatch, getState) => {
        dispatch(updateAttackImpl(attack))
        const { attacker, defender } = getState()

        dispatch(calculateStats(attacker, defender))
    }
}