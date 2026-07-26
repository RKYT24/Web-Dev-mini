(() => {

    const images = document.images.length;
    const videos = document.querySelectorAll("video").length;
    const audio = document.querySelectorAll("audio").length;

    return {
        images,
        videos,
        audio
    };

})();