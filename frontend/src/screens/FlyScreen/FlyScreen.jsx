import React, { useEffect } from "react";
import { useState } from "react";
import "./FlyScreen.css";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function FlyScreen() {
  // Navigation
  const navigate = useNavigate();

  // Get flight data from Laravel
  const [flightsData, setFlightsData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/flight")
      .then((response) => response.json())
      .then((data) => setFlightsData(data));
  }, []);

  // OneWay or RoundTrip
  const [oneWay, setOneWay] = useState(true);
  const [roundTrip, setRoundTrip] = useState(false);

  function handleClickOneway() {
    setOneWay(true);
    setRoundTrip(false);
  }

  function handleClickRoundtrip() {
    setRoundTrip(true);
    setOneWay(false);
  }

  // Date Picker
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Passenger
  const [showTravller, setShowTravller] = useState(false);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const placeholderText = `${numAdults} Adult${
    numAdults > 1 ? "s" : ""
  }, ${numChildren} Child${numChildren > 1 ? "ren" : ""}`;

  function toggleTraveller() {
    setShowTravller(!showTravller);
  }

  function incrementCount(countType) {
    switch (countType) {
      case "adults":
        setNumAdults(numAdults + 1);
        break;
      case "children":
        setNumChildren(numChildren + 1);
        break;
      default:
        break;
    }
  }

  function decrementCount(countType) {
    switch (countType) {
      case "adults":
        if (numAdults > 1) setNumAdults(numAdults - 1);
        break;
      case "children":
        if (numChildren > 0) setNumChildren(numChildren - 1);
        break;
      default:
        break;
    }
  }

  const [passengerType, setPassengerType] = useState("Myanmar");

  const [fromCity, setFromCity] = useState("");
  const from_cities = [
    ...new Set(flightsData.map((flightData) => flightData.from)),
  ];
  const [toCity, setToCity] = useState("");
  const to_cities = [
    ...new Set(
      flightsData
        .filter((flightData) => flightData.from === fromCity)
        .map((flightData) => flightData.to)
    ),
  ];

  const [error, setError] = useState(false);

  function handleSearchFlightBtn() {
    if (oneWay) {
      if (fromCity == "" || toCity == "" || departureDate == "") {
        setError(true);
      } else {
        // console.log(fromCity)
        // console.log(moment(departureDate).format("YYYY-MM-DD"))
        setError(false);
        navigate(
          `/flightSection?oneWayOrRoundTrip=oneway&from=${fromCity}&to=${toCity}&departure_date=${moment(
            departureDate
          ).format(
            "YYYY-MM-DD"
          )}&return_date=${returnDate}&adults=${numAdults}&children=${numChildren}&passenger_type=${passengerType}`
        );
      }
    }

    if (roundTrip) {
      if (
        fromCity == "" ||
        toCity == "" ||
        departureDate == "" ||
        returnDate == ""
      ) {
        setError(true);
      } else {
        setError(false);
        navigate(
          `/flightSection?oneWayOrRoundTrip=roundtrip&from=${fromCity}&to=${toCity}&departure_date=${moment(
            departureDate
          ).format("YYYY-MM-DD")}&return_date=${moment(returnDate).format(
            "YYYY-MM-DD"
          )}&adults=${numAdults}&children=${numChildren}&passenger_type=${passengerType}`
        );
      }
    }
  }

  return (
    <div className="fly">
      <div className="fly_container">
        <ul className="fly_btn_container">
          <li
            className={oneWay ? "active" : "unactive"}
            onClick={handleClickOneway}
          >
            One Way
          </li>
          <li
            className={roundTrip ? "active" : "unactive"}
            onClick={handleClickRoundtrip}
          >
            Round Trip
          </li>
        </ul>
        <Stack spacing={2} width="100%">
          <Autocomplete
            // options={from_cities}
            options={from_cities}
            onChange={(event, newValue) => setFromCity(newValue)}
            renderInput={(params) => <TextField {...params} label="From" />}
          />
        </Stack>

        <Stack spacing={2} width="100%">
          <Autocomplete
            options={to_cities}
            onChange={(event, newValue) => setToCity(newValue)}
            renderInput={(params) => <TextField {...params} label="To" />}
          />
        </Stack>
        <div className="date_picker_container">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              className="departure_date_picker"
              label="Departure Date"
              value={departureDate}
              onChange={(date) => setDepartureDate(date)}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date()}
            />
          </LocalizationProvider>
          {roundTrip && (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                className="return_date_picker"
                label="Return Date"
                value={returnDate}
                onChange={(date) => setReturnDate(date)}
                renderInput={(params) => <TextField {...params} />}
                minDate={departureDate + 1}
              />
            </LocalizationProvider>
          )}
        </div>

        <input
          type="text"
          placeholder={placeholderText}
          onClick={toggleTraveller}
          style={{ width: "100%" }}
        />
        {showTravller && (
          <div className="passenger_count_container">
            <div className="passenger_count">
              <div className="passenger_type">Adults</div>
              <div className="passenger_controls">
                <button onClick={() => decrementCount("adults")}>-</button>
                <span>{numAdults}</span>
                <button onClick={() => incrementCount("adults")}>+</button>
              </div>
            </div>
            <div className="passenger_count">
              <div className="passenger_type">Children</div>
              <div className="passenger_controls">
                <button onClick={() => decrementCount("children")}>-</button>
                <span>{numChildren}</span>
                <button onClick={() => incrementCount("children")}>+</button>
              </div>
            </div>
          </div>
        )}
        <div>
          <select style={{width: "150px"}} value={passengerType} onChange={(e)=> setPassengerType(e.target.value)} name="Passenger Type" id="">
            <option value="Myanmar">Myanmar</option>
            <option value="Foreigner">Foreigner</option>
          </select>
        </div>

        <button className="search_flight_btn" onClick={handleSearchFlightBtn}>
          Search
        </button>
        <span style={{ color: "red" }} className={error ? "" : "error_display"}>
          *Fill Info to go on
        </span>
      </div>
    </div>
  );
}

export default FlyScreen;
