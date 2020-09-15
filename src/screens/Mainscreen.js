import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { TabView, SceneMap } from 'react-native-tab-view'
import { addNewTodo } from '../redux/action'

const { width } = Dimensions.get('window')
const initialLayout = { width }

const DoneTodoScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <Text>DoneTodoScreen</Text>
    </View>
  )
}

const ArchiveTodoScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <Text>ArchiveTodoScreen</Text>
    </View>
  )
}

const Mainscreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const AllTodoComponent = () => {
    console.log('================================================')
    console.log('todos', todos)
    console.log('================================================')
    return (
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <Text>AllTodoComponent</Text>
      </View>
    )
  }

  const renderScene = SceneMap({
    all: AllTodoComponent,
    done: DoneTodoScreen,
    archive: ArchiveTodoScreen,
  })

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TabView
        navigationState={{
          index: currentTabIndex,
          routes: [
            { key: 'all', title: 'All' },
            { key: 'done', title: 'Done' },
            { key: 'archive', title: 'Archive' },
          ],
        }}
        renderScene={renderScene}
        onIndexChange={setCurrentTabIndex}
        initialLayout={initialLayout}
      />
    </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default Mainscreen
