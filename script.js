document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Menu filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.textContent.toLowerCase().replace(' ', '-');

            menuItems.forEach(item => {
                if (category === 'all') {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Mobile nav toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
        // Close menu on link click (mobile)
        navMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

    // Dark mode toggle with persistence
    const darkToggle = document.querySelector('.dark-mode-toggle');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const next = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            // Swap icon
            darkToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
        // Initialize icon
        darkToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    const onScroll = () => {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Newsletter subscription (demo-only)
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterFeedback = document.getElementById('newsletterFeedback');
    if (newsletterForm && newsletterEmail && newsletterFeedback) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newsletterFeedback.textContent = 'Please enter a valid email address.';
                newsletterFeedback.style.color = '#b00020';
                return;
            }
            newsletterFeedback.textContent = 'Thanks for subscribing! Check your inbox for a welcome email.';
            newsletterFeedback.style.color = '#1a7f37';
            newsletterEmail.value = '';
        });
    }
});