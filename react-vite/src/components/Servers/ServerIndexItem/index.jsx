import { Link } from 'react-router-dom';

const ServerIndexItem = ({ server }) => {
  console.log("Server in ServerIndexItem:", server);
  const { id, name, profilePictureUrl } = server;

  return (
    <div className='serverTile group relative overflow-hidden'>
      <Link id="serverLinkWithText" to={`/servers/${server.id}`} key={`${id}`}>
        <div id="serverGrid1">
          <div id="serverItem1">
            <img id="serverImage" src={profilePictureUrl} alt="server" />
          </div>
          <div id="serverItem2" className="serverName opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0 flex items-center justify-center">
            {name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServerIndexItem;
