import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store from '../store'
export default class MessagesList extends Component {

  constructor (props) {
    super(props);
    this.state =  {
      messages: []
    };
    console.log(this.state)
  }

  async componentDidMount () {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    this.setState({ messages });
    
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}
