import React, { useEffect, useState } from "react";
import { callAPI } from "../utils/fetchAPIs";
import { getNextDays } from "../utils/getDates";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ChatSuggest = ({
  setChatData,
  suggestions,
  setSuggestions,
  flag,
  setFlag,
  resetHandler,
}) => {
  const [bookingData, setBookingData] = useState({
    dept: "",
    drname: "",
    date: "",
    time: "",
    auth_id: "",
  });
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    (() => {
      setBookingData({ ...bookingData, auth_id: userId });
    })();
  }, [userId]);

  const handleSuggestClick = async (item, fl) => {
    setChatData({ type: "prompt", para: item });
    if (fl === "initial" && item === "Book My Doctor") {
      let res = await callAPI("POST", "chat/depts", null, null);
      if (res?.status) {
        setChatData({ type: "res", para: res?.data?.heading });
        setSuggestions(res?.data?.suggestions);
        setFlag("getDoctors");
      }
    } else if (fl === "initial" && item === "Previous Bookings") {
      let payload = {
        id: userId,
      };
      let res = await callAPI("POST", "chat/getAllBookings", payload, null);
      if (res?.status) {
        let BookingInfo = [];
        res?.data.forEach((appointment) => {
          BookingInfo.push(
            `Appointment with ${appointment.drname} (${appointment.dept}) on ${appointment.date} at ${appointment.time}.`
          );
        });

        setChatData({
          type: "res",
          para: BookingInfo.join("\n"),
        });
      }
    } else if (fl === "initial" && item === "Social Connectors") {
      setTimeout(() => {
        setChatData({
          type: "res",
          para: "Instagram: https://www.instagram.com, Facebook: https://www.facebook.com, LinkedIn: https://www.linkedin.com",
        });
      }, 500);
    } else if (flag === "getDoctors") {
      // Save Depts
      setBookingData({ ...bookingData, dept: item });
      // GET Doctors
      let payload = {
        dept: item,
      };
      let res = await callAPI("POST", "chat/doctors", payload, null);
      if (res?.status) {
        setChatData({ type: "res", para: res?.data?.heading });
        setSuggestions(res?.data?.suggestions);
        setFlag("getDates");
      }
    } else if (flag === "getDates") {
      // Save Doctor
      setBookingData({ ...bookingData, drname: item });
      // get dates
      setTimeout(() => {
        setChatData({ type: "res", para: "Please choose date of appointment" });
      }, 1000);
      let dates = getNextDays(new Date());
      setSuggestions(dates);
      setFlag("getTimes");
    } else if (flag === "getTimes") {
      // Save dates
      setBookingData({ ...bookingData, date: item });
      // GET times
      setTimeout(() => {
        setChatData({ type: "res", para: "Please choose time of appointment" });
      }, 1000);
      setSuggestions(["9AM", "2PM", "7PM"]);
      setFlag("confirmBooking");
    } else if (flag === "confirmBooking") {
      // Save time
      setBookingData({ ...bookingData, time: item });
      // Confirm or reset
      setTimeout(() => {
        setChatData({
          type: "res",
          para: "Your appointment will be saved. Please Confirm the booking?",
        });
      }, 1000);
      setSuggestions(["CONFIRM", "RESET"]);
      setFlag("lastPart");
    } else if (flag === "lastPart" && item === "CONFIRM") {
      // Save the booking to DB
      let res = await callAPI("POST", "chat/bookings", bookingData, null);
      if (res?.status) {
        setChatData({
          type: "res",
          para: "Your appointment has been booked. Thank you! Please check out other services we offer!",
        });
        toast.success("Your appointment has been booking.");
      }

      setTimeout(() => {
        setSuggestions([
          "Book My Doctor",
          "Previous Bookings",
          "Document Upload",
          "Social Connectors",
        ]);
        setFlag("initial");
      }, 2000);
    } else if (flag === "lastPart" && item === "RESET") {
      setTimeout(() => {
        resetHandler();
      }, 1000);
    } else {
      alert("Please select a valid prompt!");
    }
  };

  return (
    <>
      <div className="row">
        {suggestions &&
          suggestions.map((item, index) => {
            return (
              <div
                className="col-md-3 col-6"
                key={index}
                onClick={() => handleSuggestClick(item, flag)}
              >
                <div className="suggest_box">
                  <h4>{item}</h4>
                  {/* <p>Please choose your options</p> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChatSuggest;
