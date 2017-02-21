import React, { Component } from 'react';
import './ChatWindow.css';


class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {value:''};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	// Update the state of the value whenever it is changed
	handleChange(event) {
		this.setState({value:event.target.value});

		// We will now check to see if there is any text in the input
		// to determine if we should tell the app that this user is typing
		this.props.alertTyping((event.target.value != ""));

	}

	// Send the value to the ChatWindow parent element to add to messages
	handleClick(event) {
		// Lets avoid empty messages
		if (this.state.value != "") {
			this.props.onSend(this.state.value);
			this.props.alertTyping(false);
			this.setState({value:''});
		}
	}

	handleKeyPress(event) {
		// Handle pressing enter in input to send the message
		if (event.key == 'Enter'){
			this.handleClick();
		} 
	}

	render() {
		return (
			<div className = 'chatInput' >
				<input className = "messageInput" type="text" onKeyPress={this.handleKeyPress} value={this.state.value} onChange={this.handleChange} />
				<div className = "submitButton" onClick={this.handleClick}>Send</div>
			</div>
		);
	}
}

export default ChatInput;