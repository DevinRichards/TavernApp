import React, {useState, useRef} from 'react';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import ChannelCreateModal from '../ChannelCreateModal/ChannelCreateModal';


const ChannelSettingButton = () => {
  const ulRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const containerStyle = {
    backgroundColor: 'rgb(43,45,49)',
  };

  return (
    <div className='serverTile group relative overflow-hidden' style={containerStyle}>
      <button
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out">
        <OpenModalMenuItem
          className="text-green-500 text-2xl"
          itemText="▾"
          onItemClick={closeMenu}
          modalComponent={<ChannelCreateModal/>}
        />
      </button>
    </div>
  );
};

export default ChannelSettingButton;
