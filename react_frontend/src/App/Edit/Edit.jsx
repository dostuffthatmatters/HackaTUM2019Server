import React, {Component} from 'react';
import EditLogo from './images/edit_logo.svg';

import './Edit.scss';

export class Edit extends Component {
	render() {
		return (
			<div className="Edit">
				<img className="Logo" src={EditLogo} alt="Git Logo"/>
				<div className="Label">{this.props.editObject.file_id.replace(/___/g, "/")}(By {this.props.editObject.user_id})</div>
			</div>
		);
	}
}
