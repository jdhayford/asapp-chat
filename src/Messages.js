import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Messages.css';

import Message from './Message';

class Messages extends Component {

	// Scroll to the bottom when a new message is sent
	componentDidUpdate() {
		var node = ReactDOM.findDOMNode(this);
		// Adjust padding of the element so that the typing alert
		// does not muve the window around, placing padding back 
		// when the alert is gone
		if (this.props.typing) {
			node.style.paddingBottom = "0px";
		} else {
			node.style.paddingBottom = "35px";
		}
		node.scrollTop = node.scrollHeight;
	}

	render() {
		// Create message objects from all messages
		const messages = this.props.messages.map((message,i) => (
			<Message
				key={i}
				from={message.from}
				to={message.to}
				message={message.message}
				fromMe={this.props.name===message.from}
				timestamp={message.timestamp} />
		));

		return (
			<div className='messages'>
				{messages}
				<div className={this.props.typing!=null?"typingAlert":"typingAlert hidden"}>
					{this.props.typing} is typing...
				</div>
			</div>
		);
	}
}

Messages.defaultProps = {
	messages: []
};

export default Messages;