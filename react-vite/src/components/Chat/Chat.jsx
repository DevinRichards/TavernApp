import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { loadMessages, sendMessage } from "../../redux/chat";
import { thunkFetchChannelById } from "../../redux/channel";
let socket;

const Chat = ({currentChannel}) => {
    const [chatInput, setChatInput] = useState("");
    const displayMessages = useSelector(state =>
        state.messages?.messages.filter(message => message.channelId === currentChannel)
      );

    const user = useSelector(state => state.session.user);
    const server = useSelector(state => state.server?.currentServer)
    const channel = useSelector(state => state.channel?.channels);
    console.log("this is channel", channel)

    const dispatch = useDispatch();

    console.log("this is currentChannel In Chat", currentChannel)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            // Handle receiving messages from the server
            dispatch(sendMessage(chat)); // Dispatch the received message to update the state
        });

        // When component unmounts, disconnect
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    useEffect(() => {
        // Load messages for the current channel when component mounts or currentChannel changes
        if (currentChannel) {
            dispatch(loadMessages(currentChannel));
            dispatch(thunkFetchChannelById(server.id, currentChannel))
        }
    }, [currentChannel, dispatch]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();
        const messageData = {
            msg: chatInput,
            senderId: user.id,
            channelId: currentChannel
        };
        // Dispatch action to send message to server
        dispatch(sendMessage(messageData));
        // Clear chat input after sending
        setChatInput("");
    };

    const getCurrentChannelName = () => {
        if (channel && currentChannel) {
            const currentChannelObj = channel.find(ch => ch.id === currentChannel);
            return currentChannelObj ? currentChannelObj.name : "";
        }
        return "";
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <>
            {!currentChannel && (
                <h1 className="flex items-center justify-between p-3 shadow bg-gray-800 text-white">Please select a channel</h1>
            )}

            {user && (
                <div className="flex flex-col h-screen">
                    <div className="flex items-center justify-between p-3 shadow bg-gray-800 text-white">{`${getCurrentChannelName()}`}</div>
                    <div className="flex-grow overflow-auto p-3 bg-gray-900">
                        {displayMessages?.map((message, ind) => (
                            <div key={ind} className={`p-2 my-1 rounded-md text-white ${message.senderId === user.id ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}>
                                <div className="text-sm text-gray-400">{message.senderId}</div>
                                <div>{message.content}</div>
                                <div className="text-xs text-gray-500">{formatDateTime(message.created_at)}</div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendChat} className="flex p-3 bg-gray-800">
                        <input
                            className="flex-grow p-2 rounded-md mr-3 bg-gray-700 text-white"
                            value={chatInput}
                            onChange={updateChatInput}
                            placeholder="Type your message..."
                        />
                        <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chat;
