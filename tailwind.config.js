module.exports = {
  content: [
    "./pages/*.{html,js}",
    "./index.html",
    "./js/*.js",
    "./components/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: "#1a1a2e", // Deep navy for trust and technical authority
        secondary: "#2d3748", // Sophisticated gray for content structure
        accent: "#00d4ff", // Electric blue for innovation moments
        
        // Background Colors
        background: "#ffffff", // Pure white for maximum readability
        surface: "#f7fafc", // Subtle gray for cards and separation
        
        // Text Colors
        'text-primary': "#2d3748", // High contrast for reading and code
        'text-secondary': "#718096", // Clear hierarchy for metadata
        
        // Status Colors
        success: "#38a169", // Confident green for completed projects
        warning: "#ed8936", // Warm orange for work-in-progress
        error: "#e53e3e", // Clear red for critical information
        
        // Additional Shades
        border: "#e2e8f0", // Subtle borders for inputs and separation
        
        // Gray Scale
        gray: {
          50: "#f7fafc",
          100: "#edf2f7",
          200: "#e2e8f0",
          300: "#cbd5e0",
          400: "#a0aec0",
          500: "#718096",
          600: "#4a5568",
          700: "#2d3748",
          800: "#1a202c",
          900: "#171923"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'functional': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      transitionDuration: {
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '1000': '1000ms',
        '2000': '2000ms'
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out'
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'typing': 'typing 2s steps(40, end), blink-caret 0.75s step-end infinite',
        'blink': 'blink-caret 0.75s step-end infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        'blink-caret': {
          '0%, 100%': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#00d4ff' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.transition-fast': {
          transition: 'all 250ms ease-out'
        },
        '.transition-smooth': {
          transition: 'all 300ms ease-in-out'
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, #1a1a2e, #00d4ff)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}