import React from 'react'

import { ChatState } from '../../Context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = (props) => {

    // import context api
    const { selectedChat } = ChatState();

    const { 
        fetchAgain, setFetchAgain
        , setShowChat } = props;

  
    return (
        <>
            <div
                className={`messages_container flex bg-slate-600  font-overpass flex-col  min-h-[90vh] justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md`}>
                <SingleChat
                    {...{
                        fetchAgain,
                        setFetchAgain,
                        setShowChat, 
                    }}
                />

            </div>
        </>
    )
}

export default ChatBox
