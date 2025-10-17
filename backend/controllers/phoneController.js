const asyncHandler = require("express-async-handler");
const Record = require('../models/Record');

// @desc get available phone numbers
// @route GET https://api.telnyx.com/v2/available_phone_numbers
// @access Private
const getAvailablePhoneNumbers = asyncHandler(async (req, res) => {
    const headerAuth = req.headers.authorization || '';
    const headerToken = headerAuth.startsWith('Bearer ') ? headerAuth.slice(7) : null;
    const telnyxToken = process.env.REACT_APP_TELNYX_API_KEY || headerToken;
    console.log("telnyxToken: ", telnyxToken);
  
    if (!telnyxToken) {
      return res.status(400).json({
        error: 'Missing Telnyx API key. Set TELNYX_API_KEY in .env or send Authorization: Bearer <TOKEN> header.'
      });
    }
  
    const { size, number } = req.query;
    const params = {};
    if (size) params['page[size]'] = size;
    if (number) params['page[number]'] = number;
  
    try {
      const resp = await axios.get('https://api.telnyx.com/v2/available_phone_numbers', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${telnyxToken}`,
        },
        params,
      });
  
      return res.status(200).json(resp.data);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).json({
          error: 'Telnyx API error',
          details: err.response.data?.errors || err.response.data || err.message,
        });
      }
      return res.status(500).json({ error: 'Failed to call Telnyx', details: err.message });
    }
});

// @desc get owned phone numbers
// @route GET https://api.telnyx.com/v2/phone_numbers
// @access Private
const getOwnedPhoneNumbers = asyncHandler(async (req, res) => {
    const headerAuth = req.headers.authorization || '';
    const headerToken = headerAuth.startsWith('Bearer ') ? headerAuth.slice(7) : null;
    const telnyxToken = process.env.TELNYX_API_KEY || headerToken;
    console.log("telnyxToken: ", telnyxToken);
  
    if (!telnyxToken) {
      return res.status(400).json({
        error: 'Missing Telnyx API key. Set TELNYX_API_KEY in .env or send Authorization: Bearer <TOKEN> header.'
      });
    }
  
    const { size, number } = req.query;
    const params = {};
    if (size) params['page[size]'] = size;
    if (number) params['page[number]'] = number;
  
    try {
      const resp = await axios.get('https://api.telnyx.com/v2/verified_numbers', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${telnyxToken}`,
        },
        params,
      });
  
      return res.status(200).json(resp.data);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).json({
          error: 'Telnyx API error',
          details: err.response.data?.errors || err.response.data || err.message,
        });
      }
      return res.status(500).json({ error: 'Failed to call Telnyx', details: err.message });
    }
});

module.exports = { getOwnedPhoneNumbers, getAvailablePhoneNumbers };
