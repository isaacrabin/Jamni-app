import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  coerceTypes: true,

  // IMPORTANT: OpenAPI schemas are not pure JSON schema
  strict: false,
});

addFormats(ajv);

export default ajv;
