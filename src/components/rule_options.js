import React from 'react'
import { Modal } from 'react-overlays'
import cog from '../static/media/cog.svg'

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

const dialogStyle = function(position) {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
  
    return {
        position: 'absolute',
        width: 400,
        top: '50%', left: '50%',
        transform: `translate(-${position}%, -50%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};

export class RuleOption extends React.Component {

    render() {
        const { option } = this.props
        return (
            <li className="option-display">
                <button onClick={this.selectOption} className="option-button">
                    <img src={option.image} alt={option.text} width={20} height={20}/> {this.props.option.text}
                </button>
            </li>
        )
    }

    selectOption = () => {
        const { attack, defense, option } = this.props
        this.props.dispatch(this.props.clickFunction(
            attack, defense, option
        ))
    }
}

export class RuleOptions extends React.Component {
    state = { showModal: false };

    render() {
        const { attack, defense, title, options, dispatch, clickFunction, position } = this.props
        return (
            <div className='options'>
                <button className='options-field' onClick={this.open}>
                    <img src={cog} alt="Options" width={31} height={31}/>
                </button>
        
                <Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.showModal}
                    onHide={this.close}
                >
                    <div style={dialogStyle(position)} >
                        <h4 id='modal-label'>{title}</h4>
                        <ul>
                            { options && options.map((option) => (
                                <RuleOption
                                    attack={attack}
                                    defense={defense}
                                    dispatch={dispatch}
                                    option={option}
                                    clickFunction={clickFunction}
                                />
                            ))}
                        </ul>
                    </div>
                </Modal>
            </div>
        )
    }
    close = () =>{
        this.setState({ showModal: false });
    }
    
    open = () => {
        this.setState({ showModal: true });
    }
}