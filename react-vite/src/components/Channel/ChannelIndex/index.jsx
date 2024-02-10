import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannels } from '../../../redux/channel';
import ChannelIndexItem from "../ChannelIndexItem"

const ChannelIndex = ({ num, selectedServer }) => {
  const dispatch = useDispatch();
  const allChannels = useSelector(state => state.channel?.channels) || {};
  const [isLoading, setIsLoading] = useState(true);

  console.log("This is selectedServer:", selectedServer)

  useEffect(() => {
    if (selectedServer) {
      dispatch(thunkFetchChannels(selectedServer.id)).then(() => setIsLoading(false));
    }
  }, [dispatch, selectedServer]);

  if (isLoading) return <>Loading...</>;

  return (
    <div className='bg-gray-800 text-white h-screen'> {/* Add this class */}
      {num !== 4 && <div className='channelIndexItem-1'></div>} {/* Add specific Tailwind classes */}
      <div className='channelIndexItem-2 px-3 py-2'> {/* Add px and py classes */}
        {num !== 4 && <h2 className='text-xs font-bold uppercase text-gray-400'>{selectedServer ? `Channels for ${selectedServer.name}` : 'All Channels'}</h2>} {/* Style the header */}
        <ul className='landingChannelIndex'>
          {num !== 4 && Object.values(allChannels).map((channel, index) => (
            (!selectedServer || channel.serverId === selectedServer.id) && (
              <li key={index} className="flex items-center py-1 hover:bg-gray-700 rounded cursor-pointer"> {/* Add these classes to each list item */}
                <ChannelIndexItem channel={channel} key={channel.id} />
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelIndex;
