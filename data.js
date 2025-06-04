  
    function downloadCV() {
      const localCV = 'assets/cv_aliou_badou.pdf';
      fetch(localCV)
        .then(response => {
          if(response.ok) {
            const link = document.createElement('a');
            link.href = localCV;
            link.download = 'CV_Aliou_Badou.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            window.open('https://drive.google.com/file/d/12cyl42iOMW8o1mmY7X1jPq4HRRxNjqbQ/view?usp=sharing', '_blank');
          }
        })
        .catch(() => {
          window.open('https://drive.google.com/file/d/12cyl42iOMW8o1mmY7X1jPq4HRRxNjqbQ/view?usp=sharing', '_blank');
        });
    }

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

    // Animation au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observer tous les éléments animables
    document.querySelectorAll('.experience-card, .stat-item, .timeline li').forEach(el  => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      observer.observe(el);
    });
   // Smooth scroll pour les liens de navigation
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
       e.preventDefault();
       const target = document.querySelector(this.getAttribute('href'));
       if (target) {
         target.scrollIntoView({
           behavior: 'smooth',
           block: 'start'
         });
       }
     });
   });

    // Effet parallax léger sur le hero
   /* 
   window.addEventListener('scroll', () => {
     const scrolled = window.pageYOffset;
     const parallax = document.querySelector('.hero');
     const speed = scrolled * 0.5;
     
     if (parallax) {
       parallax.style.transform = `translateY(${speed}px)`;
     }
   }); 
*/
   // Animation des statistiques au scroll
   const animateStats = () => {
     const statNumbers = document.querySelectorAll('.stat-number');
     
     statNumbers.forEach(stat => {
       const finalNumber = parseInt(stat.textContent);
       let currentNumber = 0;
       const increment = finalNumber / 30;
       
       const updateNumber = () => {
         if (currentNumber < finalNumber) {
           currentNumber += increment;
           stat.textContent = Math.ceil(currentNumber) + (stat.textContent.includes('+') ? '+' : '');
           requestAnimationFrame(updateNumber);
         } else {
           stat.textContent = finalNumber + (stat.textContent.includes('+') ? '+' : '');
         }
       };
       
       updateNumber();
     });
   };

   // Observer pour les statistiques
   const statsObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         animateStats();
         statsObserver.unobserve(entry.target);
       }
     });
   }, { threshold: 0.5 });

   const statsSection = document.querySelector('.about-stats');
   if (statsSection) {
     statsObserver.observe(statsSection);
   }

   // Effet hover sur les tags de compétences
   document.querySelectorAll('.tags li').forEach(tag => {
     tag.addEventListener('mouseenter', function() {
       this.style.transform = 'translateY(-5px) scale(1.05)';
       this.style.boxShadow = '0 10px 25px rgba(0, 212, 170, 0.2)';
     });
     
     tag.addEventListener('mouseleave', function() {
       this.style.transform = 'translateY(0) scale(1)';
       this.style.boxShadow = 'none';
     });
   });

   // Animation de typing pour le titre principal
   const typeWriter = (element, text, speed = 100) => {
     let i = 0;
     element.textContent = '';
     
     const typing = () => {
       if (i < text.length) {
         element.textContent += text.charAt(i);
         i++;
         setTimeout(typing, speed);
       }
     };
     
     typing();
   };

   // Démarrer l'animation de typing au chargement
   window.addEventListener('load', () => {
     const mainTitle = document.querySelector('.hero-content h2');
     if (mainTitle) {
       const originalText = mainTitle.textContent;
       typeWriter(mainTitle, originalText, 80);
     }
   });

   // Gestion du header transparent/opaque au scroll
   window.addEventListener('scroll', () => {
     const header = document.querySelector('header');
     if (window.scrollY > 100) {
       header.style.background = 'rgba(15, 15, 35, 0.98)';
       header.style.backdropFilter = 'blur(25px)';
     } else {
       header.style.background = 'rgba(15, 15, 35, 0.95)';
       header.style.backdropFilter = 'blur(20px)';
     }
   });
