export const getToken = ()=>{
  const token = localStorage.getItem("jwtToken")
  return token
}
export const setToken = (token)=>{
  localStorage.setItem("jwtToken",token)
}