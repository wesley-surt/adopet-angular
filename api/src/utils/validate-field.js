import { httpResponse } from './http-response.js';

export const validateField = (field, message, res) => {

  try {
    if(!field) {
      return res.status(404).json({ message: message });
    };

  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
};
