'use strict';

/* Dark Mode + Preferencias de Usuario */

const $ThemeToggle = document.querySelector('[data-theme-switch]');
const $HTMLRoot = document.documentElement;

addEventListener('DOMContentLoaded', () => {
  const Light = window.matchMedia('(prefers-color-scheme: light)').matches;  // true
  const Dark = window.matchMedia('(prefers-color-scheme: dark)').matches;    // false

  if( Light ){
    $ThemeToggle.setAttribute('checked', '');
    $HTMLRoot.setAttribute('data-theme', 'light');
  }else if( Dark ){
    $ThemeToggle.removeAttribute('checked', '');
    $HTMLRoot.setAttribute('data-theme', 'dark');
  }

  return;
});

$ThemeToggle.addEventListener('click', () => {
  const SetTheme = $ThemeToggle.checked ? 'light' : 'dark';
  $HTMLRoot.setAttribute('data-theme', SetTheme);
});