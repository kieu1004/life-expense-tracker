import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import StatusAlert, { StatusAlertService } from 'preact-status-alert';
import { generateEvents } from '../utils/data';
import ChartControls from './ChartControl';

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
            isHorizontalView: false,
        };

        // Bind the toggleViewMode function to the component instance
        this.toggleViewMode = this.toggleViewMode.bind(this);
    }

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

    handleDateChange = (e) => {
        const birthDate = e.target.value;
        const age = this.calculateAge(birthDate);

        // Reset to vertical view on date change
        this.setState({
            isHorizontalView: false,
        });

        // Display an alert if age is negative or greater than or equal to 200
        if (age < 0 || age >= 200) {
            StatusAlertService.showError('Warning: Invalid age. Please enter a valid age.');
            return;
        }

        // Ensure the calculated age is at least 0 and does not exceed 200
        const startingAge = Math.max(0, Math.min(age, 200));

        // Generate events up to age 100
        const events = generateEvents(startingAge, 100);

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
            isHorizontalView: false,
        });
    };


    toggleViewMode() {
        this.setState((prevState) => ({
            isHorizontalView: !prevState.isHorizontalView,
        }));
    }

    handleEventClick = (event) => {
        this.setState({ selectedEvent: event });
    };



    render() {

        const containerStyles = this.state.isHorizontalView
            ? { flexDirection: 'row' }
            : { flexDirection: 'column' };

        const buttonLabel = this.state.isHorizontalView ? 'Vertical View' : 'Horizontal View';

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
            <div className={`max-w-screen-md mx-auto p-4 ${this.state.isHorizontalView ? 'flex-row' : 'flex-col'}`}>
                <div className={`bg-white pt-4 rounded shadow-md w-full`} style={containerStyles}>
                    <ReactApexChart
                        options={options}
                        series={this.state.selectedEvent ? [{ data: this.state.selectedEvent.expense }] : this.state.datasets}
                        type="area"
                        height={400}
                    />
                </div>

                <ChartControls
                    onChange={this.handleDateChange}
                    age={this.state.age}
                    toggleViewMode={this.toggleViewMode}
                    buttonLabel={buttonLabel}
                />

                <StatusAlert />

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

                    @media (max-width: 768px) {
                        // Adjust styles for smaller screens
                        .flex-col {
                            flex-direction: column;
                        }

                        .flex-row {
                            flex-direction: row;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default LineChart;
