// ===== НАВИГАЦИЯ ПО МЕНЮ =====
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.menu-nav-btn');
    const categories = document.querySelectorAll('.menu-category');

    // Проверяем, есть ли активная категория по умолчанию
    let activeCategory = 'salads';

    // Если есть якорь в URL, активируем его
    if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        const target = document.getElementById(hash);
        if (target && target.classList.contains('menu-category')) {
            activeCategory = hash;
        }
    }

    // Показываем активную категорию
    categories.forEach(cat => {
        cat.classList.toggle('active', cat.id === activeCategory);
    });

    navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === activeCategory);
    });

    // Обработка кликов
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryId = this.dataset.category;

            // Обновляем кнопки
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Обновляем категории
            categories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === categoryId) {
                    cat.classList.add('active');
                }
            });
        });
    });

    // При загрузке страницы с якорем
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.replace('#', '');
        const target = document.getElementById(hash);
        if (target && target.classList.contains('menu-category')) {
            navBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === hash);
            });
            categories.forEach(cat => {
                cat.classList.toggle('active', cat.id === hash);
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuLink = document.querySelector('nav a[href="#menu-page"]');
    const mainSections = document.querySelectorAll('.hero, .halls, .services, .gallery, .contact');
    const menuSection = document.getElementById('menu-page');
    const footer = document.querySelector('.footer');

    if (!menuLink || !menuSection) return;

    // Функция показа главной страницы
    function showMain() {
        mainSections.forEach(section => {
            if (section) section.style.display = '';
        });
        if (footer) footer.style.display = '';
        menuSection.style.display = 'none';
        // Убираем активный класс у всех ссылок
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active-page'));
        // Добавляем активный класс на "Залы" или первую ссылку
        const firstLink = document.querySelector('nav a[href="#halls"]');
        if (firstLink) firstLink.classList.add('active-page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Функция показа меню
    function showMenu() {
        mainSections.forEach(section => {
            if (section) section.style.display = 'none';
        });
        if (footer) footer.style.display = 'none';
        menuSection.style.display = 'block';
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active-page'));
        menuLink.classList.add('active-page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Обработчик клика по ссылке "Меню"
    menuLink.addEventListener('click', function(e) {
        e.preventDefault();
        showMenu();
    });

    // Обработчики для остальных ссылок (возврат на главную)
    document.querySelectorAll('nav a:not([href="#menu-page"])').forEach(link => {
        link.addEventListener('click', function(e) {
            // Если это якорь на главной, показываем главную
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                showMain();
                // Прокручиваем к нужной секции
                const targetId = this.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    setTimeout(() => {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        });
    });

    // Логотип → на главную
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            showMain();
        });
    }

    // Кнопка "Забронировать" → на главную к контактам
    const contactBtn = document.querySelector('.btn-primary');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showMain();
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    }

    // Если в URL есть #menu-page — открываем меню
    if (window.location.hash === '#menu-page') {
        showMenu();
    } else {
        showMain();
    }
});
