import { UNSPLASH_API_KEY } from './env.js';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
const count = 20;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&count=${count}`;


// Check if all images have loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
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
    imagesLoaded = 0;
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

        // Check when each image has finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside <div #image-container>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        // Catch errors here ...
    }
}

// Check if scrolling near bottom of page, and images are loaded
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        if (ready) {
            // Load more images
            ready = false;
            getPhotos();
        }
    }
});

// On load
getPhotos();
