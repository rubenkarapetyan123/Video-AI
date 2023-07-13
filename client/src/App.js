import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom"
import './App.css';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./routing/Router";
import { getToken } from "./utils/api-utils";

export const UserContext = createContext(null)


function App() {
  const [user, setUser] = useState({
    isAuth : false
  })

  useEffect(()=>{
    async function checkUser (){
      const token = getToken()
      try{
        const response = await fetch("/isauth",{headers : {"Authorization" : `Bearer ${token}`}})
        const res = await response.json()
        console.log(res);
        if(res.access){
          setUser({
            isAuth : true,
            username : res.username
          })
        }
      }catch(err){
        console.log(err);
      }
    }

    checkUser()
    
  },[])
  return (
    <UserContext.Provider value={{user,setUser}}>
      <BrowserRouter>
        <main>
          <Header/>
          <Router/>
          {/* <Footer/>  */}
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
