import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user.userData);

  useEffect(() => {

  }, [currentUser])

  return currentUser ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
