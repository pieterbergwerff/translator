'use client'

// import utils
import cn from '@utils/common/cn'
import { forwardRef, useState } from 'react'

// import components
import Input from '@packages/components/atoms/Input'

// import types
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'

export interface ListMoleculeProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Array of items to render in the list
   */
  children: ReactNode
  /**
   * Show search field
   */
  searchable?: boolean
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string
  /**
   * Search value (controlled)
   */
  searchValue?: string
  /**
   * Search change handler (controlled)
   */
  onSearchChange?: (value: string) => void
  /**
   * Header content to display above the list
   */
  header?: ReactNode
  /**
   * Empty state to show when no items
   */
  emptyState?: ReactNode

  actions?: ReactNode[]
}

export const ListMoleculeComponent = forwardRef<ElementRef<'div'>, ListMoleculeProps>(
  (
    {
      className,
      children,
      searchable = false,
      searchPlaceholder = 'Search',
      searchValue: controlledSearchValue,
      onSearchChange,
      header,
      emptyState,
      actions = [],
      ...props
    },
    ref
  ) => {
    const [internalSearchValue, setInternalSearchValue] = useState('')
    const isControlled = controlledSearchValue !== undefined
    const searchValue = isControlled ? controlledSearchValue : internalSearchValue

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (!isControlled) {
        setInternalSearchValue(value)
      }
      onSearchChange?.(value)
    }

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...props}>
        {(searchable || header) && (
          <div className="sticky top-0 z-10">
            {header && <div className="p-4">{header}</div>}
            {searchable && (
              <div className="p-4 flex items-center gap-4">
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-full"
                />
                {actions.length ? (
                  <div>
                    {actions.map((action, index) => (
                      <span key={index}>{action}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {children || (emptyState && <div className="p-4">{emptyState}</div>)}
        </div>
      </div>
    )
  }
)

ListMoleculeComponent.displayName = 'List'

export default ListMoleculeComponent
