// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import types
import type { HTMLAttributes } from 'react'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroupMoleculeComponent = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        data-orientation={orientation}
        className={cn(
          'inline-flex items-center',
          orientation === 'horizontal'
            ? '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:only-child)]:rounded-e-none [&>*:last-child:not(:only-child)]:rounded-s-none'
            : 'flex-col [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:only-child)]:rounded-b-none [&>*:last-child:not(:only-child)]:rounded-t-none',
          className
        )}
        {...props}
      />
    )
  }
)

ButtonGroupMoleculeComponent.displayName = 'ButtonGroup'

export default ButtonGroupMoleculeComponent
