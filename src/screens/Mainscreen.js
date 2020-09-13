import React from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addNewTodo } from '../redux/action'

const Mainscreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Montserrat-Bold' }}>Todo App</Text>
      <Text style={{ fontFamily: 'Montserrat-Bold' }}>{JSON.stringify(todos)}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('DoneScreen')}>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>Go done</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        dispatch(addNewTodo('New homework'))
      }}
      >
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>Add Todo</Text>
      </TouchableOpacity>
    </View>)
}
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Mainscreen
