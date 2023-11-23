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
            chartStyle: {},
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

        // Generate events up to age 100 if mobile, otherwise up to startingAge + 10
        const isPortraitMode = window.innerWidth <= 600;
        // const events = generateEvents(startingAge, isPortraitMode ? startingAge + 10 : 100);
        const events = generateEvents(startingAge, isPortraitMode ? 100 : 100);


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
        const labels = Array.from({ length: 100 - startingAge + 1 }, (_, i) => (i + startingAge) + ' years old');

        this.setState({
            birthDate,
            age,
            startingAge,
            labels,
            datasets,
            selectedEvent: null,
        });


        // Update chart style based on window width
        this.handleWindowResize();
    };




    // Handle window resize
    handleWindowResize = () => {
        const isPortraitMode = window.innerWidth <= 600;
        const additionalWidth = isPortraitMode ? 50 : 0;

        // Update chart style
        this.setState({
            chartStyle: {
                width: `calc(100% + ${additionalWidth}px)`,
                height: `calc(100% + ${additionalWidth}px)`,
                // backgroundColor: isPortraitMode ? '#FF0000' : 'transparent',
            }
        });
    };

    



    componentDidMount() {
        // Add event listener for window resize
        window.addEventListener('resize', this.handleWindowResize);

        // Initial resize check
        this.handleWindowResize();
    }

    componentWillUnmount() {
        // Remove event listener when component is unmounted
        window.removeEventListener('resize', this.handleWindowResize);
    }





    // Handle clicks on chart events
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
            <div style={this.state.chartStyle}>
                <ReactApexChart
                    options={options}
                    series={
                        this.state.selectedEvent
                            ? [{ data: this.state.selectedEvent.expense }]
                            : this.state.datasets
                    }
                    type="area"
                />

                <div className="mt-4">
                    <ChartControls
                        onChange={this.handleDateChange}
                        birthDate={this.state.birthDate}
                    />
                </div>
            </div>
        );
    }
}

export default LineChart;