document.addEventListener('DOMContentLoaded', function() {
    // Controles de Acessibilidade
    const contrastToggle = document.getElementById('contrast-toggle');
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset = document.getElementById('font-reset');
    const readPage = document.getElementById('read-page');
    const showTranscript = document.getElementById('show-transcript');
    const transcriptText = document.getElementById('transcript-text');
    const body = document.body;

    // Toggle de Alto Contraste
    contrastToggle.addEventListener('click', function() {
        body.classList.toggle('high-contrast');
        
        // Alternar entre modo claro e escuro no alto contraste
        if (body.classList.contains('high-contrast')) {
            body.classList.remove('dark-mode');
        }
        
        // Salvar preferência
        localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
    });

    // Toggle de Modo Escuro (pode ser adicionado um botão específico se desejar)
    function detectColorScheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedMode = localStorage.getItem('darkMode');
        
        if (savedMode === 'true' || (prefersDark && savedMode !== 'false')) {
            body.classList.add('dark-mode');
        }
    }
    
    detectColorScheme();

    // Controles de Tamanho de Fonte
    fontIncrease.addEventListener('click', function() {
        const currentSize = getComputedStyle(document.documentElement).getPropertyValue('--base-font-size');
        const currentValue = parseFloat(currentSize);
        document.documentElement.style.setProperty('--base-font-size', `${currentValue * 1.1}px`);
        saveFontSize(currentValue * 1.1);
    });

    fontDecrease.addEventListener('click', function() {
        const currentSize = getComputedStyle(document.documentElement).getPropertyValue('--base-font-size');
        const currentValue = parseFloat(currentSize);
        document.documentElement.style.setProperty('--base-font-size', `${currentValue / 1.1}px`);
        saveFontSize(currentValue / 1.1);
    });

    fontReset.addEventListener('click', function() {
        document.documentElement.style.setProperty('--base-font-size', '1rem');
        saveFontSize(16); // 1rem = 16px padrão
    });

    function saveFontSize(size) {
        localStorage.setItem('fontSize', size);
    }

    // Carregar preferências salvas
    function loadPreferences() {
        // Carregar contraste
        if (localStorage.getItem('highContrast') === 'true') {
            body.classList.add('high-contrast');
        }
        
        // Carregar tamanho da fonte
        const savedSize = localStorage.getItem('fontSize');
        if (savedSize) {
            document.documentElement.style.setProperty('--base-font-size', `${savedSize}px`);
        }
    }
    
    loadPreferences();

    // Leitura da Página
    readPage.addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = document.querySelector('main').textContent;
            speech.lang = 'pt-BR';
            speech.rate = 0.9;
            window.speechSynthesis.speak(speech);
            
            // Feedback visual
            readPage.innerHTML = '<i class="fas fa-stop"></i> Parar';
            readPage.onclick = function() {
                window.speechSynthesis.cancel();
                readPage.innerHTML = '<i class="fas fa-volume-up"></i> Ler';
                readPage.onclick = arguments.callee;
            };
        } else {
            alert('Seu navegador não suporta leitura de texto. Experimente o Chrome ou Edge.');
        }
    });

    // Transcrição do Vídeo
    showTranscript.addEventListener('click', function() {
        transcriptText.classList.toggle('hidden');
        showTranscript.textContent = transcriptText.classList.contains('hidden') ? 
            'Mostrar Transcrição' : 'Ocultar Transcrição';
    });

    // Navegação por Teclado em Cards
    const focusableCards = document.querySelectorAll('.tool-card, .course-card');
    focusableCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
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
});
