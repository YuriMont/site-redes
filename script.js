// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 100);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((r) => obs.observe(r));

// ── SPEED BARS ──
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".speed-bar").forEach((b) => {
          b.style.width = b.dataset.w + "%";
        });
        barObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll(".heroes-grid").forEach((g) => barObs.observe(g));

// ── QUIZ ──
const questions = [
  {
    q: "🤔 Qual é o 'nome secreto' do Wi-Fi super-rápido com MIMO que alcança todos os cantos da casa?",
    opts: [
      { text: "🐢 IEEE 802.11b — O Pioneiro", correct: false },
      { text: "✈️ IEEE 802.11n — O Super-Rápido", correct: true },
      { text: "🚗 IEEE 802.11g — O Veloz", correct: false },
      { text: "🔌 IEEE 802.3 — Rede com fio", correct: false },
    ],
    good: "🎉 Incrível! O 802.11n é mesmo o super-rápido, com MIMO e alcance ampliado!",
    bad: "😅 Quase! A resposta certa é o IEEE 802.11n — O Super-Rápido, com tecnologia MIMO!",
  },
  {
    q: "🔐 Como se chama o super-escudo mais forte que protege o Wi-Fi da sua casa?",
    opts: [
      { text: "🔓 WEP — O primeiro escudo", correct: false },
      { text: "🛡️ WPA — O escudo melhorado", correct: false },
      { text: "🏰 WPA2 — O super-escudo atual", correct: true },
      { text: "🔑 A senha é tudo que importa!", correct: false },
    ],
    good: "⭐ Perfeito! O WPA2 usa AES, a criptografia mais poderosa — é o super-escudo!",
    bad: "🤔 A resposta certa é WPA2! Ele usa a criptografia AES para proteger sua rede.",
  },
  {
    q: "🧙‍♂️ Na história do Wi-Fi mágico, quem é o 'mago da torre do castelo'?",
    opts: [
      { text: "📱 O celular", correct: false },
      { text: "🌐 A internet", correct: false },
      { text: "📡 O roteador (ponto de acesso)", correct: true },
      { text: "🔋 A bateria do aparelho", correct: false },
    ],
    good: "🌟 Isso mesmo! O roteador é o mago que organiza todo o tráfego de informações!",
    bad: "😅 O mago é o roteador! Ele organiza todo o tráfego como um maestro de orquestra.",
  },
  {
    q: "🚀 Qual é o Wi-Fi mais inteligente e moderno, também chamado de Wi-Fi 6?",
    opts: [
      { text: "🚀 IEEE 802.11ac — O Ultra-Rápido", correct: false },
      { text: "🤖 IEEE 802.11ax — O Super-Inteligente", correct: true },
      { text: "✈️ IEEE 802.11n — O Super-Rápido", correct: false },
      { text: "🏎️ IEEE 802.11g — O Veloz", correct: false },
    ],
    good: "🎊 Brilhante! O 802.11ax (Wi-Fi 6) é o mais inteligente — fala com vários aparelhos ao mesmo tempo!",
    bad: "💡 A resposta é IEEE 802.11ax! Ele é o Wi-Fi 6, o mais moderno e inteligente da turma.",
  },
];

let current = 0,
  score = 0,
  answered = false;

function loadQuestion() {
  answered = false;
  const q = questions[current];
  document.getElementById("quiz-q").textContent = q.q;
  const opts = document.getElementById("quiz-opts");
  opts.innerHTML = "";
  q.opts.forEach((o) => {
    const btn = document.createElement("button");
    btn.className = "quiz-btn";
    btn.textContent = o.text;
    btn.onclick = () => checkAnswer(btn, o.correct);
    opts.appendChild(btn);
  });
  const fb = document.getElementById("quiz-feedback");
  fb.className = "quiz-feedback";
  fb.textContent = "";
  document.getElementById("quiz-next").className = "quiz-next";
}

function checkAnswer(btn, correct) {
  if (answered) return;
  answered = true;
  const fb = document.getElementById("quiz-feedback");
  const q = questions[current];

  document
    .querySelectorAll(".quiz-btn")
    .forEach((b) => (b.style.pointerEvents = "none"));

  if (correct) {
    btn.classList.add("correct");
    score++;
    fb.textContent = q.good;
    fb.className = "quiz-feedback good show";
  } else {
    btn.classList.add("wrong");
    fb.textContent = q.bad;
    fb.className = "quiz-feedback bad show";
    // show correct
    document.querySelectorAll(".quiz-btn").forEach((b, i) => {
      if (q.opts[i] && q.opts[i].correct) b.classList.add("correct");
    });
  }

  document.getElementById("quiz-next").className = "quiz-next show";
}

document
  .getElementById("restart-quiz")
  .addEventListener("click", () => restartQuiz());
document
  .getElementById("quiz-next")
  .addEventListener("click", () => nextQuestion());

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    showScore();
  } else {
    loadQuestion();
  }
}

function showScore() {
  document.getElementById("quiz-container").style.display = "none";
  const scoreDiv = document.getElementById("quiz-score");
  scoreDiv.style.display = "block";
  const pct = score / questions.length;
  let emoji, title, text;
  if (pct === 1) {
    emoji = "🏆";
    title = "Campeão do Wi-Fi!";
    text = `Você acertou TUDO! ${score}/${questions.length} respostas corretas! Você é um verdadeiro super-herói da tecnologia! 🦸‍♂️`;
  } else if (pct >= 0.5) {
    emoji = "🌟";
    title = "Muito bem!";
    text = `${score}/${questions.length} respostas corretas! Você já sabe muito sobre o Wi-Fi mágico! Continue aprendendo! 📚`;
  } else {
    emoji = "😊";
    title = "Continue tentando!";
    text = `${score}/${questions.length} corretas. Releia o conteúdo e tente de novo — você vai conseguir! 💪`;
  }
  document.getElementById("score-emoji").textContent = emoji;
  document.getElementById("score-title").textContent = title;
  document.getElementById("score-text").textContent = text;
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = false;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("quiz-score").style.display = "none";
  loadQuestion();
}

loadQuestion();
