import React, { useEffect, useState } from "react";
import "./PaymentScreen.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import master_card from "../../assets/master_card.png";
import visa from "../../assets/visa_1.png";
import miit from "../../assets/miit_logo.png";
import kae from "../../assets/kae_profile.jpg";

function PaymentScreen() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("global_card");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [password, setPassword] = useState("");

  let location = useLocation();
  const [departFlight, setDepartFlight] = useState([]);
  const [customer_id, setCustomer_id] = useState("");
  const [ticket_number, setTicket_number] = useState("");
  const [total_amount, setTotal_amount] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [memberTier, setMemberTier] = useState([]);
  const [headoffice, setHeadoffice] = useState("Yangon Head Office");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setDepartFlight(JSON.parse(searchParams.get("depart_flight")));
    setCustomer_id(searchParams.get("customer_id"));
    setTicket_number(searchParams.get("ticket_number"));
    setTotal_amount(searchParams.get("total_amount"));
    setIsMember(searchParams.get("isMember"));
    setMemberTier(JSON.parse(searchParams.get("memberTier")));
  }, []);

  const [card_number, setCard_number] = useState("");

  const [visas, setVisas] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getVisas")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVisas(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [masters, setMasters] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getMasters")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMasters(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleGlobalCard() {
    const transcation_status = "success";

    if (card_number.startsWith("4")) {
      const matchingCard = visas.find(
        (card) => card.card_number === card_number && card.password === password
      );
      if (matchingCard) {
        if (matchingCard.balance < parseInt(total_amount)) {
          alert("Insufficient amount");
        } else {
          const payment_method = "visa";
          let item = {
            customer_id,
            ticket_number,
            total_amount,
            payment_method,
            card_number,
            transcation_status,
          };
          console.warn(item);

          let result = fetch("http://127.0.0.1:8000/api/getTransaction", {
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
          alert("Ticket purchase successfull");
          navigate("/");
        }
      } else {
        alert("Card Validation Fail");
      }
    } else if (card_number.startsWith("3")) {
      const matchingCard = masters.find(
        (card) => card.card_number === card_number && card.password === password
      );
      if (matchingCard) {
        if (matchingCard.balance < parseInt(total_amount)) {
          alert("Insufficient amount");
        } else {
          const payment_method = "master";
          let item = {
            customer_id,
            ticket_number,
            total_amount,
            payment_method,
            card_number,
            transcation_status,
          };
          console.warn(item);

          let result = fetch("http://127.0.0.1:8000/api/getTransaction", {
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
          alert("Ticket purchase successfull");
          navigate("/");
        }
      } else {
        alert("Card Validation Fail");
      }
    }
  }

  function handleOverTheCounter() {
    const transcation_status = "pending";
    const payment_method = "over_the_counter";
    setCard_number("0");

    let item = {
      customer_id,
      ticket_number,
      total_amount,
      payment_method,
      card_number: "0",
      transcation_status,
      headoffice,
    };
    console.warn(item);
    console.log(headoffice);

    let result = fetch("http://127.0.0.1:8000/api/getTransaction", {
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
    // alert("Success")
    // navigate('/')
  }

  function formatCardNumber(cardNumber) {
    // Remove any non-numeric characters from the input
    const strippedNumber = cardNumber.replace(/\D/g, "");

    // Insert a space after every 4th character
    const formattedNumber = strippedNumber.replace(/(.{4})/g, "$1 ");

    // Return the formatted number
    return formattedNumber.trim();
  }

  function handleChange(e) {
    const formattedValue = formatCardNumber(e.target.value);
    setCard_number(formattedValue);
  }

  return (
    <div className="payment_screen">
      <div className="payment_header_container">
        <img src={kae} alt="" />
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "white",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          AIR KAE
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: "18px",
            marginTop: "10px",
          }}
        >
          <span>Total Price</span>
          <span>${total_amount}</span>
        </div>
      </div>
      <div className="payment_form_container">
        <div className="payment_left_container">
          <div className="card_container">
            <label>
              <input
                style={{
                  appearance: "none",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                type="radio"
                value="global_card"
                checked={selectedOption == "global_card"}
                onChange={handleOptionChange}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                GLOBAL CARD
                <div className="logos">
                  <img src={visa} alt="" />
                  <img src={master_card} alt="" />
                </div>
              </div>
            </label>
          </div>
          <div className="card_container">
            <label>
              <input
                style={{
                  appearance: "none",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                type="radio"
                value="over_the_counter"
                checked={selectedOption === "over_the_counter"}
                onChange={handleOptionChange}
              />
              OVER THE COUNTER
            </label>
          </div>
        </div>
        <div className="payment_right_container">
          {selectedOption == "global_card" && (
            <div className="global_card">
              <div>
                <span>Card Number</span>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="0000-0000-0000-0000"
                  value={card_number}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>Password</span>
                <input
                  style={{ width: "100%" }}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={handleGlobalCard} style={{ width: "200px" }}>
                Buy Ticket
              </button>
            </div>
          )}

          {selectedOption == "over_the_counter" && (
            <div className="global_card">
              <select
                style={{ width: "200px" }}
                value={headoffice}
                onChange={(e) => setHeadoffice(e.target.value)}
              >
                <option value="Yangon Head Office">Yangon Head Office</option>
                <option value="Mandalay Head Office">
                  Mandalay Head Office
                </option>
                <option value="Naypyitaw Head Office">
                  Naypyitaw Head Office
                </option>
                <option value="Heho Head Office">Heho Head Office</option>
                <option value="Lashio Head Office">Lashio Head Office</option>
                <option value="Loikaw Head Office">Loikaw Head Office</option>
                <option value="Kaly Head Office">Kaly Head Office</option>
                <option value="Sittway Head Office">Sittway Head Office</option>
                <option value="Keng Tong Head Office">
                  Keng Tong Head Office
                </option>
                <option value="Tachileik Head Office">
                  Tachileik Head Office
                </option>
              </select>
              <div>
                <span>Payer Name</span>
                <input style={{ width: "100%" }} type="text" />
              </div>
              <div>
                <span>Phone Number</span>
                <input style={{ width: "50%" }} type="text" />
              </div>
              <button onClick={handleOverTheCounter} style={{ width: "200px" }}>
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
