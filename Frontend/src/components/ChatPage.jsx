import React, { useEffect, useState } from 'react'
import axios from 'axios';



const ChatPage = () => {

    // state to store fetched data
    const [chats, setChats] = useState([]);


    const fetchChats = async () => {
        try {
            const { data } = await axios.get('/api/chat');
            setChats(data);
            console.log("Fetched data:", data);
            console.log("Updated chats:", chats);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    useEffect(() => {
        fetchChats();
        // eslint-disable-next-line
    }, []);





    return (
        <>
            {
                chats.map((element) => {
                    return (
                        <div key={element._id} >
                            <h1 className='text-white text-xl' >{element.chatName}</h1>
                        </div>
                    )

                })
            }

        </>
    )
}

export default ChatPage
