function dayIndexFromDate(date, total) {
  const start = new Date("2020-01-01T00:00:00Z");
  const diffDays = Math.floor((date - start) / 86400000);
  return ((diffDays % total) + total) % total;
}

async function loadWotd() {
  const res = await fetch("words.json");
  if (!res.ok) throw new Error("Failed to load words.json");

  const words = await res.json();
  if (!Array.isArray(words) || words.length === 0) return;

  const today = new Date(); // uses user's local time
  const idx = dayIndexFromDate(today, words.length);

  const word = words[idx];
  document.getElementById("wotd-norwegian").textContent = word.norwegian;
  document.getElementById("wotd-english").textContent = word.english;

  const a_Norwegian = document.getElementById("wotd-norwegian-link");
  a_Norwegian.textContent = word.norwegian;
  url = "https://translate.google.com/?sl=no&tl=en&text=" + word.norwegian + "%0A&op=translate";
  a_Norwegian.href = url;

  const a_English = document.getElementById("wotd-english-link");
  a_English.textContent = word.english;
  url = "https://translate.google.com/?sl=en&tl=no&text=" + word.english + "%0A&op=translate";
  a_English.href = url;
}

loadWotd().catch(console.error);

const navWrap = document.querySelector('.nav-wrap');
const btn = document.querySelector('.nav-toggle');

btn.addEventListener('click', () => {
  const isOpen = navWrap.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
});