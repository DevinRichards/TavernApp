import React, {useState, useRef} from 'react';
import { useModal } from '../../../context/Modal';
import ServerCreateModal from "../ServerCreateModal"
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';


const AddServerButton = () => {
  const ulRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const containerStyle = {
    backgroundColor: 'rgb(30, 31, 34)',
  };

  return (
    <div className='serverTile group relative overflow-hidden' style={containerStyle}>
      <button
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out">
        <OpenModalMenuItem
          className="text-green-500 text-2xl"
          itemText="+"
          onItemClick={closeMenu}
          modalComponent={<ServerCreateModal />}
        />
      </button>
    </div>
  );
};

export default AddServerButton;
