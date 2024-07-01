import React from 'react';
import { toast } from 'react-toastify';

const ValidationComponent = ({ value, minLength, regex, errorMessage }) => {
  if (minLength && value.length < minLength) {
    toast.error(`${errorMessage} must be at least ${minLength} characters.`);
    return false;
  }

  if (regex && !regex.test(value)) {
    toast.error(`Please enter a valid ${errorMessage}.`);
    return false;
  }

  return true;
};

export default ValidationComponent;
