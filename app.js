// app.js — minimal project data, modal, theme toggle, and contact form handling

const projects = [
  {
    id: 'p1',
    title: 'Taskify — Todo app',
    desc: 'A tiny task manager using localStorage and accessible interactions.',
    details: '<p>Built with vanilla JS. Features: add/edit/delete, filters, and persistent storage.</p>'
  },
  {
    id: 'p2',
    title: 'Weather Now — API demo',
    desc: 'A demo showing how to fetch and visualise weather data (placeholder).',
    details: '<p>Uses fetch to call weather APIs, displays icons, and responsive layout.</p>'
  },
  {
    id: 'p3',
    title: 'Portfolio Template',
    desc: 'This very portfolio template: semantic markup, responsive CSS, theme toggle.',
    details: '<p>Lightweight, accessible, and easy to customise.</p>'
  },
  {
    id: 'p4',
    title: 'Interactive Chart',
    desc: 'A small chart built with Canvas to visualise numbers.',
    details: '<p>Uses <code>&lt;canvas&gt;</code> and a few helper functions to draw simple charts.</p>'
  }
]

/* ====== UI bindings ====== */
const projectsGrid = document.getElementById('projectsGrid')
const modal = document.getElementById('modal')
const modalContent = document.getElementById('modalContent')
const modalClose = document.getElementById('modalClose')
const viewProjectsBtn = document.getElementById('viewProjectsBtn')
const themeToggle = document.getElementById('themeToggle')
const contactForm = document.getElementById('contactForm')
const formStatus = document.getElementById('formStatus')

function renderProjects() {
  projectsGrid.innerHTML = ''
  projects.forEach(p => {
    const el = document.createElement('article')
    el.className = 'card'
    el.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="actions">
        <button class="btn" data-id="${p.id}" aria-controls="modal">View</button>
        <a class="btn ghost" href="#">Code</a>
      </div>
    `
    projectsGrid.appendChild(el)
  })
}

/* modal open/close */
projectsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]')
  if (!btn) return
  const id = btn.dataset.id
  const project = projects.find(x => x.id === id)
  if (!project) return
  modalContent.innerHTML = `<h3>${project.title}</h3>${project.details}`
  modal.setAttribute('aria-hidden', 'false')
  // trap focus (basic)
  modalClose.focus()
})

modalClose.addEventListener('click', () => {
  modal.setAttribute('aria-hidden', 'true')
})

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.setAttribute('aria-hidden', 'true')
})

/* scroll to projects */
viewProjectsBtn.addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({behavior:'smooth'})
})

/* theme toggle — saves choice to localStorage */
function getInitialTheme(){
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}
function applyTheme(t){
  if (t === 'dark') document.documentElement.setAttribute('data-theme','dark')
  else document.documentElement.removeAttribute('data-theme')
  localStorage.setItem('theme', t)
}
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  applyTheme(current === 'dark' ? 'light' : 'dark')
})
applyTheme(getInitialTheme())

/* contact form handling — local demonstration (no backend) */
contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const form = new FormData(contactForm)
  const name = form.get('name').trim()
  const email = form.get('email').trim()
  const message = form.get('message').trim()
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.'
    return
  }
  // simulate sending: store to localStorage array
  const out = {name, email, message, time: new Date().toISOString()}
  const arr = JSON.parse(localStorage.getItem('portfolio_messages') || '[]')
  arr.push(out)
  localStorage.setItem('portfolio_messages', JSON.stringify(arr))
  formStatus.textContent = 'Message saved locally. (No backend configured in this demo.)'
  contactForm.reset()
})

/* init */
renderProjects()
