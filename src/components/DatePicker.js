import { h, Component } from 'preact';

class DatePicker extends Component {
    render() {
        const { onChange, birthDate } = this.props;

        return (
            <div className={`bg-white items-center justify-center `}>
                <div className="text-l font-bold mb-2">
                    Date of birth
                </div>
                <input
                    type="date"
                    className="border border-gray-300 p-2 rounded font-normal outline-none bg-white"
                    onChange={onChange}
                    placeholder="Select a date"
                    value={birthDate}
                />
            </div>
        );
    }
}

export default DatePicker;