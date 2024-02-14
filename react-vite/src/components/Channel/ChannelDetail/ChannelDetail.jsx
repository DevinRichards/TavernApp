import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchChannelById } from '../../../redux/channel'; // Assuming you have a thunk for fetching channel by ID

const ChannelDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const channel = useSelector(state => state.channel?.currentChannel) || {};

  useEffect(() => {
    dispatch(thunkFetchChannelById(channelId))
      .then(() => setIsLoading(false));
  }, [dispatch, channelId]);

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <h1>Hello From Channel Detail Page</h1>
    </div>
  );
};

export default ChannelDetail;
