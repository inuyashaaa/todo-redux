import * as TodoTypes from './type'

const initState = {
  currentTodo: ['Make a new app'],
  markedDoneTodo: [],
}

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case TodoTypes.ADD_NEW_TODO:
      // const newState = state
      // newState.currentTodo.push(action.payload.data)
      // return newState
      return { ...state, currentTodo: [...state.currentTodo, action.payload.data] }
    default:
      return state
  }
}

export default todoReducer
