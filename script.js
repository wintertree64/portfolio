document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.innerHTML = isHidden ? '<i data-lucide="menu"></i>' : '<i data-lucide="x"></i>';
            lucide.createIcons(); 
        });
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        const initialNavbarClasses = Array.from(navbar.classList);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('shadow-md', 'bg-brand-surface/80');
                navbar.classList.add('shadow-xl', 'bg-brand-surface/95'); 
            } else {
                navbar.classList.remove('shadow-xl', 'bg-brand-surface/95');
                navbar.classList.add('shadow-md', 'bg-brand-surface/80');
            }
        });
    }
    
    const sections = document.querySelectorAll('main section[id]');
    const desktopNavLinks = document.querySelectorAll('#navbar nav a[href^="#"]');
    const mobileNavLinksList = document.querySelectorAll('#mobile-menu a[href^="#"]');
    const navbarHeight = navbar ? navbar.offsetHeight : 70; 

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 20; 
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        desktopNavLinks.forEach(link => {
            link.classList.remove('text-kaist-cyan', 'font-semibold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-kaist-cyan', 'font-semibold');
            }
        });
        mobileNavLinksList.forEach(link => {
            link.classList.remove('text-kaist-cyan', 'font-semibold', 'bg-kaist-cyan/20');
            link.classList.add('hover:bg-kaist-cyan/10');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-kaist-cyan', 'font-semibold', 'bg-kaist-cyan/20');
                link.classList.remove('hover:bg-kaist-cyan/10');
            }
        });

        if (current === '' && pageYOffset < (sections[0] ? sections[0].offsetTop - navbarHeight - 20 : 200)) {
            if (desktopNavLinks[0] && desktopNavLinks[0].getAttribute('href') === '#home') {
                 desktopNavLinks[0].classList.add('text-kaist-cyan', 'font-semibold');
            }
            if (mobileNavLinksList[0] && mobileNavLinksList[0].getAttribute('href') === '#home') {
                mobileNavLinksList[0].classList.add('text-kaist-cyan', 'font-semibold', 'bg-kaist-cyan/20');
                mobileNavLinksList[0].classList.remove('hover:bg-kaist-cyan/10');
            }
        }
    }

    if (sections.length > 0) {
      window.addEventListener('scroll', updateActiveLink);
      updateActiveLink(); 
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return; 
            
            const targetElement = document.getElementById(targetId.substring(1));
            
            if (targetElement) {
                const navbarHeightOnClick = document.getElementById('navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeightOnClick - 15; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (mobileMenuButton) {
                        mobileMenuButton.innerHTML = '<i data-lucide="menu"></i>';
                        lucide.createIcons();
                    }
                }
            }
        });
    });
});
