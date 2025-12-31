'use client'

// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import external components
import * as TogglePrimitive from '@radix-ui/react-toggle'

// import variants
import toggleVariants from './Toggle.cva'

// import types
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'

export const ToggleAtomComponent = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

ToggleAtomComponent.displayName = TogglePrimitive.Root.displayName

export default ToggleAtomComponent
