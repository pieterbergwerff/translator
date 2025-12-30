// import utils
import { cva } from 'class-variance-authority'

export const toggleVariantsCva = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors !cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:!cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&>*]:pointer-events-none gap-2',
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        outline:
          'border border-input bg-transparent hover:bg-accent/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export default toggleVariantsCva
