import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchServers } from '../../redux/server';
import { setChannels, thunkFetchChannels } from '../../redux/channel';
import ServerIndex from '../Servers/ServerIndexNavbar';
import ChannelIndex from "../Channel/ChannelIndex"
import { thunkLogout } from "../../redux/session";
import { Outlet } from 'react-router-dom';
import ServerDetail from '../Servers/ServerDetail/ServerDetail';

const HomePage = () => {
  const [selectedServer, setSelectedServer] = useState(null);
  const channels = useSelector(state => state.channel?.channels) || {};
  const [servers, setServers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchServers())
      .then(servers => {
        setServers(servers);
        setIsLoading(false);
      })
      .then(
        dispatch(thunkFetchChannels())
        .then(channels =>{
          setChannels(channels);
          setIsLoading(false)
        }))
      .catch(error => {
        console.error("Error fetching servers:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for servers */}
      <div className="w-16 md:w-16 bg-gray-800 overflow-y-auto">
        {isLoading ? <p>Loading...</p> : <ServerIndex servers={servers} onSelect={handleServerSelect} />}
      </div>

      {/* Main content area */}
      <div className="flex-grow bg-gray-100">
        <ServerDetail/>

      </div>
      <button className="p-2 bg-red-500 text-white absolute bottom-0" onClick={logout}>Log Out</button>
    </div>
  );
};

export default HomePage;
