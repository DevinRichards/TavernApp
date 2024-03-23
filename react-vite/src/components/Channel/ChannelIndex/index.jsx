import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannels } from '../../../redux/channel';
import ChannelIndexItem from "../ChannelIndexItem"
import AddChannelButton from '../AddChannelButton/AddChannel';

const ChannelIndex = ({ num, selectedServer, currentChannel, setCurrentChannel}) => {
  const dispatch = useDispatch();
  const allChannels = useSelector(state => state.channel?.channels) || {};
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (selectedServer) {
      dispatch(thunkFetchChannels(selectedServer.id)).then(() => setIsLoading(false));
    }
  }, [dispatch, selectedServer]);

  const handleChannelSelect = () => {
    setCurrentChannel(currentChannel);
  };


  if (isLoading) return <>Loading...</>;

  return (
    <div className='text-white h-screen' style={{ backgroundColor: 'rgb(43,45,49)' }}>
      {num !== 4 && <div className='channelIndexItem-1'></div>}
      <div className='channelIndexItem-2 px-3 py-2'>
        {num !== 4 && (
          <div className="flex items-center list-none">
            <h2 className='text-xs font-bold uppercase text-gray-400 mr-2'>{selectedServer ? `Channels for ${selectedServer.name}` : 'Please select a server'}</h2>
            <AddChannelButton />
          </div>
        )}
        <ul className='landingChannelIndex'>
          {num !== 4 && Object.values(allChannels).map((channel, index) => (
            (!selectedServer || channel.serverId === selectedServer.id) && (
              <li key={index} className="flex items-center py-1 hover:bg-gray-700 rounded cursor-pointer">
                <ChannelIndexItem channel={channel} key={channel.id} currentChannel = {currentChannel} setCurrentChannel = {setCurrentChannel}/>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelIndex;
