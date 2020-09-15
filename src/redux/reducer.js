import * as TodoTypes from './type'

const initState = {
  currentTodo: [],
  markedDoneTodo: [],
}

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case TodoTypes.ADD_NEW_TODO:
      return { ...state, currentTodo: [...state.currentTodo, action.payload.data] }
    default:
      return state
  }
}

export default todoReducer
