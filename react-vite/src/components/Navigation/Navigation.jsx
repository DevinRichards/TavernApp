import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ServerIndexItem from '../Servers/ServerIndexItem';
import ServerCreateModal from '../Servers/ServerCreateModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ProfileButton from './ProfileButton';

const Navigation = () => {
  const allServers = useSelector(state => state.server?.servers) || {};
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="navigationWrapper">
      <ul className="flex flex-col space-y-4">
        <li className="mb-4">
          <NavLink to="/" className="text-blue-500 hover:underline">
            Home
          </NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>

      <div className="serverIndexWrapper">
        <div className="serverIndexItem-2">
          <h2>All Servers:</h2>
          <ul className="landingServerIndex" ref={ulRef}>
            {Object.values(allServers).map((server, index) => (
              <ServerIndexItem server={server} key={index} />
            ))}
          </ul>
          <ul>
            <OpenModalMenuItem
              itemText="+"
              onItemClick={closeMenu}
              modalComponent={<ServerCreateModal />}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
