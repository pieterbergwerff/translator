'use client'

// import hooks
import useLoginForm from './LoginForm.hook'

// import components
import Box from '@packages/components/atoms/Box'
import Form from '@packages/components/atoms/Form'
import Input from '@packages/components/atoms/Input'
import Label from '@packages/components/atoms/Label'
import Button from '@packages/components/atoms/Button'

// import types
import type { FC } from 'react'

export const LoginFormOrganismComponent: FC<{ onSubmit?: () => void }> = ({ onSubmit }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    submitHandler,
    submitDisabled,
  } = useLoginForm({ onSubmit })

  return (
    <Form
      title="Sign In"
      description="Enter your credentials to access your account"
      onSubmit={submitHandler}
    >
      <Form.Element>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitDisabled}
          required
        />
      </Form.Element>
      <Form.Element>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitDisabled}
          required
        />
      </Form.Element>
      {error && <Box className="text-sm text-destructive">{error}</Box>}
      <Button type="submit" className="w-full" disabled={isLoading || submitDisabled}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </Form>
  )
}

export default LoginFormOrganismComponent
