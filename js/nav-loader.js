// nav-loader.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('./html/sidenav.html') 
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentLink = document.querySelector(`.navblock_text a[href='./${currentPage}']`);
        if (currentLink) {
          currentLink.style.color = '#3498DB';
        }
      })
      .catch(error => console.error('Error loading navigation:', error));
  });