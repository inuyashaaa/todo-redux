import * as TodoTypes from './type'

export const addNewTodo = (data) => {
  return {
    type: TodoTypes.ADD_NEW_TODO,
    payload: { data },
  }
}
