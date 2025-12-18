// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('页面基础功能测试', () => {
    test('页面加载成功', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 验证页面标题
        await expect(page).toHaveTitle('摩洛哥手工艺平台 - 连接传统与全球');

        // 验证logo存在
        const logo = page.locator('.logo');
        await expect(logo).toBeVisible();

        // 验证导航链接存在
        const navLinks = page.locator('.nav-link');
        await expect(navLinks).toHaveCount(5);

        // 验证hero区域存在
        const heroSection = page.locator('.hero');
        await expect(heroSection).toBeVisible();

        // 验证hero按钮存在
        const heroButtons = page.locator('.hero-buttons .btn');
        await expect(heroButtons).toHaveCount(2);
    });

    test('导航链接可点击并正确跳转', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 测试首页链接
        await page.locator('a[href="#home"]').click();
        await expect(page.locator('#home')).toBeVisible();

        // 测试手工艺人链接
        await page.locator('a[href="#artisans"]').click();
        await expect(page.locator('#artisans')).toBeVisible();

        // 测试手工艺品链接
        await page.locator('a[href="#crafts"]').click();
        await expect(page.locator('#crafts')).toBeVisible();

        // 测试关于链接
        await page.locator('a[href="#about"]').click();
        await expect(page.locator('#about')).toBeVisible();

        // 测试联系我们链接
        await page.locator('a[href="#contact"]').click();
        await expect(page.locator('#contact')).toBeVisible();
    });

    test('手工艺人区域显示正确', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 验证手工艺人区域存在
        const artisansSection = page.locator('.artisans');
        await expect(artisansSection).toBeVisible();

        // 验证手工艺人卡片存在
        const artisanCards = page.locator('.artisan-card');
        await expect(artisanCards).toHaveCount(4);

        // 验证"查看作品"按钮存在
        const viewWorkButtons = page.locator('.artisan-card .btn-primary');
        await expect(viewWorkButtons).toHaveCount(4);
        await expect(viewWorkButtons.first()).toBeVisible();

        // 验证手工艺人名称存在
        const artisanNames = page.locator('.artisan-name');
        await expect(artisanNames).toHaveCount(4);
    });

    test('手工艺品区域显示正确', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 验证手工艺品区域存在
        const craftsSection = page.locator('.crafts');
        await expect(craftsSection).toBeVisible();

        // 验证手工艺品卡片存在
        const craftCards = page.locator('.craft-card');
        await expect(craftCards).toHaveCount(4);

        // 验证加入购物车按钮存在
        const addToCartButtons = page.locator('.craft-actions .btn-primary');
        await expect(addToCartButtons).toHaveCount(4);

        // 验证收藏按钮存在
        const favoriteButtons = page.locator('.craft-actions .btn-outline');
        await expect(favoriteButtons).toHaveCount(4);

        // 验证价格显示
        const prices = page.locator('.craft-price');
        await expect(prices).toHaveCount(4);
    });

    test('关于区域显示正确', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 验证关于区域存在
        const aboutSection = page.locator('.about');
        await expect(aboutSection).toBeVisible();

        // 验证特性项存在
        const aboutFeatures = page.locator('.feature-item');
        await expect(aboutFeatures).toHaveCount(3);
    });

    test('页脚区域显示正确', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 验证页脚存在
        const footer = page.locator('.footer');
        await expect(footer).toBeVisible();

        // 验证社交链接存在
        const socialLinks = page.locator('.social-link');
        await expect(socialLinks).toHaveCount(4);

        // 验证页脚链接存在
        const footerLinks = page.locator('.footer-links a');
        await expect(footerLinks.first()).toBeVisible();
    });
});

test.describe('交互功能测试', () => {
    test('加入购物车按钮功能', async ({ page }) => {
        await page.goto('http://localhost:8000');

        const firstAddToCartBtn = page.locator('.craft-actions .btn-primary').first();
        await expect(firstAddToCartBtn).toBeVisible();

        // 点击加入购物车按钮
        await firstAddToCartBtn.click();

        // 验证按钮文本变化
        await expect(firstAddToCartBtn).toContainText('已加入购物车');
    });

    test('收藏按钮功能', async ({ page }) => {
        await page.goto('http://localhost:8000');

        const firstFavoriteBtn = page.locator('.craft-actions .btn-outline').first();
        await expect(firstFavoriteBtn).toBeVisible();

        // 点击收藏按钮
        await firstFavoriteBtn.click();

        // 验证图标变化（从fa-regular变为fa-solid）
        const heartIcon = firstFavoriteBtn.locator('i');
        await expect(heartIcon).toHaveClass(/fa-solid/);
    });

    test('Hero按钮跳转功能', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 测试"浏览商品"按钮
        const browseBtn = page.locator('.hero-buttons .btn-primary');
        await browseBtn.click();
        await expect(page.locator('#crafts')).toBeVisible();

        // 返回顶部
        await page.goto('http://localhost:8000');

        // 测试"了解手工艺人"按钮
        const artisansBtn = page.locator('.hero-buttons .btn-outline');
        await artisansBtn.click();
        await expect(page.locator('#artisans')).toBeVisible();
    });

    test('手工艺人卡片按钮功能', async ({ page }) => {
        await page.goto('http://localhost:8000');

        const viewWorkBtn = page.locator('.artisan-card .btn-primary').first();
        await viewWorkBtn.click();

        // 验证跳转到手工艺品区域
        await expect(page.locator('#crafts')).toBeVisible();
    });
});

test.describe('响应式设计测试', () => {
    test('移动端菜单功能', async ({ page }) => {
        // 设置移动端视口
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:8000');

        // 验证移动端菜单按钮存在
        const mobileMenuBtn = page.locator('.mobile-menu-btn');
        await expect(mobileMenuBtn).toBeVisible();

        // 点击菜单按钮
        await mobileMenuBtn.click();

        // 验证菜单打开
        const nav = page.locator('.nav');
        await expect(nav).toHaveClass(/nav-open/);

        // 点击菜单项
        await page.locator('.nav-link').first().click();

        // 验证菜单关闭
        await expect(nav).not.toHaveClass(/nav-open/);
    });

    test('桌面端导航显示', async ({ page }) => {
        // 设置桌面端视口
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto('http://localhost:8000');

        // 验证导航链接在桌面端可见
        const navLinks = page.locator('.nav-link');
        await expect(navLinks.first()).toBeVisible();

        // 验证移动端菜单按钮在桌面端隐藏
        const mobileMenuBtn = page.locator('.mobile-menu-btn');
        const isVisible = await mobileMenuBtn.isVisible();
        // 在桌面端，移动菜单按钮应该隐藏或不可见
        expect(isVisible).toBeFalsy();
    });
});

test.describe('链接可访问性测试', () => {
    test('所有内部锚点链接有效', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // 测试所有导航链接
        const navLinks = page.locator('.nav-link');
        const count = await navLinks.count();

        for (let i = 0; i < count; i++) {
            const link = navLinks.nth(i);
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).not.toBe('#');
        }
    });

    test('社交链接有正确的target和rel属性', async ({ page }) => {
        await page.goto('http://localhost:8000');

        const socialLinks = page.locator('.social-link');
        const count = await socialLinks.count();

        for (let i = 0; i < count; i++) {
            const link = socialLinks.nth(i);
            const target = await link.getAttribute('target');
            const rel = await link.getAttribute('rel');

            expect(target).toBe('_blank');
            expect(rel).toContain('noopener');
        }
    });
});
