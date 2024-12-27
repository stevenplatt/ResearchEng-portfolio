document.addEventListener('DOMContentLoaded', () => {
    const pathParts = window.location.pathname.split('/').filter(part => part.length > 0);
    const depth = Math.max(0, pathParts.length - 1);
    const pathToRoot = depth === 0 ? './' : '../'.repeat(depth);
    
    fetch(`${pathToRoot}sidenav.html`)
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
        
        const currentPage = pathParts[pathParts.length - 1] || 'index.html';
        
        const navLinks = document.querySelectorAll('.navblock_text a');
        navLinks.forEach(link => {
          link.href = `${pathToRoot}${link.getAttribute('href').replace('./', '')}`;
          if (link.getAttribute('href').endsWith(currentPage)) {
            link.style.color = '#3498DB';
          }
        });

        // Add hamburger menu functionality
        const hamburger = document.querySelector('.hamburger-menu');
        const sidenav = document.querySelector('.sidenav');

        function toggleMenu() {
            hamburger.classList.toggle('change');
            sidenav.classList.toggle('active');
            // Toggle body scroll
            document.body.classList.toggle('no-scroll');
        }

        hamburger.addEventListener('click', toggleMenu);

        const allNavLinks = document.querySelectorAll('.sidenav a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1100) {
                    toggleMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1100 && sidenav.classList.contains('active')) {
                toggleMenu();
            }
        });
      })
      .catch(error => console.error('Error loading navigation:', error));
});