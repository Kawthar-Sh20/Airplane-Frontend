function loadContent(type) {
    const content = document.getElementById('content');
    // Placeholder data - replace with actual server-side fetch logic
    const dataMap = {
        'airports': '<h1>Airports</h1><div class="table-container">List of airports...</div>',
        'flights': '<h1>Flights</h1><div class="table-container">List of flights...</div>',
        'hotels': '<h1>Hotels</h1><div class="table-container">List of hotels...</div>',
        'taxis': '<h1>Taxis</h1><div class="table-container">List of taxis...</div>',
        'users': '<h1>Users</h1><div class="table-container">List of users...</div>',
        'flightBookings': '<h1>Flight Bookings</h1><div class="table-container">List of flight bookings...</div>',
        'hotelBookings': '<h1>Hotel Bookings</h1><div class="table-container">List of hotel bookings...</div>',
        'taxiBookings': '<h1>Taxi Bookings</h1><div class="table-container">List of taxi bookings...</div>',
        'cities': '<h1>Cities</h1><div class="table-container">List of cities...</div>'
    };
    content.innerHTML = dataMap[type] || '<div class="table-container">Select a category from the left.</div>';
}
