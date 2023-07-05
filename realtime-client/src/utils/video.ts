export function getVideoDuration(src: string): Promise<number> {
    return new Promise((resolve, reject) => {
        // Creiamo un elemento video
        const video = document.createElement('video');

        // Una volta che i metadati sono caricati, otteniamo la durata
        video.onloadedmetadata = function() {
            // Moltiplichiamo per 1000 per ottenere millisecondi
            resolve(video.duration * 1000);
        };

        // Gestisci eventuali errori
        video.onerror = function() {
            reject(`Errore nel caricamento del video: ${src}`);
        };

        // Assegniamo la sorgente del video
        video.src = src;
    });
}
