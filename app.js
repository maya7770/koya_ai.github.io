// KOYA AI — Main JS

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// Highlight active nav link
document.querySelectorAll('.nav-links a, .sidebar-nav a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// Animate stats on scroll
function animateOnScroll() {
  const els = document.querySelectorAll('.feature-card, .stat-block, .stat-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();

  // Task checkbox toggle
  document.querySelectorAll('.task-check').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('checked');
      if (btn.classList.contains('checked')) btn.innerHTML = '✓';
      else btn.innerHTML = '';
      const taskItem = btn.closest('.task-item');
      if (taskItem) taskItem.classList.toggle('done');
      const taskName = taskItem?.querySelector('.task-name');
      if (taskName) taskName.classList.toggle('strikethrough');
      updateProgress();
    });
  });

  // Age options
  document.querySelectorAll('.age-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.age-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Status options
  document.querySelectorAll('.status-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.status-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Goal options (multi-select)
  document.querySelectorAll('.goal-opt').forEach(opt => {
    opt.addEventListener('click', () => opt.classList.toggle('selected'));
  });

  // Avatar options
  document.querySelectorAll('.avatar-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.avatar-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const preview = document.querySelector('.avatar-preview');
      if (preview) {
        preview.innerHTML = opt.innerHTML;
        preview.style.background = opt.style.background;
      }
    });
  });

  // Onboarding choice buttons
  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.choices');
      if (group) group.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Chat functionality
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatMessages = document.getElementById('chatMessages');

  function sendMessage(text) {
    if (!chatMessages) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.innerHTML = `<div class="msg-bubble">${text}</div>`;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate KOYA response
    setTimeout(() => {
      const responses = [
        "That's great! Let me help you work on that. Consistency is key — start small and build momentum daily.",
        "I love your drive! Setting clear, actionable goals is the foundation of real growth. Let's break this down into daily steps.",
        "You're doing amazing! Remember: small daily improvements lead to stunning long-term results.",
        "Great question! I recommend blocking focused time in the morning when your energy is highest.",
        "Building habits takes about 21 days of consistent practice. Let's create a simple routine for you!",
      ];
      const r = responses[Math.floor(Math.random() * responses.length)];
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot';
      botMsg.innerHTML = `<div class="msg-avatar">✦</div><div class="msg-bubble">${r}</div>`;
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const val = chatInput?.value.trim();
      if (val) { sendMessage(val); chatInput.value = ''; }
    });
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { const val = chatInput.value.trim(); if (val) { sendMessage(val); chatInput.value = ''; } }
    });
  }

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.textContent;
      if (chatInput) chatInput.value = text;
      sendMessage(text);
      if (chatInput) chatInput.value = '';
    });
  });

  // Add Task modal
  const addTaskBtn = document.getElementById('addTaskBtn');
  const modal = document.getElementById('addTaskModal');
  const closeModal = document.getElementById('closeModal');
  const saveTask = document.getElementById('saveTask');

  if (addTaskBtn && modal) {
    addTaskBtn.addEventListener('click', () => modal.classList.add('open'));
    closeModal?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  }

  if (saveTask) {
    saveTask.addEventListener('click', () => {
      const name = document.getElementById('taskName')?.value.trim();
      const time = document.getElementById('taskTime')?.value;
      const priority = document.getElementById('taskPriority')?.value || 'medium';
      if (!name) return;
      addTask(name, time, priority);
      modal.classList.remove('open');
      document.getElementById('taskName').value = '';
    });
  }

  // Bar chart tooltips
  document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseenter', function() {
      const tip = this.querySelector('.bar-tooltip');
      if (tip) tip.style.opacity = '1';
    });
    bar.addEventListener('mouseleave', function() {
      const tip = this.querySelector('.bar-tooltip');
      if (tip) tip.style.opacity = '0';
    });
  });

  // Confetti animation
  const confettiContainer = document.querySelector('.confetti');
  if (confettiContainer) {
    for (let i = 0; i < 50; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: hsl(${Math.random() * 360},80%,60%);
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        left: ${Math.random() * 100}%;
        top: -20px;
        animation: fall ${Math.random() * 3 + 2}s ${Math.random() * 3}s linear infinite;
        opacity: ${Math.random() * 0.8 + 0.2};
      `;
      confettiContainer.appendChild(dot);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to { transform: translateY(110vh) rotate(${Math.random() * 720}deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Onboarding steps
  initOnboarding();
});

function updateProgress() {
  const checks = document.querySelectorAll('.task-check');
  const done = document.querySelectorAll('.task-check.checked').length;
  const total = checks.length;
  const fill = document.querySelector('.focus-progress-fill');
  const label = document.querySelector('.focus-meta');
  if (fill) fill.style.width = `${(done / total) * 100}%`;
  if (label) label.textContent = `${done}/${total}`;
}

function addTask(name, time, priority) {
  const list = document.getElementById('taskList');
  if (!list) return;
  const item = document.createElement('div');
  item.className = `task-item priority-${priority}`;
  item.innerHTML = `
    <div class="task-check" onclick="toggleTask(this)"></div>
    <div class="task-info">
      <div class="task-name">${name}</div>
      <div class="task-meta">
        ${time ? `<span class="task-time">🕐 ${time}</span>` : ''}
        <span class="priority-badge ${priority}">${priority}</span>
      </div>
    </div>
  `;
  list.appendChild(item);
}

function toggleTask(btn) {
  btn.classList.toggle('checked');
  btn.innerHTML = btn.classList.contains('checked') ? '✓' : '';
  const taskItem = btn.closest('.task-item');
  taskItem?.classList.toggle('done');
  taskItem?.querySelector('.task-name')?.classList.toggle('strikethrough');
  updateProgress();
}

// Onboarding multi-step
let obStep = 1;
const obSteps = [
  { q: "What do you enjoy doing?", choices: ["Creating and designing", "Solving problems", "Helping people", "Learning new things"], key: "enjoy" },
  { q: "What are your goals?", choices: ["Learning skills", "Career growth", "Health & wellness", "Build habits"], key: "goals" },
  { q: "Are you more creative or analytical?", choices: ["More creative", "More analytical", "Both equally", "It depends"], key: "type" },
  { q: "What do you want to improve in your life?", choices: null, key: "improve" },
];

function initOnboarding() {
  const obChat = document.getElementById('obChat');
  if (!obChat) return;
  renderObStep();
}

function renderObStep() {
  const obChat = document.getElementById('obChat');
  const choicesEl = document.getElementById('obChoices');
  const pct = document.getElementById('obPct');
  const fill = document.getElementById('obFill');
  const stepLabel = document.getElementById('stepLabel');
  if (!obChat) return;

  const step = obSteps[obStep - 1];
  const pctVal = Math.round((obStep / obSteps.length) * 100);

  if (pct) pct.textContent = pctVal + '%';
  if (fill) fill.style.width = pctVal + '%';
  if (stepLabel) stepLabel.textContent = `Step ${obStep} of ${obSteps.length}`;

  // Add question bubble
  const msg = document.createElement('div');
  msg.className = 'ob-msg';
  msg.innerHTML = `<div class="ob-avatar">✦</div><div class="ob-bubble">${step.q}</div>`;
  obChat.appendChild(msg);
  obChat.scrollTop = obChat.scrollHeight;

  if (choicesEl) {
    choicesEl.innerHTML = '';
    if (step.choices) {
      choicesEl.style.display = 'flex';
      document.getElementById('obInputArea').style.display = 'none';
      step.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = c;
        btn.onclick = () => handleObChoice(c);
        choicesEl.appendChild(btn);
      });
    } else {
      choicesEl.style.display = 'none';
      document.getElementById('obInputArea').style.display = 'flex';
    }
  }
}

function handleObChoice(choice) {
  const obChat = document.getElementById('obChat');
  const reply = document.createElement('div');
  reply.className = 'ob-user-reply';
  reply.textContent = choice;
  obChat.appendChild(reply);
  obChat.scrollTop = obChat.scrollHeight;
  nextObStep();
}

function handleObInput() {
  const input = document.getElementById('obInput');
  if (!input?.value.trim()) return;
  const obChat = document.getElementById('obChat');
  const reply = document.createElement('div');
  reply.className = 'ob-user-reply';
  reply.textContent = input.value.trim();
  obChat.appendChild(reply);
  input.value = '';
  nextObStep();
}

function nextObStep() {
  obStep++;
  if (obStep > obSteps.length) {
    setTimeout(() => window.location.href = 'tell.html', 400);
    return;
  }
  setTimeout(renderObStep, 500);
}
