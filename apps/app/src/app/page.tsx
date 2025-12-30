// @ts-nocheck - React 19 type conflicts
// import components
import AuthClick from '@packages/components/molecules/AuthClick'
import SwitchThemeMode from '@packages/components/molecules/SwitchThemeMode'

export default async function Home() {
  return (
    <>
      Welcome
      <br />
      <AuthClick />
      <br />
      <SwitchThemeMode />
    </>
  )
}
