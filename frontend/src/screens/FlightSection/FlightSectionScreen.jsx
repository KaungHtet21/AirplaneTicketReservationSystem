import React, { useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./FlightSectionScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import moment from "moment";

function FlightSectionScreen() {
  const navigate = useNavigate();

  const [showPrices, setShowPrices] = useState(false);
  const [displayOneway, setDisplayOneway] = useState(true);
  const [departSelectedFlight, setDepartSelectedFlight] = useState([]);
  const [returnSelectedFlight, setReturnSelectedFlight] = useState([]);
  const [departTicketsSelected, setDepartTicketsSelected] = useState([]);
  const [returnTicketsSelected, setReturnTicketsSelected] = useState([]);
  const [april, setApril] = useState(false);
  const [aprilReturn, setAprilReturn] = useState(false);
  const [thadingyut, setThadingyut] = useState(false);
  const [thadingyutReturn, setThadingyutReturn] = useState(false);

  let location = useLocation();
  const [oneWayOrRoundTrip, setOneWayOrRoundTrip] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [passengerType, setPassengerType] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setOneWayOrRoundTrip(searchParams.get("oneWayOrRoundTrip"));
    setFromCity(searchParams.get("from"));
    setToCity(searchParams.get("to"));
    setDepartureDate(searchParams.get("departure_date"));
    setReturnDate(searchParams.get("return_date"));
    setAdults(searchParams.get("adults"));
    setChildren(searchParams.get("children"));
    setInfants(searchParams.get("infants"));
    setPassengerType(searchParams.get("passenger_type"));
  }, [location.search]);

  const april1 = new Date("2023-04-01");
  const april30 = new Date("2023-04-30");
  const oct29 = new Date("2023-10-29");
  const nov5 = new Date("2023-11-05");
  const departureDateObj = new Date(departureDate);
  const returnDateObj = new Date(returnDate);

  useEffect(
    () => {
      if (departureDateObj >= april1 && departureDateObj <= april30) {
        setApril(true);
      } else {
        setApril(false);
      }

      if (returnDateObj >= april1 && returnDateObj <= april30) {
        setAprilReturn(true);
      } else {
        setAprilReturn(false);
      }

      if (departureDateObj >= oct29 && departureDateObj <= nov5) {
        setThadingyut(true);
      } else {
        setThadingyut(false);
      }

      if (returnDateObj >= oct29 && returnDateObj <= nov5) {
        setThadingyutReturn(true);
      } else {
        setThadingyutReturn(false);
      }
    },
    [departureDateObj],
    [returnDateObj]
  );

  // Get flight data from Laravel
  const [flightsData, setFlightsData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/flight")
      .then((response) => response.json())
      .then((data) => setFlightsData(data));
  }, []);

  // Get ticket data from Laravel
  const [ticketsData, setTicketsData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ticket")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTicketsData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Filter FlightsData
  const filteredFlightsData = flightsData.filter((flight) => {
    return flight.from == fromCity && flight.to == toCity;
  });

  // Filter ReturnsFlight
  const filteredReturnFlightsData = flightsData.filter((flight) => {
    return flight.from == toCity && flight.to == fromCity;
  });

  // Filter TicketsData
  const filteredTicketsData = ticketsData.filter((ticket) => {
    return filteredFlightsData.some((flight) => {
      return flight.fligh_id == ticket.flight_id;
    });
  });

  // Filter Return Flights TicketsData
  const filteredReturnTicketsData = ticketsData.filter((ticket) => {
    return filteredReturnFlightsData.some((flight) => {
      return flight.fligh_id == ticket.flight_id;
    });
  });

  // *********

  // Filter economy tickets that match the unique economy flight ids
  const economyTickets = filteredTicketsData.filter(
    (ticket) => ticket.class == "economy" && ticket.available == 1
  );

  let alreadyTaken = new Set();
  let economyTicketsWithUniqueFlightID = [];

  for (let i = 0; i < economyTickets.length; i++) {
    const ticket = economyTickets[i];
    if (alreadyTaken.has(ticket.flight_id)) {
      continue;
    }

    economyTicketsWithUniqueFlightID.push(ticket);
    alreadyTaken.add(ticket.flight_id);
  }

  // *********

  // *********

  // Filter business tickets that match the unique economy flight ids
  const businessTickets = filteredTicketsData.filter(
    (ticket) => ticket.class == "business" && ticket.available == 1
  );

  let alreadyTaken2 = new Set();
  let businessTicketsWithUniqueFlightID = [];

  for (let i = 0; i < businessTickets.length; i++) {
    const ticket = businessTickets[i];
    if (alreadyTaken2.has(ticket.flight_id)) {
      continue;
    }

    businessTicketsWithUniqueFlightID.push(ticket);
    alreadyTaken2.add(ticket.flight_id);
  }

  // *********

  // *********

  // Filter economy tickets that match the unique economy flight ids
  const economyTicketsForReturn = filteredReturnTicketsData.filter(
    (ticket) => ticket.class == "economy" && ticket.available == 1
  );

  let alreadyTaken3 = new Set();
  let economyTicketsWithUniqueFlightIDForReturn = [];

  for (let i = 0; i < economyTicketsForReturn.length; i++) {
    const ticket = economyTicketsForReturn[i];
    if (alreadyTaken3.has(ticket.flight_id)) {
      continue;
    }

    economyTicketsWithUniqueFlightIDForReturn.push(ticket);
    alreadyTaken3.add(ticket.flight_id);
  }

  // *********

  // *********

  // Filter business tickets that match the unique economy flight ids
  const businessTicketsForReturn = filteredReturnTicketsData.filter(
    (ticket) => ticket.class == "business" && ticket.available == 1
  );

  let alreadyTaken4 = new Set();
  let businessTicketsWithUniqueFlightIDForReturn = [];

  for (let i = 0; i < businessTicketsForReturn.length; i++) {
    const ticket = businessTicketsForReturn[i];
    if (alreadyTaken4.has(ticket.flight_id)) {
      continue;
    }

    businessTicketsWithUniqueFlightIDForReturn.push(ticket);
    alreadyTaken4.add(ticket.flight_id);
  }

  // *********

  function handleEconomyTicketOnClick(
    economyTicketsLeft,
    flight,
    eco_or_business
  ) {
    const flightID = flight.fligh_id;
    const totalPassengers = parseInt(adults) + parseInt(children);
    const ecoTicketsLeftWithSelectedID = economyTicketsLeft.filter(
      (ticket) => ticket.flight_id == flightID
    );
    if (
      ecoTicketsLeftWithSelectedID.length >= totalPassengers &&
      ecoTicketsLeftWithSelectedID.length != 0
    ) {
      let item = { flightID, eco_or_business, totalPassengers };
      console.warn(item);

      let result = fetch("http://127.0.0.1:8000/api/ticketSelect", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {})
        .catch((error) => {
          {
            console.log(error);
          }
        });

      console.log("result", result);
      setDepartTicketsSelected(ecoTicketsLeftWithSelectedID);
      setDepartSelectedFlight(flight);
      let isPromo = false;
      let isPromoReturn = false;
      if (april == true || thadingyut == true) {
        isPromo = true;
      }
      if (oneWayOrRoundTrip == "oneway") {
        navigate(
          `/passengersSection?depart_flight=${JSON.stringify(
            flight
          )}&depart_tickets=${JSON.stringify(
            ecoTicketsLeftWithSelectedID
          )}&totalPassengers=${totalPassengers}&return_tickets=${JSON.stringify(
            returnTicketsSelected
          )}&return_flight=${JSON.stringify(
            returnSelectedFlight
          )}&onewayorroundtrip=${oneWayOrRoundTrip}&isPromo=${isPromo}&isPromoReturn=${isPromoReturn}&passengerType=${passengerType}`
        );
      } else {
        setDisplayOneway(false);
      }
    } else {
      alert("There is no seats left.");
    }
  }

  function handleEconomyTicketReturnOnClick(
    economyTicketsLeft,
    flight,
    eco_or_business
  ) {
    console.log("Inside function");
    const flightID = flight.fligh_id;
    const totalPassengers = parseInt(adults) + parseInt(children);
    const ecoTicketsLeftWithSelectedID = economyTicketsLeft.filter(
      (ticket) => ticket.flight_id == flightID
    );
    if (
      ecoTicketsLeftWithSelectedID.length >= totalPassengers &&
      ecoTicketsLeftWithSelectedID.length != 0
    ) {
      console.log("Inside if");
      let item = { flightID, eco_or_business, totalPassengers };
      console.warn(item);

      let result = fetch("http://127.0.0.1:8000/api/ticketSelect", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {})
        .catch((error) => {
          {
            console.log(error);
          }
        });
      setReturnTicketsSelected(ecoTicketsLeftWithSelectedID);
      setReturnSelectedFlight(flight);
      let isPromo = false;
      let isPromoReturn = false;
      if (aprilReturn == true || thadingyutReturn == true) {
        isPromoReturn = true;
      }

      navigate(
        `/passengersSection?depart_flight=${JSON.stringify(
          departSelectedFlight
        )}&depart_tickets=${JSON.stringify(
          departTicketsSelected
        )}&totalPassengers=${totalPassengers}&return_tickets=${JSON.stringify(
          ecoTicketsLeftWithSelectedID
        )}&return_flight=${JSON.stringify(
          flight
        )}&onewayorroundtrip=${oneWayOrRoundTrip}&isPromo=${isPromo}&isPromoReturn=${isPromoReturn}&passengerType=${passengerType}`
      );
    } else {
      alert("There is no seats left.");
    }
  }

  function handleBusinessTicketOnClick(
    businessTicketsLeft,
    flight,
    eco_or_business
  ) {
    const flightID = flight.fligh_id;
    const totalPassengers = parseInt(adults) + parseInt(children);
    const businessTicketsLeftWithSelectedID = businessTicketsLeft.filter(
      (ticket) => ticket.flight_id == flightID
    );

    if (
      businessTicketsLeftWithSelectedID.length >= totalPassengers &&
      businessTicketsLeftWithSelectedID.length != 0
    ) {
      let item = { flightID, eco_or_business, totalPassengers };
      console.warn(item);

      let result = fetch("http://127.0.0.1:8000/api/ticketSelect", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {})
        .catch((error) => {
          {
            console.log(error);
          }
        });

      console.log("result", result);
      setDepartTicketsSelected(businessTicketsLeftWithSelectedID);
      setDepartSelectedFlight(flight);
      let isPromo = false;
      let isPromoReturn = false;
      if (april == true || thadingyut == true) {
        isPromo = true;
      }
      if (oneWayOrRoundTrip == "oneway") {
        navigate(
          `/passengersSection?depart_flight=${JSON.stringify(
            flight
          )}&depart_tickets=${JSON.stringify(
            businessTicketsLeftWithSelectedID
          )}&totalPassengers=${totalPassengers}&return_tickets=${JSON.stringify(
            returnTicketsSelected
          )}&return_flight=${JSON.stringify(
            returnSelectedFlight
          )}&onewayorroundtrip=${oneWayOrRoundTrip}&isPromo=${isPromo}&isPromoReturn=${isPromoReturn}&passengerType=${passengerType}`
        );
      } else {
        setDisplayOneway(false);
      }
    } else {
      alert("There is no seats left.");
    }
  }

  function handleBusinessTicketReturnOnClick(
    businessTicketsLeft,
    flight,
    eco_or_business
  ) {
    const flightID = flight.fligh_id;
    const totalPassengers = parseInt(adults) + parseInt(children);
    const businessTicketsLeftWithSelectedID = businessTicketsLeft.filter(
      (ticket) => ticket.flight_id == flightID
    );
    if (
      businessTicketsLeftWithSelectedID.length >= totalPassengers &&
      businessTicketsLeftWithSelectedID.length != 0
    ) {
      let item = { flightID, eco_or_business, totalPassengers };
      console.warn(item);

      let result = fetch("http://127.0.0.1:8000/api/ticketSelect", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {})
        .catch((error) => {
          {
            console.log(error);
          }
        });

      console.log("result", result);
      setReturnTicketsSelected(businessTicketsLeftWithSelectedID);
      setReturnSelectedFlight(flight);
      let isPromo = false;
      let isPromoReturn = false;
      if (aprilReturn == true || thadingyutReturn == true) {
        isPromoReturn = true;
      }

      navigate(
        `/passengersSection?depart_flight=${JSON.stringify(
          departSelectedFlight
        )}&depart_tickets=${JSON.stringify(
          departTicketsSelected
        )}&totalPassengers=${totalPassengers}&return_tickets=${JSON.stringify(
          businessTicketsLeftWithSelectedID
        )}&return_flight=${JSON.stringify(
          flight
        )}&onewayorroundtrip=${oneWayOrRoundTrip}&isPromo=${isPromo}&isPromoReturn=${isPromoReturn}&passengerType=${passengerType}`
      );
    } else {
      alert("There is no seats left.");
    }
  }

  function handleDepartureDateChange(date) {
    const dateObj = new Date(date);

    if (dateObj >= april1 && dateObj <= april30) {
      setApril(true);
    } else {
      setApril(false);
    }

    if (dateObj >= oct29 && dateObj <= nov5) {
      setThadingyut(true);
    } else {
      setThadingyut(false);
    }

    navigate(
      `/flightSection?oneWayOrRoundTrip=${oneWayOrRoundTrip}&from=${fromCity}&to=${toCity}&departure_date=${moment(
        date
      ).format(
        "YYYY-MM-DD"
      )}&return_date=${returnDate}&adults=${adults}&children=${children}&infants=${infants}&passenger_type=${passengerType}`
    );
  }

  function handleReturnDateChange(date) {
    const dateObj = new Date(date);

    if (dateObj >= april1 && dateObj <= april30) {
      setAprilReturn(true);
    } else {
      setAprilReturn(false);
    }

    if (dateObj >= oct29 && dateObj <= nov5) {
      setThadingyutReturn(true);
    } else {
      setThadingyutReturn(false);
    }
    navigate(
      `/flightSection?oneWayOrRoundTrip=${oneWayOrRoundTrip}&from=${fromCity}&to=${toCity}&departure_date=${departureDate}&return_date=${moment(
        date
      ).format(
        "YYYY-MM-DD"
      )}&adults=${adults}&children=${children}&infants=${infants}&passenger_type=${passengerType}`
    );
  }

  const handleShowPrices = (event) => {
    setShowPrices(event.target.checked);
  };

  return (
    <div>
      <Navbar />
      <div className="flight_section_container">
        <FormControlLabel
          onChange={handleShowPrices}
          style={{ marginLeft: "20px" }}
          control={<Checkbox />}
          label="Show Prices"
        />

        {/* ******************************* */}

        {/* Departing flghts */}
        {displayOneway ? (
          <div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}> 
                <DatePicker
                  label="Departure"
                  value={departureDate}
                  onChange={(date) => handleDepartureDateChange(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {april ? (
                <span style={{ fontSize: "18px", fontStyle: "italic" }}>
                  You hit 5% April promotion! The duration is between April 1 to
                  April 30.
                </span>
              ) : null}
              {thadingyut ? (
                <span>
                  You hit 5% Thadingyut promotion! The duration is between
                  October 29 to November 5.
                </span>
              ) : null}
            </div>
            <div className="header" style={{ marginBottom: "10px" }}>
              <span
                style={{
                  color: "#065a9e",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "16px",
                }}
              >
                Departing Flight
              </span>
              <span style={{ fontSize: "18px" }}>
                {fromCity}-{toCity}
              </span>
            </div>
            {filteredFlightsData.map((flight) => {
              const economyTicketsLeft = economyTickets.filter(
                (ticket) => ticket.flight_id == flight.fligh_id
              );
              const businessTicketsLeft = businessTickets.filter(
                (ticket) => ticket.flight_id == flight.fligh_id
              );
              const depart_time = flight.depart_time;
              const arrive_time = flight.arrive_time;

              const departTimeParts = depart_time.split(":");
              const departDateTime = new Date(
                0,
                0,
                0,
                departTimeParts[0],
                departTimeParts[1],
                departTimeParts[2]
              );
              const arriveTimeParts = arrive_time.split(":"); // split the time string into its component parts
              const arriveDateTime = new Date(
                0,
                0,
                0,
                arriveTimeParts[0],
                arriveTimeParts[1],
                arriveTimeParts[2]
              );

              const duratinInMs = arriveDateTime - departDateTime;
              const durationInHrs = Math.floor(duratinInMs / (1000 * 60 * 60));

              if (flight.depart_date == departureDate) {
                return (
                  <div className="available_flights_container">
                    <div className="left_container">
                      <div className="left_from_container">
                        <span style={{ marginRight: "20px" }}>
                          &bull; {flight.depart_time}
                        </span>
                        <span>
                          {flight.from}{" "}
                          <span style={{ color: "gray" }}>
                            ({flight.from} International Airport)
                          </span>
                        </span>
                      </div>
                      <div className="left_duration_container">
                        <span
                          style={{
                            padding: "5px",
                            backgroundColor: "gray",
                            width: "35px",
                            borderRadius: "4px",
                            color: "white",
                            marginLeft: "30px",
                          }}
                        >
                          {durationInHrs}hr
                        </span>
                      </div>
                      <div className="left_to_container">
                        <span style={{ marginRight: "20px" }}>
                          &bull; {flight.arrive_time}
                        </span>
                        <span>
                          {flight.to}{" "}
                          <span style={{ color: "gray" }}>
                            ({flight.to} International Airport)
                          </span>
                        </span>
                      </div>
                    </div>
                    {showPrices ? (
                      <div className="right_container">
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
                            borderRadius: "13px",
                            marginRight: "6px",
                          }}
                          className="available_ticket"
                          onClick={() =>
                            handleEconomyTicketOnClick(
                              economyTickets,
                              flight,
                              "economy"
                            )
                          }
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "#065a9e",
                              color: "white",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              borderRadius: "13px",
                            }}
                          >
                            <span>Economy</span>
                            {april ? (
                              <div>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: "10px",
                                  }}
                                >
                                  $
                                  {economyTicketsWithUniqueFlightID
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return ticket.price * 2;
                                      } else {
                                        return ticket.price;
                                      }
                                    })}
                                </span>
                                <span>
                                  $
                                  {economyTicketsWithUniqueFlightID
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return (
                                          (
                                            parseInt(ticket.price) -
                                            (5 / 100) * parseInt(ticket.price)
                                          ).toFixed(2) * 2
                                        );
                                      } else {
                                        return (
                                          parseInt(ticket.price) -
                                          (5 / 100) * parseInt(ticket.price)
                                        ).toFixed(2);
                                      }
                                    })}
                                </span>
                              </div>
                            ) : (
                              <span>
                                $
                                {economyTicketsWithUniqueFlightID
                                  .filter(
                                    (ticket) =>
                                      ticket.flight_id == flight.fligh_id
                                  )
                                  .map((ticket) => {
                                    if (passengerType == "Foreigner") {
                                      return ticket.price * 2;
                                    } else {
                                      return ticket.price;
                                    }
                                  })}
                              </span>
                            )}
                            <span>{economyTicketsLeft.length} seats left</span>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
                            borderRadius: "13px",
                          }}
                          className="available_ticket"
                          onClick={() =>
                            handleBusinessTicketOnClick(
                              businessTickets,
                              flight,
                              "business"
                            )
                          }
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "orange",
                              color: "white",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              borderRadius: "13px",
                            }}
                          >
                            <span>Business</span>
                            {april ? (
                              <div>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: "10px",
                                  }}
                                >
                                  $
                                  {businessTicketsWithUniqueFlightID
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return ticket.price * 2;
                                      } else {
                                        return ticket.price;
                                      }
                                    })}
                                </span>
                                <span>
                                  $
                                  {businessTicketsWithUniqueFlightID
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return (
                                          (
                                            parseInt(ticket.price) -
                                            (5 / 100) * parseInt(ticket.price)
                                          ).toFixed(2) * 2
                                        );
                                      } else {
                                        return (
                                          parseInt(ticket.price) -
                                          (5 / 100) * parseInt(ticket.price)
                                        ).toFixed(2);
                                      }
                                    })}
                                </span>
                              </div>
                            ) : (
                              <span>
                                $
                                {businessTicketsWithUniqueFlightID
                                  .filter(
                                    (ticket) =>
                                      ticket.flight_id == flight.fligh_id
                                  )
                                  .map((ticket) => {
                                    if (passengerType == "Foreigner") {
                                      return ticket.price * 2;
                                    } else {
                                      return ticket.price;
                                    }
                                  })}
                              </span>
                            )}
                            <span>{businessTicketsLeft.length} seats left</span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        ) : null}
        {/* ******************************* */}

        {/* ******************************* */}

        {/* Return Flights */}
        {oneWayOrRoundTrip == "roundtrip" && (
          <div className="return_flights_container">
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Return"
                  value={returnDate}
                  onChange={(date) => handleReturnDateChange(date)}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={departureDate+1}
                />
              </LocalizationProvider>
              {aprilReturn ? (
                <span style={{ fontSize: "18px", fontStyle: "italic" }}>
                  You hit 5% April promotion! The duration is between April 1 to
                  April 30.
                </span>
              ) : null}
              {thadingyutReturn ? (
                <span>
                  You hit 5% Thadingyut promotion! The duration is between
                  October 29 to November 5.
                </span>
              ) : null}
            </div>
            <div className="header" style={{ marginBottom: "10px" }}>
              <span
                style={{
                  color: "#065a9e",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "16px",
                }}
              >
                Returning Flight
              </span>
              <span style={{ fontSize: "18px" }}>
                {toCity}-{fromCity}
              </span>
            </div>
            {filteredReturnFlightsData.map((flight) => {
              const economyTicketsLeft = economyTicketsForReturn.filter(
                (ticket) => ticket.flight_id == flight.fligh_id
              );
              const businessTicketsLeft = businessTicketsForReturn.filter(
                (ticket) => ticket.flight_id == flight.fligh_id
              );
              const depart_time = flight.depart_time;
              const arrive_time = flight.arrive_time;

              const departTimeParts = depart_time.split(":");
              const departDateTime = new Date(
                0,
                0,
                0,
                departTimeParts[0],
                departTimeParts[1],
                departTimeParts[2]
              );
              const arriveTimeParts = arrive_time.split(":"); // split the time string into its component parts
              const arriveDateTime = new Date(
                0,
                0,
                0,
                arriveTimeParts[0],
                arriveTimeParts[1],
                arriveTimeParts[2]
              );

              const duratinInMs = arriveDateTime - departDateTime;
              const durationInHrs = Math.floor(duratinInMs / (1000 * 60 * 60));

              if (flight.depart_date == returnDate) {
                return (
                  <div className="available_flights_container">
                    <div className="left_container">
                      <div className="left_from_container">
                        <span style={{ marginRight: "20px" }}>
                          &bull; {flight.depart_time}
                        </span>
                        <span>
                          {flight.from}{" "}
                          <span style={{ color: "gray" }}>
                            ({flight.from} International Airport)
                          </span>
                        </span>
                      </div>
                      <div className="left_duration_container">
                        <span
                          style={{
                            padding: "5px",
                            backgroundColor: "gray",
                            width: "35px",
                            borderRadius: "4px",
                            color: "white",
                            marginLeft: "30px",
                          }}
                        >
                          {durationInHrs}hr
                        </span>
                      </div>
                      <div className="left_to_container">
                        <span style={{ marginRight: "20px" }}>
                          &bull; {flight.arrive_time}
                        </span>
                        <span>
                          {flight.to}{" "}
                          <span style={{ color: "gray" }}>
                            ({flight.to} International Airport)
                          </span>
                        </span>
                      </div>
                    </div>
                    {showPrices ? (
                      <div className="right_container">
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
                            borderRadius: "13px",
                            marginRight: "6px",
                          }}
                          className="available_ticket"
                          onClick={() => {
                            handleEconomyTicketReturnOnClick(
                              economyTicketsLeft,
                              flight,
                              "economy"
                            );
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "#065a9e",
                              color: "white",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              borderRadius: "13px",
                            }}
                          >
                            <span>Economy</span>
                            {aprilReturn ? (
                              <div>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: "10px",
                                  }}
                                >
                                  $
                                  {economyTicketsWithUniqueFlightIDForReturn
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return ticket.price * 2;
                                      } else {
                                        return ticket.price;
                                      }
                                    })}
                                </span>
                                <span>
                                  $
                                  {economyTicketsWithUniqueFlightIDForReturn
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return (
                                          (
                                            parseInt(ticket.price) -
                                            (5 / 100) * parseInt(ticket.price)
                                          ).toFixed(2) * 2
                                        );
                                      } else {
                                        return (
                                          parseInt(ticket.price) -
                                          (5 / 100) * parseInt(ticket.price)
                                        ).toFixed(2);
                                      }
                                    })}
                                </span>
                              </div>
                            ) : (
                              <span>
                                $
                                {economyTicketsWithUniqueFlightIDForReturn
                                  .filter(
                                    (ticket) =>
                                      ticket.flight_id == flight.fligh_id
                                  )
                                  .map((ticket) => {
                                    if (passengerType == "Foreigner") {
                                      return ticket.price * 2;
                                    } else {
                                      return ticket.price;
                                    }
                                  })}
                              </span>
                            )}
                            <span>{economyTicketsLeft.length} seats left</span>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
                            borderRadius: "13px",
                          }}
                          className="available_ticket"
                          onClick={() => {
                            handleBusinessTicketReturnOnClick(
                              businessTicketsLeft,
                              flight,
                              "business"
                            );
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "orange",
                              color: "white",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              borderRadius: "13px",
                            }}
                          >
                            <span>Business</span>
                            {aprilReturn ? (
                              <div>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: "10px",
                                  }}
                                >
                                  $
                                  {businessTicketsWithUniqueFlightIDForReturn
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return ticket.price * 2;
                                      } else {
                                        return ticket.price;
                                      }
                                    })}
                                </span>
                                <span>
                                  $
                                  {businessTicketsWithUniqueFlightIDForReturn
                                    .filter(
                                      (ticket) =>
                                        ticket.flight_id == flight.fligh_id
                                    )
                                    .map((ticket) => {
                                      if (passengerType == "Foreigner") {
                                        return (
                                          (
                                            parseInt(ticket.price) -
                                            (5 / 100) * parseInt(ticket.price)
                                          ).toFixed(2) * 2
                                        );
                                      } else {
                                        return (
                                          parseInt(ticket.price) -
                                          (5 / 100) * parseInt(ticket.price)
                                        ).toFixed(2);
                                      }
                                    })}
                                </span>
                              </div>
                            ) : (
                              <span>
                                $
                                {businessTicketsWithUniqueFlightIDForReturn
                                  .filter(
                                    (ticket) =>
                                      ticket.flight_id == flight.fligh_id
                                  )
                                  .map((ticket) => {
                                    if (passengerType == "Foreigner") {
                                      return ticket.price * 2;
                                    } else {
                                      return ticket.price;
                                    }
                                  })}
                              </span>
                            )}
                            <span>{businessTicketsLeft.length} seats left</span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default FlightSectionScreen;
