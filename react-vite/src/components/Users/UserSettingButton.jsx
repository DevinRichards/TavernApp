import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UserSettingModal from './UserSettingModel';


const UserSettingButton = () => {
  const buttonRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const closeMenu = (e) => {
    if (!buttonRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleFetchUser = async (userId) => {
    try {
      await dispatch(thunkFetchUserById(userId));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleClick = () => {
    setShowMenu(!showMenu);
    if (currentUser) {
      handleFetchUser(currentUser.id);
    }
  }
  const containerStyle = {
    backgroundColor: 'rgb(43,45,49)',
  };

  return (
    <div className='relative'style={containerStyle}>
      <button
        ref={buttonRef}
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={handleClick}
      >
      <OpenModalMenuItem
        itemText="≡"
        onItemClick={closeMenu}
        modalComponent={showMenu ? <UserSettingModal user={currentUser} /> : null}
      />
      </button>
    </div>
  );
};

export default UserSettingButton;
