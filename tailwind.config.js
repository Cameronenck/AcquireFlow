/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-color': 'var(--border-color)',
        
        /* AcquireFlow Vibrant Color System */
        'brand-green': 'var(--brand-green)',
        'ocean-blue': 'var(--ocean-blue)',
        'deep-teal': 'var(--deep-teal)',
        'royal-purple': 'var(--royal-purple)',
        'warm-orange': 'var(--warm-orange)',
        'bright-yellow': 'var(--bright-yellow)',
        
        /* Supporting Neutrals */
        'dark-slate': 'var(--dark-slate)',
        'medium-gray': 'var(--medium-gray)',
        'light-gray': 'var(--light-gray)',
        'pure-white': 'var(--pure-white)',
        'soft-background': 'var(--soft-background)',
        
        /* Semantic Colors */
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'info': 'var(--info)',
        'accent': 'var(--accent)',
        
        /* Legacy Support */
        'accent-blue': 'var(--accent-blue)',
        'accent-green': 'var(--accent-green)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-purple': 'var(--accent-purple)',
        'accent-orange': 'var(--accent-orange)',
        'accent-red': 'var(--accent-red)',
        
        /* Sidebar Colors */
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-secondary': 'var(--sidebar-secondary)',
      },
      spacing: {
        '70': '17.5rem', // 280px
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'heading': '-0.025em',
      },
      animation: {
        'draw-line': 'draw-line 2s ease-out forwards',
      },
      keyframes: {
        'draw-line': {
          'to': {
            'stroke-dashoffset': '0',
          },
        },
      },
    },
  },
  plugins: [],
} 