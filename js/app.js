document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tabcontent')
    const tabItems = document.querySelectorAll('.tabheader__item')


    function hide(collection) {
        collection.forEach(item => {
            item.classList.add('hide', 'tabAnime')
            item.classList.remove('show')
        })
    }

    function show (num = 0, elem) {
        hide(elem)
        elem[num].classList.add('show')
    }

    show(0,tabs)

    tabItems.forEach(tabItem => {
        tabItem.addEventListener('click', (e) => {
            tabItems.forEach(item => {
                item.classList.remove('tabheader__item_active')
            })
        e.target.classList.add('tabheader__item_active')
        show(Array.from(tabItems).indexOf(e.target), tabs)
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
        nextSlide = document.querySelector('.offer__slider-next'),
        currentSlide = document.querySelector('#current'),
        totalSlides = document.querySelector('#total')
      
    function showSlide (num = 0, collection) {
        show(num,collection)
    }

    showSlide(0,allSlides)


        



//Menu Items + ConverterAPI
    class menuItem {
        constructor(src,alt,title,descr,price,fromCurr,toCurr,parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.fromCurr = fromCurr
            this.toCurr = toCurr
            this.parentSelector = parentSelector
            this.url = `https://v6.exchangerate-api.com/v6/4e2b4d783c66b845da4bd609/latest/${this.fromCurr}`
        }

        async converter () {
            let response = await fetch(this.url)
            let json = await response.json()
            console.log(json)
            let byn = json.conversion_rates[this.toCurr]
            let convertedPrice = this.price * byn
            console.log(convertedPrice)
            this.price = convertedPrice.toFixed(2)
            // console.log(this)
            return new Promise(resolve => resolve(this))
        }

        createItem() {
            let div = document.createElement('div')
                div.innerHTML = `
                <div class="menu__item">
                <img src=${this.src} alt=${this.post}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ${this.toCurr}/день</div>
                </div>
            </div>
                `
                document.querySelector('.menu__field .container').append(div)
        }
    }

    new menuItem('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 5,'USD', 'BYN', '.menu__field .container').converter().then(result => result.createItem())
    new menuItem('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 4,'USD', 'BYN', '.menu__field .container').converter().then(result => result.createItem())
    new menuItem('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 2,'USD', 'BYN', '.menu__field .container').converter().then(result => result.createItem())
    

    
 
})