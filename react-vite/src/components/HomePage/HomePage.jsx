import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchServers } from '../../redux/server';
import { setChannels, thunkFetchChannels } from '../../redux/channel';
import ServerIndex from '../Servers/ServerIndexNavbar';
import ChannelIndex from "../Channel/ChannelIndex"
import { thunkLogout } from "../../redux/session";

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
    <div className="homeWrapper">
      {/* Left-hand side */}
      <div className="leftSide">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <ServerIndex servers={servers} onSelect={handleServerSelect} />
        )}
      </div>
      <div>
        <ChannelIndex channels = {channels} selectedServer={selectedServer}/>
      </div>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default HomePage;
