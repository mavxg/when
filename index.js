import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import './style.scss'

const store = configureStore()

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)

var host = location.origin.replace(/^http/,'ws')
var ws = new WebSocket(host);
ws.onmessage = function(event) {
	console.log(event.data);
}