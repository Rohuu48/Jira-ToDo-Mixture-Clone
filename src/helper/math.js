export const generateRandomId = (digits = 6) => {
  let id = '';
  for (let i = 0; i < digits; i++) {
    id += Math.ceil(Math.random() * 10);
  }
  return id;
};
