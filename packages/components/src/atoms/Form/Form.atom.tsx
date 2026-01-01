// import utils
import cn from '@utils/common/cn'

// import components
import Box from '@packages/components/atoms/Box'
import ButtonGroup from '@packages/components/molecules/ButtonGroup'
import Button from '@packages/components/atoms/Button'

// import types
import type { FC, PropsWithChildren, FormEventHandler } from 'react'
import type { FormAtomPropTypes } from '@packages/types/components/atoms/Form.types'
import type BoxAtomPropTypes from '@packages/types/components/atoms/Box.types'

type FormAtomComponentType = FC<
  FormAtomPropTypes & {
    onSubmit?: FormEventHandler<HTMLFormElement>
    submitText?: string
    onCancel?: () => void
    cancelText?: string
  }
> & { Element: FC<PropsWithChildren<BoxAtomPropTypes>> }

export const FormAtomComponent: FormAtomComponentType = ({
  title,
  description,
  className,
  children,
  onSubmit,
  submitText = 'Submit',
  onCancel,
  cancelText = 'Cancel',
  ...props
}) => {
  return (
    <Box className="mx-auto w-full space-y-6">
      {title?.trim() || description?.trim() ? (
        <Box className="space-y-2 text-center">
          {title?.trim() && <h1 className="text-3xl font-bold">{title}</h1>}
          {description?.trim() && <p className="text-muted-foreground">{description}</p>}
        </Box>
      ) : null}
      <Box {...props} component="form" className={cn('space-y-4', className)} onSubmit={onSubmit}>
        {children}
        {onSubmit || onCancel ? (
          <ButtonGroup>
            {!!onCancel && (
              <Button type="button" disabled={false} variant="secondary" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {!!onSubmit && (
              <Button type="submit" disabled={false} variant="outline">
                {submitText}
              </Button>
            )}
          </ButtonGroup>
        ) : null}
      </Box>
    </Box>
  )
}

FormAtomComponent.displayName = 'Form'

const FormAtomComponentElement: FC<PropsWithChildren<BoxAtomPropTypes>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Box {...props} className={cn('space-y-2', className)}>
      {children}
    </Box>
  )
}

FormAtomComponent.Element = FormAtomComponentElement

export default FormAtomComponent
