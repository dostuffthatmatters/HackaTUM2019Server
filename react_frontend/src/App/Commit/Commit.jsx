import React, {Component} from 'react';
import CommitLogo from './images/Commit-Logo.svg';

import './Commit.scss';

export class Commit extends Component {
	render() {
		return (
			<div className="Commit" onClick={() => this.props.changePath(this.props.repository, this.props.hash, [])}>
				<img className="Logo" src={CommitLogo} alt="Git Logo"/>
				<div className="Label">{this.props.hash}</div>
			</div>
		);
	}
}