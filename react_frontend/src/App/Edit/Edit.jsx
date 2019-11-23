import React, {Component} from 'react';
import GitLogo from './images/git_logo.svg';

import './Edit.scss';

export class Edit extends Component {
	render() {
		return (
			<div className="Edit">
				<img className="Logo" src={GitLogo} alt="Git Logo"/>
				<div className="Label">{this.props.name}</div>
			</div>
		);
	}
}
