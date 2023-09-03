import React from 'react'

// import ChatState which get context API
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
    // Get (ChatState) method which is return Context
    const { user } = ChatState(); // desctruture user


    return (
        <>

        </>
    )
}

export default ChatPage
