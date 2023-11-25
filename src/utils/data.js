// Calculate age by birthday

export function calculateAge(birthday) {

    const today = new Date();
    const birth = new Date(birthday);

    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

// Calculate total expense by year
export function calculateTotalExpensesByYear(data, selectedYear) {
    const yearData = data.find(item => item.year === selectedYear);

    // if (!yearData) {
    //     console.log(`Không tìm thấy dữ liệu của năm ${selectedYear}`);
    //     return null;
    // }
    const totalExpenseForYear = yearData.detail.reduce((sum, month) => sum + month.expense, 0);

    return totalExpenseForYear;
}


// Generate event expense by year
export function generateEventsByYear(data, age) {
    const events = [];

    const currentYear = new Date().getFullYear();
    const targetAge = 101;
    const endYear = currentYear + (targetAge - age);

    for (let i = 0; i < endYear; i++) {
        const iYear = currentYear + i;

        const yearData = data.find(item => item.year === iYear);

        if (yearData) {
            const totalExpenseForYear = yearData.detail.reduce((sum, month) => sum + month.expense, 0);
            const event = { year: iYear, totalExpense: totalExpenseForYear };
            events.push(event);
        } else {
            // console.log(`Không tìm thấy dữ liệu của năm ${iYear}`);
        }
    }

    const filteredEvents = events.filter(event => event.year >= currentYear && event.year < endYear);

    return filteredEvents;
}

// Generate event expense by month (1-12 months) [startYear; endYear]
export function generateEventsByMonth(data, startYear, endYear) {
    const events = Array.from({ length: 12 }, () => ({ totalExpense: 0 }));

    for (let year = startYear; year <= endYear; year++) {
        const yearData = data.find(item => item.year === year);

        if (yearData) {
            yearData.detail.forEach(month => {
                const monthIndex = month.month;
                events[monthIndex].totalExpense += month.expense;
            });
        } else {
            // console.log(`Không tìm thấy dữ liệu của năm ${year}`);
        }
    }

    return events.map((total, index) => ({ month: index, ...total }));
}

export function generateRandomExpenseData(startYear, endYear) {
    const data = [];

    for (let year = startYear; year <= endYear; year++) {
        const months = Array.from({ length: 12 }, (_, i) => i);

        const detail = months.map(month => {
            const expense = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
            return { month, expense };
        });

        data.push({
            year,
            detail,
        });
    }

    return data;
}