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
        case 'flight_bookings':
            tableContent = getTableTemplate('Flight Bookings', 'flightBookingTableBody', 'flightBookingForm', ['User ID', 'Flight ID', 'Status']);
            break;
        case 'hotel_bookings':
            tableContent = getTableTemplate('Hotel Bookings', 'hotelBookingTableBody', 'hotelBookingForm', ['User ID', 'Hotel ID', 'Status']);
            break;
        case 'taxi_bookings':
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
    
    fetch(`http://localhost/api/${type}`)
    .then(response => {
        if (response.status != 200) {
            throw new Error('Network response was not ok ' + data.statusText);
        }
        return response.json();
    })
    .then(data => {
        renderTable(type, data.data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
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
        case 'flight_bookings':
            return 'flightBookingTableBody';
        case 'hotel_bookings':
            return 'hotelBookingTableBody';
        case 'taxi_bookings':
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
                    </td>\

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
        case 'flight_bookings':
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
        case 'hotel_bookings':
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
        case 'taxi_bookings':
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

    const form = document.getElementById(formId).getElementsByTagName("form")[0];
    const formData = new FormData(form);
    const itemData = {};

    formData.forEach((value, key) => {
        itemData[key] = value;
    });

    fetch(`http://localhost/api/${type}`, { method: 'POST', body: JSON.stringify(itemData) })

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
        case 'flight_bookings':
            return 'flightBookingForm';
        case 'hotel_bookings':
            return 'hotelBookingForm';
        case 'taxi_bookings':
            return 'taxiBookingForm';
        case 'cities':
            return 'cityForm';
        default:
            return '';
    }
}

// Load default content
loadContent('flights');
