// Verifica se é mobile
const isMobile = () => window.innerWidth <= 768;

// Função otimizada para cálculos pesados
function optimizedCalculation() {
    return new Promise((resolve) => {
        let sum = 0;
        const total = 100000;
        const chunkSize = 10000;
        
        function processChunk(start, end) {
            for (let i = start; i < end; i++) {
                sum += Math.sqrt(i);
            }
            
            if (end < total) {
                setTimeout(() => processChunk(end, end + chunkSize), 0);
            } else {
                console.log('Calculation completed:', sum);
                resolve(sum);
            }
        }
        
        processChunk(0, chunkSize);
    });
}

// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('change', function() {
            document.body.style.overflow = this.checked ? 'hidden' : '';
        });
    }
    
    // Carrega efeitos apenas se não for mobile
    if (!isMobile()) {
        // Efeito hover na logo
        const logo = document.querySelector('.futurist-logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.filter = 'drop-shadow(0 0 8px var(--neon-blue))';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.filter = 'none';
            });
        }
        
        // Cálculo otimizado
        if (document.querySelector('.calculations-section')) {
            optimizedCalculation().then(result => {
                console.log('Resultado pronto:', result);
            });
        }
    }
    
    // Lazy loading para imagens
    const lazyLoad = () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => observer.observe(img));
        }
    };
    
    lazyLoad();
});
