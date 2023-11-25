import { h, Component } from 'preact';
import ReactApexChart from 'react-apexcharts';
import { calculateAge, generateEventsByMonth, generateEventsByYear, generateRandomExpenseData } from '../utils/data'
import DatePicker from './DatePicker';
import FilterControl from './FilterControl';

const randomExpenseData = generateRandomExpenseData(1000, 2500);

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
            birthDate: null,
            filterOption: 'year',
            chartStyle: {},
        };
    }



    handleMonthChange = (e) => {
        const birthDate = e.target.value;
        const selectedDate = new Date(birthDate);
        const age = calculateAge(birthDate);
        const monthStart = 1;

        const dayOfBirth = selectedDate.getDate();
        const monthOfBirth = selectedDate.getMonth() + 1;
        const yearOfBirth = selectedDate.getFullYear();

        const currentYear = new Date().getFullYear();
        const targetAge = 101;
        const endYear = currentYear + (targetAge - age);

        const isPortraitMode = window.innerWidth <= 250;

        const events = generateEventsByMonth(randomExpenseData, currentYear, endYear);

        console.log('Hello dayOfBirth', dayOfBirth)
        console.log('Hello monthOfBirth', monthOfBirth)
        console.log('Hello yearOfBirth', yearOfBirth)
        console.log('Hello currentYear', currentYear)
        console.log('Hello endYear', endYear)
        console.log('Hello events', events)


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
            birthDate: e.target.value,
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
        const targetAge = 101;
        const endYear = currentYear + (targetAge - age);



        const isPortraitMode = window.innerWidth <= 250;

        const events = generateEventsByYear(randomExpenseData, age);



        console.log('Hello dayOfBirth', dayOfBirth)
        console.log('Hello monthOfBirth', monthOfBirth)
        console.log('Hello yearOfBirth', yearOfBirth)
        console.log('Hello age', age)
        console.log('Hello currentYear', currentYear)
        console.log('Hello endYear', endYear)
        console.log('Hello events', events)


        // Update data generation logic
        const datasets = this.state.datasets.map((dataset) => ({
            ...dataset,
            data: events.map((event, index) => {
                if (event) {
                    return {
                        x: age + index,
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
            birthDate: e.target.value,
            selectedDate: {
                day: dayOfBirth,
                month: monthOfBirth,
                year: yearOfBirth,
            },
        });

        this.handleWindowResize();
    };

    handleFilterChange = (selectedOption) => {
        const selectedFilter = selectedOption ? selectedOption.value : null;
        this.setState({ filterOption: selectedFilter });

        if (selectedFilter === 'month') {
            this.handleMonthChange({ target: { value: this.state.birthDate } });
        } else if (selectedFilter === 'year') {
            this.handleYearChange({ target: { value: this.state.birthDate } });
        }
    };








    // Handle window resize
    handleWindowResize = () => {
        const isPortraitMode = window.innerWidth <= 250;
        const additionalWidth = isPortraitMode ? 0 : 0;
        const additionalHeight = isPortraitMode ? 0 : 0;
        console.log("Hello isPortraitMode", isPortraitMode)
        console.log("Hello additionalWidth", additionalWidth)

        // Update chart style
        this.setState({
            chartStyle: {
                width: `calc(100% + ${additionalWidth}px)`,
                height: `calc(100% + ${additionalHeight}px)`,
                backgroundColor: isPortraitMode ? '#FF0000' : 'transparent',
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
        const isPortraitMode = window.innerWidth <= 250;
        console.log("this.state.filterOption", this.state.filterOption)
        const options = {
            xaxis: {
                title: {
                    text: this.state.filterOption === 'month' ? 'Month' : 'Age',
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
                        let label = '';

                        if (this.state.filterOption === 'month') {
                            label = `Month: ${selectedEvent.month + 1}`;
                        } else if (this.state.filterOption === 'year') {
                            label = `Year: ${selectedEvent.year}`;
                        }

                        return `
                            <div class="bg-white border rounded p-4 shadow-md">
                                <span class="block font-bold">${label}</span>
                                <span class="block text-gray-600">Expense: ${selectedEvent.totalExpense}</span>
                            </div>
                        `;
                    }

                    return '';
                },
            },
            colors: ['#9370DB'],
            fill: {
                type: 'gradient',
            },
            responsive: [
                {
                    breakpoint: 300,
                    options: {
                        chart: {
                            width: '100%',
                            height: '100%',
                        },
                    },
                },
            ],
        };


        const chartWidth = isPortraitMode ? '100%' : '200%';
        const chartHeight = isPortraitMode ? '100%' : '100%';

        const chartContainerStyle = {
            width: chartWidth,
            height: chartHeight,
            overflow: 'auto',
            maxWidth: '100%',
            maxHeight: '80vh',
            margin: 'auto',
        };

        return (
            <div className="h-screen w-screen flex flex-col">
                <div style={this.state.chartStyle}>
                    <div style={chartContainerStyle}>
                        <ReactApexChart
                            options={options}
                            series={
                                this.state.selectedEvent
                                    ? [{ data: this.state.selectedEvent.expense }]
                                    : this.state.datasets
                            }
                            type="area"
                            width={chartWidth}
                            height={chartHeight}
                        />
                    </div>
                </div>

                <div className="my-4 flex flex-row items-center justify-center">
                    <DatePicker
                        onChange={this.handleYearChange}
                        birthDate={this.state.birthDate}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 sm:mb-0"
                    />


                    <FilterControl
                        id="filter"
                        onChange={this.handleFilterChange}
                        filterOption={this.state.filterOption}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                    />
                </div>
                <div className='flex text-xs text-purple-500 items-center justify-center mb-18'>{`*limit the generated random data [1000 - 2100]`}</div>
            </div>
        );
    }
}

export default LineChart;