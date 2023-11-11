import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import { generateEvents } from '../utils/data';

class LineChart extends Component {
    constructor() {
        super();
        const initialAge = 0;

        this.state = {
            labels: [],
            datasets: [
                {
                    name: 'Expense',
                    data: [],
                    events: [],
                },
            ],
            birthDate: '',
            age: initialAge,
            startingAge: initialAge,
            selectedEvent: null,
        };
    }

    handleDateChange = (e) => {
        const birthDate = e.target.value;
        const age = this.calculateAge(birthDate);

        // Update startingAge based on calculated age
        const startingAge = age;

        // Generate events up to age 60
        const events = generateEvents(60);

        // Update data generation logic
        const datasets = this.state.datasets.map((dataset) => ({
            ...dataset,
            data: events.map((event, index) => {
                if (event) {
                    return {
                        x: startingAge + index,
                        y: event.expense,
                    };
                }
                return null;
            }).filter(dataPoint => dataPoint !== null),
            events,
        }));

        // Update labels
        const labels = Array.from({ length: 60 - startingAge + 1 }, (_, i) => (i + startingAge) + ' years old');

        this.setState({
            birthDate,
            age,
            startingAge,
            labels,
            datasets,
            selectedEvent: null,
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
