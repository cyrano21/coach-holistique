declare module "framer-motion" {
  import * as React from "react"
  
  export interface AnimationControls {
    start: (definition: TargetAndTransition) => Promise<void>
  }

  export interface MotionStyle extends React.CSSProperties {
    x?: number | string
    y?: number | string
    rotate?: number | string
    scale?: number
    opacity?: number
  }

  export type Target = {
    [key: string]: string | number | { [key: string]: string | number }
  }

  export interface TransitionProperties {
    delay?: number
    duration?: number
    ease?: string | number[]
    times?: number[]
    type?: "tween" | "spring" | "inertia"
    stiffness?: number
    damping?: number
    mass?: number
    velocity?: number
  }

  export interface Orchestration {
    delayChildren?: number
    staggerChildren?: number
    staggerDirection?: number
    when?: "beforeChildren" | "afterChildren"
  }

  export interface Transition extends TransitionProperties, Orchestration {}

  export interface TargetAndTransition extends Target {
    transition?: Transition
  }

  export interface VariantLabels {
    [key: string]: string | string[]
  }

  export interface Variants {
    [key: string]: TargetAndTransition
  }

  export interface ViewportOptions {
    root?: React.RefObject<Element>
    once?: boolean
    margin?: string
    amount?: "some" | "all" | number
  }

  export interface MotionProps {
    initial?: boolean | Target | string
    animate?: TargetAndTransition | string | AnimationControls
    exit?: TargetAndTransition | string
    transition?: Transition
    variants?: Variants
    style?: MotionStyle
    className?: string
    whileHover?: TargetAndTransition | string
    whileTap?: TargetAndTransition | string
    whileDrag?: TargetAndTransition | string
    whileInView?: TargetAndTransition | string
    viewport?: ViewportOptions
    onAnimationStart?: () => void
    onAnimationComplete?: () => void
    custom?: Record<string, unknown>
  }

  type HTMLMotionComponents = {
    [K in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
      Omit<JSX.IntrinsicElements[K], keyof MotionProps> &
      MotionProps & { ref?: React.Ref<Element> }
    >
  }

  export interface Motion extends HTMLMotionComponents {
    custom: typeof custom
  }

  export const motion: Motion
  export const AnimatePresence: React.FC
  export function useAnimation(): AnimationControls
  export const domAnimation: () => { animationFeatures: unknown[] }
  export const domMax: () => { animationFeatures: unknown[] }
  export const LazyMotion: React.FC<{ features: () => { animationFeatures: unknown[] }; children: React.ReactNode }>

  type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T]
  type CustomComponent = { render: (props: Record<string, unknown>) => React.ReactElement }
  function custom<T>(Component: T): T extends CustomComponent
    ? Motion[FilteredKeys<Motion, CustomComponent>]
    : React.ForwardRefExoticComponent<
        React.PropsWithoutRef<React.ComponentProps<T> & MotionProps> &
        React.RefAttributes<Element>
      >
}
