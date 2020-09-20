import React, { useRef, useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, Animated, Easing,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { addNewTodo, deleteTodo } from '../redux/action'
import { Colors, Fonts } from '../../assets/styles'
import { deleteBtn, plus, send } from '../../assets/images'

const { width } = Dimensions.get('window')
const initialLayout = { width }

const DoneTodoScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>DoneTodoScreen</Text>
    </View>
  )
}

const ArchiveTodoScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>ArchiveTodoScreen</Text>
    </View>
  )
}

const Mainscreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo))
  }

  const handleMarkedDoneTodo = () => {

  }

  const AllTodoComponent = () => {
    const [showSafeAreaView, setShowSafeAreaView] = useState(true)
    const aniValue = useRef(new Animated.Value(0)).current

    const handlePressPlus = () => {
      // Animated.timing(aniValue, {
      //   toValue: 1,
      //   duration: 350,
      //   useNativeDriver: true,
      //   easing: Easing.inOut(Easing.bounce),
      // }).start()
      Animated.spring(aniValue, {
        toValue: 1,
        tension: 100,
        useNativeDriver: true,
      }).start()
    }

    const tranX = aniValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0],
    })

    return (

      <View style={styles.viewWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos.currentTodo}
          extraData={todos}
          keyExtractor={(item, index) => `RenderAllTodoComponent-${index}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.viewRowTodo}>
                <View style={styles.viewTitleTodo}>
                  <TouchableOpacity onPress={handleMarkedDoneTodo}>
                    <View style={styles.buttonMarkedDone} />
                  </TouchableOpacity>

                  <Text style={styles.textTodo}>{item}</Text>
                </View>

                <TouchableOpacity onPress={() => handleDeleteTodo(item)}>
                  <Image
                    source={deleteBtn}
                    style={styles.imageDelete}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )
          }}
        />

        <View style={{
          // position: 'absolute',
          // bottom: 50,
          // right: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
        }}
        >
          <Animated.View style={{
            width: 250,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.blue3,
            justifyContent: 'center',
            flex: 1,
            marginLeft: 10,
            // opacity: aniValue,
            transform: [{
              translateX: tranX,
            }],
          }}
          >
            <TextInput
              placeholder="Todo..."
              placeholderTextColor={Colors.white}
              style={{
                ...Fonts.semiBold, fontSize: 14, color: Colors.white, marginHorizontal: 24,
              }}
              returnKeyType="google"
              keyboardType="phone-pad"
            />
          </Animated.View>

          <TouchableOpacity onPress={handlePressPlus}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.blue3,
              marginLeft: 20,
            }}
            >
              <Image
                source={plus}
              />
            </View>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer
          onToggle={(state) => {
            setShowSafeAreaView(!state)
          }}
        />
        {showSafeAreaView && <SafeAreaView />}

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
      <Text style={styles.textTitleApp}>Todo</Text>

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
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.blue2 }}
            style={{ backgroundColor: Colors.white }}
            renderLabel={({ route, focused, color }) => (
              <Text style={{
                color: focused ? Colors.blue2 : Colors.gray2, ...Fonts.semiBold, fontSize: 18, textTransform: 'uppercase',
              }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28 / 375 * width,
    backgroundColor: Colors.white,
  },
  viewWrapper: {
    flex: 1,
  },
  viewRowTodo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTitleTodo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22 / 375 * width,
  },
  buttonMarkedDone: {
    width: 18 / 375 * width,
    height: 18 / 375 * width,
    borderRadius: 9 / 375 * width,
    backgroundColor: Colors.white,
    borderWidth: 3 * StyleSheet.hairlineWidth,
    borderColor: Colors.gray4,
    marginRight: 14 / 375 * width,
  },
  textTodo: {
    ...Fonts.semiBold,
    fontSize: 18 / 375 * width,
    color: Colors.gray2,
  },
  imageDelete: {
    width: 24 / 375 * width,
    height: 24 / 375 * width,
  },
  textTitleApp: {
    ...Fonts.bold,
    fontSize: 40 / 375 * width,
    color: Colors.gray2,
    marginTop: 46 / 375 * width,
    marginBottom: 22 / 375 * width,
  },
})
export default Mainscreen
