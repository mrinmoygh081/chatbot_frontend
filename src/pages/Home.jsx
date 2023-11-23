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

  console.log("chatListing", chatListing);
  // console.log("chatData", chatData);

  useEffect(() => {
    setChatListing([...chatListing, chatData]);
  }, [chatData]);

  return (
    <div>
      <Sidebar />
      <div className="chat_layout">
        <Header />
        <ChatList chatListing={chatListing} />
        <Chat chatData={chatData} setChatData={setChatData} />
      </div>
    </div>
  );
};

export default Home;
