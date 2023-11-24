import { h, Component } from 'preact';
import DatePicker from './DatePicker';
import FilterControl from './FilterControl';

class ChartControls extends Component {
    render() {
        const { onChange, birthDate, filterOption } = this.props;

        return (
            <div className={`pt-2 bg-white pb-10 flex flex-column items-center justify-center mx-[30px]`}>
                <div className={`md:items-center`}>
                    <DatePicker id="datepicker" onChange={onChange} birthDate={birthDate} />
                </div>
                <div className={`ml-10`}>
                    <FilterControl id="filter" onChange={onChange} filterOption={filterOption}/>
                </div>
            </div>
        );
    }
}

export default ChartControls;