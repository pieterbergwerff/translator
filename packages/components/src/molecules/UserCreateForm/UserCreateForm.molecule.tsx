'use client'

// import hooks
import useUserCreateForm from './UserCreateForm.hook'

// import components
import Form from '@packages/components/atoms/Form'
import Input from '@packages/components/atoms/Input'
import Label from '@packages/components/atoms/Label'

export const UserCreateFormMoleculeComponent = () => {
  const {
    submitHandler,
    cancelHandler,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    submitDisabled,
  } = useUserCreateForm()

  return (
    <Form
      onSubmit={submitHandler}
      onCancel={cancelHandler}
      submitText="Create"
      submitDisabled={submitDisabled}
      reversed
    >
      <Form.Element>
        <Label>Email</Label>
        <Input
          type="email"
          value={userEmail ?? ''}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </Form.Element>
      <Form.Element>
        <Label>Password</Label>
        <Input
          type="password"
          value={userPassword ?? ''}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </Form.Element>
    </Form>
  )
}

export default UserCreateFormMoleculeComponent
