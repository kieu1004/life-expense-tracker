import { h, Component } from 'preact';
import DatePicker from './DatePicker';
import AgeDisplay from './AgeDisplay';

class ChartControls extends Component {
    render() {
        const { onChange, birthDate} = this.props;

        return (
            <div className={`pt-2 bg-white pb-10`}>
                <div className={`md:items-center`}>
                    <DatePicker id="datepicker" onChange={onChange} birthDate={birthDate}/>
                </div>
            </div>
        );
    }
}

export default ChartControls;