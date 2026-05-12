// Smooth scrolling için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll efekti
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (scrollTop > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(30, 30, 30, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(30, 30, 30, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Aktif bölüm belirleme
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Galeri resimleri için lightbox efekti (opsiyonel)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Basit bir görüntüleme - dilerseniz daha gelişmiş lightbox kütüphanesi ekleyebilirsiniz
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const imgClone = img.cloneNode();
            imgClone.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            
            overlay.appendChild(imgClone);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        }
    });
});

// Sayfa yüklendiğinde animasyonlar
window.addEventListener('load', () => {
    // Tüm section'ları görünür yap
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, index * 100);
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Navbar rengini güncelle
function updateNavbarColor() {
    const isDarkMode = body.classList.contains('dark-mode');
    if (isDarkMode) {
        navbar.style.background = 'rgba(30, 30, 30, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// Sayfa yüklendiğinde tema tercihini kontrol et
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    updateNavbarColor();
}

// Language Toggle
let currentLang = localStorage.getItem('language') || 'tr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Tüm data-i18n elementlerini güncelle
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // aria-label'ları güncelle
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('aria-label', translations[lang][key]);
        }
    });
    
    // HTML lang attribute'unu güncelle
    document.documentElement.lang = lang;
}

// Sayfa yüklendiğinde dil ayarını uygula
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

// Dil değiştirme butonu
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
    });
}

// Tema değiştirme butonu
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Navbar rengini güncelle
        updateNavbarColor();
        
        // Tema tercihini kaydet
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}
