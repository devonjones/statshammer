export const CALCULATE_STATS = 'CALCULATE_STATS'
export const STATS_CALCULATED = 'STATS_CALCULATED'

export function statsCalculated(stats) {
    return {
        type: STATS_CALCULATED,
        stats
    }
}

export function calculateStats(attacker, defender) {
    return {
        type: CALCULATE_STATS,
        meta: {
            WebWorker: true
        },
        attacker,
        defender
    }
}
