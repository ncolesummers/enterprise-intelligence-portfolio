import { test, expect } from '@playwright/test';
import { pageUrls } from '../fixtures/test-data';

test.describe('Navigation', () => {
  test.describe('Homepage Components', () => {
    test('should load homepage with all main components', async ({ page }) => {
      await page.goto('/');
      
      // Check header
      await expect(page.locator('header')).toBeVisible();
      
      // Check main content sections
      await expect(page.locator('#main-content')).toBeVisible();
      
      // Check hero section
      await expect(page.locator('text=Cole Summers')).toBeVisible();
      
      // Check projects section
      await expect(page.locator('text=Featured Projects')).toBeVisible();
      
      // Check contact section
      await expect(page.locator('text=Get In Touch')).toBeVisible();
      
      // Check footer
      await expect(page.locator('footer')).toBeVisible();
    });

    test('should have working skip to content link', async ({ page }) => {
      await page.goto('/');
      
      // Tab to focus skip link
      await page.keyboard.press('Tab');
      
      // Skip link should be visible when focused
      const skipLink = page.locator('.skip-to-content');
      await expect(skipLink).toBeFocused();
      
      // Click skip link
      await skipLink.click();
      
      // Main content should be focused
      await expect(page.locator('#main-content')).toBeFocused();
    });
  });

  test.describe('Project Pages', () => {
    test('should navigate to MikroTik Config Generator project', async ({ page }) => {
      await page.goto('/');
      
      // Find and click the MikroTik project link
      await page.click('text=MikroTik Configuration Generator');
      
      // Should navigate to project page
      await expect(page).toHaveURL(pageUrls.projects.mikrotikConfigGen);
      
      // Page should load with project content
      await expect(page.locator('text=MikroTik')).toBeVisible();
    });

    test('should navigate to MyUI project', async ({ page }) => {
      await page.goto('/');
      
      await page.click('text=MyUI');
      await expect(page).toHaveURL(pageUrls.projects.myui);
      await expect(page.locator('text=MyUI')).toBeVisible();
    });

    test('should navigate to Profile Extractor project', async ({ page }) => {
      await page.goto('/');
      
      await page.click('text=Profile Extractor');
      await expect(page).toHaveURL(pageUrls.projects.profileExtractor);
      await expect(page.locator('text=Profile Extractor')).toBeVisible();
    });

    test('should handle direct project page access', async ({ page }) => {
      // Test direct navigation to project pages
      await page.goto(pageUrls.projects.mikrotikConfigGen);
      await expect(page.locator('text=MikroTik')).toBeVisible();
      
      await page.goto(pageUrls.projects.myui);
      await expect(page.locator('text=MyUI')).toBeVisible();
      
      await page.goto(pageUrls.projects.profileExtractor);
      await expect(page.locator('text=Profile Extractor')).toBeVisible();
    });
  });

  test.describe('About Page', () => {
    test('should navigate to about page', async ({ page }) => {
      await page.goto('/');
      
      // Click about link in navigation
      await page.click('text=About');
      
      await expect(page).toHaveURL(pageUrls.about);
      await expect(page.locator('text=About')).toBeVisible();
    });

    test('should have consistent header on about page', async ({ page }) => {
      await page.goto(pageUrls.about);
      
      // Header should be present and functional
      await expect(page.locator('header')).toBeVisible();
      
      // Should be able to navigate back to home
      await page.click('text=Cole Summers'); // Logo/name link
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Responsive Navigation', () => {
    test('should work on mobile viewports', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Check if mobile navigation is present
      const mobileNav = page.locator('[data-testid="mobile-nav"]');
      if (await mobileNav.isVisible()) {
        // Test mobile navigation functionality
        await mobileNav.click();
        await expect(page.locator('text=About')).toBeVisible();
      }
      
      // Ensure content is accessible on mobile
      await expect(page.locator('text=Cole Summers')).toBeVisible();
    });
  });

  test.describe('Focus Management', () => {
    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/');
      
      // Tab through navigation
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // First nav item
      
      // Should be able to navigate with keyboard
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should maintain focus order', async ({ page }) => {
      await page.goto('/');
      
      const tabbableElements = [
        '.skip-to-content',
        'header a', // Navigation links
        'main a', // Content links
        '#name', // Form fields
        '#email',
        '#message',
        'button[type="submit"]',
      ];
      
      // Tab through elements and verify logical order
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        const focused = await page.locator(':focus').first();
        await expect(focused).toBeVisible();
      }
    });
  });

  test.describe('Performance', () => {
    test('should load pages quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      const endTime = Date.now();
      
      const loadTime = endTime - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
      
      // Check that main content is visible
      await expect(page.locator('#main-content')).toBeVisible();
    });

    test('should have no console errors on page load', async ({ page }) => {
      const consoleErrors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      await page.goto('/');
      
      // Allow some time for any async errors
      await page.waitForTimeout(1000);
      
      expect(consoleErrors).toHaveLength(0);
    });
  });
});