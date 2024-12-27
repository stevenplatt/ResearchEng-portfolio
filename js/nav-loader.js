// dynamically updates the navigation links so that sidenav.html does not have to be duplicated on each page

document.addEventListener('DOMContentLoaded', () => {
    // Get the current path and count directory levels
    const pathParts = window.location.pathname.split('/').filter(part => part.length > 0);
    
    // Calculate depth, ensuring it's never negative
    const depth = Math.max(0, pathParts.length - 1);
    
    // Create the relative path to root based on depth
    const pathToRoot = depth === 0 ? './' : '../'.repeat(depth);
    
    fetch(`${pathToRoot}sidenav.html`)
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
        
        // Get current page name, default to index.html if at root
        const currentPage = pathParts[pathParts.length - 1] || 'index.html';
        
        // Update all navigation links to use the correct relative path
        const navLinks = document.querySelectorAll('.navblock_text a');
        navLinks.forEach(link => {
          link.href = `${pathToRoot}${link.getAttribute('href').replace('./', '')}`;
          
          // Highlight current page
          if (link.getAttribute('href').endsWith(currentPage)) {
            link.style.color = '#3498DB';
          }
        });
      })
      .catch(error => console.error('Error loading navigation:', error));
});