import React, { useState } from 'react';
import { useModal } from '../../../context/Modal';
import ChannelCreateModal from '../ChannelCreateModal/ChannelCreateModal';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';

const AddChannelButton = () => {
  const { showModal } = useModal();

  return (
    <div className='serverTile group relative overflow-hidden'>
      <button
        className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={() => showModal(<ChannelCreateModal />)}
      >
        +
      </button>
    </div>
  );
};

export default AddChannelButton;
