const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contacts = require('../../models/contacts');
const {createError} = require('../../helpers');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/).required()
})

router.get('/', async (req, res, next) => {
  try {
  const result = await contacts.listContacts();
  res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
  const { contactId } = req.params;
  const result = await contacts.getById(contactId);
  if(!result) {
    throw createError(404);
  }
  res.json(result)
  } catch (error) {
  next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
     const { error } = contactSchema.validate(req.body);
     if (error) {
      throw createError(400, error.message)
     }
     const result = await contacts.addContact(req.body);
     res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
 try {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if(!result) {
    throw createError(404);
  }
  res.json({
    message: "contact deleted"
  });
 } catch (error) {
  next(error);
 }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
     throw createError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404);
    }
    res.status(201).json(result);
 } catch (error) {
   next(error);
 }
})

module.exports = router
