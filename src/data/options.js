import { generateId } from '../utils/utils'
//import shotImage from '../static/media/target-shot.svg'
import hitImage from '../static/media/helmet-head-shot.svg'
import woundImage from '../static/media/open-wound.svg'
import unsavedImage from '../static/media/armor-downgrade.svg'
import invulnsaveImage from '../static/media/armor-upgrade.svg'
import damageImage from '../static/media/wrapped-heart.svg'
//import killImage from '../static/media/death-zone.svg'

export function mergeOptions(state, option) {
	const newstate = []
	if(option.optid) {
		let added = false
		state.forEach(element => {
			if("optid" in element && element.optid === option.optid) {
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
        uniq: generateId(),
        optid: 'reroll-hit',
        stage: 'hits',
        type: 'automatic',
        text: 'Automatic Hit',
        image: hitImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-hit',
        stage: 'hits',
        type: 'reroll_missed',
        text: 'Reroll Hits: Missed',
        image: hitImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-hit',
        stage: 'hits',
        type: 'reroll_one',
        text: 'Reroll Hits: 1s',
        image: hitImage
    },
    {
        uniq: generateId(),
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: Assault, Advanced',
        value: -1,
        image: hitImage
    },
    {
        uniq: generateId(),
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: Heavy, Moved',
        value: -1,
        image: hitImage
    },
    {
        uniq: generateId(),
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: +1',
        value: 1,
        image: hitImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-wound',
        stage: 'wounds',
        type: 'automatic',
        text: 'Automatic Wound',
        image: woundImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-wound',
        stage: 'wounds',
        type: 'reroll_missed',
        text: 'Reroll Wounds: Missed',
        image: woundImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-wound',
        stage: 'wounds',
        type: 'reroll_one',
        text: 'Reroll Wounds: 1s',
        image: woundImage
    },
    {
        uniq: generateId(),
        stage: 'wounds',
        type: 'modifier',
        text: 'Wound: +1',
        value: 1,
        image: woundImage
    },
    {
        uniq: generateId(),
        stage: 'saves',
        type: 'modifier',
        text: 'Save: -1',
        value: -1,
        image: unsavedImage
    },
    {
        uniq: generateId(),
        stage: 'invulnsaves',
        type: 'modifier',
        text: 'Invuln Save: -1',
        value: -1,
        image: invulnsaveImage
    }
]

export const defense_options = [
    {
        uniq: generateId(),
        stage: 'hits',
        type: 'modifier',
        text: 'Hit: -1',
        value: -1,
        image: hitImage
    },
    {
        uniq: generateId(),
        stage: 'wounds',
        type: 'modifier',
        text: 'Wound: -1',
        value: -1,
        image: woundImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-save',
        stage: 'saves',
        type: 'reroll_missed',
        text: 'Reroll Save: Missed',
        image: unsavedImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-save',
        stage: 'saves',
        type: 'reroll_one',
        text: 'Reroll Save: 1s',
        image: unsavedImage
    },
    {
        uniq: generateId(),
        stage: 'saves',
        type: 'modifier',
        text: 'Cover',
        value: 1,
        image: unsavedImage
    },
    {
        uniq: generateId(),
        stage: 'saves',
        type: 'modifier',
        text: 'Save: +1',
        value: 1,
        image: unsavedImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-invulnsave',
        stage: 'invulnsaves',
        type: 'reroll_missed',
        text: 'Reroll Invuln Save: Missed',
        image: invulnsaveImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-invulnsave',
        stage: 'invulnsaves',
        type: 'reroll_one',
        text: 'Reroll Invuln Save: 1s',
        image: invulnsaveImage
    },
    {
        uniq: generateId(),
        stage: 'invulnsaves',
        type: 'modifier',
        text: 'Invuln Save: +1',
        value: 1,
        image: invulnsaveImage
    },
    {
        uniq: generateId(),
        optid: 'disgustingly_resilient',
        stage: 'damage',
        type: 'disgustingly_resilient',
        text: 'Disgustingly Resilient',
        value: 5,
        image: damageImage
    },
    {
        uniq: generateId(),
        optid: 'disgustingly_resilient',
        stage: 'damage',
        type: 'disgustingly_resilient',
        text: 'Feel No Pain',
        value: 5,
        image: damageImage
    },
    {
        uniq: generateId(),
        optid: 'disgustingly_resilient',
        stage: 'damage',
        type: 'disgustingly_resilient',
        text: 'Feel No Pain (6+)',
        value: 6,
        image: damageImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-dr',
        stage: 'damage_dr',
        type: 'reroll_missed',
        text: 'Reroll FNP/DR: Missed',
        image: damageImage
    },
    {
        uniq: generateId(),
        optid: 'reroll-dr',
        stage: 'daamage_dr',
        type: 'reroll_one',
        text: 'Reroll FNP/DR: 1s',
        image: damageImage
    }
]