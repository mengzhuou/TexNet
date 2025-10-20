const asyncHandler = require("express-async-handler");
const axios = require("axios");

const telnyxToken = process.env.TELNYX_API_KEY;

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
    const resp = await axios.get('https://api.telnyx.com/v2/available_phone_numbers', {
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
    const resp = await axios.get('https://api.telnyx.com/v2/phone_numbers', {
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
    const resp = await axios.get('https://api.telnyx.com/v2/balance', {
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

module.exports = {
  getAvailablePhoneNumbers,
  getOwnedPhoneNumbers,
  getAccountBalance,
};
