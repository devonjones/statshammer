import React from 'react'
import Select from 'react-select';
import { connect } from 'react-redux'
import { generateId } from '../utils/utils'
import { addAttack, updateAttack } from '../actions/attacker'
  
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
            <div className="attack_type attack_field">
                <Select
                    className='attack_select_damage attack_select'
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
            <div className="attack_count attack_field">
                <input
                    className='attack_input_count attack_input'
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
            <div className="attack_skill attack_field">
                <input
                    className='attack_input_skill attack_input'
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
            <div className="attack_strength attack_field">
                <input
                    className='attack_input_strength attack_input'
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
            <div className="attack_ap attack_field">
                <input
                    className='attack_input_ap attack_input'
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
            <div className="attack_damage attack_field">
                <input
                    className='attack_input_damage attack_input'
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
        return(
            <div className="attack">
                <div>
                    {/*<Type attack={attack} dispatch={dispatch}/>*/}
                    <AttackCount attack={attack} dispatch={dispatch}/>
                    <Skill attack={attack} dispatch={dispatch}/>
                    <Strength attack={attack} dispatch={dispatch}/>
                    <AP attack={attack} dispatch={dispatch}/>
                    <Damage attack={attack} dispatch={dispatch}/>
                </div>
            </div>
        )
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
        const { attacks, dispatch } = this.props
        return (
            <div className="attacker">
                <div><em className="title">Attacks</em></div>
                <div>
                    {/*<div className="attack_title" style={{width: 148}}>Type</div>*/}
                    <div className="attack_title">Attacks / Shots</div>
                    <div className="attack_title">Ballistic / Weapon Skill</div>
                    <div className="attack_title">Strength</div>
                    <div className="attack_title">AP</div>
                    <div className="attack_title">Damage</div>
                </div>
                { attacks && attacks.map((attack, index) => (
                    <Attack key={attack.id} attack={attack} dispatch={dispatch}/>
                ))}
                <div>
                    <button onClick={this.addAttack}>Add Attack</button>
                </div>
            </div>
        )
    }
}

export default connect( (state) =>  ({
    attacks: state.attacker
}))(Attacker)
