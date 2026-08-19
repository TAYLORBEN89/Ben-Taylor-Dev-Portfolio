import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const VIEWPORT_LOCKED =
  'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';

function getViewportMeta() {
  return document.querySelector('meta[name="viewport"]');
}

function snapViewportToFit() {
  const scale = window.visualViewport?.scale ?? 1;
  if (scale === 1 && window.scrollX === 0) return;

  const meta = getViewportMeta();
  if (!(meta instanceof HTMLMetaElement)) return;

  // iOS only reapplies scale if the content string actually changes.
  meta.content = `${VIEWPORT_LOCKED}, maximum-scale=1.0001`;
  requestAnimationFrame(() => {
    meta.content = VIEWPORT_LOCKED;
  });

  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
}

function preventMultiTouchZoom(event: TouchEvent) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}

function preventGesture(event: Event) {
  event.preventDefault();
}

document.addEventListener('touchmove', preventMultiTouchZoom, {passive: false});
document.addEventListener('touchend', snapViewportToFit, {passive: true});
document.addEventListener('gesturestart', preventGesture, {passive: false});
document.addEventListener('gesturechange', preventGesture, {passive: false});
document.addEventListener('gestureend', preventGesture, {passive: false});
window.addEventListener('orientationchange', snapViewportToFit);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
