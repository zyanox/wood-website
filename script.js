document.addEventListener('DOMContentLoaded', function() {
  const treeContainers = document.querySelectorAll('.tree-branch-container');
  // Set the first tree as active by default
  activateTree('oak');
  // Add click event to all tree containers
  treeContainers.forEach(container => {
    container.addEventListener('click', function() {
      const treeType = this.getAttribute('data-tree');
      activateTree(treeType);
    });
  });
  // Function to animate images
  const treeImages = document.querySelectorAll('.tree-image-text-block');
  let currentImageIndex = 0;

  setInterval(() => {
    // Add subtle animation to the current image
    treeImages[currentImageIndex].classList.add('animate-pulse');
    // Remove animation from previous image
    const prevIndex = (currentImageIndex - 1 + treeImages.length) % treeImages.length;
    
    treeImages[prevIndex].classList.remove('animate-pulse');

    currentImageIndex = (currentImageIndex + 1) % treeImages.length;
  }, 2000);

  // Initial setup for sliders
  preloadSliderImages();
});

function preloadSliderImages() {
  // Preload all slider images for smoother experience
  Object.keys(sliderImages).forEach(sliderId => {
    sliderImages[sliderId].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });
}

function activateTree(treeType) {
  // Remove active class from all trees
  document.querySelectorAll('.tree-branch-container').forEach(el => {
    el.classList.remove('active');
  });
  // Add active class to selected tree
  document.querySelector(`[data-tree="${treeType}"]`).classList.add('active');
  // Update main tree image
  document.querySelectorAll('.tree-image').forEach(img => {
    img.classList.remove('active');
  });
  document.getElementById(`${treeType}-image`).classList.add('active');
  // Show tree details
  document.querySelectorAll('.tree-detail-container').forEach(detail => {
    detail.classList.remove('active');
  });
  document.getElementById(`${treeType}-details`).classList.add('active');
}

// Slider functionality
let sliderPositions = {
  'slider1': 0,
  'slider2': 0,
  'gallerySlider': 0
};

let isSliderTransitioning = false;

const sliderImages = {
  'slider1': [
    'assets/container1/002.jpg',
    'assets/container1/004.jpg',
    'assets/container1/021.jpg',
    'assets/container1/022.jpg',
    'assets/container1/023.jpg',
    'assets/container1/026.jpg',
    'assets/container1/030.jpg',
    'assets/container1/4917014.jpg',
    'assets/container1/caption.jpg',
    'assets/container1/dsc02262-uluchsheno-um.-shuma.jpg',
    'assets/container1/dsc02266-uluchsheno-um.-shuma.jpg',
    'assets/container1/dsc02273-uluchsheno-um.-shuma.jpg',
    'assets/container1/dsc02300-uluchsheno-um.-shuma.jpg',
  ],
  'slider2': [
    'assets/container2/202202252001131831.jpg',
    'assets/container2/c7be67fa3deea58fd3a154310ce8e778.jpg',
    'assets/container2/harats_1.png',
    'assets/container2/large_638023.jpg',
  ],
  'gallerySlider': [
    'assets/container3/1.png',
    'assets/container3/2.png',
    'assets/container3/3.png',
    'assets/container3/4.png',
    'assets/container3/5.png',
    'assets/container3/6.png',
    'assets/container3/7.png',
    'assets/container3/8.png',
    'assets/container3/9.png',
    'assets/container3/10.png',
    'assets/container3/11.png',
    'assets/container3/12.png',
    'assets/container3/13.png',
    'assets/container3/14.png',
    'assets/container3/15.png',
    'assets/container3/16.png',
    'assets/container3/17.png',
    'assets/container3/18.png',
    'assets/container3/19.png',
    'assets/container3/20.png',
  ]
};

function moveSlider(sliderId, direction) {
  if (isSliderTransitioning) return;
  isSliderTransitioning = true;
  
  const slider = document.getElementById(sliderId);
  const imageElement = slider.querySelector('.slider-image');
  
  // Add transition class to current rectangle elements
  const rectangles = slider.querySelectorAll('.slider-rectangle');
  rectangles.forEach(rect => {
    rect.style.opacity = '0.7';
  });
  
  // Fade out current image
  imageElement.style.opacity = '0';
  
  setTimeout(() => {
    // Update position
    sliderPositions[sliderId] = (sliderPositions[sliderId] + direction + sliderImages[sliderId].length) % sliderImages[sliderId].length;
    
    // Update image src
    imageElement.src = sliderImages[sliderId][sliderPositions[sliderId]];
    
    // Add fade-in class for smooth transition
    imageElement.classList.add('fade-in');
    
    // Fade in new image
    imageElement.style.opacity = '1';
    
    // Reset rectangle opacity
    setTimeout(() => {
      rectangles.forEach(rect => {
        rect.style.opacity = '1';
      });
      
      // Remove fade-in class
      imageElement.classList.remove('fade-in');
      
      // Allow next transition
      isSliderTransitioning = false;
    }, 300);
  }, 300);
}

function openGallerySlider() {
  const modal = document.getElementById('gallerySliderModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
  
  // Make sure the first image is shown
  sliderPositions['gallerySlider'] = 0;
  updateGalleryImage();
  
  // Add keyboard navigation for gallery
  document.addEventListener('keydown', handleGalleryKeyPress);
}

function closeGallerySlider() {
  document.getElementById('gallerySliderModal').style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
  
  // Remove keyboard event listener
  document.removeEventListener('keydown', handleGalleryKeyPress);
}

function handleGalleryKeyPress(event) {
  if (event.key === 'ArrowLeft') {
    moveGallerySlider(-1);
  } else if (event.key === 'ArrowRight') {
    moveGallerySlider(1);
  } else if (event.key === 'Escape') {
    closeGallerySlider();
  }
}

function moveGallerySlider(direction) {
  if (isSliderTransitioning) return;
  isSliderTransitioning = true;
  
  const totalImages = sliderImages['gallerySlider'].length;
  sliderPositions['gallerySlider'] = (sliderPositions['gallerySlider'] + direction + totalImages) % totalImages;
  
  updateGalleryImage();
  
  setTimeout(() => {
    isSliderTransitioning = false;
  }, 500);
}

function updateGalleryImage() {
  const currentPosition = sliderPositions['gallerySlider'];
  const imageContainer = document.getElementById('galleryCurrentImage');
  const imageElement = imageContainer.querySelector('.full-gallery-image');
  
  // Add transition class
  imageElement.classList.add('transitioning');
  
  // Fade out effect
  imageElement.style.opacity = '0';
  
  setTimeout(() => {
    // Update the image src
    imageElement.src = sliderImages['gallerySlider'][currentPosition];
    
    // Fade in effect
    imageElement.style.opacity = '1';
    
    // Remove transition class
    setTimeout(() => {
      imageElement.classList.remove('transitioning');
    }, 300);
  }, 300);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('gallerySliderModal');
  if (event.target === modal) {
    closeGallerySlider();
  }
}

// Add smooth scrolling functionality
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
