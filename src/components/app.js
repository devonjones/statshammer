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
        return (
            <div className='container'>
                <div className='combatant-container'>
                    <Attacker />
                    <Defender />
                </div>
                <Stats />
            </div>
        )
    }
}

export default connect((state) => ({
}))(App)