export const httpResponse = (httpCode, message, res, err) => {

  try {
    if(err) {
      return res.status(httpCode).json({ message: message, error: err.message });
    } else {
      return res.status(httpCode).json({ message: message });
    };
  } catch(err) {
    return res.status(httpCode).json({ error: `Error in httpResponse() function. ${err.message}` });
  };
};
