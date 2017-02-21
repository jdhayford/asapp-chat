import React, { Component } from 'react';
import './ChatWindow.css';

import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {messages:this.props.messages,name:this.props.name};
		this.sendHandler = this.sendHandler.bind(this);
		this.alertTyping = this.alertTyping.bind(this);
	}

	sendHandler(arg) {
		// Send new message to the parent App
		this.props.passMessage(
			{
				from:this.props.name,
				to:this.getOther(),
				message:arg,
				timestamp:Date.now()
			}
		);
	}

	// This should signal the controlling app that that this chat
	// window is typing, passing up the name of the 'recipient'
	// of the alert and their status
	alertTyping(status) {
		this.props.alertTyping(this.props.name,status);
	}

	// Return the name of the other person this chat window chats with
	getOther() {
		return (this.props.name == "Rob" ? "Laura" : "Rob");
	} 

	render() {
		const otherTyping = this.props.typing[this.getOther()];

		return (
			<div className="chatWindow">
				<h1> {this.getOther()}</h1>
				<Messages name={this.state.name} messages={this.state.messages} typing={otherTyping?this.getOther():null} />
				<ChatInput onSend={this.sendHandler} alertTyping={this.alertTyping} />
			</div>
		);
	}
}

ChatWindow.defaultProps = {
	name: 'Anon'
};


export default ChatWindow;