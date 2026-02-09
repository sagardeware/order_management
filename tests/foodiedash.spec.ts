import { test, expect } from '@playwright/test';

test.describe('FoodieDash E2E - UI Validation', () => {
    test.beforeEach(async ({ page }) => {
        // Automatically uses baseURL from playwright.config.ts
        await page.goto('/');
    });

    test('should display the localized menu with Rupee symbols', async ({ page }) => {
        // Wait for the main heading text to appear (handling the comma)
        await expect(page.locator('h1')).toContainText(/Delicious food/i);

        // Wait for at least one FoodCard price to appear with the rupee symbol
        const priceLabel = page.locator('span:has-text("₹")').first();
        await expect(priceLabel).toBeVisible({ timeout: 10000 });

        const priceText = await priceLabel.innerText();
        expect(priceText).toContain('₹');
    });

    test('should add an item to the cart and verify UI changes', async ({ page }) => {
        // 1. Find and click "Add to Cart"
        const addButton = page.getByRole('button', { name: /Add to Cart/i }).first();
        await expect(addButton).toBeVisible();
        await addButton.click();

        // 2. Check for Sonner toast - using more general locator
        await expect(page.getByText(/added to cart/i)).toBeVisible({ timeout: 10000 });

        // 3. Verify quantity control '1' appears on the card
        // Based on food-card.tsx line 81: <span className="font-bold text-sm w-4 text-center">1</span>
        const quantityTracker = page.locator('button + span').filter({ hasText: /^1$/ });
        await expect(quantityTracker.first()).toBeVisible();

        // 4. Open Cart Sidebar
        await page.getByTestId('cart-button').click();

        // 5. Verify Cart Drawer Content
        await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
        await expect(page.getByText('Total', { exact: true })).toBeVisible();

        // Check if item name is in cart (using first menu item as it was clicked)
        const firstFoodName = await page.locator('h3, h4').first().innerText();
        if (firstFoodName) {
            // Scope to the Sheet (dialog) to avoid finding the same name on the food card
            await expect(page.locator('[role="dialog"]').getByText(firstFoodName)).toBeVisible();
        }
    });

    test('should navigate to order history drawer', async ({ page }) => {
        // 1. Click the "Orders" button in navbar
        const ordersButton = page.getByRole('button', { name: 'Orders' });
        await expect(ordersButton).toBeVisible();
        await ordersButton.click();

        // 2. Verify Sidebar Header
        await expect(page.getByText('Order History', { exact: true })).toBeVisible();
        await expect(page.getByText('Track your current and past orders here')).toBeVisible();
    });

    test('should validate checkout form inputs', async ({ page }) => {
        // 1. Add item and go to checkout
        await page.getByRole('button', { name: /Add to Cart/i }).first().click();
        await page.getByTestId('cart-button').click();
        await page.getByRole('button', { name: /Proceed to Checkout/i }).click();

        // 2. Try to submit empty form
        await page.getByRole('button', { name: /Confirm Order/i }).click();

        // 3. Verify error messages appear
        await expect(page.getByText(/Name must be at least 2 characters/i)).toBeVisible();
        // Updated regex message in checkout-form.tsx
        await expect(page.getByText(/Please enter a valid 10-digit Indian phone number/i)).toBeVisible();
    });

    test('should complete a full checkout flow', async ({ page }) => {
        // 1. Add item and go to checkout
        await page.getByRole('button', { name: /Add to Cart/i }).first().click();
        await page.getByTestId('cart-button').click();
        await page.getByRole('button', { name: /Proceed to Checkout/i }).click();

        // 2. Fill in the form
        await page.getByPlaceholder('Sagar Deware').fill('Test User');
        await page.getByPlaceholder('9876543210').fill('9876543210');
        await page.getByPlaceholder('A-101, Sunshine Apartments').fill('123 Test Street');
        await page.getByPlaceholder('Mumbai').fill('Pune');
        await page.getByPlaceholder('400001').fill('411001');

        // 3. Submit Order
        await page.getByRole('button', { name: /Confirm Order/i }).click();

        // 4. Verify success toast and cart closure
        await expect(page.getByText(/Order placed/i)).toBeVisible({ timeout: 10000 });

        // 5. Verify Redirect/Order appears in History
        await page.getByRole('button', { name: 'Orders' }).click();
        await expect(page.getByText('Order History', { exact: true })).toBeVisible();
        // Should find at least one order card with Rupee symbol
        await expect(page.locator('button >> h5:has-text("₹")').first()).toBeVisible();
    });
});
