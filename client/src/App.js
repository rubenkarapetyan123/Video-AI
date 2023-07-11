import { BrowserRouter } from "react-router-dom"
import './App.css';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./routing/Router";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header/>
        <Router/>
        {/* <Footer/>  */}
      </main>
      
    </BrowserRouter>
  );
}

export default App;
