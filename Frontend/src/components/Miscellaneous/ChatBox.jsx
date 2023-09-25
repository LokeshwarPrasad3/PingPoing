import React from 'react'

import { ChatState } from '../../Context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = (props) => {

    // import context api
    const { selectedChat } = ChatState();

    const { messagesContainerRef, sendMessage, inputRef,
        chatMessages, messageInput, setMessageInput,
        fetchAgain, setFetchAgain
        , setShowChat ,showChat   } = props;

  
    return (
        <>
            <div
                className="messages_container  bg-slate-600  font-overpass flex flex-col  min-h-[90vh] justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md">
                <SingleChat
                    {...{
                        messagesContainerRef,
                        sendMessage,
                        inputRef,
                        chatMessages,
                        messageInput,
                        setMessageInput,
                        fetchAgain,
                        setFetchAgain,
                        setShowChat, 
                        showChat
                    }}
                />

            </div>
        </>
    )
}

export default ChatBox
