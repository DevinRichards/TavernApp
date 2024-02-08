import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchServers} from '../../../redux/server';
import ServerIndexItem from '../ServerIndexItem/index';

const ServerIndex = ({ num }) => {
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server?.servers) || {};
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(thunkFetchServers()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return (<>Loading...</>);

  return (
    <div className='serverIndexWrapper '>
      {num !== 4 && <div className='serverIndexItem-1'>
      </div>}
      <div className='serverIndexItem-2'>
        {num !== 4 && <h2 >{" "} All Servers:</h2>}
        <ul className='landingServerIndex'>
          {num !== 4 && Object.values(servers).map((server, index) => (
            <ServerIndexItem server={server} key={index} />
          ))}
        </ul>
        <ul>
          create new server
        </ul>
      </div>
    </div>
  );
};

export default ServerIndex;
