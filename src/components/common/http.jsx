export const apiUrl = "http://localhost:8000/api";

export const adminToken = () => {
  const data = JSON.parse(localStorage.getItem("adminInfo"))
//   const adminData = JSON.parse(data);
  return data.token;
};

export const userToken = () => {
  const data = JSON.parse(localStorage.getItem("userInfo"))
//   const userData = JSON.parse(data);
  return data.token;
};
