import React, {Component} from 'react';

import BackArrow from "./images/BackArrow.svg"

import './Navbar.scss';

export class Navbar extends Component {

	constructor(props) {
		super(props);

		this.getPathBlock = this.getPathBlock.bind(this);
		this.getPathString = this.getPathString.bind(this);
	}

	getPathString() {
		let path_string = "/" + this.props.repository + "/" + this.props.commit;
		for (let i=0; i<this.props.path.length; i++) {
			path_string += "/" + this.props.path[i];
		}
		return path_string;
	}

	getPathBlock() {
		let path_string = this.props.path.map((value, index) => (
			<React.Fragment>
				{index !== 0 && <div style={{whiteSpace: "pre"}}> / </div>}
				<a href={this.getPathString()}>{value}</a>
			</React.Fragment>
		));
		console.log(this.props.path);
		console.log(path_string);
		return path_string;
	}

	getPrevButton() {
		let path_string = "/";

		if (this.props.repository !== "" && this.props.commit !== "") {
			path_string += this.props.repository + "/";
			if (this.props.path.length !== 0) {
				path_string += this.props.commit + "/";
			}
		}

		for (let i=0; i<this.props.path.length - 1; i++) {
			path_string += this.props.path[i] + "/";
		}

		console.log({path_string: path_string});

		return (
			<div className="PrevButton" onClick={() => window.open(path_string, "_self")}>
				<img src={BackArrow} alt="Go Back"/>
			</div>
		);
	}

	render() {
		return (
			<div className="Navbar">
				{this.props.repository !== "" && this.getPrevButton()}
				<div className="Path">{this.getPathBlock()}</div>
				<div className="Commit">
					<strong>Commit:</strong> {this.props.commit !== "" ? this.props.commit : "-"}
				</div>
				<div className="Repository">
					<strong>Repository:</strong> {this.props.repository !== "" ? this.props.repository : "-"}
				</div>
			</div>
		);
	}

}
