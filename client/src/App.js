import { BrowserRouter } from "react-router-dom"
import './App.css';
import Header from "./components/header/Header";
import Router from "./routing/Router";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Router/>
    </BrowserRouter>
  );
}

export default App;
