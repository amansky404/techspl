// Tech Sanrakshanam - Main JavaScript File
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip if it's just "#" (dropdown toggles) or "#contact" (handled separately)
            if (href === '#' || href === '#contact') {
                return;
            }
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Handle dropdown toggles specifically
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Toggle dropdown menu visibility via CSS
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Contact Modal
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    
    function closeContactModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Clear hash from URL without reload
            if (window.location.hash === '#contact') {
                history.pushState('', document.title, window.location.pathname + window.location.search);
            }
        }
    }
    
    function openContactModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });
    });
    
    // Check if URL has #contact hash on page load - but only on home page
    // Don't auto-open modal when landing on other pages with hash
    if (window.location.hash === '#contact' && window.location.pathname === '/') {
        openContactModal();
    } else if (window.location.hash === '#contact') {
        // Clear the hash if on a different page
        history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    
    if (closeModal && contactModal) {
        closeModal.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeContactModal();
        });
        
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeContactModal();
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                subject: this.subject.value,
                message: this.message.value
            };
            
            try {
                const response = await fetch('/contact/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('Thank you for contacting us! We will get back to you soon.');
                    this.reset();
                    contactModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your message. Please try again.');
            }
        });
    }
    
    // Community Form Submission
    const communityForm = document.getElementById('communityContactForm');
    if (communityForm) {
        communityForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                company: this.company.value,
                subject: this.subject.value,
                message: this.message.value
            };
            
            try {
                const response = await fetch('/community/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('Thank you for your submission! We will respond shortly.');
                    this.reset();
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your message. Please try again.');
            }
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // FAQ Category & Search Filtering (combined logic)
    const faqSearch = document.getElementById('faqSearch');
    const faqCategoryTabs = document.querySelectorAll('.faq-categories li[data-category]');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqNoResults = document.getElementById('faqNoResults');
    let activeFaqCategory = 'general';

    function filterFaq() {
        const term = (faqSearch && faqSearch.value.trim().toLowerCase()) || '';
        let visibleCount = 0;
        faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const text = item.textContent.toLowerCase();
            const categoryMatch = activeFaqCategory === 'general' || itemCategory === activeFaqCategory;
            const termMatch = !term || text.includes(term);
            if (categoryMatch && termMatch) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        if (faqNoResults) {
            if (visibleCount === 0) {
                faqNoResults.classList.remove('hidden');
            } else {
                faqNoResults.classList.add('hidden');
            }
        }
    }

    faqCategoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            faqCategoryTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
            tab.classList.add('active');
            tab.setAttribute('aria-selected','true');
            activeFaqCategory = tab.getAttribute('data-category');
            filterFaq();
        });
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });

    if (faqSearch) {
        faqSearch.addEventListener('input', filterFaq);
    }

    // Initial filter
    filterFaq();
    
    // Community Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Projects Filter
    const projectFilters = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            projectFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardStatus = card.getAttribute('data-status');
                    if (cardStatus === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Blog Filters (client-side)
    const blogFilters = document.querySelectorAll('.blog-filters .filter-btn');
    const blogCards = document.querySelectorAll('.blog-grid .blog-card');

    function slugify(val) {
        return (val || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    blogFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // active state
            blogFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selected = slugify(this.getAttribute('data-category'));

            blogCards.forEach(card => {
                const cats = (card.getAttribute('data-categories') || '').split(/\s+/).filter(Boolean);
                if (selected === 'all' || cats.includes(selected)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('Thank you for subscribing! You will receive our latest updates.');
                this.reset();
            }
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections for animation
    const animateElements = document.querySelectorAll('.service-card, .product-card, .solution-card, .project-card, .blog-card, .innovation-card, .why-card, .benefit-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
    
    // Counter Animation for Stats
    const animateCounter = (element, target, duration = 2000) => {
        let current = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, 16);
    };
    
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number, .stat-box h3');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const text = entry.target.textContent.replace(/[^0-9.]/g, '');
                const target = parseFloat(text);
                
                if (!isNaN(target)) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
    
    // Discussion Categories Click Handler
    const discussionCategories = document.querySelectorAll('.discussion-categories li[data-category]');
    const discussionItems = document.querySelectorAll('.discussion-item[data-category]');
    let activeDiscussionCategory = discussionCategories.length ? discussionCategories[0].getAttribute('data-category') : 'all';

    function filterDiscussions() {
        discussionItems.forEach(item => {
            const cat = item.getAttribute('data-category');
            if (!activeDiscussionCategory || activeDiscussionCategory === 'all' || cat === activeDiscussionCategory) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    discussionCategories.forEach(category => {
        category.addEventListener('click', function() {
            discussionCategories.forEach(cat => { cat.classList.remove('active'); cat.setAttribute('aria-selected','false'); });
            this.classList.add('active');
            this.setAttribute('aria-selected','true');
            activeDiscussionCategory = this.getAttribute('data-category');
            filterDiscussions();
        });
        category.addEventListener('keydown', function(e){
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
        });
    });

    // Make discussion card clickable
    discussionItems.forEach(item => {
        const href = item.getAttribute('data-href');
        if (href) {
            item.addEventListener('click', (e) => {
                // avoid double-navigation when anchor inside is clicked
                if (e.target && e.target.closest('a')) return;
                window.location.href = href;
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = href;
                }
            });
            item.style.cursor = 'pointer';
        }
    });

    filterDiscussions();
    
    // FAQ Categories Click Handler
    const faqCategories = document.querySelectorAll('.faq-categories li');
    faqCategories.forEach(category => {
        category.addEventListener('click', function() {
            faqCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form Validation Helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add validation to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const emailInputs = form.querySelectorAll('input[type="email"]');
        
        emailInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#e74c3c';
                    
                    // Remove any existing error message
                    const existingError = this.parentElement.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                    
                    // Add error message
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.85rem';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = 'Please enter a valid email address';
                    this.parentElement.appendChild(errorMsg);
                } else {
                    this.style.borderColor = '';
                    const errorMsg = this.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
    });
    
    // Lazy loading for images (if needed)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('🚀 Tech Sanrakshanam website initialized successfully!');
});

// Service Worker Registration (for PWA features - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
