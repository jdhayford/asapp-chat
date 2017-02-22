import React, { Component } from 'react';
import './ChatWindow.css';


class ChatInput extends Component {
	constructor(props) {
		super(props);
		// Value will represent the current value of the input, prior will be used
		// to store what it was 3 seconds ago to check for a change
		this.state = {value:'',prior:''};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.typingTimeout = this.typingTimeout.bind(this);
		// A timing interval will be used to tell if the user has continued
		// typing or if they have stopped and the input has not changed in the last
		// 5000 ms, if so it will change the typing status back to false
		setInterval(this.typingTimeout, 3000);
		this.typingTimeout();
	}

	// Update the state of the value whenever it is changed
	handleChange(event) {
		this.setState({value:event.target.value,prior:this.state.prior});

		// We will now check to see if there is any text in the input
		// to determine if we should tell the app that this user is typing
		this.props.alertTyping(event.target.value!=="");

	}

	// Timeout function to determine if the input has changed over the last
	// 'x' seconds to determine if other chatter is still typing, if not the
	// typing status will revert to false
	typingTimeout() {
		if (this.state.value==="" | this.state.value === this.state.prior) {
			this.props.alertTyping(false);
		} else {
			// Update the prior state value
			this.setState({value:this.state.value,prior:this.state.value})
		}
	}


	// Send the value to the ChatWindow parent element to add to messages
	handleClick(event) {
		// Lets avoid empty messages
		if (this.state.value !== "") {
			this.props.onSend(this.state.value);
			this.props.alertTyping(false);
			this.setState({value:'',prior:''});
		}
	}

	handleKeyPress(event) {
		// Handle pressing enter in input to send the message
		if (event.key === 'Enter'){
			this.handleClick();
		} 
	}

	render() {
		return (
			<div className='chatInput' >
				<input className="messageInput" type="text" onKeyPress={this.handleKeyPress} value={this.state.value} onChange={this.handleChange} />
				<div className="submitButton" onClick={this.handleClick}>Send</div>
			</div>
		);
	}
}

export default ChatInput;