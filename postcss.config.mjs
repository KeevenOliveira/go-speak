/** @type {import('postcss-load-config').Config} */
const config = {
  theme: {
    backgroundColor: () => ({
      "noble-black-900": "#060708",
      "noble-black-800": "#0D0F10",
      "noble-black-700": "#131619",
      "noble-black-600": "#1A1D21",
      "noble-black-500": "#363A3D",
    }),
  },
  plugins: {
    tailwindcss: {},
  },
};

export default config;
