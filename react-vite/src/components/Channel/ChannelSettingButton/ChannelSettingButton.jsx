import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import ChannelSettingModal from '../ChannelSettingModal/ChannelSettingModal';
import { thunkFetchChannelById } from '../../../redux/channel';

const ChannelSettingButton = (props) => {
  const ulRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const server = useSelector(state => state.server?.currentServer);
  const currentUser = useSelector(state => state.session.user);
  const serverId = server?.id
  const channelId = props.channel?.id
  const dispatch = useDispatch();

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleFetchChannel = async (serverId, channelId) => {
    try {
      await dispatch(thunkFetchChannelById(serverId, channelId));
    } catch (error) {
      console.error("Error fetching channel:", error);
    }
  };

  const handleClick = () => {
    if (currentUser && currentUser.id === server.ownerId) {
      setShowMenu(true);
      handleFetchChannel(serverId, channelId);
    }
    else{
      alert("You do not have permission to make these changes.")
    }
  }

  const containerStyle = {
    backgroundColor: 'rgb(43,45,49)',
  };

  return (
    <div className='serverTile group relative overflow-hidden' style={containerStyle}>
      <button
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={handleClick}
      >
        <OpenModalMenuItem
          className="text-green-500 text-2xl"
          itemText="▾"
          onItemClick={closeMenu}
          modalComponent={currentUser && currentUser.id === server.ownerId && showMenu ? <ChannelSettingModal channel={props.channel} />: null}
        />
      </button>
    </div>
  );
};

export default ChannelSettingButton;
