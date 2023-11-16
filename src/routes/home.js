import { h, Component } from 'preact';
import LineChart from '../components/LineChart';

class Home extends Component {
	render() {
		return (
			<div className="flex items-center justify-center mx-[50px] mt-[20px]">
				<LineChart />
			</div>
		);
	}
}

export default Home;