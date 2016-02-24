import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { deck, actions } = this.props
    return (
      <div>
        <p>Draw stuff here and what if</p>
        <p>{deck.connected ? 'Connected' : 'Not connected'}</p>
      </div>
    )
  }
}

export default connect(
	state => ({deck: state.deck})
)(App)