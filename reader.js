(() => {
  const root = document.documentElement;
  const storage = (() => {
    try { return window.localStorage; } catch (_) { return null; }
  })();
  const savedTheme = storage?.getItem('liuyue-theme');
  if (savedTheme === 'dark') root.dataset.theme = 'dark';
  const size = Number(storage?.getItem('liuyue-font-size') || 18);
  root.style.setProperty('--reader-size', `${Math.max(16, Math.min(24, size))}px`);

  const themeButton = document.getElementById('theme-toggle');
  themeButton?.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    storage?.setItem('liuyue-theme', dark ? 'dark' : 'light');
  });

  const changeSize = (step) => {
    const current = Number(storage?.getItem('liuyue-font-size') || 18);
    const next = Math.max(16, Math.min(24, current + step));
    root.style.setProperty('--reader-size', `${next}px`);
    storage?.setItem('liuyue-font-size', String(next));
  };
  document.getElementById('font-smaller')?.addEventListener('click', () => changeSize(-1));
  document.getElementById('font-larger')?.addEventListener('click', () => changeSize(1));

  const progress = document.querySelector('.reading-progress span');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();
})();
