import React, {Component} from 'react';
import GitLogo from './images/git_logo.svg';

import './Commit.scss';

export class Commit extends Component {
	render() {
		return (
			<div className="Commit" onClick={() => window.open(this.props.href, "_self")}>
				<img className="Logo" src={GitLogo} alt="Git Logo"/>
				<div className="Label">{this.props.hash}</div>
			</div>
		);
	}
}