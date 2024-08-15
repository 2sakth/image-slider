document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');

    let currentIndex = 0;
    const animations = ['zoom-animation', 'rotate-animation', 'slide-right-animation', 'slide-left-animation'];
    let currentAnimation = 0;

    function updateMainImage(index, direction) {
        mainImage.style.opacity = '0';
        mainImage.classList.remove(...animations);
        
        setTimeout(() => {
            mainImage.src = thumbnails[index].src;
            mainImage.style.opacity = '1';
            
            // A random animation
            const animationClass = animations[currentAnimation];
            mainImage.classList.add(animationClass);
            
            // animation index for the next transition
            currentAnimation = (currentAnimation + 1) % animations.length;
        }, 300);

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentIndex = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(currentIndex, 'prev');
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex, 'next');
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    mainImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    mainImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    }

    // Initial animation
    mainImage.classList.add(animations[currentAnimation]);
    currentAnimation = (currentAnimation + 1) % animations.length;
});