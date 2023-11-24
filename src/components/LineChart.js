import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import { calculateAge, data, generateEventsByMonth, generateEventsByYear } from '../utils/data'
import ChartControls from './ChartControl';

class LineChart extends Component {

    // Constructor initializes the state
    constructor() {
        super();
        this.state = {
            labels: [],
            datasets: [
                {
                    name: 'Expense',
                    data: [],
                    events: [],
                },
            ],
            selectedEvent: null,
            chartStyle: {},
        };
    }

    handleDateChange = (e) => {
        const birthDate = e.target.value;
        const selectedDate = new Date(birthDate);
        const age = calculateAge(birthDate);
        const monthStart = 1;

        const dayOfBirth = selectedDate.getDate();
        const monthOfBirth = selectedDate.getMonth() + 1;
        const yearOfBirth = selectedDate.getFullYear();

        const currentYear = new Date().getFullYear();
        const targetAge = 100;
        const endYear = currentYear + (targetAge - age);


        const isPortraitMode = window.innerWidth <= 600;

        const events = generateEventsByMonth(data, currentYear, endYear);

        // Update data generation logic
        const datasets = this.state.datasets.map((dataset) => ({
            ...dataset,
            data: events.map((event, index) => {
                if (event) {
                    return {
                        x: monthStart + index,
                        y: event.totalExpense,
                    };
                }
                return null;
            }).filter(dataPoint => dataPoint !== null),
            events,
        }));

        const labels = Array.from({ length: 12 }, (_, i) => {
            const month = (monthOfBirth + i) % 12 || 12;
            return month;
        });

        this.setState({
            labels,
            datasets,
            selectedEvent: null,
            selectedDate: {
                day: dayOfBirth,
                month: monthOfBirth,
                year: yearOfBirth,
            }
        });

        this.handleWindowResize();
    };

    
    handleMonthChange = (e) => {
        const birthDate = e.target.value;
        const selectedDate = new Date(birthDate);
        const age = calculateAge(birthDate);
        const monthStart = 1;

        const dayOfBirth = selectedDate.getDate();
        const monthOfBirth = selectedDate.getMonth() + 1;
        const yearOfBirth = selectedDate.getFullYear();

        const currentYear = new Date().getFullYear();
        const targetAge = 100;
        const endYear = currentYear + (targetAge - age);


        const isPortraitMode = window.innerWidth <= 600;

        const events = generateEventsByMonth(data, currentYear, endYear);

        // Update data generation logic
        const datasets = this.state.datasets.map((dataset) => ({
            ...dataset,
            data: events.map((event, index) => {
                if (event) {
                    return {
                        x: monthStart + index,
                        y: event.totalExpense,
                    };
                }
                return null;
            }).filter(dataPoint => dataPoint !== null),
            events,
        }));

        const labels = Array.from({ length: 12 }, (_, i) => {
            const month = (monthOfBirth + i) % 12 || 12;
            return month;
        });

        this.setState({
            labels,
            datasets,
            selectedEvent: null,
            selectedDate: {
                day: dayOfBirth,
                month: monthOfBirth,
                year: yearOfBirth,
            }
        });

        this.handleWindowResize();
    };



    handleYearChange = (e) => {
        const birthDate = e.target.value;
        const selectedDate = new Date(birthDate);
        const age = calculateAge(birthDate);
        const monthStart = 1;

        const dayOfBirth = selectedDate.getDate();
        const monthOfBirth = selectedDate.getMonth() + 1;
        const yearOfBirth = selectedDate.getFullYear();

        const currentYear = new Date().getFullYear();
        const targetAge = 100;
        const endYear = currentYear + (targetAge - age);

        console.log("Hello currentYear", currentYear)
        console.log("Hello endYear", endYear)



        const isPortraitMode = window.innerWidth <= 600;

        const events = generateEventsByYear(data, age);

        // Update data generation logic
        const datasets = this.state.datasets.map((dataset) => ({
            ...dataset,
            data: events.map((event, index) => {
                if (event) {
                    return {
                        x: monthStart + index,
                        y: event.totalExpense,
                    };
                }
                return null;
            }).filter(dataPoint => dataPoint !== null),
            events,
        }));

        const labels = Array.from({ length: 12 }, (_, i) => {
            const month = (monthOfBirth + i) % 12 || 12;
            return month;
        });

        this.setState({
            labels,
            datasets,
            selectedEvent: null,
            selectedDate: {
                day: dayOfBirth,
                month: monthOfBirth,
                year: yearOfBirth,
            }
        });

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
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    componentWillUnmount() {
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
                    text: 'Month',
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
                                <span class="block font-bold">${selectedEvent.month}</span>
                                <span class="block text-gray-600">Chi tiêu: ${selectedEvent.totalExpense}</span>
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
                        filterOption={this.state.birthDate}
                    />
                </div>
            </div>
        );
    }
}

export default LineChart;