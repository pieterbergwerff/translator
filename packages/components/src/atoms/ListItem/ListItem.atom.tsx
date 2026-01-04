// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import types
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'

export interface ListItemAtomProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * Icon or avatar to display on the left
   */
  icon?: ReactNode
  /**
   * Title of the list item
   */
  title: ReactNode
  /**
   * Description text below the title
   */
  description?: ReactNode
  /**
   * Action buttons or elements to display on the right
   */
  actions?: ReactNode
}

export const ListItemAtomComponent = forwardRef<ElementRef<'div'>, ListItemAtomProps>(
  ({ className, icon, title, description, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-4 border-b border-border p-4 transition-colors hover:bg-accent/50',
          className
        )}
        {...props}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="font-medium leading-none">{title}</div>
          {description && <div className="text-sm text-muted-foreground">{description}</div>}
        </div>

        {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
      </div>
    )
  }
)

ListItemAtomComponent.displayName = 'ListItem'

export default ListItemAtomComponent
