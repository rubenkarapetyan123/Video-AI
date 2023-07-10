import { BrowserRouter } from "react-router-dom"
import './App.css';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./routing/Router";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Router/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
