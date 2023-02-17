import React from "react";
import { useState } from "react";
import "./FlyScreen.css";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
import Box from "@mui/material";

const from_cities = [
  "Yangon",
  "Mandalay",
  "Nay Pyi Taw",
  "Pyin Oo Lwin",
  "Chaung Thar",
];
const to_cities = [
  "Yangon",
  "Mandalay",
  "Nay Pyi Taw",
  "Pyin Oo Lwin",
  "Chaung Thar",
];

function FlyScreen() {
  const [oneWay, setOneWay] = useState(true);
  const [roundTrip, setRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showTravller, setShowTravller] = useState(false);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numInfants, setNumInfants] = useState(0);

  const placeholderText = `${numAdults} Adult${
    numAdults > 1 ? "s" : ""
  }, ${numChildren} Child${numChildren > 1 ? "ren" : ""}${
    numInfants > 0 ? `, ${numInfants} Infant${numInfants > 1 ? "s" : ""}` : ""
  }`;

  function handleClickOneway() {
    setOneWay(true);
    setRoundTrip(false);
  }

  function handleClickRoundtrip() {
    setRoundTrip(true);
    setOneWay(false);
  }

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
      case "infants":
        setNumInfants(numInfants + 1);
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
      case "infants":
        if (numInfants > 0) setNumInfants(numInfants - 1);
        break;
      default:
        break;
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
            options={from_cities}
            renderInput={(params) => <TextField {...params} label="From" />}
          />
        </Stack>

        <Stack spacing={2} width="100%">
          <Autocomplete
            options={to_cities}
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
                minDate={departureDate}
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
            <div className="passenger_count">
              <div className="passenger_type">Infants</div>
              <div className="passenger_controls">
                <button onClick={() => decrementCount("infants")}>-</button>
                <span>{numInfants}</span>
                <button onClick={() => incrementCount("infants")}>+</button>
              </div>
            </div>
          </div>
        )}
        <Box style={{display: "flex", alignItems: 'center', gap: 2}}>
          <RadioGroup>
            
          </RadioGroup>
        </Box>
        <button>Search</button>
      </div>
    </div>
  );
}

export default FlyScreen;
