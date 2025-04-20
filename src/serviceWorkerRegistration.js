// Este script maneja el registro del service worker para la aplicación
// Basado en el enfoque de Create React App PWA template

// Este código opcional se utiliza para registrar un service worker.
// register() no se llamará por defecto.

// Esto permite que la aplicación cargue más rápido en visitas posteriores en producción, y da
// capacidades offline. Sin embargo, también significa que los desarrolladores (y usuarios)
// solo verán actualizaciones desplegadas en visitas posteriores a una página, después de todas las
// pestañas existentes abiertas en la página se han cerrado, ya que se almacenan en caché
// recursos previamente.

// Para obtener más información, visita https://cra.link/PWA

// Definimos una variable para verificar si estamos en producción
const isProduction = import.meta.env.PROD;

// Verificamos si es localhost
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (isProduction && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Veamos si existe un service worker.
        checkValidServiceWorker(swUrl, config);

        // Añadimos información adicional para desarrolladores
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Esta aplicación web se está sirviendo primero en caché por un ' +
              'service worker. Para saber más, visita https://cra.link/PWA'
          );
        });
      } else {
        // No es localhost. Simplemente registramos el service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // En este punto, el contenido precargado ha sido eliminado,
              // y el navegador ha descargado el nuevo contenido.
              console.log(
                'Nuevo contenido está disponible y será usado cuando todas ' +
                  'las pestañas de esta página se cierren.'
              );

              // Ejecutar callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // En este punto, todo ha sido precargado.
              // Es el momento perfecto para mostrar un
              // "El contenido está almacenado para uso sin conexión." mensaje.
              console.log('El contenido está almacenado en caché para uso sin conexión.');

              // Ejecutar callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error durante el registro del service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Verificar si podemos encontrar el service worker
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Asegurarse de que el service worker existe y que realmente obtenemos un archivo JS
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No se encontró service worker. Probablemente sea otra aplicación
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker encontrado. Procedemos normalmente
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No se encontró conexión a internet. La aplicación se ejecuta en modo offline.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        return registration.unregister();
      })
      .catch(error => {
        console.error('Error al dar de baja el service worker:', error);
      });
  }
} 