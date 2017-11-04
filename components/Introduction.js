// React
import React, { Component } from 'react'

// React Native
import { View, Text, StyleSheet, Image, Button } from 'react-native'

export default class Introduction extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <View style={styles.container} >
          <Image style={styles.image}
            source={require('./../images/Slice.png')}
          />
        </View>
        <View style={styles.introduction}>
          <Text style={styles.text}> Welcome Prasanna ! </Text>
          <Text style={styles.text} onPress={() => navigate('UserRegistration')}>
            User Registration
          </Text>
          <Button
            onPress={() => navigate('TaskCreate')}
            title='Create Tasks'
          />
          <Button
            onPress={() => navigate('TaskLists')}
            title='View Tasks'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  introduction: {
    marginTop: 20
  },
  text: {
    fontSize: 20,
    paddingBottom: 5
  },
  image: {
    marginTop: 5
  },
  container: {
    alignItems: 'center',
    height: 'auto',
    overflow: 'visible'
  }
})
