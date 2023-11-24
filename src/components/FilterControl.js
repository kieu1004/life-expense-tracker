import { h, Component } from 'preact';
import Select from 'react-select'

class FilterControl extends Component {

    render() {

        const options = [
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
        ]


        return (
            <label className="block text-l font-bold">
                <Select
                    options={options}
                    className="font-normal outline-none bg-white min-w-[150px] p-2 "
                    placeholder="Filter"
                />
            </label>
        );
    }
}

export default FilterControl;
