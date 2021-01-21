export function isEmail(email: string): boolean {
  const regularExpression = /\S+@\S+\.\S+/;
  return regularExpression.test(email)
}

interface IErrors {
  [key: string]: string;
  email: string;
  address: string;
  phone: string;
  name: string;
};

export function validation (inputs: any): { valid: boolean, errors: any } {
  const { email, name, address, phone } = inputs;
  let errors: IErrors = {
    email: "",
    address: "",
    phone: "",
    name: "",
  };

  let valid: boolean = true;

  if ( email.length === 0 || email === '') {
    valid = false;
    errors['email'] = 'Email must be filled out';
  }

  if (email.length > 0 && !isEmail(email)) {
    valid = false;
    errors['email'] = 'Invalid email';
  }

  if (name.length === 0 || name === '') {
    valid = false;
    errors['name'] = 'Name must be filled out';
  }

  if (phone.length > 0 && phone.length < 9) {
    valid = false;
    errors['phone'] = 'Must be be of 9 digits'
  }

  if (address.length === 0 || address === '') {
    valid = false;
    errors['address'] = 'Address must be filled out';
  }
  return { valid, errors };
}