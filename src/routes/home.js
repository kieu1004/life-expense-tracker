import { h, Component } from 'preact';
import LineChart from '../components/LineChart';

class Home extends Component {
	render() {
		return (
			<div className="text-center py-20">
				<p className="font-bold text-3xl">Life expense tracker</p>
				<LineChart />
			</div>
		);
	}
}

export default Home;
