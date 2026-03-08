'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type {} from 'react' // Add this import to ensure JSX namespace is available

const textVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
  }),
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
}

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  el?: keyof React.JSX.IntrinsicElements
}

export default function AnimatedText({ text, className, once = true, el: Wrapper = 'h2' }: AnimatedTextProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  const words = text.split(' ')

  return (
    <Wrapper>
      <motion.span
        ref={ref}
        className={className}
        style={{ display: 'inline-block', paddingBottom: '0.08em' }}
        variants={textVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
