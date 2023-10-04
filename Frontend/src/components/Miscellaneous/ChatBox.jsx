import React from 'react'
import SingleChat from './SingleChat';

const ChatBox = (props) => {


    const { 
        fetchAgain, setFetchAgain
        , setShowChat } = props;

  
    return (
        <>
            <div
                className={`messages_container flex bg-slate-600  font-overpass flex-col  min-h-[90vh] justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md`}>
                {/* Here all chats are displayed */}
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
