// ===== Navigation =====
const navbar = document.querySelector('.navbar')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelector('.nav-links')

// Scroll effect on navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar?.classList.add('scrolled')
  } else {
    navbar?.classList.remove('scrolled')
  }
})

// Mobile nav toggle
navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open')
  const spans = navToggle.querySelectorAll('span')
  if (navLinks?.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)'
    spans[1].style.opacity = '0'
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)'
  } else {
    spans[0].style.transform = ''
    spans[1].style.opacity = ''
    spans[2].style.transform = ''
  }
})

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open')
    const spans = navToggle?.querySelectorAll('span')
    if (spans) {
      spans[0].style.transform = ''
      spans[1].style.opacity = ''
      spans[2].style.transform = ''
    }
  })
})

// Active nav link highlight
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href')
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}
setActiveNav()

// ===== Scroll Reveal =====
function assignDelays() {
  const groups = document.querySelectorAll('[data-stagger]')
  groups.forEach((group) => {
    const children = group.querySelectorAll('.fade-in')
    children.forEach((child, i) => {
      child.dataset.delay = i * 120
    })
  })
}

function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in')
  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, delay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.05, rootMargin: '0px 0px 0px 0px' },
  )

  elements.forEach((el) => observer.observe(el))
}

// ===== Typewriter Effect =====
function initTypewriter() {
  const el = document.querySelector('.typewriter')
  if (!el) return

  const words = el.dataset.words
    ? JSON.parse(el.dataset.words)
    : [el.textContent]
  let wordIndex = 0
  let charIndex = 0
  let deleting = false

  function tick() {
    const currentWord = words[wordIndex]
    if (deleting) {
      el.textContent = currentWord.substring(0, charIndex - 1)
      charIndex--
      if (charIndex === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(tick, 400)
        return
      }
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1)
      charIndex++
      if (charIndex === currentWord.length) {
        if (words.length > 1) {
          setTimeout(() => {
            deleting = true
            tick()
          }, 1600)
          return
        } else {
          return
        }
      }
    }
    setTimeout(tick, deleting ? 60 : 90)
  }

  el.textContent = ''
  setTimeout(tick, 500)
}

// ===== Skill Button Ripple =====
function initSkillRipple() {
  document.querySelectorAll('.skill-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(255,133,161,0.25);
        transform:scale(0);
        animation:ripple 0.5s linear;
        pointer-events:none;
        width:80px; height:80px;
        left:${e.offsetX - 40}px;
        top:${e.offsetY - 40}px;
      `
      this.style.position = 'relative'
      this.style.overflow = 'hidden'
      this.appendChild(ripple)
      setTimeout(() => ripple.remove(), 500)
    })
  })

  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style')
    style.id = 'ripple-style'
    style.textContent = `@keyframes ripple { to { transform:scale(4); opacity:0; } }`
    document.head.appendChild(style)
  }
}

// ===== Cursor Glow =====
function initCursorGlow() {
  const glow = document.createElement('div')
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:300px; height:300px; border-radius:50%;
    background: radial-gradient(circle, rgba(255,182,200,0.12) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition: left 0.15s ease, top 0.15s ease;
    top:0; left:0;
  `
  document.body.appendChild(glow)

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px'
    glow.style.top = e.clientY + 'px'
  })
}

// ===== Team Card Hover Glow =====
function initTeamCards() {
  document.querySelectorAll('.team-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.background = 'linear-gradient(135deg, #FFFBFD, #FFF9F0)'
    })
    card.addEventListener('mouseleave', function () {
      this.style.background = ''
    })
  })
}

// ===== Blog links =====
function initBlogLinks() {
  document.querySelectorAll('[data-blog-link]').forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault()
      const url = this.dataset.blogLink || 'https://blog.naver.com'
      window.open(url, '_blank')
    })
  })
}

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count)
    let current = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      el.textContent = current + (el.dataset.suffix || '')
      if (current >= target) clearInterval(timer)
    }, 30)
  })
}

// ===== Dark Mode =====
function initDarkMode() {
  const btn = document.getElementById('darkToggle')
  if (!btn) return

  // 저장된 설정 불러오기
  const saved = localStorage.getItem('darkMode')
  if (saved === 'true') {
    document.body.classList.add('dark')
    btn.textContent = '☀️'
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark')
    btn.textContent = isDark ? '☀️' : '🌙'
    localStorage.setItem('darkMode', isDark)
  })
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  assignDelays()
  initDarkMode()
  initTypewriter()
  initSkillRipple()
  initCursorGlow()
  initTeamCards()
  initBlogLinks()
  initFadeIn()
})
