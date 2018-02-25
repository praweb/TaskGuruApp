// React
import React, { Component } from 'react'

// React Native
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class TaskCreateScreen extends Component {
  constructor (props) {
    super(props)

    // @TODO: Integrate with status dropdown
    this.state = {
      title: '',
      description: '',
      userId: '',
      statusId: 'cj9izircjn6ti0104d7pluu18'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  componentDidMount () {
    this.getUserId()
  }

  async getUserId () {
    try {
      let userId = await AsyncStorage.getItem('UserId')
      this.setState({ userId: userId })
    } catch (error) {
      console.log('Error in retrieving UserId' + error)
    }
  }

  resetState () {
    this.setState({
      title: '',
      description: ''
    })
  }

  handleSubmit () {
    const { navigate } = this.props.navigation

    this.props.mutate({
      variables: {
        title: this.state.title,
        description: this.state.description,
        userId: this.state.userId,
        statusId: this.state.statusId
      }
    }).then((response) => {
      if (response.data.createTask.id) {
        this.resetState()
        navigate('TaskDetail', {
          taskId: response.data.createTask.id
        })
      } else {
        // Handle errors
      }
    })
  }

  handleChange (text, field) {
    let newState = this.state
    newState[field] = text
    this.setState(Object.assign({}, this.state, newState))
  }

  render () {
    return (
      <View>
        <Text style={{padding: 15, alignItems: 'center'}}> Create Task </Text>
        <View style={{padding: 15}}>
          <TextInput placeholder='title' autoCapitalize='sentences' value={this.state.title} onChangeText={(text) => this.handleChange(text, 'title')} />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='description' multiline autoCapitalize='sentences' value={this.state.description} onChangeText={(text) => this.handleChange(text, 'description')} />
        </View>
        <View style={{padding: 15}}>
          <Button title='Create Task' onPress={this.handleSubmit} />
        </View>
      </View>
    )
  }
}

const createTask = gql`
mutation createTask($title: String!, $description: String!, $userId: ID!, $statusId: ID!) {
  createTask(title: $title, description: $description, userId: $userId, statusId: $statusId) {
    id
    user {
      name
      email
    }
    status {
      title
    }
    title
    description
    createdAt
  }
}
`
export default graphql(createTask)(TaskCreateScreen)
