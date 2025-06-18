document.addEventListener('DOMContentLoaded', function() {
    // Controles de Acessibilidade
    const contrastToggle = document.getElementById('contrast-toggle');
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset = document.getElementById('font-reset');
    const readPage = document.getElementById('read-page');
    const reduceMotion = document.getElementById('reduce-motion');
    const showTranscript = document.getElementById('show-transcript');
    const transcriptText = document.getElementById('transcript-text');
    const resetAccessibility = document.getElementById('reset-accessibility');
    const body = document.body;
    const root = document.documentElement;

    // Verificar preferências salvas
    function checkSavedPreferences() {
        // Contraste
        if (localStorage.getItem('highContrast') === 'true') {
            body.classList.add('high-contrast');
        }
        
        // Modo escuro
        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark-mode');
        }
        
        // Tamanho da fonte
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            root.style.setProperty('--base-font-size', `${savedFontSize}px`);
        }
        
        // Redução de movimento
        if (localStorage.getItem('reducedMotion') === 'true') {
            document.documentElement.style.setProperty('--transition-normal', '0.01ms');
            document.documentElement.style.setProperty('--transition-fast', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }
    }

    // Toggle de Alto Contraste
    if (contrastToggle) {
        contrastToggle.addEventListener('click', function() {
            body.classList.toggle('high-contrast');
            
            // Salvar preferência
            localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
            
            // Feedback para leitores de tela
            const status = body.classList.contains('high-contrast') ? 'ativado' : 'desativado';
            announceToScreenReader(`Alto contraste ${status}`);
        });
    }

    // Toggle de Modo Escuro
    function detectColorScheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedMode = localStorage.getItem('darkMode');
        
        if (savedMode === 'true' || (prefersDark && savedMode !== 'false')) {
            body.classList.add('dark-mode');
        }
    }

    // Controles de Tamanho de Fonte
    if (fontIncrease) {
        fontIncrease.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
            const newSize = currentSize * 1.1;
            root.style.setProperty('--base-font-size', `${newSize}px`);
            saveFontSize(newSize);
            announceToScreenReader(`Tamanho da fonte aumentado para ${Math.round(newSize)} pixels`);
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
            const newSize = currentSize / 1.1;
            root.style.setProperty('--base-font-size', `${newSize}px`);
            saveFontSize(newSize);
            announceToScreenReader(`Tamanho da fonte diminuído para ${Math.round(newSize)} pixels`);
        });
    }

    if (fontReset) {
        fontReset.addEventListener('click', function() {
            root.style.setProperty('--base-font-size', '16px');
            saveFontSize(16);
            announceToScreenReader('Tamanho da fonte redefinido para o padrão');
        });
    }

    function saveFontSize(size) {
        localStorage.setItem('fontSize', size);
    }

    // Leitura da Página
    if (readPage) {
        readPage.addEventListener('click', function() {
            if ('speechSynthesis' in window) {
                // Cancelar leitura anterior se existir
                window.speechSynthesis.cancel();
                
                const speech = new SpeechSynthesisUtterance();
                speech.text = document.querySelector('main').textContent;
                speech.lang = 'pt-BR';
                speech.rate = 0.9;
                
                // Configurar vozes
                const voices = window.speechSynthesis.getVoices();
                const portugueseVoice = voices.find(voice => voice.lang.includes('pt'));
                if (portugueseVoice) {
                    speech.voice = portugueseVoice;
                }
                
                // Eventos para feedback
                speech.onstart = function() {
                    readPage.innerHTML = '<i class="fas fa-stop"></i> Parar';
                    readPage.setAttribute('aria-label', 'Parar leitura');
                    announceToScreenReader('Iniciando leitura da página');
                };
                
                speech.onend = function() {
                    readPage.innerHTML = '<i class="fas fa-volume-up"></i> Ler';
                    readPage.setAttribute('aria-label', 'Ler página em voz alta');
                };
                
                window.speechSynthesis.speak(speech);
                
                // Parar leitura se clicar novamente
                readPage.onclick = function() {
                    window.speechSynthesis.cancel();
                    readPage.innerHTML = '<i class="fas fa-volume-up"></i> Ler';
                    readPage.setAttribute('aria-label', 'Ler página em voz alta');
                    readPage.onclick = arguments.callee;
                };
            } else {
                announceToScreenReader('Seu navegador não suporta leitura de texto. Experimente o Chrome ou Edge.');
            }
        });
    }

    // Transcrição do Vídeo
    if (showTranscript && transcriptText) {
        showTranscript.addEventListener('click', function() {
            transcriptText.classList.toggle('hidden');
            const isHidden = transcriptText.classList.contains('hidden');
            
            showTranscript.textContent = isHidden ? 
                'Mostrar Transcrição' : 'Ocultar Transcrição';
            showTranscript.setAttribute('aria-expanded', !isHidden);
            
            if (!isHidden) {
                transcriptText.focus();
            }
        });
    }

    // Redução de Movimento
    if (reduceMotion) {
        reduceMotion.addEventListener('click', function() {
            const reduced = document.documentElement.style.getPropertyValue('--transition-normal') === '0.01ms';
            
            if (reduced) {
                document.documentElement.style.setProperty('--transition-normal', '0.3s ease');
                document.documentElement.style.setProperty('--transition-fast', '0.15s ease');
                document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
                reduceMotion.innerHTML = '<i class="fas fa-running"></i> Menos Animação';
                localStorage.setItem('reducedMotion', 'false');
                announceToScreenReader('Animações ativadas');
            } else {
                document.documentElement.style.setProperty('--transition-normal', '0.01ms');
                document.documentElement.style.setProperty('--transition-fast', '0.01ms');
                document.documentElement.style.setProperty('--transition-slow', '0.01ms');
                reduceMotion.innerHTML = '<i class="fas fa-running"></i> Mais Animação';
                localStorage.setItem('reducedMotion', 'true');
                announceToScreenReader('Animações reduzidas');
            }
        });
    }

    // Resetar Acessibilidade
    if (resetAccessibility) {
        resetAccessibility.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Resetar contraste
            body.classList.remove('high-contrast', 'dark-mode');
            localStorage.removeItem('highContrast');
            localStorage.removeItem('darkMode');
            
            // Resetar tamanho da fonte
            root.style.setProperty('--base-font-size', '16px');
            localStorage.removeItem('fontSize');
            
            // Resetar animações
            document.documentElement.style.setProperty('--transition-normal', '0.3s ease');
            document.documentElement.style.setProperty('--transition-fast', '0.15s ease');
            document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
            localStorage.removeItem('reducedMotion');
            
            if (reduceMotion) {
                reduceMotion.innerHTML = '<i class="fas fa-running"></i> Menos Animação';
            }
            
            announceToScreenReader('Todas as configurações de acessibilidade foram redefinidas');
        });
    }

    // Navegação por Teclado em Cards
    const focusableCards = document.querySelectorAll('[tabindex="0"]');
    focusableCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            // Enter ou Espaço
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Foco visível para elementos interativos
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('a, button, input, [tabindex]')) {
            e.target.classList.add('focused');
        }
    });

    document.addEventListener('focusout', function(e) {
        if (e.target.matches('a, button, input, [tabindex]')) {
            e.target.classList.remove('focused');
        }
    });

    // Pular para conteúdo principal
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Anunciar para leitores de tela
    function announceToScreenReader(message) {
        const ariaLive = document.createElement('div');
        ariaLive.setAttribute('aria-live', 'polite');
        ariaLive.className = 'sr-only';
        ariaLive.textContent = message;
        document.body.appendChild(ariaLive);
        
        setTimeout(() => {
            document.body.removeChild(ariaLive);
        }, 1000);
    }

    // Carregar preferências salvas
    checkSavedPreferences();
    
    // Verificar preferência de redução de movimento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }

    // Verificar se o JavaScript está habilitado
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
});