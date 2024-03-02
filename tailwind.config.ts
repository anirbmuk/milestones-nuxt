export default {
  content: [],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
      '4xl': '1680px',
      '5xl': '1920px',
    },
    fontSize: {
      xs: ['0.625rem', '1rem'],
      sm: ['0.75rem', '1.125rem'],
      md: ['0.875rem', '1.25rem'],
      DEFAULT: ['1rem', '1.5rem'],
      xl: ['1.125rem', '1.5rem'],
      '2xl': ['1.25rem', '1.75rem'],
      '3xl': ['1.5rem', '2rem'],
      '4xl': ['2rem', '2.5rem'],
      '5xl': ['2.5rem', '2.5rem'],
      '6xl': ['3rem', '3rem'],
      '7xl': ['3.5rem', '3rem'],
      '8xl': ['4rem', '4rem'],
      '9xl': ['4.5rem', '4rem'],
      '10xl': ['5rem', '4rem'],
      '11xl': ['5.5rem', '4rem'],
      '12xl': ['6rem', '4rem'],
      '14xl': ['7rem', '4rem'],
      '16xl': ['8rem', '6rem'],
      '18xl': ['9rem', '6rem'],
      massive: ['10rem', '10rem'],
    },
    fontWeight: {
      normal: 400,
      semiBold: 600,
      bold: 700,
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: {
          light: 'rgba(var(--base), 0.6)',
          DEFAULT: 'rgba(var(--base), 0.8)',
          dark: 'rgb(var(--base))',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
        },
        tertiary: {
          DEFAULT: 'var(--tertiary-color)',
          light: 'var(--tertiary-light-color)',
          text: 'var(--tertiary-text-color)',
        },
        background: {
          DEFAULT: 'var(--bg-color)',
          dark: 'var(--bg-dark-color)',
        },
        error: {
          DEFAULT: 'var(--error-color)',
        },
        panel: {
          primary: {
            heading: '#EFE3A4',
            body: '#F9F4EC',
          },
        },
        blue: {
          DEFAULT: 'var(--blue)',
          light: 'var(--blue-light)',
        },
        alert: {
          error: {
            DEFAULT: 'var(--text-error-alert)',
            bg: 'var(--bg-error-alert)',
            border: 'var(--border-error-alert)',
          },
        },
      },
    },
  },
  plugins: [],
};
