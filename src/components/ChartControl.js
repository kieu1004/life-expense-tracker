import { h, Component } from 'preact';
import DatePicker from './DatePicker';
import AgeDisplay from './AgeDisplay';

class ChartControls extends Component {
    render() {
        const { onChange, age, horizontalMode, onButtonClick, onBackButtonClick } = this.props;

        return (
            <div className={`pt-5 flex flex-column items-center justify-center`}>
                <div className={`md:items-center`}>
                    <DatePicker id="datepicker" onChange={onChange} />
                    {/* <AgeDisplay age={age} /> */}
                </div>

                <div className={`items-center ml-5`}>
                    {horizontalMode ? (
                        <button
                            className={`border border-gray-300 rounded-lg px-4 py-2 md:min-w-[30px] bg-teal-500 text-white hover:bg-teal-700 focus:outline-none active:border-transparent transition-colors duration-300 center`}
                            onClick={onBackButtonClick}
                        >
                            Back
                        </button>
                    ) : (
                        <button
                            className={`border border-gray-300 rounded-lg px-4 py-2 md:min-w-[30px] bg-teal-500 text-white hover:bg-teal-700 focus:outline-none active:border-transparent transition-colors duration-300 center`}
                            onClick={onButtonClick}
                        >
                            Rotate
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default ChartControls;