import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // keyframes: {
      //   ani2: {
      //     '0%': {objectPosition: '0px'},
      //     '100%': {objectPosition: `-${150*2}px`},
      //   },
      //   ani3: {
      //     '0%': {objectPosition: '0px'},
      //     '100%': {objectPosition: `-${150*3}px`},
      //   },
      //   ani4: {
      //     '0%': {objectPosition: '0px'},
      //     '100%': {objectPosition: `-${150*4}px`},
      //   },
      //   ani5: {
      //     '0%': {objectPosition: '0px'},
      //     '100%': {objectPosition: `-${150*5}px`},
      //   },
      // },

    },
  },
  plugins: [],
};
export default config;
