const NEXT = document.querySelector('.next')
const PREV = document.querySelector('.prev')
const SLIDER = document.querySelector('.slider')
const LEFT_PART = document.querySelector('.left')
const CONTENT = document.querySelector('.content')
const PRICES = document.querySelector('.price')
let IMAGES
let PRICE_ITEMS

const items = [
    {index: 0, src: './assets/images/headphones.png', background: '#faedcd', title: 'Beats studio pro', price: '269$'},
    {index: 1, src: './assets/images/mouse.png', background: '#8ecae6', title: 'Logitech mouse', price: '129$'},
    {index: 2, src: './assets/images/airpods.png', background: '#f5cac3', title: 'Beats AirPods', price: '289$'},
    {index: 3, src: './assets/images/applewatch.png', background: '#fcf6bd', title: 'Apple Watch Gold', price: '1089$'},
] 


function fillSlider() {
    items.forEach(item => {
        const img = document.createElement('img')
        const title = document.createElement('h1')
        const price = document.createElement('h2')
    
        img.src = item.src
        img.classList.add('img', 'small')
        title.innerText = item.title
        price.classList.add('price__item', 'hidden')
        price.innerText = item.price

        SLIDER.appendChild(img)
        CONTENT.appendChild(title)
        PRICES.appendChild(price)
    })
    IMAGES = document.querySelectorAll('.img')
    PRICE_ITEMS = document.querySelectorAll('.price__item')

    IMAGES[0].classList.add('big')
    PRICE_ITEMS[0].classList.remove('hidden')
    PREV.classList.add('disabled')
}
fillSlider()

NEXT.addEventListener('click', () => {
    NEXT.disabled = true
    slideNextImage()
    setTimeout(() => NEXT.disabled = false, 500)
})


PREV.addEventListener('click', () => {
    PREV.disabled = true
    slidePrevImage()
    setTimeout(() => PREV.disabled = false, 500)
})

function slideNextImage() {
    if (PREV.classList.contains('disabled')) {
        PREV.classList.remove('disabled')
    }
    const itemWidth = SLIDER.offsetWidth / items.length
    const isFirstItemDisplayed = SLIDER.style.right.replace(/[px]/gi, '') >= (items.length - 1) * itemWidth
    if (isFirstItemDisplayed) {
        return
    }
    slideNextText()
    SLIDER.style.right = `${SLIDER.style.right = +SLIDER.style.right.replace(/[px]/gi, '') + itemWidth}px`
    LEFT_PART.style.background = items[getVisibleElementIndex()].background
    

    IMAGES[getVisibleElementIndex()].classList.add('big')
    handleImageSizes()
    
    changePrice()

    if (getVisibleElementIndex() >= items.length - 1) {
        NEXT.classList.add('disabled')
    }
}

function slidePrevImage() {
    if (NEXT.classList.contains('disabled')) {
        NEXT.classList.remove('disabled')
    }
    const itemWidth = SLIDER.offsetWidth / items.length
    const isLastItemDisplayed = SLIDER.style.right.replace(/[px]/gi, '') <= 0
    if (isLastItemDisplayed) {
        return
    }
    slidePrevText()
    SLIDER.style.right = `${SLIDER.style.right = +SLIDER.style.right.replace(/[px]/gi, '') - itemWidth}px`
    LEFT_PART.style.background = items[getVisibleElementIndex()].background
    
    IMAGES[getVisibleElementIndex()].classList.add('big')
    handleImageSizes()
    changePrice()

    if (getVisibleElementIndex() <= 0) {
        PREV.classList.add('disabled')
    }
}

function handleImageSizes() {
    for (let i = 0;i <= items.length - 1; i++) {
        if (i < getVisibleElementIndex()) {
            IMAGES[i].classList.remove('small', 'big')
        } else if (i === getVisibleElementIndex()) {
            IMAGES[i].classList.remove('small')
            IMAGES[i].classList.add('big')
        } else {
            IMAGES[i].classList.remove('big')
            IMAGES[i].classList.add('small')
        }
    }
}

function getVisibleElementIndex() {
    const sliderWidth = SLIDER.offsetWidth;
    const visibleElements = items.length;
    const currentPosition = Math.abs(parseInt(SLIDER.style.right.replace(/[^\d]/g, '')));
    const percentage = currentPosition / sliderWidth;
    const index = percentage * visibleElements
    return index;
}

function slideNextText() {
    const itemHeight = CONTENT.offsetHeight / items.length
    CONTENT.style.bottom = `${CONTENT.style.bottom = +CONTENT.style.bottom.replace(/[px]/gi, '') + itemHeight}px`
}

function slidePrevText() {
    const itemHeight = CONTENT.offsetHeight / items.length
    CONTENT.style.bottom = `${CONTENT.style.bottom = +CONTENT.style.bottom.replace(/[px]/gi, '') - itemHeight}px`
}

function changePrice() {
    PRICE_ITEMS.forEach(item => item.classList.add('hidden'))
    PRICE_ITEMS[getVisibleElementIndex()].classList.remove('hidden')
}

function preload() {
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none'
    }, 300)
}

preload()

