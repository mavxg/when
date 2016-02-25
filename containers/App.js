import React, { Component, PropTypes } from 'react'
import update from 'react/lib/update';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import * as ItemTypes from '../constants/ItemTypes'
import HTML5Backend from 'react-dnd-html5-backend';


var cardSource = {
	canDrag(props) {
		return props.playable;
	},

	beginDrag(props) {
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

@DragSource(ItemTypes.CARD, cardSource, collect)
class Card extends Component {
	render() {
		const { card, playable } = this.props;
		const { connectDragSource, isDragging } = this.props
		return connectDragSource(
			<div className="card">{card.text}</div>
		)
	}
}


const cardTarget = {
  hover(props, monitor, component) {
  	const { card } = monitor.getItem();
  	const { card: over } = props;

  	if (over.id !== card.id) {
  		const atIndex = props.findCard(over);
  		props.moveCard(card, atIndex);
  	}
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
		const when = card.year ? (card.year < 0 ?
			Math.abs(card.year) + ' BC' :
			card.year + ' AD') : '????'
		return connectDropTarget(
			<div className="card played-card">
				<div>
				<div className="description">{card.text}</div>
				<span className="when">{when}</span>
				</div>
			</div>
		)
	}
}


class Timeline extends Component {
	constructor(props) {
		super(props);
		this.moveCard = this.moveCard.bind(this);
		this.findCard = this.findCard.bind(this);
		const { timeline } = this.props;
		this.state = { cards: timeline };
	}

	findCard(card) {
		const { cards } = this.state;
		const { id } = card;
		return cards.findIndex(c => c.id === id);
	}

	moveCard(card, atIndex) {
		const index = this.findCard(card.id);
    	this.setState(update(this.state, {
     		 cards: {
       			 $splice: (index >= 0) ? [[index, 1],[atIndex, 0, card]] : [[atIndex, 0, card]]
      		}
   		}));
	}

	componentWillReceiveProps(nextProps) {
		const { timeline } = nextProps;
		this.setState({ cards: timeline })
	}

	render() {
		
		const { cards } = this.state
		return (
			<div className="timeline">
				{cards.map(card => 
				<PlayedCard 
					key={card.id} 
					card={card}
					moveCard={this.moveCard}
					findCard={this.findCard} />)}
			</div>
		)
	}
}

class Hand extends Component {
	render() {
		const { hand, isTurn, isMe } = this.props
		const playable = isTurn && isMe
		return (
			<div className="hand">
				{hand.map(card => <Card key={card.id} card={card} playable={playable}/>)}
			</div>
		)
	}
}

class Player extends Component {
	render() {
		const { player, turn, isMe } = this.props
		const isTurn = player.id === turn
		return (
			<div className="player">
				<h3 className="name">{player.name}</h3>
				<Hand hand={player.hand} isTurn={isTurn} isMe={isMe} />
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
				<Player key={player.id} player={player} turn={turn} isMe={true} />
				{oponents.map(p => (<Player key={p.id}  player={p} turn={turn} isMe={false} />))}
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