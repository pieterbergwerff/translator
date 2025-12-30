// @ts-nocheck - React 19 type conflict with Radix Slot
// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import components
import { Slot } from '@radix-ui/react-slot'

// import variants
import buttonVariants from './Button.cva'

// import types
import type { VariantProps } from 'class-variance-authority'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const ButtonAtomComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
ButtonAtomComponent.displayName = 'Button'

export default ButtonAtomComponent
