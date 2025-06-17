// Loader
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.futurist-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1500);
});

// Efeitos para a logo futurista
document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-container');
    const logoIcon = document.querySelector('.futurist-logo');
    const logoText = document.querySelector('.logo-text');
    
    // Efeito de brilho aleatório
    function randomGlow() {
        if (!logoText || !logoIcon) return;
        
        const colors = ['#00F5FF', '#BC13FE', '#00FFE7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        logoText.style.textShadow = `0 0 15px ${randomColor}`;
        logoIcon.style.filter = `drop-shadow(0 0 8px ${randomColor})`;
        
        setTimeout(randomGlow, 3000);
    }
    
    // Inicia o efeito apenas se não for mobile
    if (window.innerWidth > 768 && logoText && logoIcon) {
        setTimeout(randomGlow, 2000);
    }
    
    // Efeito de partículas para a logo
    if (logoContainer) {
        logoContainer.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const rect = logoContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (Math.random() > 0.7) {
                    const particle = document.createElement('div');
                    particle.className = 'logo-particle';
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    particle.style.backgroundColor = Math.random() > 0.5 ? '#00F5FF' : '#BC13FE';
                    logoContainer.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 1000);
                }
            }
        });
    }

    // Atualização do menu mobile
    const menuToggle = document.querySelector('.menu-checkbox');
    const menuIcon = document.querySelector('.open-menu i');
    
    if (menuToggle && menuIcon) {
        menuToggle.addEventListener('change', function() {
            if(this.checked) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if(window.innerWidth <= 768 && menuToggle) {
                menuToggle.checked = false;
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Restante do código JavaScript...
    [...]
});