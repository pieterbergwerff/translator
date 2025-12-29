import { test, expect } from '@playwright/test'

test('homepage has title and button', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Translator App/)

  // Check for the main heading
  await expect(page.getByRole('heading', { name: 'Translator App' })).toBeVisible()

  // Check for the button
  await expect(page.getByRole('button', { name: 'Click me' })).toBeVisible()
})
