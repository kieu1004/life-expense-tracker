import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import { generateEvents } from '../utils/data';
import StatusAlert, { StatusAlertService } from 'preact-status-alert';

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

        // Ensure the calculated age is at least 0 and does not exceed 200
        const startingAge = Math.max(0, Math.min(age, 200));

        // Display an alert if age is greater than or equal to 200
        if (age >= 200) {
            StatusAlertService.showError('Warning: Age exceeds or equals 200 years.');
        }

        // Generate events up to age 100
        const events = generateEvents(100);

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

        // Ensure the calculated age is at least 0 and does not exceed 200
        return Math.max(0, Math.min(age, 200));
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
            colors: ['#04D0A9'],
            fill: {
                type: 'gradient',
            }
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

                <StatusAlert />
                {/* Custom styles for the alert using Tailwind CSS */}
                <style jsx>{`
                    .status-alert {
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                        max-width: 50rem;
                        z-index: 1000;
                        background-color: #fef7ec;
                        padding: 20px 40px;
                        display: flex;
                        align-items: center;
                    }

                    .status-alert .status-alert-content {
                        padding: 1rem;
                    }

                    .status-alert .status-alert-warning {
                        color: #fff;
                        margin-right: 10px; /* Margin to separate icon from text */
                    }
                `}</style>

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
