import { h, Component } from 'preact';

class DatePicker extends Component {
    render() {
        return (
            <label className="block text-xl font-bold">
                Date of birth:
                <input
                    type="date"
                    className="border border-gray-300 p-2 rounded ml-2 font-normal outline-none bg-white"
                    onChange={this.props.onChange}
                    placeholder="Select a date"
                    value={this.props.birthDate}
                />
            </label>
        );
    }
}

export default DatePicker;
