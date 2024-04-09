import * as Joi from '@hapi/joi';
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

export default {
  userCredential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  signup: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .doesNotInclude(['password'])
      .messages({
        'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
        'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
        'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
        'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
        'password.noWhiteSpaces': '{#label} should not contain white spaces',
        'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        'password.doesNotInclude': '{#label} is too common',
      })
			.required(),

  }),
  taskCreate: Joi.object().keys({
    title: Joi.string().min(3).max(500).required(),
    description: Joi.string().min(3).max(2000).required(),
    dueDate: Joi.date().iso().required(),
    createdBy: Joi.string().min(24).required(),
		isCompleted: Joi.boolean().required(),
  }),
  taskUpdate: Joi.object().keys({
    title: Joi.string().min(3).max(500).required(),
    description: Joi.string().min(3).max(2000).required(),
    dueDate: Joi.date().iso().required(),
    createdBy: Joi.string().min(24).required(),
		isCompleted: Joi.boolean().required(),
		id: Joi.string().min(24).required(),
  }),
};
