import { httpResponse } from './http-response.js';

export const validateField = (field, message, res) => {

  try {
    if(!field) {
      return httpResponse(422, message, res);
    }
  } catch (err) {
    return httpResponse(422, 'Error: ', res, err);
  };
};
