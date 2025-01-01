import axios from "axios"

axios.defaults.baseURL = "https://demo-api.tarifftales.com";
// axios.defaults.baseURL = "http://localhost:7005";

// axios.defaults.headers.common["Authorization"] = `${token}`

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const removequote = JSON.parse(token)
    if (token) {
      config.headers["Authorization"] = removequote;
    }
    return config;
  },
  (error) => {
    console.log(error,"error");
    if (error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    console.log(error,"error");
    if (error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/logout';
    }
    return Promise.reject(error)
  }
)
export default axiosInstance;
export async function getWithOutAuth(url, config = {}) {
  return await axios.get(url, { ...config }).then(response => response.data)
}
export async function get(url, config = {}) {
  return await axiosInstance.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosInstance
    .post(url, data, { ...config })
    .then(response => response.data)
}
export async function postFormData(url, data, config = {}) {
  return axiosInstance
    .post(url, data, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosInstance
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosInstance
    .delete(url, { ...config })
    .then(response => response.data)
}
