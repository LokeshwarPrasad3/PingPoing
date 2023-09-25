import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ChatMessages from './ChatMessages';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { getSender } from '../../config/ChatLogics';

const SingleChat = (props) => {
    const { messagesContainerRef, sendMessage, inputRef,
        chatMessages, messageInput, setMessageInput,
        fetchAgain, setFetchAgain,
        setShowChat, showChat
    } = props;

    const { user, selectedChat, setSelectedChat } = ChatState();

    // if clcked to enter then go send
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <>
            {
                selectedChat ? (
                    <>

                        {/* receiver details */}
                        <div className="receiver_box flex items-center justify-between text-white h-14 bg-slate-400 py-2 ">
                            <div className="flex justify-between items-center px-5 gap-4" >
                                <ArrowCircleLeftIcon
                                    onClick={() => {
                                        setShowChat(false);
                                        setSelectedChat("")
                                    }}
                                    style={{ fontSize: '3rem', color: '#f2f2f2' }} />
                                {
                                    !selectedChat.isGroupChat ? (
                                        <>
                                            <div className="receiver_details flex items-center gap-2  px-3">
                                                <img className='h-11 w-11 rounded-full cursor-pointer' src="./Images/takeshwar.jpg" alt="" srcSet="" />
                                                <div className="person_online flex flex-col justify-center ">
                                                    <h3 className="text-xl" >{getSender(user, selectedChat.users)}</h3>
                                                    <h5 className='' >Online</h5>
                                                </div>
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <div className="receiver_details flex items-center gap-2  px-3">
                                                    <img className='h-11 w-11 rounded-full cursor-pointer' src="./Images/takeshwar.jpg" alt="" srcSet="" />
                                                    <div className="person_online flex flex-col justify-center ">
                                                        <h3 className='text-2xl uppercase font-bree' >{selectedChat.chatName}</h3>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }

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

                    </>
                ) : (
                    <>
                        <div className="flex pt-96 justify-center items-center " >
                            <h1 className="text-white text-3xl font-overpass text-">Click user to start Chat</h1>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default SingleChat
