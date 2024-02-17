import React from 'react';
import { Link } from 'react-router-dom';

const ServerIndexItem = ({ server }) => {
  const { id, name, profilePictureUrl } = server;

  const containerStyle = {
    backgroundColor: 'rgb(30, 31, 34)',
  };

  return (
    <div className='serverTile group relative overflow-hidden w-full' style={containerStyle}>
      <Link id="serverLinkWithText" to={`/servers/${server.id}`} key={`${id}`}>
        <div id="serverGrid1" className="flex items-center">
          <div id="serverItem1" className="relative">
            <img id="serverImage" src={profilePictureUrl} alt="server" className='rounded-full h-10 w-10 hover:rounded-md transition-all duration-300 ease-in-out' />
            <div className="serverDialog hidden bg-black text-white p-2 absolute left-10 top-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              {name}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServerIndexItem;
