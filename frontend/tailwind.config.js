// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        
      },
      boxShadow: {
        'none': 'none',
      },
    },
  },
  plugins: [],
});
