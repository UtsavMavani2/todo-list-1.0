const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).allow(""),
  priority: Joi.string().valid("low", "medium", "high").default("medium"),
  status: Joi.string().valid("pending", "completed").default("pending"),
  dueDate: Joi.date().greater("now").required(),
});

module.exports = { todoSchema };
