import React from 'react';
import { Link } from 'react-router-dom';
import ChannelSettingButton from '../ChannelSettingButton/ChannelSettingButton';

const ChannelIndexItem = ({ channel }) => {
  console.log("Channel in ChannelIndexItem:", channel);
  const { id, name, description } = channel;

  return (
    <div className='channelTile'>
      <Link id="channelLinkWithText" to={`/channels/${channel.id}`} key={`${id}`}>
        <div className="flex items-center"> 
          <div>
            <h2>{name}</h2>
          </div>
          <div className="ml-2">
            <ChannelSettingButton />
          </div>
        </div>
        <div>{description}</div>
      </Link>
    </div>
  );
};

export default ChannelIndexItem;
