import React from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'

const Donescreen = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text>Done screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Donescreen

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
