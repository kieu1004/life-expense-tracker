import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import { generateEvents } from '../utils/data';

const labels = Array.from({ length: 60 - 22 + 1 }, (_, i) => (i + 22) + ' years old');


class LineChart extends Component {
    constructor() {
        super();
        const initialAge = 0;
        const startingAge = 22;

        this.state = {
            labels,
            datasets: [
                {
                    name: 'Expense',
                    data: Array(60 - startingAge + 1).fill(0),
                    events: generateEvents(60),
                },
            ],
            birthDate: '',
            age: initialAge,
            startingAge,
            selectedEvent: null,
        };
    }

    handleDateChange = (e) => {
        const birthDate = e.target.value;
        const age = this.calculateAge(birthDate);
        const labels = Array.from({ length: 60 - age + 1 }, (_, i) => (i + age) + ' years old');

        const events = generateEvents(age);
        const datasets = this.state.datasets.map((dataset) => ({
            ...dataset,
            data: events.map(event => event.expense),
            events,
        }));

        this.setState({
            birthDate,
            age,
            labels,
            datasets,
            selectedEvent: null, // Reset selected event when date changes
        });
    };

    calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    handleEventClick = (event) => {
        this.setState({ selectedEvent: event });
    };

    render() {
        const options = {
            xaxis: {
                title: {
                    text: 'Age',
                },
            },
            yaxis: {
                title: {
                    text: 'Expected spending',
                },
            },
            tooltip: {
                custom: ({ series, seriesIndex, dataPointIndex }) => {
                    const selectedEvent = this.state.datasets[seriesIndex].events[dataPointIndex];
                    if (selectedEvent) {
                        return `
                            <div class="bg-white border rounded p-4 shadow-md">
                                <span class="block font-bold">${selectedEvent.description}</span>
                                <span class="block text-gray-600">Chi tiêu: ${selectedEvent.expense}</span>
                            </div>
                        `;
                    }
                    return '';
                },
            },            
        };

        return (
            <div className="max-w-screen-md mx-auto p-4">
                <label className="block mb-4">
                    Date of birth:
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded"
                        onChange={this.handleDateChange}
                    />
                </label>

                <div className="mb-4">
                    <span>Age: {this.state.age}</span>
                </div>

                <div className="bg-white p-4 rounded shadow-md w-full">
                    <ReactApexChart
                        options={options}
                        series={this.state.selectedEvent ? [{ data: this.state.selectedEvent.expense }] : this.state.datasets}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        );
    }
}

export default LineChart;