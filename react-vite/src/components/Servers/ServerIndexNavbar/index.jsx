import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ServerIndexItem from '../ServerIndexItem/index';
import AddServerButton from '../AddServerButton/AddServerButton';
import { thunkLogout } from '../../../redux/session';

const ServerIndex = ({ servers, num }) => {
  const allServers = useSelector(state => state.server?.servers) || {};
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null)
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    setIsLoading(false);
    setSelectedServer(Object.values(allServers)[0]?.id); // Select the first server
  }, [allServers]);

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

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    navigate("/login");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='serverIndexWrapper'>
      <div className='serverIndexItem-2'>
        <ul className='landingServerIndex flex flex-row' ref={ulRef}>
          {num !== 4 && Object.values(allServers).map((server, index) => (
            <ServerIndexItem server={server} key={index} />
          ))}
          <li>
            <AddServerButton />
          </li>
          <li>
            <button className="p- bg-red-500 text-white" onClick={logout}>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ServerIndex;

