import { httpResponse } from './http-response.js';

export const validateField = (field, message, res) => {

  try {
    if(!field) {
      httpResponse(422, message, res);
    }
  } catch (err) {
    httpResponse(422, message, res);
  };
};
