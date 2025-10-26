import axios from "axios";

const LOCAL_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${LOCAL_BACKEND_URL}/user/login`, { username, password });
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const res = await axios.get(`${LOCAL_BACKEND_URL}/user`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const res = await axios.post(`${LOCAL_BACKEND_URL}/user`, userData);
    return res.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUserRole = async (username, role) => {
  try {
    const res = await axios.put(`${LOCAL_BACKEND_URL}/user/${username}/role`, { role });
    return res.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

const updateUserInfo = async (username, updatedData) => {
  try {
    const res = await axios.put(`${LOCAL_BACKEND_URL}/user/${username}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

const getOwnedPhoneNumbers = async () => {
    try {
        const res = await axios.get(`${LOCAL_BACKEND_URL}/phone/phone_numbers`);
        return res.data;
    } catch (error) {
        console.error("Error fetching owned phone numbers:", error);
        throw error;
    }
};

const getAvailablePhoneNumbers = async (filters = {}) => {
    const res = await axios.get(`${LOCAL_BACKEND_URL}/phone/available_phone_numbers`);
    return res.data;
};

const getAccountBalance = async () => {
    try {
        const res = await axios.get(`${LOCAL_BACKEND_URL}/phone/balance`);
        console.log("res: ", res)
        console.log("res.data: ", res.data)
        return res.data;
    } catch (error) {
        console.error("Error fetching owned phone numbers:", error);
        throw error;
    }
};

const createNewPhoneNumber = async (phoneData) => {
    try {
        const res = await axios.post(
            `${LOCAL_BACKEND_URL}/phone/db/create_phone_number`,
            phoneData,
        );
        return res.data;
    } catch (error) {
        console.error("Error creating new phone number:", error);
        throw error;
    }
};

const getPhoneNumbersFromDB = async () => {
    try {
      const res = await axios.get(`${LOCAL_BACKEND_URL}/phone/db/phone_numbers`);
      return res.data;
    } catch (error) {
      console.error("Error fetching phone numbers from DB:", error);
      throw error;
    }
};

const getAvailablePhoneNumbersFromDB = async () => {
    try {
      const res = await axios.get(`${LOCAL_BACKEND_URL}/phone/db/available_phone_numbers`);
      return res.data;
    } catch (error) {
      console.error("Error fetching phone numbers from DB:", error);
      throw error;
    }
};

export {
    // -------------- Telnyx api --------------
    getOwnedPhoneNumbers,
    getAvailablePhoneNumbers,
    getAccountBalance,
    createNewPhoneNumber,
    
    // -------------- DB api --------------
    
    // Users
    loginUser,
    getUsers,
    createUser,
    updateUserRole,
    updateUserInfo,

    // Phone Numbers
    getPhoneNumbersFromDB,
    getAvailablePhoneNumbersFromDB,
};
