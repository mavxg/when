import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div>
        <p>Draw stuff here</p>
      </div>
    )
  }
}

export default connect(
	state => ({deck: state.deck})
)(App)