import React, {Component} from 'react';
import App from '../App/App';

export class RouteWrapper extends Component {

	constructor(props) {
		super(props);

		this.state = {
			repository: "",
			commit: "",
			path: []
		};

		this.update = this.update.bind(this);
	}

	componentWillMount() {
		let path = [];
		if (window.location.pathname !== "/") {
			path = window.location.pathname.split("/");
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
			path: path
		});
	}

	update() {
		let path = [];
		if (window.location.pathname !== "/") {
			path = window.location.pathname.split("/");
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
			path: path
		});
		console.log("Wrapper updated");
	}

	render() {
		return (
			<App repository={this.state.repository}
			     commit={this.state.commit}
			     path={this.state.path.slice(3)}/>
		);
	}
}