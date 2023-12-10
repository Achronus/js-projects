const videoElement = document.getElementById('video');
const btn = document.getElementById('button');

// Prompt user to select media stream, pass to video element, then play
const selectMediaStream = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };


    } catch (error) {
        // Handle errors ...
        console.log('Error:', error);
    }
}

btn.addEventListener('click', async () => {
    btn.disabled = true;

    // Start picture in picture
    await videoElement.requestPictureInPicture();
    
    btn.disabled = false;
});

// On Load
selectMediaStream();