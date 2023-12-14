import React from "react";
import ChatInput from "./ChatInput";

const Chat = ({
  chatData,
  setChatData,
  resetHandler,
  suggestions,
  setSuggestions,
  flag,
  setFlag,
}) => {
  return (
    <div>
      <ChatInput
        chatData={chatData}
        setChatData={setChatData}
        resetHandler={resetHandler}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        flag={flag}
        setFlag={setFlag}
      />
    </div>
  );
};

export default Chat;
