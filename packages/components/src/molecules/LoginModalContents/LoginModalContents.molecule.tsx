// import hooks
import { useSession } from 'next-auth/react'
import useLoginModalContents from './LoginModalContents.hook'

// import components
import Box from '@packages/components/atoms/Box'
import Form from '@packages/components/atoms/Form'
import Input from '@packages/components/atoms/Input'
import Label from '@packages/components/atoms/Label'
import Button from '@packages/components/atoms/Button'

// import types
import type { FC } from 'react'

export const LoginModalContentsMoleculeComponent: FC = () => {
  const session = useSession()

  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    submitHandler,
    submitDisabled,
  } = useLoginModalContents()

  if (session.status === 'authenticated') return null

  return (
    <Form onSubmit={submitHandler}>
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

export default LoginModalContentsMoleculeComponent
