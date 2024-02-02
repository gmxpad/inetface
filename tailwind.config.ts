const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");

interface OpacityFunction {
  opacityValue?: number;
}

function withOpacity(variableName: string) {
  return ({ opacityValue }: OpacityFunction) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

type TextColors = {
  [key in keyof typeof withOpacity]: ReturnType<typeof withOpacity>;
};
const textColors: TextColors = {
  body: withOpacity("--text-base"),
  "body-dark": withOpacity("--text-base-dark"),
  muted: withOpacity("--text-muted"),
  "muted-light": withOpacity("--text-muted-light"),
  heading: withOpacity("--text-heading"),
  "sub-heading": withOpacity("--text-sub-heading"),
  bolder: withOpacity("--text-text-bolder"),
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/providers/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",

      ...defaultTheme.screens,
    },
    extend: {
      screens: {
        sm: { max: "767px" },
        md3xl: { min: "1920px" },
      },
      zIndex: {
        "-1": "-1",
      },
      fontFamily: {
        SpaceGro: ["SpaceGro", "SpaceGro"],
        Orbitron: ["Orbitron", "sans-serif"],
      },
      fontSize: {
        "10px": "0.625rem",
      },
      colors: {
        dark: "#121213",
        background: "#040D1E",
        "dark-gray": "#171717",
        "light-bg": "#F4F4F4",
        header: "#04111d",
        "box-bg": "#212226",
        "border-color": "#4C505C",
        cgray: "#2a2d30",
        "secondary-text": "#c8c8c8",
        "footer-gray": "#353841",
        "md-blue": {
          50: "#CFC2FF",
          100: "#9F85FF",
          200: "#7F5CFF",
          300: "#6F47FF",
          400: "#5F33FF",
          500: "#4F1FFF",
          600: "#3F0AFF",
          700: "#3500F5",
          800: "#3100e0",
          900: "#2A00C9",
        },
        blue: {
          50: "#C2D1FF",
          100: "#ADC2FF",
          200: "#99B3FF",
          300: "#85A3FF",
          400: "#7094FF",
          500: "#5C85FF",
          600: "#4775FF",
          700: "#3366FF",
          800: "#1F57FF",
          900: "#003FFF",
        },
        indigo: {
          50: "#DBC2FF",
          100: "#CFADFF",
          200: "#C399FF",
          300: "#B885FF",
          400: "#AC70FF",
          500: "#A05CFF",
          600: "#9447FF",
          700: "#8833FF",
          800: "#7C1FFF",
          900: "#6A00FF",
        },
        "sky-blue": {
          50: "#C7F6FA",
          100: "#B4F3F8",
          200: "#A1F0F7",
          300: "#8FECF5",
          400: "#7CE9F3",
          500: "#6AE6F1",
          600: "#57E3EF",
          700: "#44E0EE",
          800: "#32DCEC",
          900: "#1FD9EA",
        },
        green: {
          50: "#D6FFE6",
          100: "#C2FFD9",
          200: "#ADFFCD",
          300: "#99FFC0",
          400: "#85FFB4",
          500: "#70FFA7",
          550: "#27FF8A",
          600: "#5CFF9A",
          700: "#47FF8E",
          800: "#33FF81",
          900: "#13ff6e",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          150: "#f9fafb",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9D9D9D",
          550: "#707070",
          600: "#757575",
          700: "#616161",
          800: "#424243",
          900: "#212121",
          950: "#151419",
          1000: "#1e1e1f",
          1050: "#252526",
          1060: "#191919",
          1070: "#1A1A1B",
        },

        warning: {
          100: "#cdae16",
          200: "#E8C721",
          300: "#EACB34",
          400: "#ECD046",
          500: "#EFD96B",
        },
        alert: {
          100: "#c43934",
          200: "#D0524E",
          300: "#D4625E",
          400: "#D8726E",
          500: "#DD817E",
        },

        "light-primary": "#142A37",
        "light-secondary": "#D84E0C",
        "dark-primary": "#A8A8A8",
        "dark-secondary": "#DC3F10",
        transparent: "transparent",
      },
      textColor: {
        body: withOpacity("--text-base"),
        "body-dark": withOpacity("--text-base-dark"),
        muted: withOpacity("--text-muted"),
        "muted-light": withOpacity("--text-muted-light"),
        heading: withOpacity("--text-heading"),
        "sub-heading": withOpacity("--text-sub-heading"),
        bolder: withOpacity("--text-text-bolder"),
      },
      minHeight: {
        580: "580px",
        140: "35rem", // 560px
        40: "10rem", // 140px
        6: "2.5rem",
      },
      height: {
        4.5: "1.125rem",
        13: "3.125rem",
        22: "5.25rem",
        double: "200%",
      },
      maxHeight: {
        "70vh": "70vh",
        "85vh": "85vh",
        140: "35rem", // 560px
      },
      maxWidth: {
        1920: "1920px",
      },
      minWidth: {
        150: "150px",
      },
      borderRadius: {
        DEFAULT: "5px",
      },
      inset: {
        22: "5.25rem",
      },
      strokeWidth: {
        2.5: "2.5",
      },
      boxShadow: {
        200: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        300: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
        350: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        400: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0",
        500: "rgba(0, 0, 0, 0.17) 0px 0px 12px",
        600: "rgba(0, 0, 0, 0.1) 0px 3px 8px",
        700: "rgba(0, 0, 0, 0.08) 0px 2px 16px",
        900: "rgba(0, 0, 0, 0.05) 0px 21px 36px",
        downfall: "rgba(0, 0, 0, 0.14) 0px 6px 12px",
        paymentCard: "0px 2px 6px rgba(59, 74, 92, 0.1)",
        "downfall-xs": "rgba(0, 0, 0, 0.14) 0px 1px 2px",
        "downfall-sm": "rgba(0, 0, 0, 0.14) 0px 2px 4px",
        "downfall-lg": "rgba(0, 0, 0, 0.16) 0px 8px 16px",
      },
      transitionProperty: {
        height: "height",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.04, 0.62, 0.23, 0.98)",
      },
    },
  },
  plugins: [nextui()],
};
