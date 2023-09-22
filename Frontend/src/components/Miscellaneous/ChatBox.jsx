import React from 'react'
import ChatMessages from './ChatMessages';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';

const ChatBox = (props) => {

    const { messagesContainerRef,  sendMessage, inputRef, 
        chatMessages, messageInput, setMessageInput } = props;

    // if clcked to enter then go send
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }
    return (
        <>
            <div
                className="messages_container  bg-slate-600  font-overpass flex flex-col  min-h-[90vh] justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md">
                {/* receiver details */}
                <div className="receiver_box flex items-center justify-between text-white h-14 bg-slate-400 py-2 ">
                    <div className="receiver_details flex items-center gap-2  px-3">
                        <img className='h-11 w-11 rounded-full cursor-pointer' src="./Images/takeshwar.jpg" alt="" srcSet="" />
                        <div className="person_online flex flex-col justify-center ">
                            <h3>Takeshwar Janghel</h3>
                            <span className='text-sm' >Online</span>
                        </div>
                    </div>
                    <MoreVertIcon className="cursor-pointer hover:bg-slate-500 custom-transition mr-5 rounded-full" />
                </div>
                {/* messages adn send message box */}
                <div className=' h-full overflow-y-auto bg-slate-600 p-2 flex text-gray-200 opacity-90 flex-col justify-between gap-3' >
                    <div ref={messagesContainerRef} className="messagesb_box_container overflow-x-auto max-h-[73vh]">

                        <ChatMessages chatMessages={chatMessages} />

                    </div>
                    <div className="send_message_container flex justify-between items-center gap-1 ">
                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className='w-full bg-slate-700 border-gray-500 px-2 py-1 border-[1px] rounded-xl  focus:outline-none placeholder:text-gray-200' type="text" name="" id="input_message " placeholder=' Enter Message' />
                        {/* when enter then go send message */}

                        <SendIcon
                            onClick={sendMessage}
                            style={{ fontSize: '2.1rem' }} className='text-white bg-green-600 p-1 rounded-full hover:text-slate-100 custom-transition cursor-pointer ' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBox
