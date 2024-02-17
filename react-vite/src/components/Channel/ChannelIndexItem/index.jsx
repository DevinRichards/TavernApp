import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import ChannelSettingButton from '../ChannelSettingButton/ChannelSettingButton';
import { thunkFetchChannels } from '../../../redux/channel';

const ChannelIndexItem = ( props ) => {
  const { id, name, description } = props.channel;

  const handleClick = (e) => {
    e.preventDefault();
  };


  return (
    <div className='channelTile'>
      <Link id="channelLinkWithText" to={`/channels/${props.channel.id}`} key={`${id}`}>
        <div className="flex items-center">
          <div>
            <h2>{name}</h2>
          </div>
          <div className="ml-2" onClick={handleClick}>
            <ChannelSettingButton channel = {props.channel} />
          </div>
        </div>
        <div>{description}</div>
      </Link>
    </div>
  );
};

export default ChannelIndexItem;
