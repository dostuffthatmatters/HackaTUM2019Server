import React, {Component} from 'react';

import BackArrow from "./images/BackArrow.svg"

import './Navbar.scss';

export class Navbar extends Component {

	constructor(props) {
		super(props);

		this.getPathBlock = this.getPathBlock.bind(this);
		this.handlePrevClick = this.handlePrevClick.bind(this);
	}

	getPathBlock() {
		return this.props.path.map((value, index) => (
			<React.Fragment>
				{index !== 0 && <div style={{whiteSpace: "pre"}}> / </div>}
				<div onClick={() => this.handlePathClick(index)}>{value}</div>
			</React.Fragment>
		));
	}

	handlePathClick(index) {
		let newPath = this.props.path.slice(0, index + 1);
		console.log({oldPath: this.props.path, newPath: newPath});
		this.props.changePath(this.props.repository, this.props.commit, newPath);
	}

	handlePrevClick() {
		if (this.props.commit === "") {
			this.props.changePath("", "", []);
		} else if (this.props.path.length === 0) {
			this.props.changePath(this.props.repository, "", []);
		} else {
			this.props.path.pop();
			this.props.changePath(this.props.repository, "", this.props.path);
		}
	}

	render() {
		return (
			<div className="Navbar">
				{this.props.repository !== "" && (
					<div className="PrevButton" onClick={this.handlePrevClick}>
						<img src={BackArrow} alt="Go Back"/>
					</div>
				)}
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
