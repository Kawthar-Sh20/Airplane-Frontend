document.addEventListener("DOMContentLoaded", () => {
  const flightSelect = document.getElementById("flight");
  const airportSelect = document.getElementById("airport");
  const form = document.getElementById("flight-form");

  // Function to fetch data from API using Axios
  const fetchData = async (tableName) => {
    try {
      const response = await axios.get(`http://localhost/api/${tableName}`);
      console.log(`Fetched data from ${tableName}:`, response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
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
  });

  // Event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const selectedFlight = flightSelect.value;
    const selectedAirport = airportSelect.value;

    // Data to be sent in the POST requests
    const flightData = {
      flight_id: selectedFlight,
    };

    const airportData = {
      airport_id: selectedAirport,
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
