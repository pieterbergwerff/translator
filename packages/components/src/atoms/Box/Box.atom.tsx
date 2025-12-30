// import types
import type { ElementType } from 'react'
import type { BoxAtomPropTypes } from '@packages/types/components/atoms/Box.types'

export const BoxAtomComponent = <T extends ElementType = 'div'>({
  component,
  ...props
}: BoxAtomPropTypes<T>) => {
  const Component = component || 'div'
  return <Component {...props} />
}

BoxAtomComponent.displayName = 'Box'

export default BoxAtomComponent
