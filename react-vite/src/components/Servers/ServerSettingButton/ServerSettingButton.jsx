import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchServerById } from '../../../redux/server';

import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import ServerSettingModal from '../ServerSettingModal/ServerSettingModal';

const ServerSettingButton = () => {
  const ulRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const server = useSelector(state => state.server?.currentServer) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchServerById());
  }, [dispatch]);

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const containerStyle = {
    backgroundColor: 'rgb(43, 45, 49)',
  };

  return (
    <div className='serverTile group relative overflow-hidden' style={containerStyle}>
      <button
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={() => setShowMenu(true)}
      >
        <OpenModalMenuItem
          className="text-green-500 text-2xl"
          itemText="▾"
          onItemClick={closeMenu}
          modalComponent={<ServerSettingModal server={server} />}
        />
      </button>
    </div>
  );
};

export default ServerSettingButton;
