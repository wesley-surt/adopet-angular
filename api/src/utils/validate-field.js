export const validateField = (field, message, res) => {

  try {
    if(!field) {
      return res.status(422).json({ message: message });
    };

    return;

  } catch (err) {
    return res.status(500).json( { message: 'Erro interno - ' + err.message });
  };
};
