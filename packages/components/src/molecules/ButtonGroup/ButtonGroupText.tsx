// import components
import { Slot } from '@radix-ui/react-slot'

// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import types
import type { HTMLAttributes } from 'react'

export interface ButtonGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export const ButtonGroupTextComponent = forwardRef<HTMLSpanElement, ButtonGroupTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'
    return (
      <Comp ref={ref} className={cn('px-3 text-sm text-muted-foreground', className)} {...props} />
    )
  }
)

ButtonGroupTextComponent.displayName = 'ButtonGroupText'

export default ButtonGroupTextComponent
