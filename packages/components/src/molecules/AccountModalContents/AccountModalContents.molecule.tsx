'use client'

// import hooks
import useAccountModalContents from './AccountModalContents.hook.ts'

// import components
import Form from '@packages/components/atoms/Form'
import Input from '@packages/components/atoms/Input'
import Label from '@packages/components/atoms/Label'

// import types
import type { FC } from 'react'

export const AccountModalContentsMoleculeComponent: FC = () => {
  const { nickNameValue, setNickNameValue, submitHandler, cancelHandler } =
    useAccountModalContents()

  return (
    <Form onSubmit={submitHandler} onCancel={cancelHandler} submitText="Update">
      <Form.Element>
        <Label htmlFor="nickName">Nickname</Label>
        <Input
          id="nickName"
          type="nickName"
          value={nickNameValue}
          onChange={(e) => setNickNameValue(e.target.value)}
          disabled={false}
          autoFocus
          required
        />
      </Form.Element>
    </Form>
  )
}

export default AccountModalContentsMoleculeComponent
