const Phone = require("../models/Phone");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

const telnyxToken = process.env.TELNYX_API_KEY;
const telnyxBaseUrl = process.env.TELNYX_BASE_URL;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${telnyxToken}`,
};

const validateTelnyxKey = (res) => {
  if (!telnyxToken) {
    res.status(400).json({
      error: 'Missing Telnyx API key. Set TELNYX_API_KEY in backend .env file.'
    });
    return false;
  }
  return true;
};

const getAvailablePhoneNumbers = asyncHandler(async (req, res) => {
  if (!validateTelnyxKey(res)) return;

  const { size, number } = req.query;
  const params = {};
  if (size) params['page[size]'] = size;
  if (number) params['page[number]'] = number;

  try {
    const resp = await axios.get(`${telnyxBaseUrl}/available_phone_numbers`, {
      headers,
      params,
    });
    return res.status(200).json(resp.data);
  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: 'Telnyx API error',
      details: err.response?.data || err.message,
    });
  }
});

const getOwnedPhoneNumbers = asyncHandler(async (req, res) => {
  if (!validateTelnyxKey(res)) return;

  try {
    const resp = await axios.get(`${telnyxBaseUrl}/phone_numbers`, {
      headers,
    });
    return res.status(200).json(resp.data);
  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: 'Telnyx API error',
      details: err.response?.data || err.message,
    });
  }
});

const getAccountBalance = asyncHandler(async (req, res) => {
  if (!validateTelnyxKey(res)) return;

  try {
    const resp = await axios.get(`${telnyxBaseUrl}/balance`, {
      headers,
    });
    const balance = resp?.data?.data?.balance;
    return res.status(200).json({ balance });
  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: 'Telnyx API error',
      details: err.response?.data || err.message,
    });
  }
});

const createNewPhoneNumber = asyncHandler(async (req, res) => {
  const { telnyxId, phone_number, status, purchased_at, assignedTo, ownerAccount } = req.body;

  if (!telnyxId || !phone_number) {
    return res.status(400).json({
      error: "telnyxId and phone_number are required to create a phone entry."
    });
  }

  try {
    const newPhone = await Phone.create({
      telnyxId,
      phoneNumber: phone_number,
      status: status || "active",
      // TODO: change this to real owner id when log in is available
      ownerAccount: ownerAccount || "Temp Nina Owner" || null,  
      assignedTo: assignedTo || null,
      purchasedAt: purchased_at || Date.now()
    });

    return res.status(201).json({
      message: "Phone number saved to database successfully.",
      phone: newPhone,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to create phone number in database.",
      details: err.message
    });
  }
});

const getPhoneNumbersFromDB = asyncHandler(async (req, res) => {
  try {
    const phones = await Phone.find();
    return res.status(200).json({
      message: "Phone numbers fetched successfully.",
      data: phones,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch phone numbers from database.",
      details: err.message,
    });
  }
});

module.exports = {
  getAvailablePhoneNumbers,
  getOwnedPhoneNumbers,
  getAccountBalance,
  createNewPhoneNumber,
  getPhoneNumbersFromDB,
};
