import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChannelIndex from '../../Channel/ChannelIndex';
import { thunkFetchServerById, thunkFetchServers } from '../../../redux/server';
import ServerSettingButton from '../ServerSettingButton/ServerSettingButton';
import Chat from '../../Chat/Chat';

const ServerDetail = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentChannel, setCurrentChannel] = useState("");
  const server = useSelector(state => state.server?.currentServer) || {};
  const selectedChannel = useSelector(state => state.channel?.currentChannel) || {};

  // const channels = useSelector(state => state.channelsReducer[serverId]);

  useEffect(() => {
    dispatch(thunkFetchServerById(serverId))
      .then(dispatch(thunkFetchServers()),
        setIsLoading(false))
  }, [dispatch, serverId]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleChannelSelect = () => {
    setCurrentChannel(id);
  };

  console.log("This is the current Channel in Server Details", currentChannel);
  if (isLoading) return <>Loading...</>;

  return (
    <div className='serverComponent'>
      <div className='serverHeader flex justify-between items-center bg-gray-800 p-4 text-white' onClick={toggleDropdown}>
        <h1>{server.name}</h1>
        <ServerSettingButton />
      </div>

      <div className='flex'>
        <div className='flex-none'>
          <ChannelIndex selectedServer={server} currentChannel = {currentChannel} setCurrentChannel = {setCurrentChannel} />
        </div>
        <div className='flex-grow'>
          <Chat currentChannel = {currentChannel} />
        </div>
      </div>
    </div>
  );
};

export default ServerDetail;
