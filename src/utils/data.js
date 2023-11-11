export const generateEvents = (maxAge) => {
    const events = [
        // ... (events array)
        { age: 1, icon: 'birthday-cake', description: 'First Birthday', expense: 50 },
        { age: 2, icon: 'baby', description: 'Learning to Walk', expense: 30 },
        { age: 5, icon: 'school', description: 'Start School', expense: 40 },
        { age: 7, icon: 'book', description: 'Learn to Read', expense: 20 },
        { age: 10, icon: 'graduation-cap', description: 'Elementary School Graduation', expense: 60 },
        { age: 13, icon: 'trophy', description: 'Teen Achievements', expense: 70 },
        { age: 16, icon: 'car', description: 'Driver\'s License', expense: 50 },
        { age: 18, icon: 'id-card', description: 'Legal Adult', expense: 60 },
        { age: 21, icon: 'glass-cheers', description: 'Legal Drinking Age', expense: 40 },
        { age: 22, icon: 'glass-cheers', description: 'Legal Drinking Age', expense: 80 },
        { age: 25, icon: 'airplane', description: 'Travel', expense: 70 },
        { age: 26, icon: 'ring', description: 'Engagement', expense: 80 },
        { age: 27, icon: 'wedding', description: 'Wedding', expense: 90 },
        { age: 28, icon: 'career', description: 'Career Advancements', expense: 60 },
        { age: 30, icon: 'home', description: 'Home Purchase', expense: 100 },
        { age: 35, icon: 'globe', description: 'International Travel', expense: 120 },
        { age: 40, icon: 'family', description: 'Growing Family', expense: 110 },
        { age: 45, icon: 'retirement', description: 'Retirement', expense: 80 },
        { age: 50, icon: 'travel-bag', description: 'Bucket List Adventures', expense: 90 },
        { age: 55, icon: 'grandparent', description: 'Becoming a Grandparent', expense: 70 },
        { age: 60, icon: 'gold-watch', description: 'Golden Years', expense: 80 },
    ];

    const filteredEvents = events.filter(event => event.age >= 22 && event.age <= maxAge);

    return filteredEvents.map(event => ({
        ...event,
        expense: event.expense || 0,
    }));
};