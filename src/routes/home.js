import { h, Component } from 'preact';
import LineChart from '../components/LineChart';

class Home extends Component {
	render() {
		return (
			<div className="flex items-center justify-center mx-[12px] my-[50px]">
				<LineChart />
			</div>
		);
	}
}

export default Home;