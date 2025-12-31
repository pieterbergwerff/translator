import { test, expect } from '@playwright/test'

test('homepage has title and authentication link', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Translator App/)

  // Check for the Welcome text
  await expect(page.getByText('Welcome')).toBeVisible()

  // Check for the authentication link (renders as "login" when not authenticated)
  await expect(page.getByRole('button', { name: 'login' }).first()).toBeVisible()
})
