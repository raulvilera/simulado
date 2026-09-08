const answerKey = { q1: 'A', q2: 'B', q3: 'C', q4: 'B', q5: 'C', q6: 'A', q7: 'C' };
const objectiveMessages = {
  1: { correct: 'Isso! A crosta é a camada externa e sólida da Terra.', wrong: 'A camada externa da Terra é a crosta.' },
  2: { correct: 'Muito bem! O movimento das placas libera energia e pode gerar terremotos.', wrong: 'Lembre-se: o deslocamento das placas acumula e libera energia.' },
  3: { correct: 'Correto! Vulcanismo está ligado ao calor interno do planeta.', wrong: 'Vulcões, fumarolas e fontes termais são manifestações do vulcanismo.' },
  4: { correct: 'Isso! A erosão eólica é provocada pela ação do vento.', wrong: 'Dunas formadas pelo transporte de areia indicam erosão eólica.' },
  5: { correct: 'Perfeito! Assoreamento é o acúmulo de sedimentos que deixa o rio mais raso.', wrong: 'Quando sedimentos se acumulam no leito do rio, ocorre assoreamento.' },
  6: { correct: 'Muito bem! Península é a porção de terra cercada por água em três lados.', wrong: 'A forma descrita é uma península: água em três de seus lados.' },
  7: { correct: 'Correto! Asfalto e concreto impermeabilizam o solo e dificultam a infiltração.', wrong: 'O excesso de áreas impermeáveis aumenta o escoamento e favorece alagamentos.' }
};

const form = document.getElementById('quiz-form');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const objectiveCount = document.getElementById('objective-count');
const essayCount = document.getElementById('essay-count');
const resultPanel = document.getElementById('result-panel');
const resultScore = document.getElementById('result-score');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const lightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(image) {
  const figure = image.closest('.question-visual');
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = figure?.querySelector('figcaption')?.textContent || image.alt;
  lightbox.hidden = false;
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.classList.remove('lightbox-open');
}

function getAnsweredCount() {
  const objectiveAnswered = Object.keys(answerKey).filter((key) => form.elements[key]?.value).length;
  const essayAnswered = ['q8', 'q9', 'q10'].filter((id) => form.elements[id]?.value.trim().length > 0).length;
  return { objectiveAnswered, essayAnswered, total: objectiveAnswered + essayAnswered };
}

function updateProgress() {
  const counts = getAnsweredCount();
  progressText.textContent = `${counts.total} de 10`;
  progressFill.style.width = `${counts.total * 10}%`;
  objectiveCount.textContent = `${counts.objectiveAnswered}/7 objetivas`;
  essayCount.textContent = `${counts.essayAnswered}/3 dissertativas`;
}

function updateEssayCount(event) {
  const field = event.target;
  const count = document.querySelector(`[data-for="${field.id}"]`);
  if (count) count.textContent = `${field.value.length} caracteres`;
  updateProgress();
}

function markObjectiveFeedback(index, isCorrect, selected) {
  const feedback = document.getElementById(`feedback-${index}`);
  const card = document.querySelector(`[data-index="${index}"]`);
  feedback.className = 'answer-feedback';
  card.classList.remove('has-correct', 'has-wrong');
  if (!selected) {
    feedback.textContent = 'Escolha uma alternativa para registrar sua resposta.';
    feedback.classList.add('is-empty');
    return;
  }
  feedback.textContent = isCorrect ? objectiveMessages[index].correct : objectiveMessages[index].wrong;
  feedback.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
  card.classList.add(isCorrect ? 'has-correct' : 'has-wrong');
}

function clearObjectiveFeedback() {
  Object.keys(answerKey).forEach((key) => {
    const index = Number(key.replace('q', ''));
    const feedback = document.getElementById(`feedback-${index}`);
    const card = document.querySelector(`[data-index="${index}"]`);
    feedback.textContent = '';
    feedback.className = 'answer-feedback';
    card.classList.remove('has-correct', 'has-wrong');
  });
}

function handleSubmit(event) {
  event.preventDefault();
  let score = 0;
  Object.entries(answerKey).forEach(([key, answer]) => {
    const index = Number(key.replace('q', ''));
    const selected = form.elements[key]?.value || '';
    const isCorrect = selected === answer;
    if (isCorrect) score += 1;
    markObjectiveFeedback(index, isCorrect, selected);
  });

  const counts = getAnsweredCount();
  resultScore.textContent = `${score}/7`;
  if (score === 7) {
    resultTitle.textContent = 'Excelente leitura das paisagens!';
    resultMessage.textContent = 'Você acertou todas as questões objetivas. Agora capriche nas explicações das três questões dissertativas.';
  } else if (score >= 4) {
    resultTitle.textContent = 'Boa caminhada — continue observando.';
    resultMessage.textContent = `Você acertou ${score} de 7 objetivas. Revise os comentários em coral e complete as dissertativas com calma.`;
  } else {
    resultTitle.textContent = 'Todo mapa começa com uma primeira leitura.';
    resultMessage.textContent = `Você acertou ${score} de 7 objetivas. Use os comentários para revisar os conceitos e tente novamente se quiser.`;
  }
  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  localStorage.setItem('geografia-6ano-result', JSON.stringify({ score, counts, savedAt: new Date().toISOString() }));
}

function resetObjectiveFeedback() {
  form.querySelectorAll('input[type="radio"]').forEach((input) => { input.checked = false; });
  clearObjectiveFeedback();
  resultPanel.hidden = true;
  updateProgress();
}

form.addEventListener('change', updateProgress);
form.addEventListener('input', updateEssayCount);
form.addEventListener('submit', handleSubmit);

document.getElementById('print-button').addEventListener('click', () => window.print());
document.getElementById('reset-button').addEventListener('click', resetObjectiveFeedback);
document.querySelectorAll('.question-visual img').forEach((image) => {
  image.addEventListener('click', () => openLightbox(image));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

document.querySelectorAll('.key-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const key = document.getElementById(button.getAttribute('aria-controls'));
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    key.hidden = expanded;
  });
});

updateProgress();
