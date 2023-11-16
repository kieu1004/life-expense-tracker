import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import StatusAlert, { StatusAlertService } from 'preact-status-alert';
import { generateEvents } from '../utils/data';
import ChartControls from './ChartControl';

class LineChart extends Component {


    // Constructor initializes the state
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
            horizontalMode: false,
        };
    }


    // Calculate age based on birthDate
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


    // Handle changes in the birth date input
    handleDateChange = (e) => {
        const birthDate = e.target.value;
        const age = this.calculateAge(birthDate);

        // Display an alert if age is negative or greater than or equal to 200
        if (age < 0 || age >= 200) {
            StatusAlertService.showError('Warning: Invalid age. Please enter a valid age.');
            return;
        }

        // Ensure the calculated age is at least 0 and does not exceed 200
        const startingAge = Math.max(0, Math.min(age, 200));

        // Generate events up to age 100
        const events = generateEvents(startingAge, startingAge + 10);

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

        // Update labels chart
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


    // Handle clicks on chart events
    handleEventClick = (event) => {
        this.setState({ selectedEvent: event });
    };


    // Handle toggle layout mode
    toggleLayoutMode = () => {
        this.setState((prevState) => {
            const newMode = !prevState.horizontalMode;
            const layoutModeText = newMode ? 'Horizontal' : 'Vertical';
            StatusAlertService.showInfo(`Layout mode switched to ${layoutModeText}`);

            // Calculate events is startingAge + 10 when rotating
            const maxAge = newMode ? 100 : this.state.startingAge + 10;
            const events = generateEvents(this.state.startingAge, maxAge);

            // Update data generation logic
            const datasets = this.state.datasets.map((dataset) => ({
                ...dataset,
                data: events.map((event, index) => {
                    if (event) {
                        return {
                            x: this.state.startingAge + index,
                            y: event.expense,
                        };
                    }
                    return null;
                }).filter(dataPoint => dataPoint !== null),
                events,
            }));

            return {
                horizontalMode: newMode,
                datasets,
                selectedEvent: null,
            };
        });
    };

    toggleBackLayoutMode = () => {
        this.setState((prevState) => {
            const newMode = !prevState.horizontalMode;
            const layoutModeText = newMode ? 'Horizontal' : 'Vertical';
            StatusAlertService.showInfo(`Layout mode switched back to ${layoutModeText}`);

            // Calculate events up to 100 years when pressing "Back"
            const events = generateEvents(this.state.startingAge, this.state.startingAge + 15);

            // Update data generation logic
            const datasets = this.state.datasets.map((dataset) => ({
                ...dataset,
                data: events.map((event, index) => {
                    if (event) {
                        return {
                            x: this.state.startingAge + index,
                            y: event.expense,
                        };
                    }
                    return null;
                }).filter(dataPoint => dataPoint !== null),
                events,
            }));

            return {
                horizontalMode: newMode,
                datasets,
                selectedEvent: null,
            };
        });
    };


    // Render the component
    render() {

        // For toggle layout mode
        const { horizontalMode } = this.state;
        const containerClassName = `${horizontalMode ? '!rotate-90 !bg-white-500 !r-[30px] !l-[0px] !mt-[240px] !b-[0px] mt-[100px]' : 'mx-[20px]'}`;


        // For line chart
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
            <div className={containerClassName}>
                <ReactApexChart
                    className={horizontalMode ? '' : ''}
                    options={options}
                    series={
                        this.state.selectedEvent
                            ? [{ data: this.state.selectedEvent.expense }]
                            : this.state.datasets
                    }
                    type="area"
                    width={horizontalMode ? '100%' : '100%'}
                    height={horizontalMode ? '100%' : '100%'}

                />

                {!horizontalMode && (
                    <div className="mt-4">
                        <ChartControls
                            onChange={this.handleDateChange}
                            age={this.state.age}
                            buttonLabel="Rotate"
                            onButtonClick={this.toggleLayoutMode}
                        />
                    </div>
                )}

                {horizontalMode && (
                    <div className="mt-4 mx-[400px]">
                        <ChartControls
                            onChange={this.handleDateChange}
                            age={this.state.age}
                            horizontalMode={horizontalMode}
                            buttonLabel="Back"
                            onBackButtonClick={this.toggleBackLayoutMode}
                        />
                    </div>
                )}


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
                        margin-right: 10px;
                    }
                `}</style>
            </div>
        );
    }
}

export default LineChart;