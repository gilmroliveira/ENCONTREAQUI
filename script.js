document.addEventListener('DOMContentLoaded', function() {
    // Efeitos para a logo
    const logoLink = document.querySelector('.logo-link');
    
    if (logoLink) {
        // Efeito de partículas
        logoLink.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const rect = logoLink.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (Math.random() > 0.7) {
                    createParticle(x, y);
                }
            }
        });
        
        // Brilho aleatório
        setInterval(() => {
            if (window.innerWidth > 768) {
                const logo = document.querySelector('.futurist-logo');
                const colors = ['#00F5FF', '#BC13FE', '#FF00F5'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                logo.style.filter = `
                    drop-shadow(0 0 10px ${randomColor})
                    drop-shadow(0 0 20px rgba(188, 19, 254, 0.3))
                `;
            }
        }, 3000);
    }
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Cor aleatória
        const colors = ['#00F5FF', '#BC13FE', '#FF00F5'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        // Remover após animação
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
    
    // Menu mobile
    const menuToggle = document.querySelector('#menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('change', function() {
            document.body.style.overflow = this.checked ? 'hidden' : '';
        });
    }
});