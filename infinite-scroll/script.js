import { UNSPLASH_API_KEY } from './env.js';

// Set variables for application
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let imgsFinishedLoading = false;
let numImagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Initalise count to low number for slow internet
let initialImgCount = 6;
let isFirstPageLoad = true;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&count=${initialImgCount}`;


const updateAPIUrlWithNewCount = (count) => {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&count=${count}`;
}


const onImageLoad = () => {
    numImagesLoaded++;
    if (numImagesLoaded === totalImages) {
        imgsFinishedLoading = true;
        loader.hidden = true;
    }
}

// Helper function for creating attributes
const setAttributes = (element, attributes) => {
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
}

// Create elements for links & photos, then add to DOM
const displayPhotos = () => {
    numImagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash image
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'  // Open link in new tab
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });

        // Put <img> inside <a>, then put both inside <div #image-container>
        item.appendChild(img);
        imageContainer.appendChild(item);

        // Check when each image has finished loading
        img.addEventListener('load', onImageLoad);
    });
}

// Get photos from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

        if (isFirstPageLoad) {
            updateAPIUrlWithNewCount(30);
            isFirstPageLoad = false;
        }

    } catch (error) {
        // Catch errors here ...
    }
}

// Check if scrolling near bottom of page, and images are loaded
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && imgsFinishedLoading) {
        if (imgsFinishedLoading) {
            // Load more images
            imgsFinishedLoading = false;
            getPhotos();
        }
    }
});

// On load
getPhotos();
