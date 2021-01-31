class Media {
    async getCamera(audio = false, video = true) {
        return navigator.mediaDevices.getUserMedia ({
            video: video,
            audio: audio 
        })
    }
}