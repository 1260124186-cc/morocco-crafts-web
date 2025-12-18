// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add to Cart Functionality
document.querySelectorAll('.craft-actions .btn-primary').forEach(button => {
    // Skip if button already has event listener
    if (button.dataset.listenerAdded) return;
    button.dataset.listenerAdded = 'true';

    button.addEventListener('click', function() {
        const craftCard = this.closest('.craft-card');
        const craftName = craftCard.querySelector('.craft-name').textContent;

        // Show success message
        Message.success(`${craftName} 已成功加入购物车！`);
    });
});

// Favorite Button Functionality
document.querySelectorAll('.craft-actions .btn-outline').forEach(button => {
    // Skip if button already has event listener
    if (button.dataset.listenerAdded) return;
    button.dataset.listenerAdded = 'true';

    button.addEventListener('click', function() {
        const heartIcon = this.querySelector('i');
        if (!heartIcon) return;

        if (heartIcon.classList.contains('fa-solid')) {
            heartIcon.classList.remove('fa-solid');
            heartIcon.classList.add('fa-regular');
            this.style.color = '';
        } else {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
            this.style.color = '#FF1493';
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation classes to sections
document.querySelectorAll('.artisan-card, .craft-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const body = document.body;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        this.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('nav-open');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// Hero buttons functionality
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
    button.addEventListener('click', function() {
        const text = this.textContent.trim();
        if (text.includes('浏览商品')) {
            document.querySelector('#crafts').scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes('了解手工艺人')) {
            document.querySelector('#artisans').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Artisan card "查看作品" button functionality
document.querySelectorAll('.artisan-card .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const artisanCard = this.closest('.artisan-card');
        const artisanName = artisanCard.querySelector('.artisan-name').textContent;
        // Scroll to crafts section
        document.querySelector('#crafts').scrollIntoView({ behavior: 'smooth' });
    });
});

// Element Plus Style Message Component
class Message {
    static show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('message-container') || this.createContainer();
        const messageEl = document.createElement('div');
        messageEl.className = `el-message el-message--${type}`;

        const iconMap = {
            info: 'fas fa-info-circle',
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle'
        };

        messageEl.innerHTML = `
            <i class="${iconMap[type] || iconMap.info}"></i>
            <p class="el-message__content">${message}</p>
        `;

        container.appendChild(messageEl);

        // Trigger animation
        setTimeout(() => {
            messageEl.classList.add('el-message--show');
        }, 10);

        // Auto remove
        setTimeout(() => {
            messageEl.classList.remove('el-message--show');
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, duration);

        return messageEl;
    }

    static createContainer() {
        const container = document.createElement('div');
        container.id = 'message-container';
        document.body.appendChild(container);
        return container;
    }

    static info(message, duration) {
        return this.show(message, 'info', duration);
    }

    static success(message, duration) {
        return this.show(message, 'success', duration);
    }

    static warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    static error(message, duration) {
        return this.show(message, 'error', duration);
    }
}

// Shopping Cart Button
const shoppingCartBtn = document.querySelector('.user-actions .btn-primary');
if (shoppingCartBtn && (shoppingCartBtn.textContent.includes('购物车') || shoppingCartBtn.querySelector('.fa-shopping-cart'))) {
    shoppingCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        Message.warning('购物车功能正在开发中，敬请期待！');
    });
}

// Login Button
const loginBtn = document.querySelector('.user-actions .btn-outline');
if (loginBtn && (loginBtn.textContent.includes('登录') || loginBtn.querySelector('.fa-user'))) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        Message.info('登录功能正在开发中，敬请期待！');
    });
}

// Footer links that need message
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const linkText = this.textContent.trim();
        Message.info(`${linkText}功能正在开发中，敬请期待！`);
    });
});

// Social links message
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.getAttribute('aria-label') || '社交平台';
        Message.info(`${platform}链接功能正在开发中，敬请期待！`);
    });
});
