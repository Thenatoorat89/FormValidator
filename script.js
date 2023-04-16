const username = document.querySelector('#username')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup')

const inputs = [username, password, password2, email]


const checkForm = input => {
    input.forEach(el =>{
        if(el.value === ''){
            showError(el, el.placeholder)
        }else {
            clearError(el)
        }
    })
}

const showError = (input, msg) => {
    const formBox = input.parentElement
    const errorMsg = formBox.querySelector('.error-text')

    formBox.classList.add('error')
    errorMsg.textContent = msg
}

const clearError = input => {
    const formBox = input.parentElement
    formBox.classList.remove('error')
}

const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} musi składać się z min. ${min} znaków!`)
    }
}

const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value || pass2.value === '' ) {
        showError(pass2, 'Hasła do siebie nie pasują!')
    }
}

const checkEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        clearError(email)
    }else{
        showError(email, 'Adres e-mail jest nieprawidłowy!')
    }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box')
    let counterError = 0

    allInputs.forEach(el=>{
        if(el.classList.contains('error')){
            counterError++;
        }else if(counterError === 0){
            popup.classList.add('show-popup')
        }
    })
}

clearBtn.addEventListener('click', e => {
    e.preventDefault()
    inputs.forEach(el =>{
        el.value = ''
        clearError(el)
    })
    
})

sendBtn.addEventListener('click', e => {
    e.preventDefault()
    checkForm(inputs)
    checkLength(username, 3)
    checkLength(password, 8)
    checkPassword(password, password2)
    checkEmail(email)
    checkErrors()
})