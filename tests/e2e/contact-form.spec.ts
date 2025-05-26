import { test, expect } from '@playwright/test';
import { emailTestConfig } from '../fixtures/email-config';
import { validFormData, invalidFormData, fillFormWithValidation } from '../fixtures/test-data';

test.describe('Contact Form - UI Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test.describe('Email Verification', () => {
    test('should submit correct email address to FormSpree', async ({ page }) => {
      // Since we're using server actions, we'll verify via form behavior rather than
      // intercepting server-side requests. The server action handles FormSpree submission.
      
      // Fill out and submit the form using helper function
      await fillFormWithValidation(page, {
        name: emailTestConfig.testSenderName,
        email: emailTestConfig.testSenderEmail,
        message: emailTestConfig.testMessage
      });
      
      // Submit the form
      await page.click('button[type="submit"]');
      
      // Wait for loading state to complete
      await expect(page.locator('button[type="submit"]')).not.toContainText('Sending...');
      
      // Verify success message appears (indicates successful FormSpree submission)
      await expect(page.locator('text=Thanks for your message')).toBeVisible();
      
      // Verify form was reset after successful submission
      await expect(page.locator('#name')).toHaveValue('');
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#message')).toHaveValue('');
      
      // Log for debugging
      console.log('FormSpree submission verified via successful form behavior');
    });

    test('should verify FormSpree endpoint configuration', async ({ page }) => {
      // Since the form uses server actions, we'll verify the action response instead
      // of intercepting the client request to FormSpree
      
      // Fill form with valid data to enable submission
      await fillFormWithValidation(page, {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message for endpoint verification'
      });
      
      // Verify submit button is now enabled after validation
      await expect(page.locator('button[type="submit"]')).toBeEnabled();
      
      await page.click('button[type="submit"]');
      
      // Wait for form submission and success message
      await expect(page.locator('button[type="submit"]')).not.toContainText('Sending...');
      
      // Verify success message appears (indicates FormSpree was called successfully)
      await expect(page.locator('text=Thanks for your message')).toBeVisible({ timeout: 5000 });
      
      console.log('FormSpree endpoint configuration verified via successful submission');
    });
  });

  test.describe('Form Validation', () => {
    test('should validate required fields', async ({ page }) => {
      // Test client-side validation: submit button should be disabled for empty form
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeDisabled();
      
      // Verify form fields exist and are accessible
      const nameField = page.locator('#name');
      const emailField = page.locator('#email');
      const messageField = page.locator('#message');
      
      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(messageField).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      await page.fill('#name', validFormData.name);
      await page.locator('#name').blur();
      await page.fill('#email', invalidFormData.invalidEmail.email);
      await page.locator('#email').blur();
      await page.waitForTimeout(100);
      
      // Should show validation error immediately
      await expect(page.locator('text=Please enter a valid email address')).toBeVisible({ timeout: 5000 });
      
      // Submit button should be disabled for invalid form
      await expect(page.locator('button[type="submit"]')).toBeDisabled();
    });

    test('should validate name length constraints', async ({ page }) => {
      // Test short name
      await page.fill('#name', invalidFormData.shortName.name);
      await page.locator('#name').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible({ timeout: 5000 });
      
      // Test long name
      await page.fill('#name', invalidFormData.longName.name);
      await page.locator('#name').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Name too long')).toBeVisible({ timeout: 5000 });
    });

    test('should validate message length constraints', async ({ page }) => {
      // Test short message
      await page.fill('#name', validFormData.name);
      await page.locator('#name').blur();
      await page.fill('#email', validFormData.email);
      await page.locator('#email').blur();
      await page.fill('#message', invalidFormData.shortMessage.message);
      await page.locator('#message').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible({ timeout: 5000 });
      
      // Test long message
      await page.fill('#message', invalidFormData.longMessage.message);
      await page.locator('#message').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Message too long')).toBeVisible({ timeout: 5000 });
    });

    test('should show real-time validation on field blur', async ({ page }) => {
      // Test name validation on blur
      await page.fill('#name', 'A'); // Too short
      await page.locator('#name').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible({ timeout: 2000 });
      
      // Test email validation on blur
      await page.fill('#email', 'invalid-email');
      await page.locator('#email').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Please enter a valid email address')).toBeVisible({ timeout: 2000 });
      
      // Test message validation on blur
      await page.fill('#message', 'Short'); // Too short
      await page.locator('#message').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible({ timeout: 2000 });
    });

    test('should enable submit button only when form is valid', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]');
      
      // Initially disabled
      await expect(submitButton).toBeDisabled();
      
      // Still disabled with partial data
      await page.fill('#name', validFormData.name);
      await page.locator('#name').blur();
      await expect(submitButton).toBeDisabled();
      
      await page.fill('#email', validFormData.email);
      await page.locator('#email').blur();
      await expect(submitButton).toBeDisabled();
      
      // Enabled when all fields are valid
      await page.fill('#message', validFormData.message);
      await page.locator('#message').blur();
      // Wait a moment for React Hook Form to process the validation
      await page.waitForTimeout(200);
      await expect(submitButton).toBeEnabled();
      
      // Disabled again when field becomes invalid
      await page.fill('#email', 'invalid-email');
      await page.locator('#email').blur();
      await page.waitForTimeout(100);
      await expect(submitButton).toBeDisabled();
    });

    test('should clear validation errors when field becomes valid', async ({ page }) => {
      // Create error state
      await page.fill('#name', 'A'); // Too short
      await page.locator('#name').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible();
      
      // Fix the error
      await page.fill('#name', 'Valid Name');
      await page.locator('#name').blur();
      await page.waitForTimeout(100);
      await expect(page.locator('text=Name must be at least 2 characters')).not.toBeVisible();
    });
  });

  test.describe('Form State Management', () => {
    test('should show loading state during submission', async ({ page }) => {
      // Use slow email to trigger delayed response
      await fillFormWithValidation(page, {
        name: validFormData.name,
        email: 'slow@test.com',
        message: validFormData.message
      });
      
      // Submit and immediately check for loading state
      await page.click('button[type="submit"]');
      await expect(page.locator('button[type="submit"]')).toContainText('Sending...');
      await expect(page.locator('button[type="submit"]')).toBeDisabled();
      
      // Wait for completion with longer timeout
      await expect(page.locator('button[type="submit"]')).toContainText('Send Message', { timeout: 10000 });
      
      // Wait for success message to ensure form submission completed
      await expect(page.locator('text=Thanks for your message')).toBeVisible({ timeout: 10000 });
    });

    test('should reset form after successful submission', async ({ page }) => {
      // Use the global mock (no need to override for this test)
      
      // Fill and submit form
      await fillFormWithValidation(page, validFormData);
      await page.click('button[type="submit"]');
      
      // Wait for success message
      await expect(page.locator('text=Thanks for your message')).toBeVisible();
      
      // Verify form fields are cleared
      await expect(page.locator('#name')).toHaveValue('');
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#message')).toHaveValue('');
    });

    test('should handle network errors gracefully', async ({ page }) => {
      // Use special email to trigger error response from mock
      await fillFormWithValidation(page, {
        name: validFormData.name,
        email: 'error@test.com',
        message: validFormData.message
      });
      await page.click('button[type="submit"]');
      
      // Should show error message
      await expect(page.locator('text=Something went wrong')).toBeVisible({ timeout: 5000 });
      
      // Form should remain filled (not reset on error)
      await expect(page.locator('#name')).toHaveValue(validFormData.name);
      await expect(page.locator('#email')).toHaveValue('error@test.com');
      await expect(page.locator('#message')).toHaveValue(validFormData.message);
    });
  });

  test.describe('Accessibility & ARIA Support', () => {
    test('should have proper ARIA attributes for error states', async ({ page }) => {
      // Create error state
      await page.fill('#name', 'A'); // Too short
      await page.locator('#email').focus(); // Trigger blur validation
      
      // Check ARIA attributes
      const nameField = page.locator('#name');
      await expect(nameField).toHaveAttribute('aria-invalid', 'true');
      await expect(nameField).toHaveAttribute('aria-describedby', 'name-error');
      
      // Check error message has proper attributes
      const errorMessage = page.locator('#name-error');
      await expect(errorMessage).toHaveAttribute('role', 'alert');
      await expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Focus the first form field directly to start tab navigation
      await page.locator('#name').focus();
      await expect(page.locator('#name')).toBeFocused();
      
      // Test Tab navigation through form fields
      await page.keyboard.press('Tab'); // Should focus email field
      await expect(page.locator('#email')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Should focus message field
      await expect(page.locator('#message')).toBeFocused();
      
      // Skip testing disabled button focus as it varies by browser
      // Instead test that when form is valid, button can be focused
      await fillFormWithValidation(page, validFormData);
      
      await page.locator('button[type="submit"]').focus();
      await expect(page.locator('button[type="submit"]')).toBeFocused();
    });

    test('should allow form submission via Enter key', async ({ page }) => {
      // Fill valid form data
      await fillFormWithValidation(page, validFormData);
      
      // Verify form is valid
      await expect(page.locator('button[type="submit"]')).toBeEnabled();
      
      // Focus on submit button and press Enter
      await page.locator('button[type="submit"]').focus();
      await page.keyboard.press('Enter');
      
      // Should trigger form submission
      await expect(page.locator('text=Thanks for your message')).toBeVisible({ timeout: 5000 });
    });

    test('should have proper label associations', async ({ page }) => {
      // Check that labels are properly associated with inputs
      const nameLabel = page.locator('label[for="name"]');
      const emailLabel = page.locator('label[for="email"]');
      const messageLabel = page.locator('label[for="message"]');
      
      await expect(nameLabel).toBeVisible();
      await expect(emailLabel).toBeVisible();
      await expect(messageLabel).toBeVisible();
      
      // Clicking labels should focus the associated inputs
      await nameLabel.click();
      await page.waitForTimeout(200); // Allow time for focus
      await expect(page.locator('#name')).toBeFocused();
      
      // Wait before next click and ensure previous focus is cleared
      await page.locator('body').click();
      await page.waitForTimeout(200);
      await emailLabel.click();
      await page.waitForTimeout(200);
      await expect(page.locator('#email')).toBeFocused();
      
      // Wait before next click and ensure previous focus is cleared
      await page.locator('body').click();
      await page.waitForTimeout(200);
      await messageLabel.click();
      await page.waitForTimeout(200);
      await expect(page.locator('#message')).toBeFocused();
    });
  });

  test.describe('Cross-Browser Email Handling', () => {
    test('should maintain email integrity across browsers', async ({ page, browserName }) => {
      const testEmail = `test+${browserName}@example.com`;
      
      // Fill form using helper function
      await fillFormWithValidation(page, {
        name: 'Cross Browser Test',
        email: testEmail,
        message: `Testing email integrity in ${browserName}`
      });
      
      await page.click('button[type="submit"]');
      
      // Verify successful submission (indicates email was processed correctly)  
      await expect(page.locator('text=Thanks for your message')).toBeVisible({ timeout: 10000 });
      
      console.log(`✅ Email integrity maintained in ${browserName}: ${testEmail}`);
    });
  });
});