document.addEventListener("DOMContentLoaded", () => {
  const taxiSelect = document.getElementById("taxi");
  const form = document.getElementById("taxi-form");

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
  // Fetch and populate taxis
  fetchData("taxis").then((data) => {
    if (data) {
      populateDropdown(taxiSelect, data, "id_taxi", "id_taxi"); // Adjust textField if you have a different display field
    } else {
      console.error("No taxi data fetched");
    }
  });

  // Event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const selectedTaxi = taxiSelect.value;

    // Data to be sent in the POST request
    const taxiBookingData = {
      taxi_id: selectedTaxi,
      // Include any additional data needed for taxi_booking table
    };

    try {
      // Send POST request to book the taxi
      const response = await axios.post(
        "http://localhost/api/taxi_booking",
        taxiBookingData
      );
      console.log("Taxi booking response from server:", response.data);

      console.error("Taxi booked successfully!");
    } catch (error) {
      console.error("Error booking taxi:", error);
      console.error("Failed to book taxi.");
    }
  });
});
