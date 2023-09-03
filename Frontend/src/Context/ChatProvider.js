// creating new Context API which is give state acces on all child

import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");


// name of context is ChatContext
const ChatContext = createContext();

// Then children named object is provided by ChatProvider
const ChatProvider = ({ children }) => {
    
    // using for navigation of url
    const navigate = useNavigate();

    // we need to store user from localstorage
    const [user, setUser] = useState();
    


    useEffect(() => {
        // get logged user data from localStorage and setUser
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // if user is not logged in redirected to login poage
        if (!userInfo) {
             navigate("/");
        }
    }, [navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser }}  >
            {children}
        </ChatContext.Provider>
    )
};


// Made ChatState method which return Context API data
const ChatState = () => {
    return useContext(ChatContext); // return object
}


export default ChatProvider ;
export {ChatState};