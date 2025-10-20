import axios from "axios";

const LOCAL_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


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

export {
    getOwnedPhoneNumbers,
    getAvailablePhoneNumbers,
    getAccountBalance,
    createNewPhoneNumber,
    getPhoneNumbersFromDB,
};
