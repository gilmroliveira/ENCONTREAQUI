document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-checkbox');
    const menuIcon = document.querySelector('.open-menu i');
    
    menuToggle.addEventListener('change', function() {
        if(this.checked) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Previne scroll quando menu está aberto
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if(window.innerWidth <= 768) {
                menuToggle.checked = false;
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Smooth scrolling para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if(email) {
                // Aqui você pode adicionar código para enviar o email
                // Por exemplo, usando Fetch API para seu backend
                alert('Obrigado por se inscrever! Você receberá nossas atualizações em breve.');
                emailInput.value = '';
                
                // Exemplo com Fetch (descomente e ajuste para seu backend)
                /*
                fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    emailInput.value = '';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocorreu um erro. Por favor, tente novamente.');
                });
                */
            } else {
                alert('Por favor, insira um email válido.');
            }
        });
    }
    
    // Animação de scroll para as seções
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.ai-tools, .programming-courses, .monetization');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if(sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configura animação inicial
    const sections = document.querySelectorAll('.ai-tools, .programming-courses, .monetization');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Dispara animação no carregamento
    setTimeout(animateOnScroll, 500);
    
    // E ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
    
    // Tracking de cliques em links externos
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if(!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function(e) {
                // Aqui você pode adicionar tracking (Google Analytics, etc.)
                console.log('Link externo clicado:', this.href);
                
                // Abre em nova aba (opcional)
                // e.preventDefault();
                // window.open(this.href, '_blank');
            });
        }
    });
    
    // Carregamento lazy de imagens
    if('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});