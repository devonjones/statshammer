import shotImage from '../static/media/target-shot.svg'
import hitImage from '../static/media/helmet-head-shot.svg'
import woundImage from '../static/media/open-wound.svg'
import unsavedImage from '../static/media/armor-downgrade.svg'
import invulnsaveImage from '../static/media/armor-upgrade.svg'
import damageImage from '../static/media/wrapped-heart.svg'
import killImage from '../static/media/death-zone.svg'

export function mergeOptions(state, option) {
	const newstate = []
	if(option.optid) {
		let added = false
		state.forEach(element => {
			if("optid" in element && element.optid == option.optid) {
				newstate.push(option)
				added = true;
			} else {
				newstate.push(element)
			}
		})
		if(!added) {
			newstate.push(option)
		}
		return newstate
	}
	return state.concat(option)
}


export const attack_options = [
    {
        optid: 'reroll-hit',
        stage: 'hits',
        type: 'automatic',
        text: 'Automatic Hit',
        image: hitImage
    },
    {
        optid: 'reroll-hit',
        stage: 'hits',
        type: 'reroll_missed',
        text: 'Reroll Hits: Missed',
        image: hitImage
    },
    {
        optid: 'reroll-hit',
        stage: 'hits',
        type: 'reroll_one',
        text: 'Reroll Hits: 1s',
        image: hitImage
    },
    {
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: Assault, Advanced',
        value: -1,
        image: hitImage
    },
    {
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: Heavy, Moved',
        value: -1,
        image: hitImage
    },
    {
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: +1',
        value: 1,
        image: hitImage
    },
    {
        optid: 'reroll-wound',
        stage: 'wounds',
        type: 'automatic',
        text: 'Automatic Wound',
        image: woundImage
    },
    {
        optid: 'reroll-wound',
        stage: 'wounds',
        type: 'reroll_missed',
        text: 'Reroll Wounds: Missed',
        image: woundImage
    },
    {
        optid: 'reroll-wound',
        stage: 'wounds',
        type: 'reroll_one',
        text: 'Reroll Wounds: 1s',
        image: woundImage
    },
    {
        stage: 'wounds',
        type: 'modifier',
        text: 'Wound: +1',
        value: 1,
        image: woundImage
    },
    {
        stage: 'saves',
        type: 'modifier',
        text: 'Save: -1',
        value: -1,
        image: unsavedImage
    },
    {
        stage: 'invulnsaves',
        type: 'modifier',
        text: 'Invuln Save: -1',
        value: -1,
        image: invulnsaveImage
    }
]

export const defense_options = [
    {
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: -1',
        value: -1,
        image: hitImage
    },
    {
        stage: 'wounds',
        type: 'modifier',
        text: 'Wound: -1',
        value: -1,
        image: woundImage
    },
    {
        optid: 'reroll-save',
        stage: 'saves',
        type: 'reroll_missed',
        text: 'Reroll Save: Missed',
        image: unsavedImage
    },
    {
        optid: 'reroll-save',
        stage: 'saves',
        type: 'reroll_one',
        text: 'Reroll Save: 1s',
        image: unsavedImage
    },
    {
        stage: 'saves',
        type: 'modifier',
        text: 'Cover',
        value: 1,
        image: unsavedImage
    },
    {
        stage: 'saves',
        type: 'modifier',
        text: 'Save: +1',
        value: 1,
        image: unsavedImage
    },
    {
        optid: 'reroll-invulnsave',
        stage: 'invulnsaves',
        type: 'reroll_missed',
        text: 'Reroll Invuln Save: Missed',
        image: invulnsaveImage
    },
    {
        optid: 'reroll-invulnsave',
        stage: 'invulnsaves',
        type: 'reroll_one',
        text: 'Reroll Invuln Save: 1s',
        image: invulnsaveImage
    },
    {
        stage: 'invulnsaves',
        type: 'modifier',
        text: 'Invuln Save: +1',
        value: 1,
        image: invulnsaveImage
    },
    {
        optid: 'disgustingly_resilient',
        stage: 'damage',
        type: 'disgustingly_resilient',
        text: 'Disgustingly Resilient',
        value: 5,
        image: damageImage
    },
    {
        optid: 'disgustingly_resilient',
        stage: 'damage',
        type: 'disgustingly_resilient',
        text: 'Feel No Pain',
        value: 5,
        image: damageImage
    },
    {
        optid: 'disgustingly_resilient',
        stage: 'damage',
        type: 'disgustingly_resilient',
        text: 'Feel No Pain (6+)',
        value: 6,
        image: damageImage
    },
    {
        optid: 'reroll-dr',
        stage: 'damage_dr',
        type: 'reroll_one',
        text: 'Reroll FNP/DR: Missed',
        image: damageImage
    },
    {
        optid: 'reroll-dr',
        stage: 'daamage_dr',
        type: 'reroll_one',
        text: 'Reroll FNP/DR: 1s',
        image: damageImage
    }
]