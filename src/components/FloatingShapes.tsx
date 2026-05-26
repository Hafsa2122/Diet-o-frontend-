import React from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/Home.module.css'

type Props = { motionX?: any }

const FloatingShapes: React.FC<Props> = ({ motionX }) => {
  const shape = (className: string, delay = 0) => (
    <motion.div
      className={className}
      style={{ x: motionX }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
    />
  )

  return (
    <div className={styles.shapes} aria-hidden>
      {shape(styles.shape1, 0.1)}
      {shape(styles.shape2, 0.18)}
      {shape(styles.shape3, 0.26)}
      {shape(styles.shape4, 0.34)}
    </div>
  )
}

export default FloatingShapes
