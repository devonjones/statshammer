import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app'
import reducer from './reducers'
import middleware from './middleware'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, middleware)

ReactDOM.render(
	<Provider store={store}>
    	<App />
  	</Provider>,
	document.getElementById('root')
)

//registerServiceWorker();
