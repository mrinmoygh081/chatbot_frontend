import React from "react";
import ChatInput from "./ChatInput";

const Chat = ({ chatData, setChatData }) => {
  return (
    <div>
      <ChatInput chatData={chatData} setChatData={setChatData} />
    </div>
  );
};

export default Chat;
