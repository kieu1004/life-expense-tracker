import { h, Component } from 'preact';
import DatePicker from './DatePicker';
import AgeDisplay from './AgeDisplay';

class ChartControls extends Component {
    render() {
        const { onChange, age, toggleViewMode, buttonLabel } = this.props;

        return (
            <div className={`pt-10 flex flex-col md:flex-row md:justify-between`}>
                <div>
                    <DatePicker onChange={onChange} />
                    <AgeDisplay age={age} />
                </div>

                <div className={`flex items-center mt-4 md:mt-0`}>
                    <div className={`ml-4`}>
                        <button
                            onClick={toggleViewMode}
                            className={`border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] bg-teal-500 text-white hover:bg-teal-700 focus:outline-none active:border-transparent transition-colors duration-300`}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartControls;
