'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

// --------------------------------- Modal Window -----------------------------------------------------------------------------------

const openModal = function () {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// ---------------------------------------------------------------------------------------------------------------------------------------

// Smooth Scrolling-------------------------------------------------------------------------------------------------------------------------------

btnScroll.addEventListener('click', function (event) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(event.target.getBoundingClientRect());
  console.log(`Current scroll (X/Y) `, window.pageXOffset, pageYOffset);
  console.log(
    'height/width viewport ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling-----
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset) // current position + current Scroll

  // smooth Scrolling----
  // window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  // })

  section1.scrollIntoView({
    behavior: 'smooth',
    block: 'start', // vertical alignment
    inline: 'start', //horizontal alignment
  });
});
// -----------------------------------------------------------------------------------------------------------------------------------------------

// Page Navigation by ScrollIntoView -------------------------------------------------------------------------------------------------------------

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // console.log('link')

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// Event Delegation -> Technique where we add a single event handler to a parent element in order to avoid adding mutliple event listeners to multiple child elements

// 1.add event Listener to common parent
// 2.determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
});
// ------------------------------------------------------------------------------------------------------------------------------------

// Tabbed Component----------------------------------------------------------------------------------------------------------------------------------

// tabs.forEach(function(t){
//   t.addEventListener('click', function(){
//     console.log('click')
//   })
// })

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  // for just e.target..if we clicked on some number in the button..it targets span .. so to avoid this we used closest
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause -> if statement which returns early if some condition is matched. Here ! will catch null,undefined or false values
  if (!clicked) {
    return;
  }
  //  same as -->
  // if(clicked){
  //   clicked.classList.add('operations__tab--active')
  // }

  // before adding active class first remove active class from where it was present
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  // activate content area------
  // console.log(clicked.dataset.tab)

  // first remove active class from the element then add it
  const t = tabsContent.forEach(function (tc) {
    tc.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//-------------------------------------------------------------------------------------------------------------------------------------------------

// Menu fade animation-------------------------------------------------------------------------------------------------------------

const handleHover = function (e, opacityHalf, opacityFull) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link)
    // selecting siblings..we moved towards the parent element and from there we traversed to the siblins of nav__link
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings)
    const logo = link.closest('.nav').querySelector('img'); // we moved towards parent element and from there we moved down to the element img

    siblings.forEach(function (el) {
      // if the current element which is hovered is same as the target element then only its opacity should be 1 otherwise 0.5
      if (el === link) {
        el.style.opacity = opacityFull;
      } else {
        el.style.opacity = opacityHalf;
      }
    });
    logo.style.opacity = opacityHalf;
  }
};

// Passing arguments to event Handlers
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5, 1);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1, 1);
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------

// Sticky Navigation----------------------------------------------------------------------------------------------------

// by scroll event------- bad approach
// const initialCoords = section1.getBoundingClientRect(  )
// // console.log(initialCoords)

// window.addEventListener('scroll', function( ){
//   console.log(`windowScrollY - ${window.scrollY}`) // to get current scroll position
//   console.log(`initialCoordsTop - ${initialCoords.top}`)

//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky')
//   }
//   else{
//     nav.classList.remove('sticky')
//   }
//   // AS SOON AS WE REACH FIRST SECTION, NAVIGATION SHOULD BECOME STICKY

// })

// INTERSECTION OBSERVER API -> ALLOWS OUR CODE TO OBSERVE CHANGES TO THE WAY THAT A CERTAIN TARGET ELEMENT INTERSECTS ANOTHER ELEMENT OR THE WAY IT INTERSECTS VIEWPORT

// SYNTAX -> new IntersectionObserver(callback_func, options_object)

// const obsOptions = {
//   root: null, // (VIEWPORT)
//   threshold: [0, 0.2]//
// };

// // 0 MEANS CALLBACK WILL TRIGGER EACH TIME THE TARGET ELEMENT MOVES COMPLETELY OUT OF THE VIEW

// // THRESHOLD IS THE PERCENTAGE THAT WE WANT TO HAVE VISIBLE IN OUR ROOT

// // CALLBACK FUN WILL BE CALLED EACH TIME OBSERVED ELEMENT IE OUR  TARGET ELEMENT IS INTERSECTING ROOT ELEMENT AT THRESHOLD  VALUE
// const obsCallback = function(entries, observer) {
//   entries.forEach(function(entry){
//     console.log(entry)
//   })
// };

// // SO WHENEVER OUR  TARGET ELEMENT ie SECTION1 IS INTERSECTING  VIEWPORT AT 10% THEN THAT FUNCTION WILL BE CALLED NO MATTER WE SCROLL  DOWN OR UP

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// WE WANT THE NAVIGATION TO BECOME STICKY WHEN THE HEADER MOVES COMPLETELY OUT OF THE VIEW

const navHeight = nav.getBoundingClientRect().height;

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // nav will appear exactly 90px before the threshold
};

// we want to add the sticky  class when header is notIntersecting:false,
const stickyNav = entries => {
  // console.log(entries)
  const entry = entries[0];
  // console.log(e ntry)

  // if header's entry.isIntersecting is false
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

// console.log(navHeight)

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(header);
//--------------------------------------------------------------------------------

// Reveal elements on scroll---------------------------

const allSections = document.querySelectorAll('.section');

const revealSections = (entries, observer) => {
  // const entry = entries[0] same as
  const [entry] = entries;
  // console.log(entry)

  // if isIntersecting is false then return otherwise remove section--hidden
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '200px', // to load images a lil-bit early
};

const sectionsObserver = new IntersectionObserver(
  revealSections,
  sectionOptions
);
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionsObserver.observe(section);
});

// LAZY LOADING IMAGES---------------------------------

// IDEA IS TO REPLACE LOW-RESOLUTION IMAGES WITH HIGH RESOLUTION IMAGES IN data-src ATTRIBUTE AND REMOVE 'lazy-img' class from the images

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    return;
  }

  // REPLACE SRC WITH DATA-SRC
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  /* IF WE WOULD'VE NORMALLY REMOVED lazy-img CLASS THEN THE FIRST THE BLUR EFFECT WOULD'VE BEEN REMOVED THEN THE IMAGES WOULD'VE LOADED...
   SO INORDER TO AVOID THIS.. WE ADDED AN EVENT LISTENER WITH LOAD EVENT AND REMOVED THE CLASS AFTER IMAGES ARE LOADED COMPLETELY */

  observer.unobserve(entry.target);
};

const loadImgOptions = {
  root: null,
  threshold: 0,
};

const imgObserver = new IntersectionObserver(loadImg, loadImgOptions);

imgTargets.forEach(img => {
  imgObserver.observe(img);
});
//------------------------------------------------------------------------------------

// SLIDER COMPONENT--------------------------------------------------------------------------------

/* LOGIC -> INITIALLY THE SLIDES ARE AT TRANSLATEX(0),TRANSLATEX(100%) AND TRANSLATEX(200%).
WHEN  CLICKED ON RIGHT BTN -> THE TRANSFORM PROP SHOULD CHANGE FROM 0,100,200 TO -100,0,100(WHICH WILL SHOW MIDDLE COMPONENT) AND FOR LAST COMPONENT IT SHOULD
BE -200,-100,0 */

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currSlide = 0;

let lastSlide = slides.length - 1;
// console.log(lastSlide)

/*
 ONLY FOR TESTING PURPOSE
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.2) translateX(-1300px)';
slider.style.overflow = 'visible';   */

const goToSlide = currSlide => {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - currSlide)}% )`;
  });
};

// Initial condition
goToSlide(0); // 0% - 100% - 200% - 300%

const nextSlide = () => {
  if (currSlide === lastSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }

  goToSlide(currSlide);
  activateDot(currSlide)

  /* currSlide = 1
  Iter1-  100*(0-1) = -100%
  Iter2 - 100*(1-1) = 0%;
  Iter3 - 100(2-1) = 100%
  Iter4 - 100(3-1) = 200% */

  // then btn clicked once again...so now currSlide = 2

  /*
  Iter1-  100*(0-2) = -200%
  Iter2 - 100*(1-2) = -100%;
  Iter3 - 100(2-2) = 0%
  Iter4 - 100(3-2) = 100% */
};

// IF THE CURRENT SLIDE IS THE FIRST SLIDE THEN MOVE TO LAST SLIDE

const prevSlide = () => {
  if (currSlide === 0) {
    currSlide = lastSlide;
  } else {
    currSlide--;
  }
  goToSlide(currSlide)
  activateDot(currSlide)
}

const keyPress = (e) => {
  if(e.key === 'ArrowRight'){
    nextSlide()
  }
  else if(e.key === 'ArrowLeft'){
    prevSlide()
  }
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', keyPress);

// ADDING DOTS-----

const dotContainer = document.querySelector('.dots')
const createDots = () => {
  slides.forEach((s,index) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
  })
}

createDots();

dotContainer.addEventListener('click',function(e){
  // console.log(e.target)

  if(e.target.classList.contains('dots__dot')){
    // console.log('dot')
    const slide = e.target.dataset.slide;
    // console.log(slide);
    goToSlide(slide)
    activateDot(slide)
  }
})


const activateDot = (currSlide) => {
  document.querySelectorAll('.dots__dot').forEach((dot) => {dot.classList.remove('dots__dot--active')})

  document.querySelector(`.dots__dot[data-slide="${currSlide}"]`).classList.add('dots__dot--active')
} 
//-------------------------------------------------------------------------------

// LIFECYCLE DOM EVENTS
 // 1. DOM CONTENT LOADED -> FIRED AS SOON AS HTML IS COMPLETELY PARSED IE HTML HAS BEEN DOWNLOADED AND CONVERTED INTO DOM TREE

 document.addEventListener('DOMContentLoaded', function(e){
   console.log('html parsed and Dom tree built' ,e)
 })

// 2.LOAD EVENT -> FIRED AS SOON AS ALL THE HTML(INCLUDING  IMAGES AND OTHER STUFF) AND JS IS COMPLETELY LOADED

window.addEventListener('load', function(e){
  console.log('page fully loaded', e)
})

//3. BEFOREUNLOAD -> CREATED IMMEDIATELY BEFORE USER IS ABOUT TO LEAVE THE PAGE 

window.addEventListener('beforeunload', function(e){
  e.preventDefault()
  console.log(e)
  e.returnValue = ''
})