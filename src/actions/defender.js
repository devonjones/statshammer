import { calculateStats } from './stats'
import { generateId } from '../utils/utils'
export const ADD_DEFENSE = 'ADD_DEFENDER'
export const UPDATE_DEFENSE = 'UPDATE_DEFENDER'
export const ADD_DEFENSE_OPTION = 'ADD_DEFENSE_OPTION'
export const REMOVE_DEFENSE_OPTION = 'REMOVE_DEFENSE_OPTION'

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
        const { attacker, defender, combat } = getState()

        dispatch(calculateStats(attacker, defender, combat))
    }
}


function addDefenseOptionImpl(defense, option) {
    const newOption = Object.assign({}, option, {id: generateId()})
    return {
        type: ADD_DEFENSE_OPTION,
        defense,
        option: newOption
    }
}

export function addDefenseOption(_, defense, option) {
    return (dispatch, getState) => {
        dispatch(addDefenseOptionImpl(defense, option))
        const { attacker, defender, combat } = getState()

        dispatch(calculateStats(attacker, defender, combat))
    }
}

function removeDefenseOptionImpl(defense, option) {
    return {
        type: REMOVE_DEFENSE_OPTION,
        defense,
        option
    }
}

export function removeDefenseOption(_, defense, option) {
    return (dispatch, getState) => {
        dispatch(removeDefenseOptionImpl(defense, option))
        const { attacker, defender, combat } = getState()

        dispatch(calculateStats(attacker, defender, combat))
    }
}

