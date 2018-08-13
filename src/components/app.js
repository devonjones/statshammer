import React from 'react'
import Attacker from './attacker'
import Defender from './defender'
import Stats from './stats'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'react-tabs/style/react-tabs.css';


class App extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(handleInitialData())
    }
    
    render () {
        const { defenders, dispatch } = this.props
        return (
            <div className='container'>
                <div className='combatant-container'>
                    <Attacker />
                    <Defender defenders={defenders} dispatch={dispatch}></Defender>
                </div>
                <Stats />
            </div>
        )
    }
}

export default connect((state) => ({
    attacks: state.attacker,
    defenders: state.defenders
}))(App)