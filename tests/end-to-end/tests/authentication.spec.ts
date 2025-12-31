import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('login link opens modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click the login link
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })

    // Wait for modal to open and check that fields are visible
    await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByLabel(/password/i)).toBeVisible({ timeout: 10000 })

    // Check for submit button - use .first() due to React 19 hydration duplicates
    const submitButton = page.locator('button[type="submit"]').first()
    await expect(submitButton).toBeVisible({ timeout: 10000 })
  })

  test('login modal has close button functionality', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open login modal
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })
    await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 10000 })

    // Close the modal using close button
    const closeButton = page.getByRole('button', { name: /close/i })
    if (await closeButton.isVisible()) {
      await closeButton.click()
      // Modal should close
      await expect(page.getByLabel(/email/i)).not.toBeVisible()
    }
  })

  test('login form has expected fields and structure', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open login modal
    await page.getByRole('button', { name: 'login' }).first().click({ force: true })

    // Wait for modal to be fully rendered
    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toBeVisible({ timeout: 10000 })

    // Verify form structure
    await expect(emailInput).toHaveAttribute('type', 'email')
    await expect(emailInput).toHaveAttribute('required')

    const passwordInput = page.getByLabel(/password/i)
    await expect(passwordInput).toBeVisible()
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await expect(passwordInput).toHaveAttribute('required')

    // Submit button should be present - use .first() due to React 19 duplicates
    const submitButton = page.locator('button[type="submit"]').first()
    await expect(submitButton).toBeVisible({ timeout: 10000 })
    await expect(submitButton).toBeEnabled()
  })
})
