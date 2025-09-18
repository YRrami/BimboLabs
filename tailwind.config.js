/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  extend: {
    fontFamily: {
      sans: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
  },
},
  plugins: [],
};

/*
NEXT STEP (one line):
- Ensure your global stylesheet applies Tailwind's sans to the page root so everything flips to the coding font:

  // globals.css or App.css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body { @apply font-sans; }

OPTIONAL (to get JetBrains Mono specifically):
- Add this to index.html <head> or your layout file:
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
*/
