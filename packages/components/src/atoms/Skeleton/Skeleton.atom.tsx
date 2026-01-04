// import utils
import cn from '@utils/common/cn'

// import types
import type { HTMLAttributes } from 'react'

export const SkeletonAtomComponent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}

export default SkeletonAtomComponent
