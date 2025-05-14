const image = document.querySelector(".car-showroom")

const btnPrev = document.querySelector(".btn-prev")
const btnNext = document.querySelector(".btn-next")

const form = document.querySelector(".feedback-form");

const submitButton = document.querySelector(".submit-button");
const resetButton = document.querySelector(".reset-button");

const nameInput = document.querySelector(".input-name");
const emailInput = document.querySelector(".input-email");
const messageInput = document.querySelector(".input-message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

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

if (btnPrev != null)
    btnPrev.addEventListener("click", () => btnPrevClickHandler())
if (btnNext != null)
    btnNext.addEventListener("click", () => btnNextClickHandler())

const validateName = () => {
    if (nameInput.value.length < 2) {
        nameError.textContent = "Имя должно быть не менее 2 символов.";
        nameError.style.display = "block";
        return false;
    }
    nameError.style.display = "none";
    return true;
}

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Введите корректный email.";
        emailError.style.display = "block";
        return false;
    }
    emailError.style.display = "none";
    return true;
}

const validateMessage = () => {
    if (messageInput.value.length < 10) {
        messageError.textContent = "Сообщение должно быть не менее 10 символов.";
        messageError.style.display = "block";
        return false;
    }
    messageError.style.display = "none";
    return true;
}

if (resetButton != null){
    resetButton.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите сбросить форму?")) {
            form.reset();
            nameError.style.display = "none";
            emailError.style.display = "none";
            messageError.style.display = "none";
        }
    });
}

if (submitButton != null){
    submitButton.addEventListener("click", () => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
    
        if (isNameValid && isEmailValid && isMessageValid) {
            alert("Форма успешно отправлена! Спасибо за обратную связь.");
            form.reset();
        }
    });
}

if (nameInput != null && emailInput != null && messageInput != null){
    nameInput.addEventListener("input", () => validateName())
    emailInput.addEventListener("input", () => validateEmail())
    messageInput.addEventListener("input", () => validateMessage())
}

$(document).ready(function () {
    $("#services-button").on("click", function () {
        $("#services-menu").fadeToggle(500);
    });
});

$(document).ready(function () {
    let movingRight = true;

    $("#logo-button").on("click", function () {
        if (movingRight) {
            $("#logo")
                .animate({ left: "400", width: "50px", height: "50px" }, 1000)
                .css("background-color", "lightblue")
                .attr("src", "");
            movingRight = false;
        } else {
            $("#logo")
                .animate({ left: "0px", width: "100px", height: "100px" }, 1000)
                .css("background-color", "transparent")
                .attr("src", "Images/Logo.jpg");
            movingRight = true;
        }
    });
});

$(document).ready(function () {
    $("#hamburger-menu").on("click", function () {
        $("#main-nav")
        .slideToggle(500)
        .css("display", "flex");
    });
});
