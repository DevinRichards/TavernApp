import React, { useState, useRef } from 'react';
import { useModal } from '../../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import ChannelCreateModal from '../ChannelCreateModal/ChannelCreateModal';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';

const AddChannelButton = () => {
  const ulRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const server = useSelector(state => state.server?.currentServer) || {};
  const currentUser = useSelector(state => state.session.user);

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleClick = () => {
    if (currentUser && currentUser.id === server.ownerId) {
      setShowMenu(true);
    }
    else{
      alert("You do not have permission to make these changes.")
    }
  };

  return (
    <div className='serverTile group relative overflow-hidden'>
      <button
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={handleClick}
      >
        <OpenModalMenuItem
          className="text-green-500 text-2xl"
          itemText="+"
          onItemClick={closeMenu}
          modalComponent={currentUser && currentUser.id === server.ownerId && showMenu ? <ChannelCreateModal/> : null}
        />
      </button>
    </div>
  );
};

export default AddChannelButton;
