// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import types
import type { HTMLAttributes } from 'react'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  reversed?: boolean
}

export const ButtonGroupMoleculeComponent = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', reversed = false, ...props }, ref) => {
    const horizontalStyles = reversed
      ? '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:only-child)]:rounded-s-none [&>*:last-child:not(:only-child)]:rounded-e-none'
      : '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:only-child)]:rounded-e-none [&>*:last-child:not(:only-child)]:rounded-s-none'

    const verticalStyles = reversed
      ? '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:only-child)]:rounded-t-none [&>*:last-child:not(:only-child)]:rounded-b-none'
      : '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:only-child)]:rounded-b-none [&>*:last-child:not(:only-child)]:rounded-t-none'

    return (
      <div
        ref={ref}
        role="group"
        data-orientation={orientation}
        className={cn(
          'inline-flex items-center',
          reversed && (orientation === 'horizontal' ? 'flex-row-reverse' : 'flex-col-reverse'),
          orientation === 'horizontal' ? horizontalStyles : `flex-col ${verticalStyles}`,
          className
        )}
        {...props}
      />
    )
  }
)

ButtonGroupMoleculeComponent.displayName = 'ButtonGroup'

export default ButtonGroupMoleculeComponent
