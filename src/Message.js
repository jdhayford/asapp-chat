import React, { Component } from 'react';
import './Messages.css';

class Message extends Component {

	render() {
		return (
			// Currently no display for the timestamp of a message
			<div className={this.props.fromMe?"messageContainer fromMe":"messageContainer fromThem"}>
				<div className={this.props.fromMe?"message fromMe":"message fromThem"}>
					<div className="body">
						{this.props.message}
					</div>
				</div>
			</div>
		);
	}
}

export default Message;