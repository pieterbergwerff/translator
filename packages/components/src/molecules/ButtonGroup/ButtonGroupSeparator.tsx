// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import types
import type { HTMLAttributes } from 'react'

export interface ButtonGroupSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroupSeparatorComponent = forwardRef<HTMLDivElement, ButtonGroupSeparatorProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'bg-border',
          orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
          className
        )}
        {...props}
      />
    )
  }
)

ButtonGroupSeparatorComponent.displayName = 'ButtonGroupSeparator'

export default ButtonGroupSeparatorComponent
