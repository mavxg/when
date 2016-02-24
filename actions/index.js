import * as types from '../constants/ActionTypes'

export function connected() { 
	return {type: types.CONNECTED}
}

export function requestMove(id, index) { 
	return {type: types.REQUEST_MOVE, id, index}
}

export function requestDeal() { 
	return {type: types.REQUEST_DEAL}
}

export function join(game) { 
	return {type: types.JOIN, game}
}
