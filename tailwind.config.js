/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1100px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#f1faf2",
          100: "#d9e1da",
          200: "#c1c8c2",
          300: "#a9afa9",
          400: "#919691",
          500: "#797d79",
          600: "#606461",
          700: "#484b49",
          800: "#303230",
          900: "#181918",
          950: "#0000",
        },
        pop: {
          50: "#eee8e7",
          100: "#cbbab7",
          200: "#baa39f",
          300: "#a98c88",
          400: "#987570",
          500: "#987570",  // Main pop color
          600: "#875e58",
          700: "#531910",
          800: "#3a120b",
          900: "#2a0d08",
        }  ,
          testColor: '#ff6347', // Define a simple color
      },
        height: {
          '1000': '600px', // Custom height of 1000px
        }


    },
  },
  plugins: [],
};
