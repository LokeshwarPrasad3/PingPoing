// Creating a new Context API to provide state access to all child components

// Import necessary dependencies
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";

// Define the context named ChatContext
const ChatContext = createContext();

// ChatProvider component responsible for providing context data to children
const ChatProvider = ({ children }) => {

    // Use for URL navigation
    const navigate = useNavigate();

    // State variables for user and selected chat
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    // State variables for storing chats and notifications
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);

    // Initial data retrieval from local storage during the first render
    useEffect(() => {
        try {
            // Get user information from localStorage and set it in the state
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            setUser(userInfo);

            // If the user is not logged in, redirect to the authentication page
            if (!userInfo) {
                navigate("/auth");
            }
        } catch (error) {
            console.error("Error parsing user info from localStorage", error);
            // Handle the error, e.g., redirect to login or display an error message.
        }
    }, [navigate]);

    // Provide the context values to children
    return (
        <ChatContext.Provider 
        value={{ 
            user, 
            setUser, 
            selectedChat, 
            setSelectedChat, 
            chats, 
            setChats, 
            notification, 
            setNotification 
        }}  
        >
            {children}
        </ChatContext.Provider>
    )
};

// ChatState method to access Context API data
const ChatState = () => {
    return useContext(ChatContext); // Return the context object
}

// Export the ChatProvider as default and ChatState as a named export
export default ChatProvider;
export { ChatState };
