import React, {Component} from 'react';

import './App.scss';
import {Navbar} from "../Navbar/Navbar";
import {BackendGET} from "../RouteWrapper/backendCommunication";

import {Repository} from "./Repository/Repository";
import {Commit} from "./Commit/Commit";
import {Edit} from "./Edit/Edit";

class App extends Component {

	constructor(props) {
		super(props);

		this.getDatabaseLink = this.getDatabaseLink.bind(this);
		this.getBackendPathString = this.getBackendPathString.bind(this);

		this.getRepoContent = this.getRepoContent.bind(this);
		this.getCommitContent = this.getCommitContent.bind(this);
		this.getEditContent = this.getEditContent.bind(this);

		this.state = {
			repositories: [],
			commits: [],
			edits: []
		}
	}

	componentDidMount() {
		let url = this.getDatabaseLink();
		console.log({url: url, path: this.props.path});
		BackendGET(url).then((resolveMessage) => {
			let resolveJSON = JSON.parse(resolveMessage);
			console.log(resolveJSON);

			if (this.props.repository === "") {
				this.setState({
					repositories: resolveJSON["repositories"]
				});
			} else if (this.props.commit === "") {
				this.setState({
					commits: resolveJSON["commits"]
				});
			} else {
				if (resolveJSON["edit"].length === 0) {
					this.setState({
						edits: undefined
					});
				} else {
					this.setState({
						edits: resolveJSON["edit"]
					});
				}
			}

		}).catch((rejectMessage) => {
			console.log("Nothing Here!");
		});
	}

	getRepoContent() {
		let content;

		if (this.state.repositories.length === 0) {
			content = <div className="Empty">Not keeping track of any repositories</div>;
		} else {
			content = this.state.repositories.map((value, index) => (
				<Repository name={value} href={"/" + value}/>
			));
		}
		return <div className="Content">{content}</div>;
	}

	getCommitContent() {
		let content;

		let elements = this.props.records["records"][this.props.repository];
		console.log(elements);

		if (this.state.commits.length === 0) {
			content = <div className="Empty">Not keeping track of any commits</div>;
		} else {
			content = this.state.commits.map((value, index) => (
				<Commit hash={value} href={window.location.pathname + "/" + value}/>
			));
		}
		return <div className="Content">{content}</div>;
	}

	getEditContent() {
		let content;

		if (this.state.edits.length === 0 || this.state.edits.length === undefined) {
			content = <div className="Empty">Not keeping track of any edits</div>;
		} else {
			content = this.state.edits.map((value, index) => (
				<Edit name={value["file_id"]}/>
			));
		}
		return <div className="Content">{content}</div>;
	}

	render() {
		let page_content;

		if (this.props.repository === "") {
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

function countProperties(obj) {
    let count = 0;

    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

export default App;
