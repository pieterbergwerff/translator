'use client'

// import utils
import cn from '@utils/common/cn'
import { createContext, forwardRef, useContext } from 'react'

// import external components
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

// import internal components
import { toggleVariants } from '@packages/components/atoms/Toggle'

// import types
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
})

export const ToggleGroupMoleculeComponent = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupContext.Provider value={{ variant, size }}>
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('inline-flex items-center justify-center gap-1', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  </ToggleGroupContext.Provider>
))

ToggleGroupMoleculeComponent.displayName = ToggleGroupPrimitive.Root.displayName

export const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export default ToggleGroupMoleculeComponent
