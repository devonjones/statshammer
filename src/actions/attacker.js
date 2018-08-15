import { calculateStats } from './stats'
import { generateId } from '../utils/utils'
export const ADD_ATTACK = 'ADD_ATTACK'
export const REMOVE_ATTACK = 'REMOVE_ATTACK'
export const UPDATE_ATTACK = 'UPDATE_ATTACK'
export const ADD_ATTACK_OPTION = 'ADD_ATTACK_OPTION'
export const REMOVE_ATTACK_OPTION = 'REMOVE_ATTACK_OPTION'

export function addAttack(attack) {
    return {
        type: ADD_ATTACK,
        attack
    }
}

function removeAttackImpl(attack) {
    return {
        type: REMOVE_ATTACK,
        attack
    }
}

export function removeAttack(attack) {
    return (dispatch, getState) => {
        dispatch(removeAttackImpl(attack))
        const { attacker, defender } = getState()

        dispatch(calculateStats(attacker, defender))
    }
}

function updateAttackImpl(attack) {
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

function addAttackOptionImpl(attack, option) {
    const newOption = Object.assign({}, option, {id: generateId()})
    return {
        type: ADD_ATTACK_OPTION,
        attack,
        option: newOption
    }
}

export function addAttackOption(attack, _, option) {
    return (dispatch, getState) => {
        dispatch(addAttackOptionImpl(attack, option))
        const { attacker, defender } = getState()

        dispatch(calculateStats(attacker, defender))
    }
}

function removeAttackOptionImpl(attack, option) {
    return {
        type: REMOVE_ATTACK_OPTION,
        attack,
        option
    }
}

export function removeAttackOption(attack, _, option) {
    return (dispatch, getState) => {
        dispatch(removeAttackOptionImpl(attack, option))
        const { attacker, defender } = getState()

        dispatch(calculateStats(attacker, defender))
    }
}

