import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./PassengersSectionScreen.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function PassengersSectionScreen() {
  let location = useLocation();
  const navigate = useNavigate();
  const nrc_pattern = /^\d{2}\/[A-Z]{6}\(N\)\d{6}$/;
  const passport_pattern = /^\d{8,}$/;

  const [contactGender, setContactGender] = useState("Gender")
  const [departSelectedFlight, setDepartSelectedFlight] = useState([]);
  const [returnSelectedFlight, setReturnSelectedFlight] = useState([]);
  const [departSelectedTickets, setDepartSelectedTickets] = useState([]);
  const [returnSelectedTickets, setReturnSelectedTickets] = useState([]);
  const [totalP, setTotalP] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [totalPrice, setTotalPrice] = useState("0");
  const [onewayOrRoundtrip, setOnewayOrRoundtrip] = useState("");
  const [isPromo, setIsPromo] = useState(false);
  const [isPromoReturn, setIsPromoReturn] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberTier, setMemberTier] = useState("");
  const [passengerType, setPassengerType] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setDepartSelectedFlight(JSON.parse(searchParams.get("depart_flight")));
    setReturnSelectedFlight(JSON.parse(searchParams.get("return_flight")));
    setDepartSelectedTickets(JSON.parse(searchParams.get("depart_tickets")));
    setReturnSelectedTickets(JSON.parse(searchParams.get("return_tickets")));
    setTotalP(searchParams.get("totalPassengers"));
    setPassengers(searchParams.get("totalPassengers"));
    setOnewayOrRoundtrip(searchParams.get("onewayorroundtrip"));
    setIsPromo(searchParams.get("isPromo"));
    setIsPromoReturn(searchParams.get("isPromoReturn"));
    setPassengerType(searchParams.get("passengerType"));
  }, []);
  const [showPassengerForm, setShowPassengerForm] = useState(false);

  useEffect(() => {
    if (onewayOrRoundtrip == "oneway") {
      let price = "0";
      for (let i = 0; i < passengers; i++) {
        if (isPromo == "true") {
          price = (
            parseInt(price) +
            parseInt(departSelectedTickets[i].price) -
            (5 / 100) * parseInt(departSelectedTickets[i].price)
          ).toFixed(2);
          console.log("Price", price);
          console.log(
            "Selected Ticket of ",
            i,
            " is ",
            departSelectedTickets[i].price
          );
          console.log("One Way promo true ", price);
        }
        if (isPromo == "false") {
          price = (
            parseInt(price) + parseInt(departSelectedTickets[i].price)
          ).toFixed(2);
          console.log("One Way promo false ", price);
        }
      }
      if (passengerType == "Foreigner") {
        price = parseInt(price) * 2;
      }
      setTotalPrice(price);
    } else {
      let depart_price = "0";
      for (let i = 0; i < passengers; i++) {
        if (isPromo == "true") {
          depart_price = (
            parseInt(depart_price) +
            parseInt(departSelectedTickets[i].price) -
            (5 / 100) * parseInt(departSelectedTickets[i].price)
          ).toFixed(2);
          console.log("Depart price = ", depart_price);
        } else {
          depart_price = (
            parseInt(depart_price) + parseInt(departSelectedTickets[i].price)
          ).toFixed(2);
          console.log("Depart price = ", depart_price);
        }
      }
      let return_price = "0";
      for (let i = 0; i < passengers; i++) {
        if (isPromoReturn == "true") {
          return_price = (
            parseInt(return_price) +
            parseInt(returnSelectedTickets[i].price) -
            (5 / 100) * parseInt(returnSelectedTickets[i].price)
          ).toFixed(2);
          console.log("Return price = ", return_price);
        } else {
          return_price = (
            parseInt(return_price) + parseInt(returnSelectedTickets[i].price)
          ).toFixed(2);
          console.log("Return price = ", return_price);
        }
      }
      let price = "0";
      price = (
        parseInt(depart_price) +
        parseInt(return_price) -
        (2 / 100) * (parseInt(depart_price) + parseInt(return_price))
      ).toFixed(2);
      if (passengerType == "Foreigner") {
        price = parseInt(price) * 2;
      }
      setTotalPrice(price);
    }
  }, [totalP]);

  useEffect(() => {
    if (onewayOrRoundtrip == "oneway") {
      let price = parseInt(departSelectedTickets[0].price).toFixed(2);

      if (memberTier == "silver") {
        price = (2 / 100) * parseInt(price);
        console.log("Silver ", price);
      } else if (memberTier == "gold") {
        price = (4 / 100) * parseInt(price);
        console.log("Gold ", price);
      } else if (memberTier == "platinum") {
        price = (6 / 100) * parseInt(price);
        console.log("Platinum ", price);
      }
      setTotalPrice(parseInt(totalPrice) - parseInt(price));
      console.log("Length", departSelectedTickets.length);
    }
    if (onewayOrRoundtrip == "roundtrip") {
      console.log("Length", departSelectedTickets.length);
      console.log("Length", returnSelectedTickets.length);
      let depart_price = parseInt(departSelectedTickets[0].price).toFixed(2);
      let return_price = parseInt(returnSelectedTickets[0].price).toFixed(2);
      let price = "0"
      if (memberTier == "silver") {
        depart_price = (2 / 100) * parseInt(depart_price);
        return_price = (2 / 100) * parseInt(return_price);
        price = parseInt(depart_price) + parseInt(return_price)
        console.log("Silver ", price)
      } else if (memberTier == "gold") {
        depart_price = (4 / 100) * parseInt(depart_price);
        return_price = (4 / 100) * parseInt(return_price);
        price = parseInt(depart_price) + parseInt(return_price)
        console.log("Gold ", price)
      } else if (memberTier == "platinum") {
        depart_price = (6 / 100) * parseInt(depart_price);
        return_price = (6 / 100) * parseInt(return_price);
        price = parseInt(depart_price) + parseInt(return_price)
        console.log("Platinum ", price)
      }
      if (totalP == 0) {
        setTotalPrice(
          (parseInt(totalPrice) - parseInt(price)) - (2 / 100) * (parseInt(totalPrice) - parseInt(price))
        );  
      }else {
        setTotalPrice(
          parseInt(totalPrice) - parseInt(price)
        )
      }
      
    }
  }, [memberTier]);

  // Get membership
  const [membership, setMembership] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getMembership")
      .then((response) => response.json())
      .then((data) => setMembership(data));
  }, []);

  // Required Contact Details Data
  const [contactTitle, setContactTitle] = useState("Mr");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");

  // Required Passenger Data
  const [pTitle, setPTitle] = useState("Mr");
  const [pFirstName, setPFirstName] = useState("");
  const [pLastName, setPLastName] = useState("");
  const [gender, setGender] = useState("Gender");
  const [dob, setDob] = useState("");
  const [documentType, setDocumentType] = useState("MID");
  const [nationalIDNumber, setNationalIDNumber] = useState("");
  const [memberCardNumber, setMemberCardNumber] = useState("");
  const [contactId, setContactId] = useState(0);
  const [randomNumber, setrandomNumber] = useState("");

  async function handleOnClickContactBtn() {
    let item = { email, contactFirstName, contactLastName };
    console.warn(item);

    if (
      contactFirstName.length == 0 ||
      contactLastName.length == 0 ||
      phone.length == 0 ||
      email.length == 0 ||
      address1.length == 0 ||
      city.length == 0 ||
      state.length == 0 ||
      code.length == 0
    ) {
      setError(true);
      alert("We need all information.");
    } else if (randomNumber != code) {
      console.log(randomNumber);
      console.log(code);
      alert("Code mismatch");
    } else {
      let result = await fetch("http://127.0.0.1:8000/api/getContact", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      console.warn("contact info", result);
      const lastObj = result[result.length - 1];
      const contactId = lastObj.contact_id;
      setContactId(contactId);
      setShowPassengerForm(true);
      setError(false);
    }
  }

  async function handleAdultOnClick() {
    if (passengerType === "Myanmar") {
      if (
        pFirstName.length == 0 ||
        pLastName.length == 0 ||
        nationalIDNumber.length == 0 ||
        dob.length == 0
      ) {
        setError(true);
        alert("We need all information.");
      } else if (nrc_pattern.test(nationalIDNumber) == false) {
        setError(true);
        alert("Invalid NRC format");
      } else {
        if (memberCardNumber[0].length > 0) {
          const filtered_members = membership.filter(
            (m) =>
              m.card_number === memberCardNumber[0] &&
              m.passenger_nrc === nationalIDNumber[0]
          );
          console.log("Filtered_members ", filtered_members);
          if (filtered_members.length != 0) {
            const memberType = filtered_members.map((m) => m.member_type);
            setIsMember(true);
            if (onewayOrRoundtrip == "oneway") {
              const ticket_id = departSelectedTickets[0].ticket_id;
              const formated_dob = moment(dob[0]).format("YYYY-MM-DD");
              const way = "depart";
              let item = {
                pTitle: pTitle[0],
                pFirstName: pFirstName[0],
                pLastName: pLastName[0],
                gender: gender[0],
                formated_dob,
                documentType,
                nationalIDNumber: nationalIDNumber[0],
                contactId,
                ticket_id,
                way,
              };
              console.warn(item);
              let result = await fetch(
                "http://127.0.0.1:8000/api/getPassengerInfo",
                {
                  method: "POST",
                  body: JSON.stringify(item),
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              result = await result.json();
              console.warn("Depart ticket passenger info", result);
              departSelectedTickets.shift();
              setTotalP(totalP - 1);

              setMemberTier(memberType);
            } else {
              let ticket_id = departSelectedTickets[0].ticket_id;
              let formated_dob = moment(dob[0]).format("YYYY-MM-DD");
              let way = "depart";
              let item = {
                pTitle: pTitle[0],
                pFirstName: pFirstName[0],
                pLastName: pLastName[0],
                gender: gender[0],
                formated_dob,
                documentType,
                nationalIDNumber: nationalIDNumber[0],
                contactId,
                ticket_id,
                way,
              };
              console.warn("Depart item", item);
              let result = await fetch(
                "http://127.0.0.1:8000/api/getPassengerInfo",
                {
                  method: "POST",
                  body: JSON.stringify(item),
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              result = await result.json();
              console.warn("Depart ticket passenger info", result);
              departSelectedTickets.shift();
              console.log("Shifted depart tickets", departSelectedTickets);
              ticket_id = returnSelectedTickets[0].ticket_id;
              formated_dob = moment(dob[0]).format("YYYY-MM-DD");
              way = "return";
              let return_item = {
                pTitle: pTitle[0],
                pFirstName: pFirstName[0],
                pLastName: pLastName[0],
                gender: gender[0],
                formated_dob,
                documentType,
                nationalIDNumber: nationalIDNumber[0],
                contactId,
                ticket_id,
                way,
              };
              console.warn("Return item", return_item);
              let return_result = await fetch(
                "http://127.0.0.1:8000/api/getPassengerInfo",
                {
                  method: "POST",
                  body: JSON.stringify(return_item),
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              return_result = await return_result.json();
              console.warn("Return ticket passenger info", return_result);
              returnSelectedTickets.shift();
              setTotalP(totalP - 1);
              console.log("Shifted return tickets", departSelectedTickets);
              setMemberTier(memberType);
            }
          } else {
            setIsMember(false);
            alert("Invalid member card");
          }
        } else {
          if (onewayOrRoundtrip == "oneway") {
            const ticket_id = departSelectedTickets[0].ticket_id;
            const formated_dob = moment(dob[0]).format("YYYY-MM-DD");
            const way = "depart";
            console.log(pFirstName);
            let item = {
              pTitle: pTitle[0],
              pFirstName: pFirstName[0],
              pLastName: pLastName[0],
              gender: gender[0],
              formated_dob,
              documentType,
              nationalIDNumber: nationalIDNumber[0],
              contactId,
              ticket_id,
              way,
            };
            console.warn(item);
            let result = await fetch(
              "http://127.0.0.1:8000/api/getPassengerInfo",
              {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            result = await result.json();
            console.warn("Depart ticket passenger info", result);
            departSelectedTickets.shift();
            setTotalP(totalP - 1);
            console.log("Shifted depart tickets", departSelectedTickets);
            setMemberTier("")
          } else {
            let ticket_id = departSelectedTickets[0].ticket_id;
            let formated_dob = moment(dob[0]).format("YYYY-MM-DD");
            let way = "depart";
            let item = {
              pTitle: pTitle[0],
              pFirstName: pFirstName[0],
              pLastName: pLastName[0],
              gender: gender[0],
              formated_dob,
              documentType,
              nationalIDNumber: nationalIDNumber[0],
              contactId,
              ticket_id,
              way,
            };
            console.warn("Depart item", item);
            let result = await fetch(
              "http://127.0.0.1:8000/api/getPassengerInfo",
              {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            result = await result.json();
            console.warn("Depart ticket passenger info", result);
            departSelectedTickets.shift();
            console.log("Shifted depart tickets", departSelectedTickets);
            ticket_id = returnSelectedTickets[0].ticket_id;
            formated_dob = moment(dob[0]).format("YYYY-MM-DD");
            way = "return";
            let return_item = {
              pTitle: pTitle[0],
              pFirstName: pFirstName[0],
              pLastName: pLastName[0],
              gender: gender[0],
              formated_dob,
              documentType,
              nationalIDNumber: nationalIDNumber[0],
              contactId,
              ticket_id,
              way,
            };
            console.warn("Return item", return_item);
            let return_result = await fetch(
              "http://127.0.0.1:8000/api/getPassengerInfo",
              {
                method: "POST",
                body: JSON.stringify(return_item),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            return_result = await return_result.json();
            console.warn("Return ticket passenger info", return_result);
            returnSelectedTickets.shift();
            setTotalP(totalP - 1);
            console.log("Shifted return tickets", departSelectedTickets);
            setMemberTier("")
          }
        }
      }
    } else {
      if (
        pFirstName.length == 0 ||
        pLastName.length == 0 ||
        nationalIDNumber.length == 0 ||
        dob.length == 0
      ) {
        setError(true);
        alert("We need all information.");
      } else if (passport_pattern.test(nationalIDNumber) == false) {
        setError(true);
        alert("Invalid Passport format");
      } else {
        if (memberCardNumber[0].length > 0) {
          const filtered_members = membership.filter(
            (m) =>
              m.card_number === memberCardNumber[0] &&
              m.passenger_nrc === nationalIDNumber[0]
          );
          console.log("Filtered_members ", filtered_members);
          if (filtered_members.length != 0) {
            const memberType = filtered_members.map((m) => m.member_type);
            setIsMember(true);
            if (onewayOrRoundtrip == "oneway") {
              const ticket_id = departSelectedTickets[0].ticket_id;
              const formated_dob = moment(dob[0]).format("YYYY-MM-DD");
              const way = "depart";
              let item = {
                pTitle: pTitle[0],
                pFirstName: pFirstName[0],
                pLastName: pLastName[0],
                gender: gender[0],
                formated_dob,
                documentType,
                nationalIDNumber: nationalIDNumber[0],
                contactId,
                ticket_id,
                way,
              };
              console.warn(item);
              let result = await fetch(
                "http://127.0.0.1:8000/api/getPassengerInfo",
                {
                  method: "POST",
                  body: JSON.stringify(item),
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              result = await result.json();
              console.warn("Depart ticket passenger info", result);
              departSelectedTickets.shift();
              setTotalP(totalP - 1);
              setMemberTier(memberType)
            } else {
              let ticket_id = departSelectedTickets[0].ticket_id;
              let formated_dob = moment(dob[0]).format("YYYY-MM-DD");
              let way = "depart";
              let item = {
                pTitle: pTitle[0],
                pFirstName: pFirstName[0],
                pLastName: pLastName[0],
                gender: gender[0],
                formated_dob,
                documentType,
                nationalIDNumber: nationalIDNumber[0],
                contactId,
                ticket_id,
                way,
              };
              console.warn("Depart item", item);
              let result = await fetch(
                "http://127.0.0.1:8000/api/getPassengerInfo",
                {
                  method: "POST",
                  body: JSON.stringify(item),
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              result = await result.json();
              console.warn("Depart ticket passenger info", result);
              departSelectedTickets.shift();
              console.log("Shifted depart tickets", departSelectedTickets);
              ticket_id = returnSelectedTickets[0].ticket_id;
              formated_dob = moment(dob[0]).format("YYYY-MM-DD");
              way = "return";
              let return_item = {
                pTitle: pTitle[0],
                pFirstName: pFirstName[0],
                pLastName: pLastName[0],
                gender: gender[0],
                formated_dob,
                documentType,
                nationalIDNumber: nationalIDNumber[0],
                contactId,
                ticket_id,
                way,
              };
              console.warn("Return item", return_item);
              let return_result = await fetch(
                "http://127.0.0.1:8000/api/getPassengerInfo",
                {
                  method: "POST",
                  body: JSON.stringify(return_item),
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              return_result = await return_result.json();
              console.warn("Return ticket passenger info", return_result);
              returnSelectedTickets.shift();
              setTotalP(totalP - 1);
              console.log("Shifted return tickets", departSelectedTickets);
              setMemberTier(memberType)
            }
          } else {
            setIsMember(false);
            console.log("Is member ", isMember);
            alert("Invalid member card");
          }
        } else {
          if (onewayOrRoundtrip == "oneway") {
            const ticket_id = departSelectedTickets[0].ticket_id;
            const formated_dob = moment(dob[0]).format("YYYY-MM-DD");
            const way = "depart";
            console.log(pFirstName);
            let item = {
              pTitle: pTitle[0],
              pFirstName: pFirstName[0],
              pLastName: pLastName[0],
              gender: gender[0],
              formated_dob,
              documentType,
              nationalIDNumber: nationalIDNumber[0],
              contactId,
              ticket_id,
              way,
            };
            console.warn(item);
            let result = await fetch(
              "http://127.0.0.1:8000/api/getPassengerInfo",
              {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            result = await result.json();
            console.warn("Depart ticket passenger info", result);
            departSelectedTickets.shift();
            setTotalP(totalP - 1);
            console.log("Shifted depart tickets", departSelectedTickets);
            setMemberTier("")
          } else {
            let ticket_id = departSelectedTickets[0].ticket_id;
            let formated_dob = moment(dob[0]).format("YYYY-MM-DD");
            let way = "depart";
            let item = {
              pTitle: pTitle[0],
              pFirstName: pFirstName[0],
              pLastName: pLastName[0],
              gender: gender[0],
              formated_dob,
              documentType,
              nationalIDNumber: nationalIDNumber[0],
              contactId,
              ticket_id,
              way,
            };
            console.warn("Depart item", item);
            let result = await fetch(
              "http://127.0.0.1:8000/api/getPassengerInfo",
              {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            result = await result.json();
            console.warn("Depart ticket passenger info", result);
            departSelectedTickets.shift();
            console.log("Shifted depart tickets", departSelectedTickets);
            ticket_id = returnSelectedTickets[0].ticket_id;
            formated_dob = moment(dob[0]).format("YYYY-MM-DD");
            way = "return";
            let return_item = {
              pTitle: pTitle[0],
              pFirstName: pFirstName[0],
              pLastName: pLastName[0],
              gender: gender[0],
              formated_dob,
              documentType,
              nationalIDNumber: nationalIDNumber[0],
              contactId,
              ticket_id,
              way,
            };
            console.warn("Return item", return_item);
            let return_result = await fetch(
              "http://127.0.0.1:8000/api/getPassengerInfo",
              {
                method: "POST",
                body: JSON.stringify(return_item),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            return_result = await return_result.json();
            console.warn("Return ticket passenger info", return_result);
            returnSelectedTickets.shift();
            setTotalP(totalP - 1);
            console.log("Shifted return tickets", departSelectedTickets);
            setMemberTier("")
          }
        }
      }
    }
  }

  useEffect(() => {
    setPTitle(Array(totalP).fill("Mr"));
    setPFirstName(Array(totalP).fill(""));
    setPLastName(Array(totalP).fill(""));
    setGender(Array(totalP).fill("Male"));
    setDob(Array(totalP).fill(""));
    setNationalIDNumber(Array(totalP).fill(""));
    setMemberCardNumber(Array(totalP).fill(""));
  }, [totalP]);

  function handleBuyTicket() {
    if (onewayOrRoundtrip == "oneway") {
      const ticket_number = passengers;
      navigate(
        `/paymentSection?depart_flight=${JSON.stringify(
          departSelectedFlight
        )}&customer_id=${contactId}&ticket_number=${ticket_number}&total_amount=${totalPrice}&isMember=${isMember}&memberTier=${JSON.stringify(
          memberTier
        )}`
      );
    } else {
      const ticket_number = parseInt(passengers) * 2;
      navigate(
        `/paymentSection?depart_flight=${JSON.stringify(
          departSelectedFlight
        )}&customer_id=${contactId}&ticket_number=${ticket_number}&total_amount=${totalPrice}&isMember=${isMember}&memberTier=${JSON.stringify(
          memberTier
        )}`
      );
    }
  }

  function handleSendCode() {
    let test = Math.floor(Math.random() * 1000000);
    setrandomNumber(test);
    let item = { test, email };
    console.warn(item);

    fetch("http://127.0.0.1:8000/api/getCode", {
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
  }

  return (
    <div>
      {console.log("Total Price ", totalPrice)}
      {console.log("Is member ", isMember)}
      <Navbar />
      <div className="passengers_section_container">
        <div className="passengers_section_header">
          <div className="passengers_section_left_header">
            <span style={{ marginBottom: "5px" }}>Price Detail</span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgb(191, 188, 188)" }}>Depart Date</span>
              <span>{departSelectedFlight.depart_date}</span>
            </div>
            <div>
              <span style={{ color: "rgb(191, 188, 188)" }}>
                {departSelectedFlight.from} to {departSelectedFlight.to}
              </span>
            </div>
            {onewayOrRoundtrip == "roundtrip" && (
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "rgb(191, 188, 188)" }}>
                    Return Date
                  </span>
                  <span>{returnSelectedFlight.depart_date}</span>
                </div>
                <div>
                  <span style={{ color: "rgb(191, 188, 188)" }}>
                    {returnSelectedFlight.from} to {returnSelectedFlight.to}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="passengers_section_right_header">
            <span style={{ color: "rgb(191, 188, 188)" }}>TOTAL PRICE</span>
            <span>$ {totalPrice}</span>
          </div>
          <button disabled={totalP != 0} onClick={handleBuyTicket}>
            Buy Ticket
          </button>
        </div>
        <div className="passengers_section_form_container">
          <div className="passengers_section_form">
            <div className="passengers_section_form_right">
              {showPassengerForm ? (
                Array.from({ length: totalP }, (_, i) => (
                  <div className="passengers_section_form_passenger">
                    <div className="passenger_form">
                      <div>
                        <div>
                          <select
                            value={pTitle[i]}
                            onChange={(e) => {
                              const newPTitle = [...pTitle];
                              newPTitle[i] = e.target.value;
                              setPTitle(newPTitle);
                            }}
                          >
                            <option value="Mr">Mr</option>
                            <option value="Ms">Ms</option>
                          </select>
                        </div>
                        <div>
                          <input
                            placeholder="First Name"
                            type="text"
                            value={pFirstName[i]}
                            onChange={(e) => {
                              const newPFirstName = [...pFirstName];
                              newPFirstName[i] = e.target.value;
                              console.log("First Name ", newPFirstName);
                              setPFirstName(newPFirstName);
                            }}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={pLastName[i]}
                            onChange={(e) => {
                              const newPLastName = [...pLastName];
                              newPLastName[i] = e.target.value;
                              setPLastName(newPLastName);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <select
                            value={gender[i]}
                            onChange={(e) => {
                              const newGender = [...gender];
                              newGender[i] = e.target.value;
                              setGender(newGender);
                            }}
                          >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                              label="Date of birth"
                              className="dob"
                              value={dob[i] || null}
                              onChange={(date) => {
                                const newDate = [...dob];
                                newDate[i] = date;
                                setDob(newDate);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              maxDate={new Date("2019-12-31T23:59:59")}
                            />
                          </LocalizationProvider>
                        </div>
                        <div>
                          {passengerType === "Foreigner" ? (
                            <div
                              style={{
                                width: "180px",
                                paddingLeft: "12px",
                                paddingRight: "12px",
                                paddingTop: "6px",
                                paddingBottom: "6px",
                                backgroundColor: "#9acdf7",
                              }}
                            >
                              Foreigner
                            </div>
                          ) : (
                            <div
                              style={{
                                width: "180px",
                                paddingLeft: "12px",
                                paddingRight: "12px",
                                paddingTop: "6px",
                                paddingBottom: "6px",
                                backgroundColor: "#9acdf7",
                              }}
                            >
                              Myanmar(Burma)
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        {passengerType === "Foreigner" ? (
                          <div>
                          <input
                            placeholder="Passport Number"
                            type="text"
                            value={nationalIDNumber[i]}
                            onChange={(e) => {
                              const newNID = [...nationalIDNumber];
                              newNID[i] = e.target.value;
                              setNationalIDNumber(newNID);
                            }}
                          />
                        </div>
                        ) : (
                          <div>
                          <input
                            placeholder="National ID Number"
                            type="text"
                            value={nationalIDNumber[i]}
                            onChange={(e) => {
                              const newNID = [...nationalIDNumber];
                              newNID[i] = e.target.value;
                              setNationalIDNumber(newNID);
                            }}
                          />
                        </div>
                        )}
                        
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <input
                            type="text"
                            placeholder="Enter member card number(Optional)"
                            value={memberCardNumber[i]}
                            onChange={(e) => {
                              const newMemberCardNumber = [...memberCardNumber];
                              newMemberCardNumber[i] = e.target.value;
                              setMemberCardNumber(newMemberCardNumber);
                            }}
                          />
                        </div>
                      </div>
                      <button onClick={handleAdultOnClick}>Passenger</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="passengers_section_form_contact">
                  <span style={{ fontSize: "16px", color: "#065a9e" }}>
                    Contact Details
                  </span>
                  <div className="passenger_form">
                    <div>
                      <div>
                        <select
                          value={contactTitle}
                          onChange={(e) => setContactTitle(e.target.value)}
                        >
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={contactGender}
                          onChange={(e) => setContactGender(e.target.value)}
                        >
                          <option value="Gender">Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <input
                          placeholder="First Name"
                          type="text"
                          value={contactFirstName}
                          onChange={(e) => setContactFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          placeholder="Last Name"
                          type="text"
                          value={contactLastName}
                          onChange={(e) => setContactLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          placeholder="Phone number"
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          placeholder="Email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button onClick={handleSendCode}>Send code</button>
                      <input
                        type="text"
                        placeholder="Enter your code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <div>
                        <input
                          placeholder="Address line 1"
                          type="text"
                          value={address1}
                          onChange={(e) => setAddress1(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          placeholder="Address line 2"
                          type="text"
                          value={address2}
                          onChange={(e) => setaddress2(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          placeholder="City"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          placeholder="State"
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      className="contact_btn"
                      onClick={handleOnClickContactBtn}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengersSectionScreen;
