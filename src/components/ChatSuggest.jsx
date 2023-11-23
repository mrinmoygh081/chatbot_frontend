import React, { useEffect, useState } from "react";
import { callAPI } from "../utils/fetchAPIs";

const ChatSuggest = ({ setChatData }) => {
  const [suggestions, setSuggestions] = useState([
    "Create My Profile",
    "Book My Doctor",
  ]);

  const handleSuggestClick = async (item) => {
    console.log(item);
    setChatData({ type: "prompt", para: item });
    if (item === "Book My Doctor") {
      let res = await callAPI("POST", "chat/depts", null, null);

      if (res?.status) {
        setChatData({ type: "res", para: res?.data?.heading });
        setSuggestions(res?.data?.suggestions);
      }
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
                className="col-md-6 col-12"
                key={index}
                onClick={() => handleSuggestClick(item)}
              >
                <div className="suggest_box">
                  <h4>{item}</h4>
                  <p>Please choose your options</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChatSuggest;
