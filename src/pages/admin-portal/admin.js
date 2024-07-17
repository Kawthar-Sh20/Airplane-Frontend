function loadContent(type) {
    const content = document.getElementById('content');
    let tableContent = '';

    switch (type) {
        case 'airports':
            tableContent = getTableTemplate('Airports', 'airportTableBody', 'airportForm', ['City ID', 'Name', 'Code']);
            break;
        case 'flights':
            tableContent = getTableTemplate('Flights', 'flightTableBody', 'flightForm', ['Flight Number', 'Departure Airport ID', 'Arrival Airport ID', 'Departure Time', 'Arrival Time', 'Seat Capacity']);
            break;
        case 'hotels':
            tableContent = getTableTemplate('Hotels', 'hotelTableBody', 'hotelForm', ['City ID', 'Name', 'Description', 'Rating', 'Number of Rooms']);
            break;
        case 'taxis':
            tableContent = getTableTemplate('Taxis', 'taxiTableBody', 'taxiForm', ['City ID']);
            break;
        case 'users':
            tableContent = getTableTemplate('Users', 'userTableBody', 'userForm', ['Name', 'Email', 'Phone Number', 'Role']);
            break;
        case 'flightBookings':
            tableContent = getTableTemplate('Flight Bookings', 'flightBookingTableBody', 'flightBookingForm', ['User ID', 'Flight ID', 'Status']);
            break;
        case 'hotelBookings':
            tableContent = getTableTemplate('Hotel Bookings', 'hotelBookingTableBody', 'hotelBookingForm', ['User ID', 'Hotel ID', 'Status']);
            break;
        case 'taxiBookings':
            tableContent = getTableTemplate('Taxi Bookings', 'taxiBookingTableBody', 'taxiBookingForm', ['User ID', 'Taxi ID', 'Status']);
            break;
        case 'cities':
            tableContent = getTableTemplate('Cities', 'cityTableBody', 'cityForm', ['Name', 'Country']);
            break;
        default:
            tableContent = '<p>Select a category from the sidebar</p>';
    }

    content.innerHTML = tableContent;
    fetchData(type);
}

function getTableTemplate(title, tableBodyId, formId, fields) {
    let formFields = fields.map(field => `<input type="text" placeholder="${field}" id="${field.replace(/ /g, '')}">`).join('');
    return `
        <h2>${title}</h2>
        <button class="add-button" onclick="showForm('${formId}')">Add New ${title.slice(0, -1)}</button>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        ${fields.map(field => `<th>${field}</th>`).join('')}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="${tableBodyId}">
                    <!-- Dynamic rows will be inserted here -->
                </tbody>
            </table>
        </div>
        <div class="form-container" id="${formId}">
            <h3>Add/Edit ${title.slice(0, -1)}</h3>
            <form onsubmit="saveItem(event, '${formId}')">
                ${formFields}
                <button type="submit">Save</button>
            </form>
        </div>
    `;
}

function fetchData(type) {
    // This is where you would fetch data from the server
    // Example: fetch(`api/${type}`).then(response => response.json()).then(data => renderTable(type, data))

    const dummyData = getDummyData(type);
    renderTable(type, dummyData);
}

function getDummyData(type) {
    switch (type) {
        case 'airports':
            return [{ id_airport: 1, city_id: 1, name: "Airport 1", code: "AP1" }];
        case 'flights':
            return [{ id_flight: 1, flight_number: "FL123", departure_airport_id: 1, arrival_airport_id: 2, departure_time: "2024-01-01 10:00", arrival_time: "2024-01-01 12:00", seat_capacity: 100 }];
        case 'hotels':
            return [{ id_hotel: 1, city_id: 1, name: "Hotel 1", description: "A nice hotel", rating: 5, number_of_rooms: 50 }];
        case 'taxis':
            return [{ id_taxi: 1, city_id: 1 }];
        case 'users':
            return [{ id_user: 1, name: "User 1", email: "user1@example.com", phone_number: "1234567890", role: "customer" }];
        case 'flightBookings':
            return [{ id_flight_booking: 1, user_id: 1, flight_id: 1, status: "confirmed" }];
        case 'hotelBookings':
            return [{ id_hotel_booking: 1, user_id: 1, hotel_id: 1, status: "confirmed" }];
        case 'taxiBookings':
            return [{ id_taxi_booking: 1, user_id: 1, taxi_id: 1, status: "confirmed" }];
        case 'cities':
            return [{ id_city: 1, name: "City 1", country: "Country 1" }];
        default:
            return [];
    }
}

function renderTable(type, data) {
    const tableBodyId = getTableBodyId(type);
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = data.map(item => getTableRow(type, item)).join('');
}

function getTableBodyId(type) {
    switch (type) {
        case 'airports':
            return 'airportTableBody';
        case 'flights':
            return 'flightTableBody';
        case 'hotels':
            return 'hotelTableBody';
        case 'taxis':
            return 'taxiTableBody';
        case 'users':
            return 'userTableBody';
        case 'flightBookings':
            return 'flightBookingTableBody';
        case 'hotelBookings':
            return 'hotelBookingTableBody';
        case 'taxiBookings':
            return 'taxiBookingTableBody';
        case 'cities':
            return 'cityTableBody';
        default:
            return '';
    }
}

function getTableRow(type, item) {
    switch (type) {
        case 'airports':
            return `
                <tr>
                    <td>${item.city_id}</td>
                    <td>${item.name}</td>
                    <td>${item.code}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_airport})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_airport})">Delete</button>
                    </td>
                </tr>
            `;
        case 'flights':
            return `
                <tr>
                    <td>${item.flight_number}</td>
                    <td>${item.departure_airport_id}</td>
                    <td>${item.arrival_airport_id}</td>
                    <td>${item.departure_time}</td>
                    <td>${item.arrival_time}</td>
                    <td>${item.seat_capacity}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_flight})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_flight})">Delete</button>
                    </td>
                </tr>
            `;
        case 'hotels':
            return `
                <tr>
                    <td>${item.city_id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.rating}</td>
                    <td>${item.number_of_rooms}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_hotel})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_hotel})">Delete</button>
                    </td>
                </tr>
            `;
        case 'taxis':
            return `
                <tr>
                    <td>${item.city_id}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_taxi})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_taxi})">Delete</button>
                    </td>
                </tr>
            `;
        case 'users':
            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.role}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_user})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_user})">Delete</button>
                    </td>
                </tr>
            `;
        case 'flightBookings':
            return `
                <tr>
                    <td>${item.user_id}</td>
                    <td>${item.flight_id}</td>
                    <td>${item.status}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_flight_booking})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_flight_booking})">Delete</button>
                    </td>
                </tr>
            `;
        case 'hotelBookings':
            return `
                <tr>
                    <td>${item.user_id}</td>
                    <td>${item.hotel_id}</td>
                    <td>${item.status}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_hotel_booking})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_hotel_booking})">Delete</button>
                    </td>
                </tr>
            `;
        case 'taxiBookings':
            return `
                <tr>
                    <td>${item.user_id}</td>
                    <td>${item.taxi_id}</td>
                    <td>${item.status}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_taxi_booking})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_taxi_booking})">Delete</button>
                    </td>
                </tr>
            `;
        case 'cities':
            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.country}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem('${type}', ${item.id_city})">Edit</button>
                        <button class="delete" onclick="deleteItem('${type}', ${item.id_city})">Delete</button>
                    </td>
                </tr>
            `;
        default:
            return '';
    }
}

function showForm(formId) {
    document.querySelectorAll('.form-container').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

function saveItem(event, formId) {
    event.preventDefault();

    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const itemData = {};

    formData.forEach((value, key) => {
        itemData[key] = value;
    });

    console.log(itemData);
    // This is where you would send the form data to the server
    // Example: fetch('api/saveItem', { method: 'POST', body: JSON.stringify(itemData) })

    form.reset();
    form.style.display = 'none';
}

function editItem(type, id) {
    // This is where you would fetch the specific item data from the server and fill the form for editing
    // Example: fetch(`api/${type}/${id}`).then(response => response.json()).then(data => fillForm(type, data))

    const dummyItem = getDummyData(type)[0];
    fillForm(type, dummyItem);
}

function fillForm(type, data) {
    const formId = getFormId(type);
    const form = document.getElementById(formId);

    Object.keys(data).forEach(key => {
        const input = form.querySelector(`#${key}`);
        if (input) {
            input.value = data[key];
        }
    });

    showForm(formId);
}

function deleteItem(type, id) {
    // This is where you would send a delete request to the server
    // Example: fetch(`api/${type}/${id}`, { method: 'DELETE' })

    console.log(`Delete ${type} with ID ${id}`);
}

function getFormId(type) {
    switch (type) {
        case 'airports':
            return 'airportForm';
        case 'flights':
            return 'flightForm';
        case 'hotels':
            return 'hotelForm';
        case 'taxis':
            return 'taxiForm';
        case 'users':
            return 'userForm';
        case 'flightBookings':
            return 'flightBookingForm';
        case 'hotelBookings':
            return 'hotelBookingForm';
        case 'taxiBookings':
            return 'taxiBookingForm';
        case 'cities':
            return 'cityForm';
        default:
            return '';
    }
}

// Load default content
loadContent('flights');
