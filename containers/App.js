import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import * as ItemTypes from '../constants/ItemTypes'
import HTML5Backend from 'react-dnd-html5-backend';


var cardSource = {
	beginDrag: function(props) {
		return {
			card: props.card
		}
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}


class Card extends Component {
	render() {
		const { card } = this.props;
		return (
			<div className="card">{card.text}</div>
		)
	}
}


@DragSource(ItemTypes.CARD, cardSource, collect)
class MyCard extends Component {
	render() {
		const { connectDragSource, isDragging } = this.props
		const { card } = this.props;
		return connectDragSource(
			<div className="card">{card.text}</div>
		)
	}
}

const cardTarget = {
  hover(props, monitor, component) {
  	const dragIndex = monitor.getItem().index;

  	console.log(props)
  	console.log(monitor)
  	console.log(component)

  }
}

const timelineTarget = {
  hover(props, monitor, component) {
  	const dragIndex = monitor.getItem().index;

  	console.log(props)
  	console.log(monitor)
  	console.log(component)

  }
}

@DropTarget(ItemTypes.CARD, cardTarget, (connect,monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
class PlayedCard extends Component {
	render() {
		const { connectDropTarget, isOver } = this.props
		const { card } = this.props;
		const when = card.year < 0 ?
			Math.abs(card.year) + ' BC' :
			card.year + ' AD'
		const cs = isOver ? "played-card card over" : "played-card card";
		return connectDropTarget(
			<div className={cs}>
				<div>
				<div className="description">{card.text}</div>
				<span className="when">{when}</span>
				</div>
			</div>
		)
	}
}

@DropTarget(ItemTypes.CARD, timelineTarget, (connect,monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
class Spacer extends Component {
	render() {
		const { connectDropTarget, isOver } = this.props
		const cs = isOver ? "spacer spacer-over" : "spacer";
		return connectDropTarget(
			<div className={cs}></div>
		)
	}
}


class Timeline extends Component {
	render() {
		const { timeline } = this.props;
		return (
			<div className="timeline">
				<Spacer />
				{timeline.map(card => <PlayedCard card={card} />)}
				<Spacer />
			</div>
		)
	}
}

class Hand extends Component {
	render() {
		const { hand } = this.props;
		return (
			<div className="hand">
				{hand.map(card => <Card card={card} />)}
			</div>
		)
	}
}

class MyHand extends Component {
	render() {
		const { hand } = this.props;
		return (
			<div className="hand">
				{hand.map(card => <MyCard card={card} />)}
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

class Me extends Component {
	render() {
		const { player, turn } = this.props
		const isTurn = player.id === turn
		return (
			<div className="player">
				<h3 className="name">{player.name}</h3>
				<MyHand hand={player.hand}/>
			</div>
		)
	}
}

@DragDropContext(HTML5Backend)
class Game extends Component {
	render() {
		const { game } = this.props
		const { timeline, players, turn, id } = game
		const player = players.filter(p => p.id === id)[0]
		const oponents = players.filter(p => p.id !== id)
		return (
			<div className="game">
				<h1>When did it happen?</h1>
				<Timeline timeline={timeline} />
				<Me key={player.id} player={player} turn={turn} />
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
      <div className="app">
        { game && <Game game={game} />}
      </div>
    )
  }
}

export default connect(
	state => ({deck: state.deck})
)(App)