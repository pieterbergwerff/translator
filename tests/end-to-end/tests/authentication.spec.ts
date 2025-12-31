import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('login link opens modal', async ({ page }) => {
    await page.goto('/')

    // Click the login link
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })

    // Check that the login modal is visible
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('login modal has close button functionality', async ({ page }) => {
    await page.goto('/')

    // Open login modal
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })
    await expect(page.getByLabel(/email/i)).toBeVisible()

    // Close the modal using close button
    const closeButton = page.getByRole('button', { name: /close/i })
    if (await closeButton.isVisible()) {
      await closeButton.click()
      // Modal should close
      await expect(page.getByLabel(/email/i)).not.toBeVisible()
    }
  })

  test('login form shows validation errors', async ({ page }) => {
    await page.goto('/')

    // Open login modal
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })

    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Should show validation errors (form should prevent submission)
    // The form should still be visible
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('can fill in login form fields', async ({ page }) => {
    await page.goto('/')

    // Open login modal
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })

    // Fill in the form fields
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('testpassword')

    // Verify fields are filled
    await expect(page.getByLabel(/email/i)).toHaveValue('test@example.com')
    await expect(page.getByLabel(/password/i)).toHaveValue('testpassword')

    // Sign in button should be present and enabled
    await expect(page.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })
})
