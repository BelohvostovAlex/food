document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tabcontent')
    const tabItems = document.querySelectorAll('.tabheader__item')


    function hide(collection) {
        collection.forEach(item => {
            item.classList.add('hide', 'tabAnime')
        })
    }
    hide(tabs)

    function show (num = 0) {
        hide(tabs)
        tabs.forEach(item => {
            item.classList.remove('show')
        })
        tabs[num].classList.add('show')
    }

    show()

    tabItems.forEach(tabItem => {
        tabItem.addEventListener('click', (e) => {
            tabItems.forEach(item => {
                item.classList.remove('tabheader__item_active')
            })
        e.target.classList.add('tabheader__item_active')
        show(Array.from(tabItems).indexOf(e.target))
        })
    })

    //timer
    const days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds')


    const deadline = '2021-10-16T14:30:00'

    function timerTillDate(endTime) {
        let t = new Date(endTime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60)
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function addZero(elem) {
        if(elem >= 0 && elem < 10) {
            return '0' + elem
        } else {
            return elem
        }
    }

    function setTimer(endTime) {
        const end = timerTillDate(endTime)
            
        days.innerHTML = addZero(end.days)
        hours.innerHTML = addZero(end.hours)
        minutes.innerHTML = addZero(end.minutes)
        seconds.innerHTML = addZero(end.seconds)
    }
    setTimer(deadline)
    setInterval(() => setTimer(deadline), 1000)
    
    //modal
    const modalBtns = document.querySelectorAll('[data-modal]'),
        closeModalBtn = document.querySelector('.modal__close'),
        modalWindow = document.querySelector('.modal')
    
    function showModal () {
        modalWindow.classList.remove('hide')
        modalWindow.classList.add('show', 'tabAnime')
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'
    }

    function closeModal () {
        modalWindow.classList.remove('show')
        modalWindow.classList.add('hide')
        document.body.style.overflow = ''
        document.body.style.paddingRight = '0px'
    }

    closeModalBtn.addEventListener('click', closeModal)
    modalWindow.addEventListener('click', close)

    window.addEventListener('keydown', (e) => {
        if(e.code === 'Escape') {
            closeModal()
        }
    })

    modalBtns.forEach(modalBtn => {
        modalBtn.addEventListener('click', showModal)
    })
    
    function showModalAtTheEnd() {
        if(document.documentElement.scrollHeight == (document.documentElement.scrollTop + document.documentElement.clientHeight)) {
            showModal()
            window.removeEventListener('scroll', showModalAtTheEnd)
        }
        
    }

    window.addEventListener('scroll', showModalAtTheEnd)

    //slider
    const allSlides = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next')

    function showSlides(i=1) {
        let totalSlides = document.querySelector('#total'),
            currentSlide = document.querySelector('#current')
        allSlides.forEach(slide => {
            slide.classList.add('hide')
            slide.classList.remove('show')
        })
        allSlides[i].classList.add('show')
        if(allSlides.length < 10 ) {
            totalSlides.innerHTML = '0' + allSlides.length
        } else {
            totalSlides.innerHTML = allSlides.length
        } if(i + 1 < 10) {
            currentSlide.innerHTML = '0' + (i + 1)
        } else {
            currentSlide.innerHTML = i + 1
        }
            
    }
    showSlides()
    nextSlide.addEventListener('click', () => {
        showSlides(i+1)
    })


})