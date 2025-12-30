import type { Meta, StoryObj } from '@storybook/react'
import Form from '@packages/components/atoms/Form'
import Input from '@packages/components/atoms/Input'
import Label from '@packages/components/atoms/Label'
import Button from '@packages/components/atoms/Button'

const meta = {
  title: 'Atoms/Form',
  component: Form,
  args: {},
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Form.Element>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </Form.Element>
        <Form.Element>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </Form.Element>
        <Button type="submit">Submit</Button>
      </>
    ),
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Contact Form',
    children: (
      <>
        <Form.Element>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </Form.Element>
        <Form.Element>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </Form.Element>
        <Button type="submit">Submit</Button>
      </>
    ),
  },
}

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Sign Up',
    description: 'Create your account to get started',
    children: (
      <>
        <Form.Element>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Choose a username" />
        </Form.Element>
        <Form.Element>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </Form.Element>
        <Form.Element>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Create a password" />
        </Form.Element>
        <Button type="submit">Sign Up</Button>
      </>
    ),
  },
}

export const LoginForm: Story = {
  args: {
    title: 'Login',
    description: 'Enter your credentials to access your account',
    children: (
      <>
        <Form.Element>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </Form.Element>
        <Form.Element>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </Form.Element>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </>
    ),
  },
}
