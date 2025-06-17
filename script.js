/**
 * Script principal otimizado para performance e compatibilidade
 * Suporte para IE11+ e todos os navegadores modernos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Verifica suporte a Intersection Observer
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    // Menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
            this.classList.toggle('active');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });
    }
    
    // Fecha menu ao clicar em link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Lazy loading para imagens
    if (supportsIntersectionObserver) {
        const lazyLoadImages = function() {
            const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
            
            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove('lazy');
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });
                
                lazyImages.forEach(function(lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            }
        };
        
        lazyLoadImages();
    }
    
    // Polyfill para elementos faltantes
    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    
    // Suporte para navegadores antigos
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(search, pos) {
            return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
        };
    }
    
    // Detecta Safari/iOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isSafari || isIOS) {
        document.body.classList.add('safari');
    }
    
    // Verifica conexão
    const updateOnlineStatus = () => {
        if (!navigator.onLine) {
            console.log('Você está offline. Alguns recursos podem não estar disponíveis.');
        }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
});

// Fallback para browsers muito antigos
if (window.addEventListener) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 0);
    });
}