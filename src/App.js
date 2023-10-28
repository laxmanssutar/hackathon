import "./App.scss";
import SelectBox from "./components/SelectBox";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import PermanentDrawerLeft from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="mainWrapper">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
