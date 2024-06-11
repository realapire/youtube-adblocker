class YouTubeAdRemover {
    constructor() {
        this.currentUrl = window.location.href;
        this.isVideoPlayerModified = false;
        this.init();
    }

    init() {
        this.removeAds = this.removeAds.bind(this);
        this.getVideoId = this.getVideoId.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
        setInterval(this.removeAds, 100);
    }

    getVideoId() {
        const baseURL = 'https://www.youtube.com/watch?v=';
        const startIndex = this.currentUrl.indexOf(baseURL);
        if (startIndex !== -1) {
            const videoIDStart = startIndex + baseURL.length;
            let videoID = this.currentUrl.substring(videoIDStart);
            const ampersandIndex = videoID.indexOf('&');
            if (ampersandIndex !== -1) {
                videoID = videoID.substring(0, ampersandIndex);
            }
            return videoID;
        }
        return '';
    }

    removeAds() {
        const video = document.querySelector('video');
        if (video && !video.paused) {
            video.volume = 0;
            video.pause();
        }
        if (window.location.href !== this.currentUrl) {
            this.currentUrl = window.location.href;
            this.isVideoPlayerModified = false;
            document.querySelectorAll('.html5-video-player iframe').forEach(iframe => iframe.remove());
        }
        if (this.isVideoPlayerModified) return;

        const videoID = this.getVideoId();
        if (videoID === '') return;

        this.createPlayer(videoID);
        this.isVideoPlayerModified = true;
    }

    createPlayer(videoID) {
        const startOfUrl = "https://www.youtube-nocookie.com/embed/";
        const endOfUrl = "?autoplay=1&modestbranding=1";
        const finalUrl = `${startOfUrl}${videoID}${endOfUrl}`;
        const iframe = document.createElement('iframe');

        iframe.src = finalUrl;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: all;
        `;

        const videoPlayerElement = document.querySelector('.html5-video-player');
        if (videoPlayerElement) {
            videoPlayerElement.appendChild(iframe);
        }
    }
}

new YouTubeAdRemover();
