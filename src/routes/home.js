import { h, Component } from 'preact';
import LineChart from '../components/line';

class Home extends Component {
	render() {
		return (
			<div class="bg-white-800 text-red p-4">
				<h1 class="text-2xl">Life expense tracker</h1>
				<LineChart/>
			</div>
		);
	}
}

export default Home;