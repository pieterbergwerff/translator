'use client'

// import hooks
import useCreateProfile from './ProfileCreateForm.hook.ts'

// import components
import Form from '@packages/components/atoms/Form'
import Input from '@packages/components/atoms/Input'
import Label from '@packages/components/atoms/Label'
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@packages/components/molecules/Select'

// import types
import type { FC } from 'react'

export const ProfileCreateFormMoleculeComponent: FC = () => {
  const {
    submitHandler,
    cancelHandler,
    profileName,
    setProfileName,
    profileStatus,
    setProfileStatus,
    submitDisabled,
  } = useCreateProfile()

  return (
    <Form
      onSubmit={submitHandler}
      onCancel={cancelHandler}
      submitText="Create"
      submitDisabled={submitDisabled}
      reversed
    >
      <Form.Element>
        <Label>Name</Label>
        <Input
          type="text"
          value={profileName ?? ''}
          onChange={(e) => setProfileName(e.target.value)}
        />
      </Form.Element>
      <Form.Element>
        <Label>Status</Label>
        <Select
          value={profileStatus}
          onValueChange={(value) => setProfileStatus(value as 'banned' | 'active' | 'inactive')}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">active</SelectItem>
            <SelectItem value="inactive">inactive</SelectItem>
            <SelectItem value="banned">banned</SelectItem>
          </SelectContent>
        </Select>
      </Form.Element>
    </Form>
  )
}

export default ProfileCreateFormMoleculeComponent
