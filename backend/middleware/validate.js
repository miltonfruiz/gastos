const { check, body, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'registro':
      return [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({ min: 8 }),
        body('email').custom((value) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) {
            throw new Error('El email no es válido');
          }
          return true;
        }),
      ];

    case 'login':
      return [
        check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
      ];

    default:
      return [];
  }
};

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = { validate, validarCampos };