const sanitizeString = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
};

export { sanitizeString };
