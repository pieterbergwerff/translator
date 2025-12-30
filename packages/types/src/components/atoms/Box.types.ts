// import types
import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type BoxAtomPropTypes<T extends ElementType = 'div'> = {
  component?: T
} & ComponentPropsWithoutRef<T>

export default BoxAtomPropTypes
