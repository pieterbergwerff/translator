// import components
import Template from '@packages/components/templates/Default'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AppTemplate: FC<PropsWithChildren> = ({ children }) => {
  return <Template>{children}</Template>
}

export default AppTemplate
