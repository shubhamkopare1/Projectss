import React, { useEffect, useState } from "react";

const userdataURL = "https://login--data-default-rtdb.firebaseio.com/data.json";
const bookingURL =
  "https://login--data-default-rtdb.firebaseio.com/bookings.json";

const FacilityBooking = () => {
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Tennis Court",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
    {
      id: 2,
      name: "Auditorium",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
    {
      id: 3,
      name: "Basketball Court",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
    {
      id: 4,
      name: "Football Ground",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
    {
      id: 5,
      name: "Cricket Ground",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
    {
      id: 6,
      name: "Computer Lab",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
    {
      id: 7,
      name: "Gymnasium",
      bookedBy: null,
      startTime: null,
      endTime: null,
    },
  ]);

  const [user, setUser] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const loggedInErno = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(userdataURL);
        const data = await response.json();
        const student = Object.values(data).find(
          (s) => s.erno === loggedInErno
        );
        if (student) setUser(student);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
    fetchBookings(); // Initial fetch

    // Auto-refresh bookings every 60 seconds
    // const interval = setInterval(() => {
    //   fetchBookings();
    // }, 60000);

    // return () => clearInterval(interval); // Cleanup on unmount
  }, [loggedInErno]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(bookingURL);
      const data = await response.json();
      if (data) {
        const currentTime = new Date();

        const updatedFacilities = facilities.map((facility) => {
          const booking = data[facility.id];

          if (booking) {
            const endTime = new Date(booking.endTime);

            if (endTime > currentTime) {
              return {
                ...facility,
                bookedBy: booking.student,
                startTime: booking.startTime,
                endTime: booking.endTime,
              };
            } else {
              return {
                ...facility,
                bookedBy: null,
                startTime: null,
                endTime: null,
              };
            }
          }
          return facility;
        });

        setFacilities(updatedFacilities);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleBooking = async () => {
    if (!user || !selectedFacility || !startTime || !endTime) {
      alert("Please fill all the details!");
      return;
    }

    const facility = facilities.find((f) => f.id === selectedFacility);
    if (facility.bookedBy) {
      alert("This facility is already booked!");
      return;
    }

    try {
      await fetch(bookingURL, {
        method: "PUT",
        body: JSON.stringify({
          [selectedFacility]: {
            student: user.firstName,
            startTime,
            endTime,
          },
        }),
        headers: { "Content-Type": "application/json" },
      });

      setFacilities(
        facilities.map((f) =>
          f.id === selectedFacility
            ? { ...f, bookedBy: user.firstName, startTime, endTime }
            : f
        )
      );

      alert("Facility booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="bg-black p-8">
      <div className="p-6 bg-gray-900 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Campus Facility Booking</h2>

        <ul className="mb-4">
          {facilities.map((facility) => (
            <li
              key={facility.id}
              className="p-3 bg-white rounded-lg shadow mb-2"
            >
              <strong>{facility.name}</strong> -
              {facility.bookedBy ? (
                <span className="text-red-500">
                  {" "}
                  Booked by {facility.bookedBy} (From {facility.startTime} to{" "}
                  {facility.endTime})
                </span>
              ) : (
                <span className="text-green-500"> Available</span>
              )}
            </li>
          ))}
        </ul>

        {/* Facility Selection Dropdown */}
        <select
          className="p-2 w-full border rounded-md mb-2"
          onChange={(e) => setSelectedFacility(parseInt(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            Select a Facility
          </option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.id}>
              {facility.name}
            </option>
          ))}
        </select>

        {/* Start Time Picker */}
        <label className="block text-gray-700 font-bold text-left">Start Time:</label>
        <div className="relative w-full mb-2">
          <input
            type="time"
            className="p-2 w-full border rounded-md bg-white cursor-pointer"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* End Time Picker */}
        <label className="block text-gray-700 font-bold text-left">End Time:</label>
        <div className="relative w-full mb-2" name="end">
          <input
          id="end"
            type="time"
            className="p-2 w-full border rounded-md bg-white cursor-pointer"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Booking Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FacilityBooking;