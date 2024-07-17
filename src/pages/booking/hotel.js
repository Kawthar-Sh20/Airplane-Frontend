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
  //////////////////////////////
  // Fetch and populate cities
  fetchData("cities").then((data) => {
    // Ensure the endpoint is correct
    if (data) {
      populateDropdown(citySelect, data, "id_city", "name");
    } else {
      console.error("No city data fetched");
    }
  });

  // Fetch and populate hotels
  fetchData("hotels").then((data) => {
    // Ensure the endpoint is correct
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
    const hotelBookingData = {
      city_id: selectedCity,
      hotel_id: selectedHotel,
    };

    try {
      // Send POST request to book the hotel
      const response = await axios.post(
        "http://localhost/api/hotel_booking",
        hotelBookingData
      );
      console.log("Hotel booking response from server:", response.data);
      console.log("Hotel booked successfully!");
    } catch (error) {
      console.error("Error booking hotel:", error);
      console.error("Failed to book hotel.");
    }
  });
});
