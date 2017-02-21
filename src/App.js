import React, { Component } from 'react';
import './App.css';

import ChatWindow from './ChatWindow';

class App extends Component {
  constructor(props) {
    super(props);
    // Example first messages for testing
    this.state = {typing:
        {"Rob":false,"Laura":false},
      messages: []
    };
    this.updateMessages = this.updateMessages.bind(this);
    this.alertTyping = this.alertTyping.bind(this);
  }

  // This function will be called by chatWindow children and sent up to
  // the parent App to update the shared message log
  updateMessages(message) {
    this.state.messages.push(message);
    this.forceUpdate();
    console.log(this.state.messages);
  }

  // Change the typing obect to reflect a change to the typing status for a user
  alertTyping(user,status) {
    this.state.typing[user] = status;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div className="header">
          ASAPP Chat App
        </div>
        <div className='app'>
          <ChatWindow name="Laura" messages={this.state.messages} typing={this.state.typing}
            passMessage={this.updateMessages} alertTyping={this.alertTyping} />
          <ChatWindow name="Rob" messages={this.state.messages} typing={this.state.typing}
            passMessage={this.updateMessages} alertTyping={this.alertTyping} />
        </div>
      </div>
      );
  }

}


export default App;
