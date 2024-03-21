import React, { useEffect, useState } from 'react';
import ChannelSettingButton from '../ChannelSettingButton/ChannelSettingButton';
import { thunkFetchChannels } from '../../../redux/channel';

const ChannelIndexItem = (props) => {
  const { id, name, description} = props.channel;
  const {setCurrentChannel, currentChannel} = props

  const handleChannelSelect = () => {
    setCurrentChannel(id);
  };
  console.log("This is the current Channel in channel index Item",currentChannel)


  return (
    <div className='channelTile'>
      <div id="channelLinkWithText" onClick={handleChannelSelect} >
        <div className="flex items-center">
          <div>
            <h2>{name}</h2>
          </div>
          <div className="ml-2">
            <ChannelSettingButton channel={props.channel} />
          </div>
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default ChannelIndexItem;
