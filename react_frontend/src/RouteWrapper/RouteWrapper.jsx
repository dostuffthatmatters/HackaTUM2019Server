import React, {Component} from 'react';
import App from '../App/App';
import {BackendGET} from "./backendCommunication";
import {Navbar} from "../Navbar/Navbar";

export class RouteWrapper extends Component {

	constructor(props) {
		super(props);

		this.state = {
			repository: "",
			commit: "",
			path: [],
			records: {}
		};


		this.setCurrentPath = this.setCurrentPath.bind(this);
		this.triggerPathUpdate = this.triggerPathUpdate.bind(this);
		this.triggerRecordUpdate = this.triggerRecordUpdate.bind(this);
	}

	componentWillMount() {
		// Called when the page is refreshed or newly loaded
		this.setCurrentPath();
	}

	triggerPathUpdate() {
		this.setCurrentPath();
	}

	componentDidMount() {
		this.setCurrentRecords();
	}

	triggerRecordUpdate() {
		this.setCurrentRecords();
	}

	setCurrentPath() {
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

	setCurrentRecords() {
		let url = "http://127.0.0.1:5000/fetchall";
		// let url = "https://hackatum2019.herokuapp.com/fetchall";

		BackendGET(url, {}).then((resolveMessage) => {
			let resolveJSON = JSON.parse(resolveMessage);
			this.setState({
				records: resolveJSON["records"]
			});
		}).catch((rejectMessage) => {
			console.log("Nothing Here!");
		});
	}

	render() {
		return (
			<React.Fragment>
				<Navbar repository={this.state.repository}
				        commit={this.state.commit}
						path={this.state.path}/>
				<App
					repository={this.state.repository}
			        commit={this.state.commit}
		            path={this.state.path}
				    triggerPathUpdate={this.triggerPathUpdate}
				    triggerRecordUpdate={this.triggerRecordUpdate}
			        records={this.state.records}/>
			</React.Fragment>
		);
	}
}