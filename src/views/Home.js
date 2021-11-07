import Header from '../components/Header';
import HomeContent from '../components/HomeContent';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="App">
      <Header />
      <HomeContent />
    </div>
  );
}

export default Home;