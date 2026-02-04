module.exports = {
  "*.{js,jsx,ts,tsx,json,md}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["eslint --fix --max-warnings 0 --no-warn-ignored"],
};
