export const getToken = ()=>localStorage.getItem("jwtToken")
export const setToken = (token)=>localStorage.setItem("jwtToken",token)