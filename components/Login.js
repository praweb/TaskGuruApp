// React
import React from 'react'

// React Native
import { View, StyleSheet } from 'react-native'
import { Input, Text, Button } from 'native-base'

export default class Login extends React.Component {
  loggedIn () {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.loginContainer}>
        <Input
          style={styles.inputText}
          placeholder='Enter your email address'
          label='Email'
          value={this.props.email}
          onChangeText={(text) => this.props.handleChange(text, 'email')}
        />
        <Input
          style={styles.inputText}
          placeholder='Enter your password'
          label='Password'
          secureTextEntry
          value={this.props.password}
          onChangeText={(text) => this.props.handleChange(text, 'password')}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button} >
            <Button raised primary onPress={() => navigate('UserRegistration')}>
              <Text>
                New User
              </Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button raised primary onPress={this.props.handleSubmit}>
              <Text>
                Login
              </Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }

  logOut () {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button} >
          <Button raised primary onPress={this.props.logOut}>
            <Text>
              Logout
            </Text>
          </Button>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View>
        {
          !this.props.isLoggedIn && this.loggedIn()
        }
        {
          !!this.props.isLoggedIn && this.logOut()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 5,
    width: 'auto'
  },
  inputText: {
    marginLeft: 15,
    marginRight: 15,
    width: 'auto',
    padding: 5
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 125,
    height: 40
  }
})
