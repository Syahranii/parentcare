// src/utils/validator.js

const { ZodError } = require('zod');

/**
 * Validasi input data menggunakan schema dari Zod.
 * @param {ZodSchema} schema 
 * @param {any} payload 
 * @returns {Object} - data valid
 * @throws {Error} - jika data tidak valid
 */
const validate = (schema, payload) => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.errors.map((err) => err.message).join(', ');
      throw new Error(`Validation error: ${issues}`);
    }
    throw error;
  }
};

module.exports = { validate };
