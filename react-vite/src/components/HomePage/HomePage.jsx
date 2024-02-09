import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ServerIndex from '../Servers/ServerIndex';
import { thunkLogout } from "../../redux/session";
import ChannelIndex from '../Channel/ChannelIndex'


const HomePage = () => {
  const [selectedServer, setSelectedServer] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <ServerIndex onSelect={handleServerSelect} />
      </div>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default HomePage;
