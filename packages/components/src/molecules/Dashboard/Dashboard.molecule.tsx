// import utils
import cn from '@utils/common/cn'
import { forwardRef } from 'react'

// import components
import DashboardItem from '@packages/components/atoms/DashboardItem'

// import types
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'

export interface DashboardItemData {
  /**
   * Unique key for the item
   */
  key?: string | number
  /**
   * Icon to display
   */
  icon?: ReactNode
  /**
   * Title of the item
   */
  title: string
  /**
   * Description text
   */
  description?: string
  /**
   * Click handler for the item
   */
  onClick?: () => void
}

export interface DashboardMoleculeProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Array of dashboard items to display
   */
  data: DashboardItemData[]
  /**
   * Number of columns in the grid
   */
  columns?: 2 | 3 | 4
}

export const DashboardMoleculeComponent = forwardRef<ElementRef<'div'>, DashboardMoleculeProps>(
  ({ className, data, columns = 3, ...props }, ref) => {
    const gridColumns = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center rounded-lg p-8', className)}
        {...props}
      >
        <div className={cn('grid w-full gap-4', gridColumns[columns])}>
          {data.map((item, index) => (
            <DashboardItem
              key={item.key ?? index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    )
  }
)

DashboardMoleculeComponent.displayName = 'Dashboard'

export default DashboardMoleculeComponent
