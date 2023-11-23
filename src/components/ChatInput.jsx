import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import ChatSuggest from "./ChatSuggest";

const ChatInput = ({ setChatData }) => {
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    setChatData({ type: "prompt", para: input });
  };

  return (
    <>
      <div className="chat_input_box">
        <ChatSuggest setChatData={setChatData} />
        <div className="chat_input">
          <input
            type="text"
            autoFocus={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleClick}>
            <BiSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
