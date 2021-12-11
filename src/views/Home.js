import React from "react";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import Loading from "../components/Loading";
import { useAuth } from "../authProvider";

const Home = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="App">
        <Header user={user} logout={logout} />
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} logout={logout} />
      <HomeContent user={user} />
    </div>
  );
};

export default Home;
