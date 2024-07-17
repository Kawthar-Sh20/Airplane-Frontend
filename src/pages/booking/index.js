document.addEventListener("DOMContentLoaded", () => {
  const flightSelect = document.getElementById("flight");
  const airportSelect = document.getElementById("airport");

  // Function to fetch data from API using Axios
  const fetchData = async (tableName) => {
    try {
      const response = await axios.get(`http://localhost/api/${tableName}`);
      console.log(`Fetched data from ${tableName}:`, response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to populate dropdown with fetched data
  const populateDropdown = (selectElement, data, valueField, textField) => {
    // Check if data is an object with a 'data' property that is an array
    if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valueField];
        option.textContent = item[textField];
        console.log(`Adding option to ${selectElement.id}:`, option); // Debug log
        selectElement.appendChild(option);
      });
    } else {
      console.error("Data is not an array or is undefined:", data); // Debug log
    }
  };

  // Fetch and populate flights
  fetchData("flights").then((data) => {
    if (data) {
      populateDropdown(flightSelect, data, "id_flight", "flight_number");
    } else {
      console.error("No flight data fetched");
    }
  });

  // Fetch and populate airports
  fetchData("airports").then((data) => {
    if (data) {
      populateDropdown(airportSelect, data, "id_airport", "name");
    } else {
      console.error("No airport data fetched");
    }
  }); // Event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const selectedFlight = flightSelect.value;
    const selectedAirport = airportSelect.value;

    // Data to be sent in the POST requests
    const flightData = {
      flight_id: selectedFlight,
      // Include any additional data needed for flight_booking table
    };

    const airportData = {
      airport_id: selectedAirport,
      // Include any additional data needed for airports table
    };

    try {
      // Send POST request to flight_booking table
      const flightResponse = await axios.post(
        "http://localhost/api/flight_booking",
        flightData
      );
      console.log("Flight booking response from server:", flightResponse.data);

      // Send POST request to airports table
      const airportResponse = await axios.post(
        "http://localhost/api/airports",
        airportData
      );
      console.log("Airport update response from server:", airportResponse.data);

      alert("Flight booked and airport updated successfully!");
    } catch (error) {
      console.error("Error booking flight or updating airport:", error);
      alert("Failed to book flight or update airport.");
    }
  });
});
///////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("city");
  const hotelSelect = document.getElementById("hotel");
  const form = document.getElementById("hotel-form");

  // Function to fetch data from API using Axios
  const fetchData = async (tableName) => {
    try {
      const response = await axios.get(`http://localhost/api/${tableName}`);
      console.log(`Fetched data from ${tableName}:`, response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to populate dropdown with fetched data
  const populateDropdown = (selectElement, data, valueField, textField) => {
    if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valueField];
        option.textContent = item[textField];
        console.log(`Adding option to ${selectElement.id}:`, option); // Debug log
        selectElement.appendChild(option);
      });
    } else {
      console.error("Data is not an array or is undefined:", data); // Debug log
    }
  };

  // Fetch and populate cities
  fetchData("cities").then((data) => {
    if (data) {
      populateDropdown(citySelect, data, "id_city", "name");
    } else {
      console.error("No city data fetched");
    }
  });

  // Fetch and populate hotels
  fetchData("hotels").then((data) => {
    if (data) {
      populateDropdown(hotelSelect, data, "id_hotel", "name");
    } else {
      console.error("No hotel data fetched");
    }
  });

  // Event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const selectedCity = citySelect.value;
    const selectedHotel = hotelSelect.value;

    // Data to be sent in the POST requests
    const cityData = {
      city_id: selectedCity,
      // Include any additional data needed for city table
    };

    const hotelData = {
      hotel_id: selectedHotel,
      // Include any additional data needed for hotel_booking table
    };

    try {
      // Send POST request to city table
      const cityResponse = await axios.post(
        "http://localhost/api/cities",
        cityData
      );
      console.log("City booking response from server:", cityResponse.data);

      // Send POST request to hotel_booking table
      const hotelResponse = await axios.post(
        "http://localhost/api/hotels",
        hotelData
      );
      console.log("Hotel booking response from server:", hotelResponse.data);

      alert("City and Hotel booked successfully!");
    } catch (error) {
      console.error("Error booking city or hotel:", error);
      alert("Failed to book city or hotel.");
    }
  });
});
