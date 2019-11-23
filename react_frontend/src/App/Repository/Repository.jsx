import React, {Component} from 'react';
import GitLogo from './images/git_logo.svg';

import './Repository.scss';

export class Repository extends Component {
	render() {
		return (
			<div className="Repository" onClick={() => window.open(this.props.href, "_self")}>
				<img className="Logo" src={GitLogo} alt="Git Logo"/>
				<div className="Label">{this.props.name}</div>
			</div>
		);
	}
}