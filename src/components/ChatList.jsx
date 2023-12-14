import React, { useEffect, useRef } from "react";

const ChatList = ({ chatListing }) => {
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatListing]);

  return (
    <div className="chatList">
      <div className="chatlist_container res">
        <div className="chats">
          <div className="chat_single">
            <img src={require("../images/icon.png")} alt="" />
            <p>
              Welcome to EEDF Hospital! Please feel free to ask your queries.
            </p>
          </div>
        </div>
      </div>
      {chatListing &&
        chatListing.length > 1 &&
        chatListing.map((item, i) => {
          return (
            <>
              {i !== 0 && (
                <div className="chatlist_container prompt" key={i}>
                  <div className="chats">
                    <div className="chat_single">
                      <img
                        src={
                          item.type === "prompt"
                            ? require("../images/prompt.jpg")
                            : require("../images/icon.png")
                        }
                        alt=""
                      />
                      <p>{item?.para}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}

      <div ref={containerRef}></div>
    </div>
  );
};

export default ChatList;
