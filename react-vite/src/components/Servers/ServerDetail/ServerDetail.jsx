import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannels } from '../../../redux/channel';
import ChannelIndex from '../../Channel/ChannelIndex';
import { thunkFetchServerById, thunkFetchServers } from '../../../redux/server';
import ServerIndex from '../ServerIndexNavbar';

const ServerDetail = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const server = useSelector(state => state.server?.currentServer) || {};

  // const channels = useSelector(state => state.channelsReducer[serverId]);

  useEffect(() => {
    dispatch(thunkFetchServerById(serverId))
    .then(dispatch(thunkFetchServers()),
    setIsLoading(false))
  }, [dispatch, serverId]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  if (isLoading) return <>Loading...</>;

  return (
    <div className='serverComponent'>
      <div className='serverHeader' onClick={toggleDropdown}>
        <h1 className='text-white'style={{ backgroundColor: 'rgb(43,45,49)' }}>{server.name}</h1>
      </div>

      <ChannelIndex selectedServer={server} />

    </div>
  );
};

export default ServerDetail;
