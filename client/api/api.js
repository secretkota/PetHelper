import axios from "axios";


// const URL = "http://192.168.1.101:8000"; 

const URL = "http://10.22.242.146:8000"; 

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/user/register`, userData);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to register user");
    } else {
      throw new Error("Network error");
    }
  }
};


const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/user/login`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to login user");
    } else {
      throw new Error("Network error");
    }
  }
}


const getCategories = async () => {
  try {
    const response = await axios.get(`${URL}/pet/categories`)
    
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to get categories");
    } else {
      throw new Error("Network error")
    }
  }
}

export { 
  registerUser,
  loginUser,
  getCategories
};