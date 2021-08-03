export const verifyEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const verifyName = (name) => {
  const minLengthName = 6;
  if (name.length >= minLengthName) {
    return true;
  }
  return false;
};
