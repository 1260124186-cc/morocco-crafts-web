// @ts-check
const { test, expect } = require('@playwright/test');

test('page loads successfully', async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    // Verify the page title
    await expect(page).toHaveTitle('摩洛哥手工艺平台 - 连接传统与全球');
    
    // Verify the logo exists
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    
    // Verify navigation links exist
    const navLinks = page.locator('.nav-link');
    await expect(navLinks).toHaveCount(5);
    
    // Verify hero section exists
    const heroSection = page.locator('.hero');
    await expect(heroSection).toBeVisible();
    
    // Verify hero buttons exist
    const heroButtons = page.locator('.hero-buttons .btn');
    await expect(heroButtons).toHaveCount(2);
});

test('artisans section displays correctly', async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    // Verify artisans section exists
    const artisansSection = page.locator('.artisans');
    await expect(artisansSection).toBeVisible();
    
    // Verify artisan cards exist
    const artisanCards = page.locator('.artisan-card');
    await expect(artisanCards).toHaveCount(4);
    
    // Verify "查看作品" buttons exist
    const viewWorkButtons = page.locator('.artisan-card .btn-primary');
    await expect(viewWorkButtons).toHaveCount(4);
    await expect(viewWorkButtons.first()).toBeVisible();
});

test('crafts section displays correctly', async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    // Verify crafts section exists
    const craftsSection = page.locator('.crafts');
    await expect(craftsSection).toBeVisible();
    
    // Verify craft cards exist
    const craftCards = page.locator('.craft-card');
    await expect(craftCards).toHaveCount(4);
    
    // Verify add to cart buttons exist
    const addToCartButtons = page.locator('.craft-actions .btn-primary');
    await expect(addToCartButtons).toHaveCount(4);
    
    // Verify favorite buttons exist
    const favoriteButtons = page.locator('.craft-actions .btn-outline');
    await expect(favoriteButtons).toHaveCount(4);
});

test('about section displays correctly', async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    // Verify about section exists
    const aboutSection = page.locator('.about');
    await expect(aboutSection).toBeVisible();
    
    // Verify about features exist
    const aboutFeatures = page.locator('.feature-item');
    await expect(aboutFeatures).toHaveCount(3);
});
