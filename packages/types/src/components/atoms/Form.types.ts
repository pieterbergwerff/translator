// import types
import type { BoxAtomPropTypes } from '@packages/types/components/atoms/Box.types'

export type FormAtomPropTypes = BoxAtomPropTypes<'form'> & {
  title?: string
  description?: string
}

export default FormAtomPropTypes
