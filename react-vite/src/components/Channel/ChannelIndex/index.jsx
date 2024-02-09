import './ChannelIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannels } from '../../../redux/channel';


const ChannelIndex = ({ num }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channel?.channels) || {};
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(thunkFetchChannels()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return <>Loading...</>;

  return (
    <div className='channelIndexWrapper'>
      {num !== 4 && <div className='channelIndexItem-1'>
      </div>}
      <div className='channelIndexItem-2'>
        {num !== 4 && <h2>{" "} All Channels:</h2>}
        <ul className='landingChannelIndex'>
          {num !== 4 && Object.values(channels).map((channel, index) => (
            <ChannelIndexItem channel={channel} key={index} />
          ))}
          {num === 4 && Object.values(channels).slice(0, 4).map((channel, index) => (
            <ChannelIndexItem channel={channel} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelIndex;
