import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import FloatingShapes from './FloatingShapes'
import styles from '../styles/Home.module.css'

const headingVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, type: 'spring', stiffness: 120, damping: 16 }
  })
}

const buttonVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.18 * i, type: 'spring', stiffness: 140, damping: 18 }
  })
}

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }
    el.addEventListener('mousemove', handle)
    el.addEventListener('mouseleave', () => {
      mouseX.set(0)
      mouseY.set(0)
    })
    return () => el.removeEventListener('mousemove', handle)
  }, [mouseX, mouseY])

  // gentle parallax transforms
  const foodX = useTransform(mouseX, [-300, 300], [-24, 24])
  const foodY = useTransform(mouseY, [-200, 200], [-16, 16])
  const springX = useSpring(foodX, { stiffness: 90, damping: 12 })
  const springY = useSpring(foodY, { stiffness: 90, damping: 12 })

  // subtle background drift for depth
  const bgX = useTransform(mouseX, [-300, 300], [-6, 6])
  const bgSpring = useSpring(bgX, { stiffness: 60, damping: 16 })

  return (
    <section className={styles.heroWrap} ref={containerRef} aria-label="Hero">
      <FloatingShapes motionX={bgSpring} />

      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.content}>
          <motion.h1 className={styles.title} variants={headingVariant} initial="hidden" animate="visible">
            <motion.span custom={1} variants={headingVariant}>Discover</motion.span>
            <motion.span custom={2} variants={headingVariant} className={styles.titleAccent}>
              Premium Flavors
            </motion.span>
          </motion.h1>

          <motion.p className={styles.subtitle} custom={3} variants={headingVariant} initial="hidden" animate="visible">
            Handcrafted dishes, seasonal ingredients, and thoughtful plating — delivered with an elevated experience.
          </motion.p>

          <div className={styles.ctaRow}>
            <motion.a
              className={styles.primaryBtn}
              href="#order"
              role="button"
              variants={buttonVariant}
              initial="hidden"
              animate="visible"
              custom={1}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Now
            </motion.a>

            <motion.a
              className={styles.secondaryBtn}
              href="#menu"
              role="button"
              variants={buttonVariant}
              initial="hidden"
              animate="visible"
              custom={2}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Menu
            </motion.a>
          </div>
        </div>

        <div className={styles.visuals}>
          <motion.div
            className={styles.foodWrap}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          >
            <motion.img
              src="/images/food-hero.png"
              alt="Delicious dish"
              className={styles.food}
              drag={false}
              whileHover={{ scale: 1.02 }}
            />

            <motion.div
              className={styles.floatingCard}
              whileHover={{ rotateX: 6, rotateY: 8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className={styles.cardContent}>
                <strong>Chef's Pick</strong>
                <span>Seasonal Salad</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
