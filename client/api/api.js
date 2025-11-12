import axios from "axios";


const URL = "http://192.168.1.101:8000";

// const URL = "http://10.22.242.146:8000"; 

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error");
    }
  }
}

const loginUser = async (userData) => {
  console.log(userData)
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

const createPet = async (petData, imageUri, token) => {
  const formData = new FormData();

  formData.append("owner_id", petData.owner_id)
  formData.append("name", petData.name.trim())
  formData.append("type", petData.type)
  formData.append("age", petData.age.toString())
  formData.append("desc", petData.desc.trim())

  if (imageUri) {
    formData.append("image", {
      uri: imageUri,
      name: "pet.jpg",
      type: "image/jpeg",
    });
  }

  try {
    const response = await axios.post(`${URL}/pet`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to create pet");
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
const getAllPets = async (token) => {
  try {
    const response = await axios.get(`${URL}/pet`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })

    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to get pet");
    } else {
      throw new Error("Network error")
    }
  }
}

export {
  registerUser,
  loginUser,
  createPet,
  getAllPets,
  getCategories
};