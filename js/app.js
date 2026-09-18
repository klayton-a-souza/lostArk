import { guides, getGuide } from '../data/registry.js';
import { site } from '../data/site.js';
import { escape, badge, asset } from './components/ui.js';
import { renderGuide } from './guide-renderer.js';
import { decorateSkillReferences } from './components/skill-references.js';

import { bindRunePresets } from './components/runes.js';

const main = document.querySelector('main');
const id = new URLSearchParams(location.search).get('guide');
const guide = getGuide(id);

function renderHome() {
  return `<div class="home"><div class="eyebrow">O arquivo de builds / Lost Ark</div><h1>${escape(site.name)}</h1><p class="home-intro">${escape(site.description)}<br>Skills, Ark Grid e rotações para consultar entre uma raid e outra.</p><div class="catalog-heading"><h2>Explore os guias</h2><span>${guides.length.toString().padStart(2, '0')} ${guides.length === 1 ? 'guia disponível' : 'guias disponíveis'}</span></div><div class="build-grid">${guides.map((item) => `<a class="build-card" href="?guide=${encodeURIComponent(item.id)}"><div class="card-art">${asset(item, 'class-art card-class-art')}<span class="micro">${escape(item.role)}</span>${badge('ARK GRID', 'purple')}</div><div class="card-body"><div class="card-class"><span>${escape(item.class)}</span><span class="card-arrow" aria-hidden="true">↗</span></div><h3>${escape(item.build)}</h3><p>${escape(item.variant)}</p><div class="card-meta"><span>${escape(item.version)}</span><time datetime="${escape(item.updated)}">${escape(item.updated)}</time></div></div></a>`).join('')}</div></div>`;
}

if (id && !guide) {
  main.innerHTML = '<div class="home"><h1>Guia não encontrado</h1><p>Esse guia ainda não está no arquivo.</p><a class="button" href="./">Voltar aos guias</a></div>';
} else if (guide) {
  document.title = `${guide.class} — ${guide.build} ${guide.variant} | ${site.name}`;
  main.innerHTML = renderGuide(guide);
  decorateSkillReferences(main, [...guide.skills, ...(guide.demonSkills || [])]);
  bindRunePresets(main);
  document.querySelector('#expand-loop')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    document.querySelector('#expanded-loop').hidden = !expanded;
    button.textContent = expanded ? 'Compact −' : 'Expanded ＋';
  });
  document.querySelectorAll('[data-copy-code]').forEach((button) => button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copyCode);
    const status = document.getElementById(button.dataset.copyStatus);
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Código copiado!';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Cópia indisponível. Código selecionado: pressione Ctrl+C ou copie pelo menu do dispositivo.';
      code.focus();
    }
  }));
  const links = [...document.querySelectorAll('.sidebar nav a')];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    links.forEach((link) => {
      if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('.guide-section').forEach((section) => observer.observe(section));
} else {
  document.title = site.name;
  main.innerHTML = renderHome();
}

document.querySelectorAll('img[data-fallback]').forEach((img) => {
  const hide = () => img.remove();
  img.addEventListener('error', hide, { once: true });
  if (img.complete && img.naturalWidth === 0) hide();
});
if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
