import logo from './logo.svg';
import './scss/index.scss';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Home />
      <Profile />
    </div>
  );
}

export default App;
