// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import types
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'

export interface DashboardItemAtomProps extends Omit<ComponentPropsWithoutRef<'button'>, 'title'> {
  /**
   * Icon to display above the title
   */
  icon?: ReactNode
  /**
   * Title of the dashboard item
   */
  title: ReactNode
  /**
   * Description text below the title
   */
  description?: ReactNode
}

export const DashboardItemAtomComponent = forwardRef<ElementRef<'button'>, DashboardItemAtomProps>(
  ({ className, icon, title, description, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'group flex flex-col items-center gap-3 rounded-lg p-6 text-center transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center text-2xl transition-transform group-hover:scale-110">
            {icon}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold leading-none">{title}</div>
          {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
      </button>
    )
  }
)

DashboardItemAtomComponent.displayName = 'DashboardItem'

export default DashboardItemAtomComponent
