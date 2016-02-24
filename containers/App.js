import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Card extends Component {
	render() {
		const { card } = this.props;
		return (
			<div className="card">{card.text}</div>
		)
	}
}

class PlayedCard extends Component {
	render() {
		const { card } = this.props;
		const when = card.year < 0 ?
			Math.abs(card.year) + ' BC' :
			card.year + ' AD'
		return (
			<div className="played-card card">
				<span className="description">{card.text}</span>
				<span className="when">{when}</span>
			</div>
		)
	}
}

class Timeline extends Component {
	render() {
		const { timeline } = this.props;
		return (
			<div className="timeline">
				<h1>When did it happen?</h1>
				{timeline.map(card => <PlayedCard card={card} />)}
			</div>
		)
	}
}

class Hand extends Component {
	render() {
		const { hand } = this.props;
		return (
			<div className="timeline">
				{hand.map(card => <Card card={card} />)}
			</div>
		)
	}
}

class Player extends Component {
	render() {
		const { player, turn } = this.props
		const isTurn = player.id === turn
		return (
			<div className="player">
				<h3 className="name">{player.name}</h3>
				<Hand hand={player.hand}/>
			</div>
		)
	}
}

class Game extends Component {
	render() {
		const { game } = this.props
		const { timeline, players, turn, id } = game
		const player = players.filter(p => p.id === id)[0]
		const oponents = players.filter(p => p.id !== id)
		return (
			<div className="game">
				<Timeline timeline={timeline} />
				<Player key={player.id} player={player} turn={turn} />
				{oponents.map(p => (<Player key={p.id}  player={p} turn={turn} />))}
			</div>
		)
	}
}

class App extends Component {
  render() {
    const { deck, actions } = this.props
    const { game } = deck;
    return (
      <div class="app">
        { game && <Game game={game} />}
      </div>
    )
  }
}

export default connect(
	state => ({deck: state.deck})
)(App)