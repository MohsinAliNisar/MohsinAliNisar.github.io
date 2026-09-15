document.addEventListener('DOMContentLoaded', () => {

  // 1. TYPING - Hello I'm Mohsin Ali Nisar
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const fullText = "Hello, I'm Mohsin Ali Nisar";
    let i = 0;
    typingEl.textContent = "";
    (function type() {
      if (i < fullText.length) {
        typingEl.textContent += fullText.charAt(i++);
        setTimeout(type, 80);
      }
    })();
  }

  // 2. MAIN CARDS FADE IN - same as previous template
  const mainCards = document.querySelectorAll('.fade-in');
  mainCards.forEach((el) => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    obs.observe(el);
  });

  // 3. TIMELINE ITEMS - EXACT SAME ANIMATION WITH STAGGER
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = (index % 3) * 120;
          setTimeout(() => {
            entry.target.classList.add('show');
          }, delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -80px 0px" });
    obs.observe(item);
  });

  // 4. PROFESSIONAL STATS CARDS - EXACT SAME ANIMATION WITH STAGGER
  const statItems = document.querySelectorAll('.prof-stat-item');
  statItems.forEach((item, index) => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = index * 150;
          setTimeout(() => {
            entry.target.classList.add('show');
          }, delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -30px 0px" });
    obs.observe(item);
  });

  // 5. COUNTER - Only after scroll (15+ and 50+)
  const statsCard = document.getElementById('stats');
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  counters.forEach(c => c.textContent = "0");

  function runCounter() {
    if (counted) return;
    counted = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let cur = 0;
      const duration = 1500;
      const stepTime = 16;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      const tick = () => {
        cur += increment;
        if (cur < target) {
          counter.textContent = Math.ceil(cur);
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };
      tick();
    });
  }

  let hasScrolled = false;
  const markScrolled = () => { hasScrolled = true; };
  window.addEventListener('scroll', markScrolled, { once: true, passive: true });
  window.addEventListener('touchmove', markScrolled, { once: true, passive: true });

  if (statsCard) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || counted) return;
        if (hasScrolled) {
          runCounter();
          statsObserver.unobserve(statsCard);
        } else {
          const waitForScroll = () => {
            const rect = statsCard.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
              runCounter();
              statsObserver.unobserve(statsCard);
            }
          };
          window.addEventListener('scroll', waitForScroll, { once: true, passive: true });
        }
      });
    }, { threshold: 0.4, rootMargin: "0px 0px -50px 0px" });
    statsObserver.observe(statsCard);
  }

  // 6. SMOOTH SCROLL FOR NEW BUTTONS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 7. WORKS SLIDER - MOVEABLE ARROWS
  const slides = document.querySelectorAll('.work-slide');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');

  if (slides.length && prevBtn && nextBtn) {
    let current = 0;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      slides[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
    });
  }

// Scroll to top
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if(window.scrollY > 400) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});

// Contact form demo
document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks! Message sent to Mohsin. I will contact you soon.');
  e.target.reset();
});

// ===== NAV NAVIGATION + CV FORCE DOWNLOAD (NO OPEN) =====
async function downloadCV() {
  try {
    const url = 'CV_Mohsin_Ali_Nisar.pdf';
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'CV_Mohsin_Ali_Nisar.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (e) {
    // fallback
    const link = document.createElement('a');
    link.href = 'CV_Mohsin_Ali_Nisar.pdf';
    link.download = 'CV_Mohsin_Ali_Nisar.pdf';
    link.setAttribute('target','_self');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

document.querySelectorAll('.nav-links li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));
    li.classList.add('active');

    if (li.dataset.download === 'cv') {
      downloadCV();
    } else if (li.dataset.target) {
      const target = document.getElementById(li.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

});
