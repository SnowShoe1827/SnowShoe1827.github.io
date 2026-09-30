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

$(function () {
  $("#wotd-tabs").tabs();
});  

async function loadPotd() {
  const res = await fetch("phrases.json");
  if (!res.ok) throw new Error("Failed to load phrases.json");

  const phrases = await res.json();
  if (!Array.isArray(phrases) || phrases.length === 0) return;

  const today = new Date(); // uses user's local time
  const idx = dayIndexFromDate(today, phrases.length);

  const phrase = phrases[idx];
  document.getElementById("potd-norwegian").textContent = phrase.norwegian;
  document.getElementById("potd-english").textContent = phrase.english;

  const a_Norwegian = document.getElementById("potd-norwegian-link");
  a_Norwegian.textContent = phrase.norwegian;
  url = "https://translate.google.com/?sl=no&tl=en&text=" + phrase.norwegian + "%0A&op=translate";
  a_Norwegian.href = url;

  const a_English = document.getElementById("potd-english-link");
  a_English.textContent = phrase.english;
  url = "https://translate.google.com/?sl=en&tl=no&text=" + phrase.english + "%0A&op=translate";
  a_English.href = url;
}

loadPotd().catch(console.error);