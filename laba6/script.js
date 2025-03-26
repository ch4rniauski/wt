const image = document.querySelector(".car-showroom")
const btnPrev = document.querySelector(".btn-prev")
const btnNext = document.querySelector(".btn-next")

var index = 0;

const  btnPrevClickHandler = () => {
    if (index == 0)
        index = 2
    else
        index--

    image.src = "Images/CarShowroom" + index + ".jpg"
    
    alert("Вы изменили изображение")
}

const  btnNextClickHandler = () => {
    if (index == 2)
        index = 0
    else
        index++

    image.src = "Images/CarShowroom" + index + ".jpg"

    alert("Вы изменили изображение")
}

btnPrev.addEventListener("click", () => btnPrevClickHandler())
btnNext.addEventListener("click", () => btnNextClickHandler())
