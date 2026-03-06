document.documentElement.classList.add(localStorage.getItem('theme') || 'light');

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleTheme');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark');
      document.documentElement.classList.toggle('light');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }
});
