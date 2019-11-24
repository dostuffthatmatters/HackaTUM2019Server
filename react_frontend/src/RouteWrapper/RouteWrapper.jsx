import React, {Component} from 'react';
import App from '../App/App';
import {BackendGET, BackendDELETE} from "./backendCommunication";
import {Navbar} from "../Navbar/Navbar";

export class RouteWrapper extends Component {

	constructor(props) {
		super(props);

		this.state = {
			repository: "",
			commit: "",
			path: [],
			records: {},
			loading: true
		};

		this.changePath = this.changePath.bind(this);

		this.setCurrentRecords = this.setCurrentRecords.bind(this);

		this.triggerRecordUpdate = this.triggerRecordUpdate.bind(this);
		this.triggerRemove = this.triggerRemove.bind(this);
	}

	componentWillMount() {
		// Called when the page is refreshed or newly loaded
		let path = [];
		if (window.location.pathname !== "/visual") {
			// slice(7) to get the "/visual" out of there
			path = window.location.pathname.slice(7).split("/");
		}

		let repository = "", commit = "";
		if (path.length > 1) {
			repository = path[1];
		}
		if (path.length > 2) {
			commit = path[2];
		}

		this.setState({
			repository: repository,
			commit: commit,
			path: path.slice(3)
		});
	}

	componentDidMount() {
		window.addEventListener('popstate', event => {
			if (event.state !== null) {
				if ((event.state.repository !== null) && (event.state.commit !== null) && (event.state.path !== null)) {
					this.setState({
						repository: event.state.repository,
						commit: event.state.commit,
						path: event.state.path
					});
					return;
				}
			}
			this.setState({
				repository: "",
				commit: "",
				path: []
			});
		});

		this.setCurrentRecords();
	}

	static getPathString(repository, commit, path) {
		let pathString = "/";
		if (repository !== "") {
			pathString += repository + "/";
			if (commit !== "") {
				pathString += commit + "/";
				if (path.length !== 0) {
					path.forEach(element => {
						pathString += element + "/";
					});
				}
			}
		}
		return pathString;
	}

	changePath(repository, commit, path) {

		let pathString = "/visual" + RouteWrapper.getPathString(repository, commit, path);
		console.log({pathToBePushed: pathString});
		window.history.pushState({
			repository: repository,
			commit: commit,
			path: path
		}, "", pathString);

		this.setState({
			repository: repository,
			commit: commit,
			path: path
		});
	}

	triggerRecordUpdate() {
		this.setCurrentRecords();
	}

	setCurrentRecords() {
		this.setState({loading: true});

		// let url = "http://127.0.0.1:5000/fetchall";
		// let url = "https://hackatum2019.herokuapp.com/fetchall";
		let url = "/fetchall";

		BackendGET(url, {}).then((resolveMessage) => {
			let resolveJSON = JSON.parse(resolveMessage);
			this.setState({
				records: resolveJSON["records"],
				loading: false
			});
		}).catch((rejectMessage) => {
			console.log("Nothing Here!");
			this.setState({loading: false});
		});
	}

	triggerRemove() {
		// This method already knows what to
		// remove because it knows the current path

		this.setState({loading: true});

		// let url = "http://127.0.0.1:5000/";
		// let url = "https://hackatum2019.herokuapp.com/";
		let url = "/";

		if (this.state.repository !== "") {
			url += "repository/" + this.state.repository + "/";
			if (this.state.commit !== "") {
				url += "commit/" + this.state.commit;
			}
		}

		BackendDELETE(url, {}).then((resolveMessage) => {
			this.setCurrentRecords();
			this.changePath("", "", []);
		}).catch((rejectMessage) => {
			console.log("Nothing Here!");
			this.setState({loading: false});
		});
	}
	render() {
		return (
			<React.Fragment>
				<Navbar repository={this.state.repository}
				        commit={this.state.commit}
				        path={this.state.path}
				        changePath={this.changePath}/>
				<App
					repository={this.state.repository}
					commit={this.state.commit}
					path={this.state.path}
					changePath={this.changePath}
					triggerRecordUpdate={this.triggerRecordUpdate}
					triggerRemove={this.triggerRemove}
					records={this.state.records}
					loading={this.state.loading}/>
			</React.Fragment>
		);
	}
}