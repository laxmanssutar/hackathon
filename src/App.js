import './App.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PermanentDrawerLeft from './pages/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='mainWrapper'>
        {/* <Sidebar/> */}
        {/* <PermanentDrawerLeft /> */}
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
