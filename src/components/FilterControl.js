import { h, Component } from 'preact';
import Select from 'react-select'

class FilterControl extends Component {
    render() {
        const options = [
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
        ];

        return (
            <div className={`bg-white items-center justify-center`}>
                <div className="text-l font-bold mb-2">
                    Filter
                </div>
                <Select
                    options={options}
                    className="font-normal outline-none bg-white min-w-[150px] md:items-center"
                    placeholder="Select filter"
                    onChange={(selectedOption) => this.props.onChange(selectedOption)}
                />
            </div>
        );
    }
}

export default FilterControl;