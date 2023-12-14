import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import ChatList from "../components/ChatList";

const Home = () => {
  const [chatData, setChatData] = useState({
    para: "",
    type: "",
  });
  const [chatListing, setChatListing] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "Book My Doctor",
    "Previous Bookings",
    "Document Upload",
    "Social Connectors",
  ]);
  const [flag, setFlag] = useState("initial");

  // console.log("chatListing", chatListing);
  // console.log("chatData", chatData);

  const resetHandler = () => {
    setChatData({
      para: "",
      type: "",
    });
    setChatListing([]);
    setSuggestions([
      "Book My Doctor",
      "Previous Bookings",
      "Document Upload",
      "Social Connectors",
    ]);
    setFlag("initial");
  };

  useEffect(() => {
    setChatListing([...chatListing, chatData]);
  }, [chatData]);

  return (
    <div>
      <Sidebar />
      <div className="chat_layout">
        <Header />
        <ChatList chatListing={chatListing} />
        <Chat
          chatData={chatData}
          setChatData={setChatData}
          resetHandler={resetHandler}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          flag={flag}
          setFlag={setFlag}
        />
      </div>
    </div>
  );
};

export default Home;
