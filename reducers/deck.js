import {CONNECTED ,MOVE, DEAL, JOIN, JOINED } from '../constants/ActionTypes'

const initialState = {
  connected: false,
  game: {
    id: 0,
    turn: 0,
    players: [
      {id: 0, name: "Me", hand:[{id:1, text:'Gutenberg prints Bible'},{id:2, text:'Jesus dies'},{id:3, text:'Invention of the Bicycle'}]},
      {id: 1, name: "Nick", hand:[{id:4, text:'Shakespear born'},{id:5, text:'Queen Victoria dies'},{id:6, text:'Invention of the Ballpont'}]},
      {id: 2, name: "Stu", hand:[{id:7, text:'Chaucer born'},{id:8, text:'Queen Mary dies'},{id:9, text:'Invention of the Something'}]}
    ],
    timeline: [{id:10, text:'Domestication of Dogs', year:-15000}]
  }
}

export default function deck(state=initialState, action) {
  switch(action.type) {
    case CONNECTED:
      return {...state, connected: true}
    default:
      return state;
  }
}