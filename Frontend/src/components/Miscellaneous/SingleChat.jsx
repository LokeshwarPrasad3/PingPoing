import React, { useEffect, useState, useRef } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import SendIcon from "@mui/icons-material/Send";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { getSender, getSenderImage } from "../../config/ChatLogics";
import PreviewIcon from "@mui/icons-material/Preview";
import UpdateGroupChatModal from "../Modals/UpdateGroupChatModal";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { host } from "../../config/api";
import typingAmimation from "../../Animation/chat-animation.json";
import Lottie from "react-lottie";

import io from "socket.io-client";
// getting host which send request for socket
const ENDPOINT = host;
var socket, selectedChatCompare;

const SingleChat = (props) => {
  const { fetchAgain, setFetchAgain, showChat, setShowChat, windowWidth, setHideNavbar } = props;

  // for checking if user not type then dont show typing...
  const typingTimeoutRef = useRef(null);
  // using for bottom scrolled page when chat
  const chatContainerRef = useRef(null);

  // State for socket
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // typig indicator options  (for react-lottie typing indicator)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingAmimation, // path of json file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Showing group profiles
  const [showProfile, setShowProfile] = useState(false);

  // getting from context api
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  // fetch all message from db
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `${host}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      // socket connection
      socket.emit("join chat", selectedChat._id);

      console.log(messages);
    } catch (error) {
      toast.error("Error during fetching message");
    }
  };

  // clicked to send message then
  const sendMessage = async (e) => {
    // first stop display typing.. indicator
    socket.emit("stop typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage(""); // input make blank
      // send data to backend
      const { data } = await axios.post(
        `${host}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat, // change
        },
        config
      );

      console.log("Your Message " + data);
      // console.log(data.content);

      // send socket new message received
      socket.emit("new message", data);
      // append message
      setMessages([...messages, data]);
    } catch (error) {
      toast.error("Error during sending messages");
    }
  };

  // 1st useEfffect For established socket connection
  useEffect(() => {
    socket = io(ENDPOINT);
    // if user then only do that
    if (user) {
      // setup socket that user is online
      socket.emit("setup", user);
      socket.on("connected", () => {
        setSocketConnected(true);
      });

      // TYPING INDICATOR sockets

      // eslint-disable-next-line
      const chatId = selectedChat?._id;
      socket.on("typing", (chatId) => {
        setIsTyping(true);
      });

      socket.on("stop typing", (chatId) => {
        setIsTyping(false);
      });

      console.log("User socket connected ");
    } else {
      // Handle the case where the user is not loaded
      console.log("Unable to connect socket");
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };

    // eslint-disable-next-line
  }, [user, selectedChat]);

  // main useEffect : if clicked to chat then fetch all messaages
  useEffect(() => {
    // when show chat then hide navbar
    if (showChat && windowWidth <= 821) {
      setHideNavbar(true);
    }

    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [user, selectedChat]);

  useEffect(() => {
    const handleNewMessage = (newMessageReceived) => {
      console.log("new message received", newMessageReceived);

      // if user is receiver and not in any of user chat then show notification
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        console.log("Message received to receiver");
        if (!notification.includes(newMessageReceived)) {
          // Update the notification state
          setNotification((prevNotification) => [
            ...prevNotification,
            newMessageReceived,
          ]);
          setFetchAgain(!fetchAgain);
          setFetchAgain(!fetchAgain);
        }
      } // if user is in the chat online
      else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on("message received", handleNewMessage);

    return () => {
      socket.off("message received", handleNewMessage);
    };
    // eslint-disable-next-line
  }, [selectedChat]);

  // Scroll to bottom whenever messages loaded
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to the bottom function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the messages container
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Typing indicator logic
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected || !selectedChat) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    // When to stop typing after 3 seconds of inactivity
    const timerLength = 2000;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // if user pressed enter then go send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // Close group info popup
  const closeGroupPopup = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {/* receiver details */}
          <div className="receiver_box flex items-center justify-between text-white h-14 bg-slate-400 py-2 ">
            <div className="flex justify-between items-center h-14 px-5 gap-4">
              <ArrowCircleLeftIcon
                onClick={() => {
                  setShowChat(false);
                  setSelectedChat("");
                  if (windowWidth <= 821) {
                    setHideNavbar(false);
                  }
                }}
                className="text-slate-100"
                style={{
                  fontSize: "3rem",
                  color: "#f2f2f2",
                  cursor: "pointer",
                }}
              />
              {!selectedChat.isGroupChat ? (
                <>
                  <div className="receiver_details flex items-center gap-2  px-3">
                    <img
                      className="h-11 w-11 rounded-full cursor-pointer"
                      src={getSenderImage(user, selectedChat.users)}
                      alt=""
                      srcSet=""
                    />
                    <div className="person_online flex flex-col justify-center ">
                      <h3 className="text-lg">
                        {getSender(user, selectedChat.users)}
                      </h3>
                      <h5 className="text-sm">Online</h5>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="receiver_details flex items-center gap-2  px-3">
                    <img
                      className="h-11 w-11 rounded-full cursor-pointer"
                      src="./Images/default_group.png"
                      alt=""
                      srcSet=""
                    />
                    <div className="person_online flex flex-col justify-center ">
                      <h3 className="text-2xl uppercase font-bree">
                        {selectedChat.chatName}
                      </h3>
                    </div>
                  </div>
                </>
              )}
            </div>
            {selectedChat.isGroupChat && (
              <PreviewIcon
                onClick={() => setShowProfile(true)}
                className="cursor-pointer custom-transition mr-6 rounded-full text-slate-100"
                style={{ fontSize: "2.6rem" }}
              />
            )}
          </div>
          {/* messages adn send message box */}
          <div className={`send_message_box  bg-slate-600 flex text-gray-200 opacity-90 h-full flex-col justify-between gap-2
          ${windowWidth <= 821 ? 'message_box_mobile' : ''}
          `}>
            <div
              ref={chatContainerRef}
              className={`messagesb_box_container bg-slate-600 px-5
              ${windowWidth <= 821 ? 'chat_box_mobile' : 'chat_box_laptop'}
              ${selectedChat.isGroupChat ? '' : 'px-3'}  overflow-y-auto `}
            >
              {loading ? (
                <div className="relative h-[80vh] flex justify-center items-center">
                  <CircularProgress color="inherit" size={64} />
                </div>
              ) : (
                <>
                  {/* <ChatMessages chatMessages={messages} /> */}
                  <ScrollableChat chatMessages={messages} />
                </>
              )}
            </div>


            {!loading ? (
              <div className="send_message_container flex justify-between h-16 bg-slate-700 w-full px-5 items-center gap-1 ">
                {/* show typing indeicator */}
                {isTyping ? <Lottie options={defaultOptions} width={70} /> : ""}
                <input
                  onKeyDown={handleKeyDown}
                  value={newMessage}
                  onChange={typingHandler}
                  className="w-full bg-slate-700 border-gray-500 px-2 py-2 border-[1px] rounded-xl  focus:outline-none placeholder:text-gray-200"
                  type="text"
                  name=""
                  id="input_message"
                  placeholder=" Enter Message"
                />
                {/* when enter then go send message */}

                <SendIcon
                  onClick={sendMessage}
                  style={{ fontSize: "2.1rem" }}
                  className="text-white bg-green-600 p-1 rounded-lg hover:text-slate-100 custom-transition cursor-pointer "
                />
              </div>
            ) : ""}
            

          </div>
        </>
      ) : (
        <>
          <div className="flex pt-96 justify-center items-center ">
            <h1 className="text-white text-3xl font-overpass text-">
              Click user to start Chat
            </h1>
          </div>
        </>
      )}

      {/* Show group info when clicked */}
      {showProfile && (
        <UpdateGroupChatModal
          onClose={closeGroupPopup}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          fetchMessages={fetchMessages}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default SingleChat;
