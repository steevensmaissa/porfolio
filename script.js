// Gestion du menu mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation fluide et mise en surbrillance du lien actif
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Effet de transparence sur la navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .expertise-item').forEach(el => {
    observer.observe(el);
});

// Animation des statistiques
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.includes('+') ? '+' : 
                      stat.textContent.includes('%') ? '%' : '';
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current) + suffix;
            }
        }, 40);
    });
};

// Observer pour les stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulation d'envoi (vous pouvez intégrer un service d'email ici)
        showNotification('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
        
        // Reset du formulaire
        contactForm.reset();
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Gestion de la fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Effet de parallaxe sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Effet de typing pour le titre principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Animation du texte au chargement de la page
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Gestion des liens vers les projets (à personnaliser)
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href === '#' || link.href.endsWith('#')) {
            e.preventDefault();
            showNotification('Ce projet sera bientôt disponible !', 'info');
        }
    });
});

// Effet de hover sur les cartes de compétences
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Mode sombre (optionnel)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Charger le mode sombre depuis localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Validation du formulaire en temps réel
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearValidation);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Supprimer les messages d'erreur existants
    clearValidation(e);
    
    if (!value) {
        showFieldError(field, 'Ce champ est requis');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Veuillez saisir un email valide');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

function clearValidation(e) {
    const field = e.target;
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
    field.classList.remove('field-error', 'field-success');
}

function showFieldError(field, message) {
    field.classList.add('field-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    `;
    field.parentNode.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.classList.add('field-success');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Amélioration de l'accessibilité
document.addEventListener('keydown', (e) => {
    // Navigation au clavier pour le menu mobile
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Amélioration des performances avec throttling
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Application du throttling au scroll
const throttledScroll = throttle(() => {
    // Code de gestion du scroll existant
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Preloader simple
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = '<div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
    
    // Ajouter animation CSS pour le spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Supprimer le preloader après le chargement
    setTimeout(() => {
        if (preloader.parentNode) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }
    }, 1000);
});

// Système de particules pour la section hero
function createParticleSystem() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    hero.appendChild(particlesContainer);

    // Créer des particules
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const opacity = Math.random() * 0.5 + 0.2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${left}%;
        bottom: -10px;
        animation: particleFloat ${animationDuration}s linear infinite;
        animation-delay: ${Math.random() * -20}s;
    `;
    
    container.appendChild(particle);
}

// Animation CSS pour les particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .cyber-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: gridMove 20s linear infinite;
        pointer-events: none;
    }
    
    @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
    }
    
    .floating-icons {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    
    .floating-icon {
        position: absolute;
        font-size: 2rem;
        color: rgba(99, 102, 241, 0.1);
        animation: floatIcon 15s ease-in-out infinite;
    }
    
    @keyframes floatIcon {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-20px) rotate(90deg); }
        50% { transform: translateY(-10px) rotate(180deg); }
        75% { transform: translateY(-30px) rotate(270deg); }
    }
    
    .section-bg-animated {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    
    .animated-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(20px);
        animation: blobFloat 20s ease-in-out infinite;
        opacity: 0.1;
    }
    
    @keyframes blobFloat {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
    }
`;
document.head.appendChild(particleStyle);

// Ajouter la grille cyber à certaines sections
function addCyberGrid(section) {
    const grid = document.createElement('div');
    grid.className = 'cyber-grid';
    section.style.position = 'relative';
    section.appendChild(grid);
}

// Ajouter des icônes flottantes aux sections
function addFloatingIcons(section, icons) {
    const container = document.createElement('div');
    container.className = 'floating-icons';
    
    icons.forEach((icon, index) => {
        const iconElement = document.createElement('i');
        iconElement.className = `floating-icon ${icon}`;
        iconElement.style.left = `${Math.random() * 90 + 5}%`;
        iconElement.style.top = `${Math.random() * 90 + 5}%`;
        iconElement.style.animationDelay = `${index * 2}s`;
        container.appendChild(iconElement);
    });
    
    section.style.position = 'relative';
    section.appendChild(container);
}

// Ajouter des blobs animés
function addAnimatedBlobs(section) {
    const container = document.createElement('div');
    container.className = 'section-bg-animated';
    
    for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        blob.className = 'animated-blob';
        blob.style.cssText = `
            width: ${Math.random() * 200 + 100}px;
            height: ${Math.random() * 200 + 100}px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            left: ${Math.random() * 80}%;
            top: ${Math.random() * 80}%;
            animation-delay: ${i * 3}s;
        `;
        container.appendChild(blob);
    }
    
    section.style.position = 'relative';
    section.appendChild(container);
}

// Effet Matrix pour la section formation
function createMatrixEffect(section) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.1;
        z-index: 0;
    `;
    
    function resizeCanvas() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const font_size = 10;
    const columns = canvas.width / font_size;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#6366f1';
        ctx.font = font_size + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);
            
            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    section.style.position = 'relative';
    section.appendChild(canvas);
}

// Effet de curseur personnalisé
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0.8;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// Initialiser tous les effets visuels
function initializeVisualEffects() {
    // Particules dans le hero
    createParticleSystem();
    
    // Grille cyber dans les compétences
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        addCyberGrid(skillsSection);
    }
    
    // Icônes flottantes dans les projets
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        addFloatingIcons(projectsSection, [
            'fas fa-shield-alt',
            'fas fa-cloud',
            'fas fa-code',
            'fas fa-server',
            'fas fa-lock'
        ]);
    }
    
    // Blobs animés dans la section à propos
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        addAnimatedBlobs(aboutSection);
    }
    
    // Effet Matrix dans la formation
    const educationSection = document.querySelector('.education');
    if (educationSection) {
        createMatrixEffect(educationSection);
    }
    
    // Icônes cybersécurité dans les centres d'intérêt
    const interestsSection = document.querySelector('.interests');
    if (interestsSection) {
        addFloatingIcons(interestsSection, [
            'fas fa-bug',
            'fas fa-user-secret',
            'fas fa-key',
            'fas fa-skull'
        ]);
    }
    
    // Curseur personnalisé
    createCustomCursor();
}

// Parallax sur les sections
function initParallax() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rate = scrolled * -0.5;
            const floatingIcons = section.querySelector('.floating-icons');
            if (floatingIcons) {
                floatingIcons.style.transform = `translateY(${rate * 0.5}px)`;
            }
        });
    });
}

// Effet d'apparition au scroll amélioré
function enhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                
                // Animer les enfants avec délai
                const children = entry.target.querySelectorAll('.skill-item, .project-card, .education-card, .interest-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category, .project-card, .education-card, .interest-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

console.log('🚀 Portfolio de Steeven\'s MAÏSSA MATSIENDI chargé avec succès !');
console.log('📧 Contact: steevensmaissa@gmail.com');
console.log('📱 Téléphone: 07 58 19 94 94');
console.log('💼 LinkedIn: https://www.linkedin.com/in/steeven-s-maïssa-973404127/');
console.log('🎨 Effets visuels activés !');

// CV Generation Function
function generateCV() {
    const cvTemplate = document.getElementById('cv-template');
    const cvButton = document.getElementById('download-cv');
    
    if (!cvTemplate) {
        alert('Template CV non trouvé !');
        return;
    }
    
    // Show loading state
    const originalText = cvButton.innerHTML;
    cvButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération...';
    cvButton.disabled = true;
    
    // Configure PDF options
    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'CV-Steeven-MAISSA-MATSIENDI.pdf',
        image: { 
            type: 'jpeg', 
            quality: 0.98 
        },
        html2canvas: { 
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: true,
            width: 794,
            height: 1123
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Show template for rendering
    cvTemplate.style.display = 'block';
    cvTemplate.style.position = 'fixed';
    cvTemplate.style.left = '0';
    cvTemplate.style.top = '0';
    cvTemplate.style.width = '210mm';
    cvTemplate.style.height = 'auto';
    cvTemplate.style.zIndex = '9999';
    cvTemplate.style.backgroundColor = '#ffffff';
    cvTemplate.style.overflow = 'visible';
    
    // Wait a bit for rendering
    setTimeout(() => {
        console.log('🔄 Début de génération PDF...');
        
        // Generate PDF
        html2pdf().set(opt).from(cvTemplate).save().then(() => {
            // Hide template and restore button
            cvTemplate.style.display = 'none';
            cvTemplate.style.position = 'absolute';
            cvTemplate.style.left = '-9999px';
            cvTemplate.style.top = '-9999px';
            cvTemplate.style.zIndex = '';
            cvButton.innerHTML = originalText;
            cvButton.disabled = false;
            
            console.log('✅ CV téléchargé avec succès !');
        }).catch((error) => {
            console.error('❌ Erreur lors de la génération du CV:', error);
            cvTemplate.style.display = 'none';
            cvTemplate.style.position = 'absolute';
            cvTemplate.style.left = '-9999px';
            cvTemplate.style.top = '-9999px';
            cvTemplate.style.zIndex = '';
            cvButton.innerHTML = originalText;
            cvButton.disabled = false;
            alert('Erreur lors de la génération du CV: ' + error.message);
        });
    }, 300);
}

// Initialize CV download functionality
document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.getElementById('download-cv');
    if (cvButton) {
        cvButton.addEventListener('click', generateCV);
    }
});

// Initialiser tous les effets quand la page est chargée
window.addEventListener('load', () => {
    initializeVisualEffects();
    initParallax();
    enhancedScrollAnimations();
});