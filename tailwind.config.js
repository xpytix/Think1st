import flowbite from "flowbite-react/tailwind";


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#FFFFFF",
      background: "#F0EAF8",
      hoverBackground: "#6A19CD",
      primary: "#761BE4",
      secondary: "#CBB6E5",
      hover: "#761BE4",
      bgFocus: "#FAF9FA",
      error: "#ED4545",
      errorContrast: "#FEECEC",
      text: "#000853",

    },
    fontFamily: {
      sans: [
        '"Inter var", sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32',
        },
      ],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
        flowbite.plugin(),

],

};
