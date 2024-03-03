if ('serviceWorker' in navigator && 'PushManager' in window) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();

            const deferredPrompt = e;

            const installButton = document.createElement('button');
            installButton.textContent = 'Instalar App';
            installButton.style.position = 'fixed';
            installButton.style.top = '10px';
            installButton.style.left = '90%';
            installButton.style.transform = 'translateX(-50%)';
            installButton.style.zIndex = '9999';
            installButton.style.padding = '10px 20px';
            installButton.classList.add('btn-grad');
            installButton.style.color = 'white';
            installButton.style.background = 'black';
            installButton.style.border = 'none';
            installButton.style.borderRadius = '5px';
            installButton.style.cursor = 'pointer';

            installButton.addEventListener('click', () => {

                deferredPrompt.prompt();

                deferredPrompt.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('App installed');
                    } else {
                        console.log('App installation declined');
                    }

                    installButton.style.display = 'none';
                });
            });

            document.body.appendChild(installButton);
        });
    }

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}




