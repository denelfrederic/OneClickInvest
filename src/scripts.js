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

  // Gestion du calculateur de prix
  const sliders = document.querySelectorAll('.slider-sync');
  
  if (sliders.length > 0) {
    // Fonction pour formater les nombres avec des espaces
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    // Fonction pour mettre à jour les valeurs d'une carte
    function updateCardValues(card, value) {
      const brutValue = card.querySelector('.brut-value');
      const setupCost = card.querySelector('.setup-cost');
      const performanceRate = card.querySelector('.performance-rate');
      const maintenanceRate = card.querySelector('.maintenance-rate');
      const netAmount = card.querySelector('.net-amount');
      const priceDisplay = card.querySelector('.text-4xl');
      
      if (brutValue) {
        brutValue.textContent = formatNumber(value);
      }
      
      // Mettre à jour l'affichage du prix principal
      if (priceDisplay) {
        const millions = value / 1000000;
        priceDisplay.textContent = millions.toFixed(1).replace('.0', '') + ' M €';
      }
      
      // Récupérer les valeurs des frais
      let setupCostValue = 0;
      let performanceFeeAmount = 0;
      let maintenanceFeeAmount = 0;
      
      // Mettre à jour les frais de mise en place
      if (setupCost) {
        setupCostValue = parseFloat(setupCost.getAttribute('data-value'));
        setupCost.textContent = setupCostValue + ' K €';
      }
      
      // Mettre à jour les frais de performance
      if (performanceRate) {
        const rate = parseFloat(performanceRate.getAttribute('data-value'));
        performanceFeeAmount = Math.round((rate * value) / 100 / 1000);
        performanceRate.textContent = rate + '% (' + formatNumber(performanceFeeAmount) + ' K €)';
      }
      
      // Mettre à jour les frais de maintenance
      if (maintenanceRate) {
        const rate = parseFloat(maintenanceRate.getAttribute('data-value'));
        maintenanceFeeAmount = Math.round((rate * value) / 100 / 1000);
        maintenanceRate.textContent = rate + '% (' + formatNumber(maintenanceFeeAmount) + ' K €)';
      }
      
      // Calculer et afficher le montant net levé
      if (netAmount) {
        const netAmountValue = value - (setupCostValue * 1000) - (performanceFeeAmount * 1000) - (maintenanceFeeAmount * 1000);
        const netMillions = netAmountValue / 1000000;
        netAmount.textContent = netMillions.toFixed(2) + ' M €';
      }
    }
    
    // Synchroniser tous les sliders et mettre à jour les valeurs
    function syncSliders(changedSlider) {
      const value = parseInt(changedSlider.value);
      
      // Synchroniser tous les sliders
      sliders.forEach(slider => {
        slider.value = value;
      });
      
      // Mettre à jour seulement les cartes du calculateur de prix
      const priceSection = document.querySelector('#sections\\.price-comparator');
      if (priceSection) {
        const priceCards = priceSection.querySelectorAll('.rounded-2xl');
        priceCards.forEach(card => {
          updateCardValues(card, value);
        });
        
        // Mettre à jour les montants supplémentaires pour One Click Invest
        updateAdditionalAmounts(value);
      }
    }
    
    // Ajouter les écouteurs d'événements à tous les sliders
    sliders.forEach(slider => {
      slider.addEventListener('input', function() {
        syncSliders(this);
      });
    });
    
    // Initialiser toutes les cartes du calculateur au chargement
    const priceSection = document.querySelector('#sections\\.price-comparator');
    if (priceSection) {
      const priceCards = priceSection.querySelectorAll('.rounded-2xl');
      let initValue = 5000000; // Valeur par défaut
      
      priceCards.forEach(card => {
        const slider = card.querySelector('.slider-sync');
        if (slider) {
          // Initialiser avec la valeur par défaut du slider
          updateCardValues(card, parseInt(slider.value));
          initValue = parseInt(slider.value);
        }
      });
      
      // Initialiser les montants supplémentaires pour One Click Invest
      updateAdditionalAmounts(initValue);
    }

    // Fonction pour calculer le montant net pour une configuration donnée
    function calculateNetAmount(value, setupCost, performanceRate, maintenanceRate) {
      const setupCostValue = parseFloat(setupCost) * 1000;
      const performanceFeeAmount = Math.round((parseFloat(performanceRate) * value) / 100);
      const maintenanceFeeAmount = Math.round((parseFloat(maintenanceRate) * value) / 100);
      return value - setupCostValue - performanceFeeAmount - maintenanceFeeAmount;
    }
    
    // Fonction pour mettre à jour les montants supplémentaires de One Click Invest
    function updateAdditionalAmounts(value) {
      const priceSection = document.querySelector('#sections\\.price-comparator');
      if (!priceSection) return;
      
      const cards = priceSection.querySelectorAll('.rounded-2xl');
      let netAmounts = {};
      
      // Calculer les montants nets pour chaque option
      cards.forEach(card => {
        const title = card.querySelector('.font-display').textContent.trim();
        const setupCost = card.querySelector('.setup-cost')?.getAttribute('data-value');
        const performanceRate = card.querySelector('.performance-rate')?.getAttribute('data-value');
        const maintenanceRate = card.querySelector('.maintenance-rate')?.getAttribute('data-value');
        
        if (setupCost && performanceRate && maintenanceRate) {
          netAmounts[title] = calculateNetAmount(value, setupCost, performanceRate, maintenanceRate);
        }
      });
      
      // Mettre à jour l'affichage pour One Click Invest
      const oneClickCard = Array.from(cards).find(card => 
        card.querySelector('.font-display')?.textContent.trim() === 'One Click Invest'
      );
      
      if (oneClickCard && netAmounts['One Click Invest']) {
        const additionalSection = oneClickCard.querySelector('.additional-amount-section');
        const additionalAmount = oneClickCard.querySelector('.additional-amount');
        
        if (additionalSection && additionalAmount) {
          // Trouver la moins bonne alternative (plus bas montant net parmi les autres)
          const alternatives = Object.entries(netAmounts).filter(([title]) => title !== 'One Click Invest');
          const worstAlternative = Math.min(...alternatives.map(([, amount]) => amount));
          
          const difference = netAmounts['One Click Invest'] - worstAlternative;
          
          if (difference > 0) {
            // Afficher en euros avec formatage
            additionalAmount.textContent = '+' + formatNumber(Math.round(difference)) + ' €';
            additionalSection.classList.remove('hidden');
            
            // Ajouter un effet de pulsation subtile
            additionalSection.style.animation = 'pulse 2s ease-in-out infinite';
          } else {
            additionalSection.classList.add('hidden');
          }
        }
      }
    }
  }

  // Gestion de l'animation des statistiques
  const statValues = document.querySelectorAll('.stat-value');
  
  if (statValues.length > 0) {
    // Fonction pour animer un compteur
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-value'));
      const suffix = element.textContent.match(/[%€]/)?.[0] || '';
      let current = 0;
      const increment = target / 50; // Animation en 50 étapes
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
      }, 30);
    }
    
    // Observer pour déclencher l'animation quand l'élément est visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    // Observer tous les compteurs
    statValues.forEach(stat => {
      observer.observe(stat);
    });
  }
}); 