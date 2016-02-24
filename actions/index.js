import * as types from '../constants/ActionTypes'

export function connected() { 
	return {type: types.CONNECTED}
}

export function requestMove() { 
	return {type: types.REQUEST_MOVE }
}

export function requestDeal() { 
	return {type: types.REQUEST_DEAL }
}

export function join() { 
	return {type: types.JOIN }
}
