const Joi = require("joi");
const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(item => ({
        [item.context.label]: item.message
      }));

      res.status(422).json({ error: message });
    }
  };
};
module.exports = middleware;
