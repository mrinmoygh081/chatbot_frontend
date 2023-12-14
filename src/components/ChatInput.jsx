import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { LuTimerReset } from "react-icons/lu";
import ChatSuggest from "./ChatSuggest";

const ChatInput = ({
  setChatData,
  resetHandler,
  suggestions,
  setSuggestions,
  flag,
  setFlag,
}) => {
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    setChatData({ type: "prompt", para: input });
  };

  return (
    <>
      <div className="chat_input_box">
        <ChatSuggest
          setChatData={setChatData}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          flag={flag}
          setFlag={setFlag}
          resetHandler={resetHandler}
        />
        <div className="chat_input">
          <button className="reset" onClick={resetHandler}>
            <LuTimerReset />
          </button>
          <input
            type="text"
            autoFocus={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleClick} className="send">
            <BiSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
