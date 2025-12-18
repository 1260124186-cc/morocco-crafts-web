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
    button.addEventListener('click', function() {
        const craftCard = this.closest('.craft-card');
        const craftName = craftCard.querySelector('.craft-name').textContent;
        
        // Simulate adding to cart
        this.innerHTML = '<i class="fas fa-check"></i> 已加入购物车';
        this.disabled = true;
        this.style.backgroundColor = '#4CAF50';
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-shopping-cart"></i> 加入购物车';
            this.disabled = false;
            this.style.backgroundColor = '';
            this.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        }, 2000);
    });
});

// Favorite Button Functionality
document.querySelectorAll('.craft-actions .btn-outline').forEach(button => {
    button.addEventListener('click', function() {
        const heartIcon = this.querySelector('i');
        if (heartIcon.classList.contains('fa-heart')) {
            heartIcon.classList.remove('fa-heart');
            heartIcon.classList.add('fa-heart-o');
            this.style.color = '';
        } else {
            heartIcon.classList.remove('fa-heart-o');
            heartIcon.classList.add('fa-heart');
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
    } else {
        header.style.padding = '1rem 0';
    }
});
