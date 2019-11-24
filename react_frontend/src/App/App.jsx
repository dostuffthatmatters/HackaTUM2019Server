import React, {Component} from 'react';

import './App.scss';

import {Repository} from "./Repository/Repository";
import {Commit} from "./Commit/Commit";
import {Edit} from "./Edit/Edit";
import {Spinner} from "./Spinner/Spinner";

class App extends Component {

	constructor(props) {
		super(props);

		this.getRepoContent = this.getRepoContent.bind(this);
		this.getCommitContent = this.getCommitContent.bind(this);
		this.getEditContent = this.getEditContent.bind(this);

		this.state = {
			repositories: [],
			commits: [],
			edits: []
		}
	}

	getRepoContent() {
		let content;

		console.log({page: "repo", records: this.props.records});

		let count = this.props.records["count"];
		let repositories = this.props.records["ids"];

		if (count === 0) {
			content = <div className="Empty">Not keeping track of any repositories</div>;
		} else {
			content = repositories.map((value, index) => (
				<Repository name={value} changePath={this.props.changePath}/>
			));
		}
		return <div className="Content">{content}</div>;
	}

	getCommitContent() {
		let content;

		console.log({page: "commit", records: this.props.records});
		//let elements = this.props.records["records"][this.props.repository];

		let count = this.props.records["records"][this.props.repository]["count"];
		let commits = this.props.records["records"][this.props.repository]["ids"];

		if (count === 0) {
			content = <div className="Empty">Not keeping track of any commits</div>;
		} else {
			content = commits.map((value, index) => (
				<Commit hash={value} changePath={this.props.changePath} repository={this.props.repository}/>
			));
		}
		return <div className="Content">{content}</div>;
	}

	getEditContent() {
		let content;

		console.log({page: "edit", records: this.props.records});

		let count = this.props.records["records"][this.props.repository]["records"][this.props.commit]["count"];
		let edits = this.props.records["records"][this.props.repository]["records"][this.props.commit]["records"];

		if (count === 0) {
			content = <div className="Empty">Not keeping track of any edits</div>;
		} else {
			content = edits.map((element, index) => (
				<Edit editObject={element}/>
			));
		}
		return <div className="Content">{content}</div>;
	}

	render() {
		let page_content;

		console.log({repository: this.props.repository, commit: this.props.commit});

		if (this.props.loading) {
			page_content = <Spinner/>;
		} else if (this.props.repository === "") {
			page_content = this.getRepoContent();
		} else if (this.props.commit === ""){
			page_content = this.getCommitContent();
		} else {
			page_content = this.getEditContent();
		}

		return (
			<div className="App">
				{page_content}
			</div>

		);
	}
}

export default App;
