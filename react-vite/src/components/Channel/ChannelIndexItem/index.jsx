import './ChannelIndexItem.css';
import { Link } from 'react-router-dom';

const ChannelIndexItem = ({ channel }) => {
  console.log("Channel in ChannelIndexItem:", channel);
  const { id, name, description } = channel;

  return (
    <div className='channelTile'>
      <Link id="channelLinkWithText" to={`/channels/${channel.id}`} key={`${id}`}>
        <div id="channelGrid1">
          <div id="channelItem1">
          </div>
          <div id="channelItem2">
            {name}
          </div>
          <div id="channelItem3">
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChannelIndexItem;
