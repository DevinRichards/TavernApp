import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannels } from '../../../redux/channel';
// import ServerDropdownMenu from './ServerDropdownMenu'; // This should be your Dropdown component for server options
import ChannelIndex from '../../Channel/ChannelIndex';
import { thunkFetchServerById } from '../../../redux/server';
import ServerIndex from '../ServerIndexNavbar';

const ServerDetail = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const server = useSelector(state => state.server?.currentServer) || {};
  const servers = useSelector(state => state.server?.servers) || {};

  // const channels = useSelector(state => state.channelsReducer[serverId]);

  useEffect(() => {
    dispatch(thunkFetchServerById(serverId))
  }, [dispatch, serverId]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  return (
    <div className='serverComponent'>
      <div>
      <ServerIndex/>
      </div>
      <div className='serverHeader' onClick={toggleDropdown}>
        <h1>{server.name}</h1>
        <div>▼</div>
      </div>

      {/* {showDropdown && <ServerDropdownMenu serverId={serverId} />} */}

      <ChannelIndex selectedServer={server} />
    </div>
  );
};

export default ServerDetail;
