// Configuração das partículas no background
document.addEventListener('DOMContentLoaded', function() {
    // Carrega particles.js apenas se não for mobile
    if (window.innerWidth > 768 && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: ["#00F5FF", "#BC13FE", "#FF00F5"] },
                shape: { type: "circle" },
                opacity: { random: true, value: 0.5 },
                size: { random: true, value: 3 },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Efeito de glitch aleatório na logo
    const logo = document.querySelector('.futurist-logo');
    if (logo) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                logo.style.animation = 'none';
                void logo.offsetWidth; // Trigger reflow
                logo.style.animation = 'glitch-effect 0.5s linear';
            }
        }, 10000);
    }

    // Intersection Observer para carregamento lazy
    const lazyLoad = (element) => {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Carrega elementos quando visíveis
                        if (entry.target.dataset.src) {
                            entry.target.src = entry.target.dataset.src;
                        }
                        if (entry.target.dataset.bg) {
                            entry.target.style.backgroundImage = `url(${entry.target.dataset.bg})`;
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '100px' });

            observer.observe(element);
        }
    };

    // Aplica lazy loading a imagens e backgrounds
    document.querySelectorAll('[data-src], [data-bg]').forEach(lazyLoad);
});

// Web Worker para cálculos pesados
if (window.Worker) {
    const perfWorker = new Worker('js/perf-worker.js');
    
    // Envia dados para o worker se necessário
    perfWorker.postMessage({ type: 'init', data: {} });
    
    perfWorker.onmessage = function(e) {
        // Processa mensagens do worker
    };
}