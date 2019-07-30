import React from 'react'
import { Fragment } from 'react'
import Select from 'react-select';
import { connect } from 'react-redux'
import { generateId } from '../utils/utils'
import { addAttack, removeAttack, updateAttack } from '../actions/attacker'
import { updateCombat } from '../actions/combat'
import { RuleOptions, RuleOption } from './rule_options'
import { attack_options } from '../data/options'
import { addAttackOption, removeAttackOption } from '../actions/attacker'

class Type extends React.Component {
    handleChange = (selectedOption) => {
        this.props.dispatch(updateAttack({
            id: this.props.attack.id,
            type: selectedOption
        }))
    }
    
    render() {
        const { type } = this.props.attack;
        const options = [
            { value: 'assault', label: 'Assault' },
            { value: 'heavy', label: 'Heavy' },
            { value: 'rapid_fire', label: 'Rapid Fire' },
            { value: 'grenade', label: 'Grenade' },
            { value: 'pistol', label: 'Pistol' },
            { value: 'melee', label: 'Melee' },
          ];
          
        return (
            <div className="attack-type attack-field">
                <Select
                    className='attack-select-damage attack-select'
                    value={type}
                    defaultValue={type}
                    onChange={this.handleChange}
                    options={options} />
            </div>
        )
    }
}

class AttackCount extends React.Component {
    handleChange = (event) => {
        this.props.dispatch(updateAttack({
            id: this.props.attack.id,
            attackCount: event.target.value
        }))
    }
    
    render() {
        const { type, attackCount } = this.props.attack;
        return (
            <div className="attack-count attack-field">
                <input
                    className='attack-input-count attack-input'
                    type='text'
                    value={attackCount}
                    placeholder={ type === "melee" ? "Attacks" : "Shots" }
                    onChange={this.handleChange}>
                </input>
            </div>
        )
    }
}

class Skill extends React.Component {
    handleChange = (event) => {
        this.props.dispatch(updateAttack({
            id: this.props.attack.id,
            skill: event.target.value
        }))
    }
    attack_field
    handleBlur = (event) => {
        event.target.value = this.renderSkill();
    }

    renderSkill = () => {
        if (this.props.attack.skill === undefined) {
            return ""
        } else if (this.props.attack.skill === 0) {
            return ""
        }
        return `${this.props.attack.skill}+`
    } 

    render () {
        const { type } = this.props.attack
        return (
            <div className="attack-skill attack-field">
                <input
                    className='attack-input-skill attack-input'
                    type='text'
                    value={this.renderSkill()}
                    placeholder={ type.value === "melee"
                        ? "Weapon Skill"
                        : "Ballistic Skill" }
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}>
                </input>
            </div>
        )
    }
}

class Strength extends React.Component {
    handleChange = (event) => {
        this.props.dispatch(updateAttack({
            id: this.props.attack.id,
            strength: event.target.value
        }))
    }
    
    render () {
        const { strength } = this.props.attack
        return (
            <div className="attack-strength attack-field">
                <input
                    className='attack-input-strength attack-input'
                    type='text'
                    value={strength}
                    placeholder='Strength'
                    onChange={this.handleChange}>
                </input>
            </div>
        )
    }
}

class AP extends React.Component {
    handleChange = (event) => {
        this.props.dispatch(updateAttack({
            id: this.props.attack.id,
            ap: event.target.value
        }))
    }
    
    handleBlur = (event) => {
        event.target.value = this.renderAp()
    }

    renderAp = () => {
        return this.props.attack.ap
            ? `-${this.props.attack.ap}`
            : ""
    } 

    render () {
        return (
            <div className="attack-ap attack-field">
                <input
                    className='attack-input-ap attack-input'
                    type='text'
                    value={this.renderAp()}
                    placeholder='AP'
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}>
                </input>
            </div>
        )
    }
}

class Damage extends React.Component {
    handleChange = (event) => {
        this.props.dispatch(updateAttack({
            id: this.props.attack.id,
            damage: event.target.value
        }))
    }
    
    render () {
        const { damage } = this.props.attack
        return (
            <div className="attack-damage attack-field">
                <input
                    className='attack-input-damage attack-input'
                    type='text'
                    value={damage}
                    placeholder='Damage'
                    onChange={this.handleChange}>
                </input>
            </div>
        )
    }
}

class Attack extends React.Component {
    render() {
        const { attack, dispatch } = this.props
        return (
            <Fragment>
                <RuleOptions
                        attack={attack}
                        options={attack_options}
                        dispatch={dispatch}
                        clickFunction={addAttackOption}
                        title="Attack Options"
                        position={60}
                    />
                <Type attack={attack} dispatch={dispatch}/>
                <AttackCount attack={attack} dispatch={dispatch}/>
                <Skill attack={attack} dispatch={dispatch}/>
                <Strength attack={attack} dispatch={dispatch}/>
                <AP attack={attack} dispatch={dispatch}/>
                <Damage attack={attack} dispatch={dispatch}/>
                <div className="attack-options-display options-container">
                    { attack.options && attack.options.map((option) => (
                        <RuleOption
                            key={option.id}
                            attack={attack}
                            dispatch={dispatch}
                            option={option}
                            clickFunction={removeAttackOption}
                        />
                    ))}
                </div>
            </Fragment>
        )
    }
}

class AttackType extends React.Component {
    handleOptionChange = (event) => {
        return this.props.dispatch(updateCombat({type: event.target.value}))
    }

    render() {
        const { combat } = this.props
        return (
            <div className="combat-type">
                <div className="combat-type-radio">
                    <label htmlFor="stationary">
                        Stationary
                        <input
                            type="radio"
                            id="stationary"
                            name="attack_type"
                            value="stationary"
                            checked={combat.type === 'stationary'}
                            onChange={this.handleOptionChange} />
                    </label>
                </div>
                <div className="combat-type-radio">
                    <label htmlFor="moved">
                        Moved
                        <input
                            type="radio"
                            id="moved"
                            name="attack_type"
                            value="moved"
                            checked={combat.type === 'moved'}
                            onChange={this.handleOptionChange} />
                    </label>
                </div>
                <div className="combat-type-radio">
                    <label htmlFor="advanced">
                        Advanced
                        <input
                            type="radio"
                            id="advanced"
                            name="attack_type"
                            value="advanced"
                            checked={combat.type === 'advanced'}
                            onChange={this.handleOptionChange} />
                    </label>
                </div>
                <div className="combat-type-radio">
                    <label htmlFor="overwatch">
                        Overwatch
                        <input
                            type="radio"
                            id="overwatch"
                            name="attack_type"
                            value="overwatch"
                            checked={combat.type === 'overwatch'}
                            onChange={this.handleOptionChange} />
                    </label>
                </div>
                <div className="combat-type-radio">
                    <label htmlFor="melee">
                        Melee
                        <input
                            type="radio"
                            id="melee"
                            name="attack_type"
                            value="melee"
                            checked={combat.type === 'melee'}
                            onChange={this.handleOptionChange} />
                    </label>
                </div>
            </div>
        )
    }
}

class RemoveAttack extends React.Component {
    removeAttack = (e) => {
		e.preventDefault()

		this.props.dispatch(removeAttack(this.props.attacks.slice(-1)[0]))
    }

    render() {
        const { attacks } = this.props
        if(attacks.length > 1) {
            return (
                <button onClick={this.removeAttack}>Remove Attack</button>
            )
        }
        return null;
    }
}

class Attacker extends React.Component {
    addAttack = (e) => {
		e.preventDefault()

		this.props.dispatch(addAttack({
            id: generateId(),
            type: 'rapid_fire'
        }))
    }

    render() {
        const { attacks, combat, dispatch } = this.props
        return (
            <div className="attacker">
                <div><em className="title">Attacks</em></div>
                <div className="attack-container">
                    <div className="attack-title">Options</div>
                    <div className="attack-title">Type</div>
                    <div className="attack-title">Attacks / Shots</div>
                    <div className="attack-title">Ballistic / Weapon Skill</div>
                    <div className="attack-title">Strength</div>
                    <div className="attack-title">AP</div>
                    <div className="attack-title">Damage</div>
                    { attacks && attacks.map((attack, index) => (
                        <Attack
                            key={attack.id}
                            index={index}
                            attack={attack}
                            dispatch={dispatch}
                        />
                    ))}
                </div>
                <AttackType combat={combat} dispatch={dispatch} />
                <div>
                    <button onClick={this.addAttack}>Add Attack</button>
                    <RemoveAttack attacks={attacks} dispatch={dispatch} />
                </div>
            </div>
        )
    }
}

export default connect( (state) =>  ({
    attacks: state.attacker,
    combat: state.combat
}))(Attacker)
