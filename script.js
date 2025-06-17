document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile - Melhoria com acessibilidade
    const menuToggle = document.querySelector('.menu-checkbox');
    const menuIcon = document.querySelector('.open-menu i');
    
    if (menuToggle && menuIcon) {
        menuToggle.addEventListener('change', function() {
            const isChecked = this.checked;
            
            // Acessibilidade - altera o aria-label
            const menuLabel = document.querySelector('.open-menu .sr-only');
            if (menuLabel) {
                menuLabel.textContent = isChecked ? 'Fechar menu' : 'Abrir menu';
            }
            
            // Alterna ícones
            menuIcon.classList.toggle('fa-bars', !isChecked);
            menuIcon.classList.toggle('fa-times', isChecked);
            document.body.style.overflow = isChecked ? 'hidden' : '';
            
            // Acessibilidade - foco no menu quando aberto
            if (isChecked) {
                const firstMenuItem = document.querySelector('nav ul li:first-child a');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            }
        });
    }
    
    // Fechar menu ao clicar em um link - Melhoria com delegação de eventos
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;
        
        if (e.target.closest('nav ul li a')) {
            menuToggle.checked = false;
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling para âncoras - Melhoria com polyfill para navegadores antigos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || !targetId) {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Usa smooth scroll se disponível, senão faz scroll normal
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo(0, targetElement.offsetTop - 80);
                }
                
                // Acessibilidade - foco no elemento alvo
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 500);
            }
        });
    });
    
    // Newsletter Form - Melhoria com validação avançada
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const formError = newsletterForm.querySelector('.form-error');
        
        // Validação em tempo real
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('invalid');
                    if (formError) formError.textContent = '';
                }
            });
        }
        
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!emailInput || !emailInput.value.trim()) {
                if (formError) formError.textContent = 'Por favor, insira um endereço de email';
                return;
            }
            
            if (!emailInput.validity.valid) {
                emailInput.classList.add('invalid');
                if (formError) formError.textContent = 'Por favor, insira um email válido';
                return;
            }
            
            const email = emailInput.value.trim();
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Feedback visual
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            }
            
            try {
                // Simulação de envio (substitua por chamada real à API)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Sucesso
                if (formError) {
                    formError.textContent = 'Inscrição realizada com sucesso!';
                    formError.style.color = 'green';
                }
                emailInput.value = '';
                
                // Pode descomentar para usar com uma API real
                /*
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                
                if (!response.ok) throw new Error('Erro na requisição');
                
                const data = await response.json();
                if (formError) {
                    formError.textContent = data.message || 'Inscrição realizada!';
                    formError.style.color = 'green';
                }
                */
            } catch (error) {
                console.error('Erro:', error);
                if (formError) {
                    formError.textContent = 'Ocorreu um erro. Por favor, tente novamente.';
                    formError.style.color = 'red';
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Assinar';
                }
                
                // Remove a mensagem após 5 segundos
                if (formError) {
                    setTimeout(() => {
                        formError.textContent = '';
                    }, 5000);
                }
            }
        });
    }
    
    // Animação de scroll - Melhoria com IntersectionObserver
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        document.querySelectorAll('.ai-tools, .programming-courses, .monetization, .about-content, .projects-grid, .contact-methods').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(section);
        });
    };
    
    // Carrega apenas quando o DOM estiver pronto
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    } else {
        // Fallback para navegadores sem suporte
        document.querySelectorAll('.ai-tools, .programming-courses, .monetization, .about-content, .projects-grid, .contact-methods').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';