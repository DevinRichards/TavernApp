import './ServerIndexItem.css';
import { Link } from 'react-router-dom';

const ServerIndexItem = ({ server }) => {
  console.log("Server in ServerIndexItem:", server);
  const { id, name, profilePictureUrl } = server;

  return (
    <div className='serverTile'>
      <Link id="serverLinkWithText" to={`/servers/${server.id}`} key={`${id}`}>
        <div id="serverGrid1">
          <div id="serverItem1">
            <img id="serverImage" src={profilePictureUrl} alt="server" />
          </div>
          <div id="serverItem2">
            {name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServerIndexItem;
