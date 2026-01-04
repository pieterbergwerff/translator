'use client'

// import hooks
import { useRouter } from 'next/navigation'

// import components
import Button from '@packages/components/atoms/Button'

// import types
import type { FC } from 'react'
import type { ButtonAtomPropTypes } from '@packages/components/atoms/Button'

export const ButtonLinkAtomComponent: FC<
  ButtonAtomPropTypes & {
    href?: string
  }
> = ({ href, ...props }) => {
  const router = useRouter()

  const onClick = href?.trim()
    ? () => {
        router.push(href)
      }
    : props.onClick

  return <Button onClick={onClick} {...props} />
}

export default ButtonLinkAtomComponent
