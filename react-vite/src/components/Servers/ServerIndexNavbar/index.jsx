import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ServerIndexItem from '../ServerIndexItem/index';
import AddServerButton from '../AddServerButton/AddServerButton';
import UserSettingModal from '../../Users/UserSettingModel';
import { thunkLogout} from '../../../redux/session';
import { thunkFetchServers } from '../../../redux/server';
import UserSettingButton from '../../Users/UserSettingButton';

const ServerIndex = ({ num }) => {
  const allServers = useSelector(state => state.server.servers) || [];
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    setIsLoading(false);
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

  useEffect(() => {
    dispatch(thunkFetchServers());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  if (sessionUser) {
    return (
      <div className='serverIndexWrapper'>
        <div className='serverIndexItem-2'>
          <ul className='landingServerIndex flex flex-row' ref={ulRef}>
            {num !== 4 && allServers.map((server, index) => (
              <ServerIndexItem server={server} key={index} />
            ))}
            <li>
              <AddServerButton />
            </li>
            <li>
              <UserSettingButton/>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}

export default ServerIndex;
