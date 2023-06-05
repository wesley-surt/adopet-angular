export const httpResponse = (httpCode, message, res, option) => {

  try {
    if(option.message) {
      return res.status(httpCode).json({ message: message, error: option.message });
    }
    else if(option) {
      return res.status(httpCode).json({ message: message, object: option });
    }
    else {
      return res.status(httpCode).json({ message: message });
    };
  } catch(err) {
    return res.status(httpCode).json({ error: `Error in httpResponse() function. ${ err.message }` });
  };
};
