document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".details-section");
  const menuItems = document.querySelectorAll(".sidebar li");
  const username = document.getElementById("username");

  function switchSection(sectionId) {
    sections.forEach((section) => {
      section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";

    if (sectionId === "users") {
      loadUserInfo();
    } else if (sectionId === "flights") {
      loadFlightBookings();
    } else if (sectionId === "hotels") {
      loadHotelBookings();
    } else if (sectionId === "taxis") {
      loadTaxiBookings();
    }
  }
  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  const token = jwtData.token;
  const userId = jwtData.userData.user_id;

  async function loadUserInfo() {
    try {
      const { data } = await axios.get(
        `http://localhost/api/users?id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { name, email, phone_number } = data.data[0];

      username.innerText = name;

      document.getElementById("user-info").innerHTML = `
		  <p><strong>Name:</strong> ${name}</p>
		  <p><strong>Email:</strong> ${email}</p>
		  <p><strong>Phone Number:</strong> ${phone_number}</p>
		`;
    } catch (error) {
      console.error("Error fetching user data:", error);

      document.getElementById("user-info").innerHTML =
        "<p>Error loading user information</p>";
    }
  }

  async function loadFlightBookings() {
    try {
      const { data } = await axios.get(
        `http://localhost/api/flight_bookings?id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const flightDetails = data.data
        .map(
          (booking) =>
            `<div class="details">
			<p><strong>Flight Number:</strong> ${booking.flight_id}</p>
			<p><strong>Status:</strong> ${booking.status}</p>
			<p><strong>City ID:</strong> ${booking.arrival_city_id}</p>
			<p><strong>Reservation Time:</strong> ${booking.created_at}</p>
		  </div>`
        )
        .join("");

      document.getElementById("flights").innerHTML = `
		  <div class="flight-image">
			<h2>Flight</h2>
			<iframe
			  src="https://my.spline.design/inair-92829a7660a17a19305c51726a8b6d2f/"
			  frameborder="0"
			  width="100%"
			  height="100%"
			></iframe>
		  </div>
		  ${flightDetails}
		`;
    } catch (error) {
      console.error("Error fetching flight bookings:", error);
      document.getElementById("flights").innerHTML =
        "<p>No flight bookings made yet!</p>";
    }
  }

  async function loadHotelBookings() {
    try {
      const { data } = await axios.get(
        `http://localhost/api/hotel_bookings?id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const hotelDetails = data.data
        .map(
          (booking) => `
		  <div class="details">
			<p><strong>Hotel number:</strong> ${booking.hotel_id}</p>
			<p><strong>Status:</strong> ${booking.status}</p>
			<p><strong>Reservation Date:</strong> ${booking.created_at}</p>
		  </div>
		`
        )
        .join("");

      document.getElementById("hotels").innerHTML = `
		  <h2>Hotel</h2>
		  ${hotelDetails}
		`;
    } catch (error) {
      console.error("Error fetching hotel bookings:", error);
      document.getElementById("hotels").innerHTML =
        "<p>No hotel bookings made yet!</p>";
    }
  }

  async function loadTaxiBookings() {
    try {
      const { data } = await axios.get(
        `http://localhost/api/taxi_bookings?id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data[0]);

      const taxiDetails = data.data
        .map(
          (booking) => `
		  <div class="details">
			<p><strong>Taxi ID:</strong> ${booking.taxi_id}</p>
			<p><strong>Status:</strong> ${booking.status}</p>
			<p><strong>Reservation Date:</strong> ${booking.created_at}</p>
		  </div>
		`
        )
        .join("");

      document.getElementById("taxis").innerHTML = `
		  <h2>Taxi</h2>
		  ${taxiDetails}
		`;
    } catch (error) {
      console.error("Error fetching taxi bookings:", error);
      document.getElementById("taxis").innerHTML =
        "<p>No taxi bookings made yet!</p>";
    }
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelector(".sidebar li.active").classList.remove("active");
      item.classList.add("active");
      const targetSection = item.dataset.target;
      switchSection(targetSection);
    });
  });

  const activeMenuItem = document.querySelector(".sidebar li.active");
  const targetSection = activeMenuItem.dataset.target;
  switchSection(targetSection);
});
