import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../Context";
import Message from "./Message";
import { BiSend } from "react-icons/bi";
import { LuSend } from "react-icons/lu";

// Chat only works when we have an active call i.e. a P2P connection already exists
function Chat() {
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility
  const scrollDummyDiv = useRef(null);

  // Auto scroll to the bottom of the chat when a new message is sent/received
  useEffect(() => {
    if (scrollDummyDiv.current) {
      scrollDummyDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollDummyDiv]);

  const { msgs, callAccepted, callEnded, sendMessage } = useContext(SocketContext);

  const messageList =
    msgs.length > 0
      ? msgs.map(({ data, isOwnMessage, id }) => {
          return <Message key={id} data={data} isOwnMessage={isOwnMessage} />;
        })
      : null;

  return (
    <>
      {callAccepted && !callEnded && (
        <div className="absolute bottom-0 w-full max-w-full">
          {/* Toggle Button */}
          <button
            className="p-2 bg-blue-500 text-white rounded-full shadow-md mb-2"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            {isChatOpen ? "Hide Chat" : "Show Chat"}
          </button>

          {/* Chat messages container */}
          {isChatOpen && (
            <div className="flex flex-col gap-2 p-3 px-5 max-h-72 sm:max-h-60 md:max-h-48 lg:max-h-64 overflow-auto bg-gray-100 shadow-inner rounded-t-md">
              {messageList}
              <div ref={scrollDummyDiv}></div>
            </div>
          )}

          {/* Chat input container */}
          {isChatOpen && (
            <div className="flex w-full justify-center p-3 bg-white border-t shadow-lg">
              <input
                className="w-full p-2 md:p-3 px-4 border rounded-l-md outline-none text-sm md:text-base focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Type your message ✍️"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-r-md flex items-center gap-2 justify-center font-semibold text-sm md:text-base shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 ease-in-out active:scale-95"
                onClick={() => {
                  if (message !== "") {
                    sendMessage(message);
                    setMessage("");
                  }
                }}
              >
                <LuSend />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
