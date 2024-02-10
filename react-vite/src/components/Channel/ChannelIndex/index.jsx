import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannels } from '../../../redux/channel';

const ChannelIndex = ({ num, selectedServer }) => {
  const dispatch = useDispatch();
  const allChannels = useSelector(state => state.channel?.channels) || {};
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedServer) {
      // Fetch channels for the selected server only
      dispatch(thunkFetchChannels(selectedServer.id)).then(() => setIsLoading(false));
    } else {
      // Fetch all channels if no server is selected
      dispatch(thunkFetchChannels()).then(() => setIsLoading(false));
    }
  }, [dispatch, selectedServer]);

  if (isLoading) return <>Loading...</>;

  return (
    <div className='channelIndexWrapper'>
      {num !== 4 && <div className='channelIndexItem-1'></div>}
      <div className='channelIndexItem-2'>
        {num !== 4 && <h2>{selectedServer ? `Channels for ${selectedServer.name}` : 'All Channels'}</h2>}
        <ul className='landingChannelIndex'>
          {num !== 4 && Object.values(allChannels).map((channel, index) => (
            // Render channels based on the selected server
            (!selectedServer || channel.serverId === selectedServer.id) && (
              <ChannelIndexItem channel={channel} key={index} />
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelIndex;
