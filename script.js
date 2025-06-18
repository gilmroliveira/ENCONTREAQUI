document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-checkbox');
    const menuIcon = document.querySelector('.open-menu i');
    
    if (menuToggle && menuIcon) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
                document.querySelector('header').style.position = 'static';
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
                document.querySelector('header').style.position = 'sticky';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
                document.querySelector('header').style.position = 'sticky';
            }
        });
    });
    
    // Smooth scrolling para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcula a posição considerando o header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Foco no elemento para navegação por teclado
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 500);
            }
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const formError = this.querySelector('.form-error');
            const email = emailInput.value.trim();
            
            // Validação simples
            if (!email) {
                if (formError) {
                    formError.textContent = 'Por favor, insira um endereço de email';
                    formError.style.color = 'var(--error-color)';
                }
                emailInput.focus();
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (formError) {
                    formError.textContent = 'Por favor, insira um email válido';
                    formError.style.color = 'var(--error-color)';
                }
                emailInput.focus();
                return;
            }
            
            // Simular envio (substituir por código real)
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            }
            
            setTimeout(() => {
                if (formError) {
                    formError.textContent = 'Inscrição realizada com sucesso!';
                    formError.style.color = 'var(--success-color)';
                }
                emailInput.value = '';
                
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Assinar';
                }
                
                // Resetar mensagem após 5 segundos
                setTimeout(() => {
                    if (formError) {
                        formError.textContent = '';
                    }
                }, 5000);
            }, 1500);
        });
    }
    
    // Animação de scroll para as seções
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.ai-tools, .programming-courses, .monetization');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
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
    window.addEventListener('load', animateOnScroll);
    
    // E ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
    
    // Tracking de cliques em links externos
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function(e) {
                // Aqui você pode adicionar tracking (Google Analytics, etc.)
                console.log('Link externo clicado:', this.href);
                
                // Opcional: abrir em nova aba
                // e.preventDefault();
                // window.open(this.href, '_blank');
            });
        }
    });
    
    // Carregamento lazy de imagens
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.srcset = img.dataset.srcset || img.srcset;
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
    
    // Adiciona classe no scroll para header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Verifica se o JavaScript está habilitado
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
});