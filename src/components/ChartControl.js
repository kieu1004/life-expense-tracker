import { h, Component } from 'preact';
import DatePicker from './DatePicker';
import AgeDisplay from './AgeDisplay';

class ChartControls extends Component {
    render() {
        const { onChange, age, horizontalMode, onButtonClick, onBackButtonClick } = this.props;

        return (
            <div className={`pt-10 flex flex-col md:flex-row md:justify-between`}>
                <div>
                    <DatePicker id="datepicker" onChange={onChange} />
                    <AgeDisplay age={age} />
                </div>

                <div className={`flex items-center mt-4 md:mt-0`}>
                    <div className={`ml-4`}>
                        {horizontalMode ? (
                            <button
                                className={`border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] bg-teal-500 text-white hover:bg-teal-700 focus:outline-none active:border-transparent transition-colors duration-300`}
                                onClick={onBackButtonClick}
                            >
                                Back
                            </button>
                        ) : (
                            <button
                                className={`border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] bg-teal-500 text-white hover:bg-teal-700 focus:outline-none active:border-transparent transition-colors duration-300`}
                                onClick={onButtonClick}
                            >
                                Rotate
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartControls;