const validateSchema = (schema) => (req, _res, next) => {
  const unparsed = { ...req.body, ...req.params };
  req.parsed = schema.parse(unparsed);
  next();
};

export default validateSchema;
