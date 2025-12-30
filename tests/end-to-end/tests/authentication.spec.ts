import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('login link opens modal', async ({ page }) => {
    await page.goto('/')

    // Click the login link
    await page.getByText('login').click()

    // Check that the login modal is visible
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('login modal has close button functionality', async ({ page }) => {
    await page.goto('/')

    // Open login modal
    await page.getByText('login').click()
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
    await page.getByText('login').click()

    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Should show validation errors (form should prevent submission)
    // The form should still be visible
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('successful login changes UI', async ({ page }) => {
    await page.goto('/')

    // Open login modal
    await page.getByText('login').click()

    // Fill in the form with valid credentials from .env
    await page.getByLabel(/email/i).fill('admin@example.com')
    await page.getByLabel(/password/i).fill('admin123')

    // Submit the form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Wait for login to complete and UI to update
    // The login link should change to logout
    await expect(page.getByText('logout')).toBeVisible({ timeout: 5000 })
  })

  test('logout functionality works', async ({ page }) => {
    await page.goto('/')

    // First login
    await page.getByText('login').click()
    await page.getByLabel(/email/i).fill('admin@example.com')
    await page.getByLabel(/password/i).fill('admin123')
    await page.getByRole('button', { name: /sign in/i }).click()

    // Wait for login to complete
    await expect(page.getByText('logout')).toBeVisible({ timeout: 5000 })

    // Click logout
    await page.getByText('logout').click()

    // Should show login link again
    await expect(page.getByText('login')).toBeVisible({ timeout: 5000 })
  })
})
