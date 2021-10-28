// selecting elements
console.log(document.documentElement);
console.log(document.head)
console.log(document.body)

const header = document.querySelector('.header');
const allSections = document.querySelectorAll(".section");
console.log(allSections)

document.getElementById("section--1");

const allBtns = document.getElementsByTagName('button'); // returns HTML live collection
console.log(allBtns);

console.log(document.getElementsByClassName("btn")); // returns HTML live collection


// creating and inserting elements--------------

// .insertAdjacentHTML

// element inserted by js
const msg = document.createElement('div');
msg.classList.add('cookie-message');
// msg.textContent = "We use cookies for improved functionality and analytics"
msg.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.prepend(msg) // adds as first child of container
header.append(msg) // adds as last child of container

// header.append(msg.cloneNode(true)); //adds in both prepend and append

header.before(msg) //adds before container as a sibling
header.after(msg)  // adds after container as a sibling

// remove elements
document.querySelector('.btn--close-cookie').addEventListener("click", function(){
    msg.remove();
})


//styles
msg.style.backgroundColor = "#37383d";
msg.style.width = "120%";

console.log(msg.style.backgroundColor)

console.log(getComputedStyle(msg).color)
console.log(getComputedStyle(msg).height)

msg.style.height = Number.parseFloat(getComputedStyle(msg).height,10) + 40 + 'px';

// changing values of css variables
document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');

//standard attributes
console.log(logo.src)
console.log(logo.alt)
console.log(logo.className)

// non-standard attributes
console.log(logo.designer) // custom property
console.log(logo.getAttribute('designer')) // retrieve custom attribute

// change value of any attribute
logo.alt = 'Beautiful Logo';
console.log(logo.alt)

logo.setAttribute('company', 'Bankist')

console.log(logo.src) // gives absolute value 
console.log(logo.getAttribute('src')) // gives relative value 

const link = document.querySelector('.nav__link--btn')
console.log(link.href)
console.log(link.getAttribute('href'))

console.log(logo.dataset.versionNumber)


//classes 
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');



//types of events
const h1 = document.querySelector('h1')
const alert = function (event) {
  alert('Warning!')
}

// mouseenter is similar to hover
h1.addEventListener('mouseenter', alert)

setTimeout(() => h1.removeEventListener('mouseenter', alert), 3000)


// Event Propagation - Capturing and Bubbling Phase----------------------------------------------------------------------------------------------
// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
console.log(randomColor())

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // console.log('link')
  this.style.backgroundColor = randomColor()
  console.log('Link', e.target, e.currentTarget) // target is where the event originated ie where the event first happened,  whereas currentTarget is where event handler is attached
  console.log(e.currentTarget === this) // so event.currentTarget is same as this keyword

  // Stop Event progagation
  // e.stopPropagation() // the event will  be stopped right here and will never reach parent elements
})

// parent of nav__link
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log('link')
  this.style.backgroundColor = randomColor()
  console.log('container', e.target, e.currentTarget)
})

document.querySelector('.nav').addEventListener('click', function (e) {
  // console.log('link')
  this.style.backgroundColor = randomColor()
  console.log('nav', e.target, e.currentTarget)
}) 


// by setting 3rd parameter to true event will go through capturing phase(up to down) instead of bubbling phase(down to up) hence parent will appear first
// document.querySelector('.nav').addEventListener('click', function (e) {
//   // console.log('link')
//   this.style.backgroundColor = randomColor()
//   console.log('nav', e.target, e.currentTarget)
// }, true) 


//------------------------------------------------------------------------ DOM Traversing -------------------------------------------------------------

const h1 = document.querySelector('h1');

// Going downwards : selecting child----------------------

console.log(h1.querySelectorAll('.highlight')) // selects all the elements with hihglight class that are child of h1 no matter how deep the elements are and if there are other h1 elements in the page which are not  the children of h1 will not get selected

// for direct children
console.log(h1.childNodes) // gives Nodelist containging all types of stuff like texts, comments
console.log(h1.children) // returns HTml live collection containing only elements

// console.log(h1)
h1.firstElementChild.style.color = "white" // selects only first element child 
h1.lastElementChild.style.color = "blue" // selects only last element child 


// Going upwards : selecting parent-----------------------
console.log(h1.parentNode) // selects direct parents
console.log(h1.parentElement)

   // Closest Method -  most of the time we  need a parent element which is not a direct parent ie we might need to find a parent element no matter how far it is from DOM tree

  h1.closest('.header').style.background = 'var(--gradient-secondary)'

  h1.closest('h1').style.background = 'var(--gradient-primary)' // if  we select the same type of element in the closest tag then it will return the exact same element

  // so query Selector can be said as opposite  of querySelector ie querySelector searches for child no matter how deep they're whereas closest searches for parent no matter how far they're from child


// Going sideways : selecting siblings----------------------
console.log(h1.previousElementSibling) // returns preceding sibling element
console.log(h1.nextElementSibling)  // returns succeding  sibling element

console.log(h1.previousSibling)
console.log(h1.nextSibling)

// selecting all siblings -> move to parent element and read children from there
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el !== h1){
    el.style.transform = 'scale(0.5)'
  }
})
