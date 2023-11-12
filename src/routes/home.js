import { h, Component } from 'preact';
import LineChart from '../components/LineChart';

class Home extends Component {
	render() {
		return (
			<div class="bg-white-800 text-red p-4">
				<LineChart/>
			</div>
		);
	}
}

export default Home;