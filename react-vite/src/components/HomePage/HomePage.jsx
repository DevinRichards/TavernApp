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
      // After fetching servers
      .then(servers => {
        setServers(servers);
        setIsLoading(false);
      })

      .then(
        dispatch(thunkFetchChannels())
          .then(channels => {
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
      <div className="flex-grow bg-gray-100">
        <ServerDetail />
      </div>
    </div>
  );
};

export default HomePage;
