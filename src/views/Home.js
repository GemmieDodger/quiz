import React from "react";
import Header from '../components/Header';
import HomeContent from '../components/HomeContent';
import ErrorMessage from "../components/ErrorMessage";
import {useAuth } from "../authProvider";

const Home = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
       <ErrorMessage type="general" />
    )
  }

  return (
    <div className="App">
      <Header user={user} logout={logout}/>
      <HomeContent user={user}/>
    </div>
  );
}

export default Home;