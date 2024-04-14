(function () {
    let currentUrl = window.location.href;
    let adDetected = false;
    let adSkipAttempts = 0;

    function remove() {
        const maxSkipAttempts = 10;
        const skipButtonSelectors = ['.ytp-ad-skip-button-container', '.ytp-ad-skip-button-modern', '.videoAdUiSkipButton', '.ytp-ad-skip-button', '.ytp-ad-skip-button-slot'];

        setInterval(() => {
            const videoElement = document.querySelector('video');
            const adElement = document.querySelector('.ad-showing');

            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                remove();
            }

            if (adElement) {
                adSkipAttempts++;

                if (adSkipAttempts < maxSkipAttempts) {
                    document.querySelector('.zBmRhe-Bz112c')?.click();
                    document.querySelector('.ytp-ad-button-icon')?.click();
                    document.querySelector('[label="Block ad"]')?.click();
                    document.querySelector('.Eddif [label="CONTINUE"] button')?.click();
                } else {
                    if (videoElement) videoElement.play();
                }

                const popupContainer = document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog');
                if (popupContainer && popupContainer.style.display === "") {
                    popupContainer.style.display = 'none';
                }

                if (videoElement) {
                    videoElement.playbackRate = 10;
                    videoElement.volume = 0;

                    skipButtonSelectors.forEach(selector => {
                        document.querySelectorAll(selector)?.forEach(button => {
                            button?.click();
                        });
                    });

                    let randomOffset = Math.random() * (0.5 - 0.1) + 0.1;
                    videoElement.currentTime = videoElement.duration + randomOffset || 0;
                }

            } else {
                if (adDetected) {
                    adDetected = false;
                    if (videoElement && isFinite(1)) videoElement.playbackRate = 1;
                    adSkipAttempts = 0;
                }
            }

        }, 50);
    }

    remove();
})();
