// Fonction pour basculer l'affichage des réponses FAQ
function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('.faq-icon');
  
  // Récupérer la hauteur actuelle ou 0 si non définie
  const currentHeight = answer.style.maxHeight;
  
  if (currentHeight && currentHeight !== '0px') {
    // La FAQ est ouverte, on la ferme
    answer.style.maxHeight = '0px';
    icon.classList.remove('rotate-180');
  } else {
    // La FAQ est fermée, on l'ouvre
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.classList.add('rotate-180');
  }
}

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('rotate-45');
    });

    // Fermer le menu mobile lors du clic sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('rotate-45');
      });
    });
  }

  // Gestion du popup
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');
  const popupContent = document.getElementById('popup-content');

  // Ouvrir le popup
  document.querySelectorAll('.open-popup').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.getAttribute('data-content');
      if (content && popupContent) {
        popupContent.innerHTML = content;
        popup.classList.remove('hidden');
      }
    });
  });

  // Fermer le popup
  if (closePopup) {
    closePopup.addEventListener('click', function() {
      popup.classList.add('hidden');
    });
  }

  // Fermer le popup en cliquant en dehors
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.classList.add('hidden');
      }
    });
  }

  // Année actuelle dans le footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}); 