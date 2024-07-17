document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".details-section");
  const menuItems = document.querySelectorAll(".sidebar li");

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

  async function loadUserInfo() {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));

    if (
      !jwtData ||
      !jwtData.token ||
      !jwtData.userData ||
      !jwtData.userData.user_id
    ) {
      document.getElementById("user-info").innerHTML =
        "<p>User not logged in</p>";
      return;
    }

    const token = jwtData.token;
    const userId = jwtData.userData.user_id;

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
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    if (
      !jwtData ||
      !jwtData.token ||
      !jwtData.userData ||
      !jwtData.userData.user_id
    ) {
      document.getElementById("flights").innerHTML =
        "<p>User not logged in</p>";
      return;
    }

    const token = jwtData.token;
    const userId = jwtData.userData.user_id;

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
          (booking) => `
		  <div class="details">
			<p><strong>Flight Number:</strong> ${booking.flight_number}</p>
			<p><strong>Status:</strong> ${booking.status}</p>
			<p><strong>From:</strong> ${booking.from}</p>
			<p><strong>To:</strong> ${booking.to}</p>
		  </div>
		`
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
        "<p>Error loading flight bookings</p>";
    }
  }

  async function loadHotelBookings() {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    if (
      !jwtData ||
      !jwtData.token ||
      !jwtData.userData ||
      !jwtData.userData.user_id
    ) {
      document.getElementById("hotels").innerHTML = "<p>User not logged in</p>";
      return;
    }

    const token = jwtData.token;
    const userId = jwtData.userData.user_id;

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
			<p><strong>Name:</strong> ${booking.name}</p>
			<p><strong>Rating:</strong> ${booking.rating}</p>
			<p><strong>Location:</strong> ${booking.location}</p>
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
        "<p>Error loading hotel bookings</p>";
    }
  }

  async function loadTaxiBookings() {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    if (
      !jwtData ||
      !jwtData.token ||
      !jwtData.userData ||
      !jwtData.userData.user_id
    ) {
      document.getElementById("taxis").innerHTML = "<p>User not logged in</p>";
      return;
    }

    const token = jwtData.token;
    const userId = jwtData.userData.user_id;

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

      const taxiDetails = data.data
        .map(
          (booking) => `
		  <div class="details">
			<p><strong>Service:</strong> ${booking.service}</p>
			<p><strong>Status:</strong> ${booking.status}</p>
			<p><strong>Type:</strong> ${booking.type}</p>
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
        "<p>Error loading taxi bookings</p>";
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
