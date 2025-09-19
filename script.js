document.addEventListener('DOMContentLoaded', () => {
  const pkgMap = {
    instagram: 'com.instagram.android',
    facebook: 'com.facebook.katana',
    twitter: 'com.twitter.android',
    x: 'com.twitter.android',
    youtube: 'com.google.android.youtube',
    tiktok: 'com.zhiliaoapp.musically',
    twitch: 'tv.twitch.android',
    pinterest: 'com.pinterest',
    whatsapp: 'com.whatsapp'
  };

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const href = btn.getAttribute('href') || '#';
      // Si no hay href válido, copiar etiqueta
      if (href === '#' || href.trim() === '') {
        e.preventDefault();
        const label = btn.dataset.label || btn.textContent.trim();
        navigator.clipboard?.writeText(label).then(() => {
          alert('Copiado: ' + label + '\nReemplaza el href en el HTML con tu enlace.');
        }).catch(() => {
          alert('Pon tu enlace en el atributo href del botón.');
        });
        return;
      }

      const appScheme = btn.dataset.app;
      const ua = navigator.userAgent || '';
      const isAndroid = /Android/i.test(ua);
      const isIOS = /iPhone|iPad|iPod/i.test(ua);

      // Si hay esquema de app y estamos en móvil, intentar abrir la app primero
      if (appScheme && (isAndroid || isIOS)) {
        e.preventDefault();
        const fallback = href;

        // Helper: abrir fallback si la app no respondió
        const tryFallbackAfter = (startTs, timeout = 800) => {
          setTimeout(() => {
            // Si el intervalo fue corto, asumimos que la app no abrió
            if (Date.now() - startTs < 1200) {
              window.open(fallback, '_blank', 'noopener');
            }
          }, timeout);
        };

        const start = Date.now();

        if (isAndroid) {
          // Para Android preferimos usar el esquema intent: si podemos armarlo
          const schemeName = appScheme.split(':')[0];
          let intentUrl = appScheme;
          if (!/^intent:/i.test(appScheme) && pkgMap[schemeName]) {
            // crear intent con la parte después de ':'
            const after = appScheme.replace(/^[^:]+:/, '');
            intentUrl = 'intent:' + after + '#Intent;package=' + pkgMap[schemeName] + ';scheme=' + schemeName + ';end';
          }
          // Intent navigation (cambia la location). El timeout maneja el fallback.
          try {
            window.location.href = intentUrl;
          } catch (err) {
            // si falla, intentar con el esquema directo
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = appScheme;
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 1000);
          }
          tryFallbackAfter(start, 800);
          return;
        }

        if (isIOS) {
          // En iOS intent no existe; intentar abrir esquema (app) y fallback
          try {
            window.location.href = appScheme;
          } catch (err) {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = appScheme;
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 1000);
          }
          tryFallbackAfter(start, 700);
          return;
        }
      }

      // Desktop o sin esquema: abrir en nueva pestaña
      e.preventDefault();
      window.open(href, '_blank', 'noopener');
    });
  });
});
