Home page redesign (Next.js + Framer Motion)

Files added:
- pages/index.tsx — Next.js page entry
- src/components/Hero.tsx — Hero component with animations
- src/components/FloatingShapes.tsx — decorative shapes with parallax
- src/styles/Home.module.css — styles for hero

Notes:
- This is a Next.js page; add `framer-motion` to your project if not present:

```bash
npm install framer-motion
# or
yarn add framer-motion
```

- Hero expects an image at `public/images/food-hero.png`. Replace or add your asset there. A placeholder will render if missing.
- The design emphasizes 100vh hero, overflow hidden, centered content, parallax, and smooth spring animations.

Would you like me to wire this into a full Next.js app (add package.json scripts and required deps)?
