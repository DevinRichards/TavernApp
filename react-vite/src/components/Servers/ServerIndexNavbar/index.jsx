import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ServerIndexItem from '../ServerIndexItem/index';
import AddServerButton from '../AddServerButton/AddServerButton';


const ServerIndex = ({ servers, num }) => {
  const allServers = useSelector(state => state.server?.servers) || {};
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);;
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='serverIndexWrapper'>
      {num !== 4 && <div className='serverIndexItem-1'></div>}
      <div className='serverIndexItem-2'>
        {num !== 4}
        <ul className='landingServerIndex' ref={ulRef}>
          {num !== 4 && Object.values(allServers).map((server, index) => (
            <ServerIndexItem server={server} key={index} />
          ))}
          <li>
            <AddServerButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ServerIndex;
