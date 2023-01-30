const menuBtn = document.getElementById('menu-btn');
const curtain = document.querySelector('.curtain');
const navigator = document.querySelector('.navigator');
const contactForm = document.querySelector('.contact-form');
const contactFormSubmitBtn = document.getElementById('contact-form-submit');
const contactFormResetBtn = document.getElementById('contact-form-reset');
const noBuiltLinks = document.querySelectorAll('.spr--no-built');

const nombreInputId = 'nombre-input';
const nombreVldtInput = document.getElementById(nombreInputId);
const nombreVldtCaption = document.querySelector(`#${nombreInputId} ~ .vldt__caption`)

const emailInputId = 'email-input';
const emailVldtInput = document.getElementById(emailInputId);
const emailVldtCaption = document.querySelector(`#${emailInputId} ~ .vldt__caption`)

const messageInputId = 'message-input';
const messageVldtInput = document.getElementById(messageInputId);
const messageVldtCaption = document.querySelector(`#${messageInputId} ~ .vldt__caption`)


function opening() {
    const openingBlck = document.querySelector('.opening')
    openingBlck.classList.add('opening--hide');
    
    setTimeout(() => {
        openingBlck.parentNode.removeChild(openingBlck);
    }, 1510);
}

function setNavigator() {
    const sections = document.querySelectorAll('.main-content__section');
    const parentBlock = document.getElementById('navigator-list');
    
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionHeader = section.querySelector('.section__header').textContent;
        const newElement = document.createElement('li');
        const innerHtmlStr = `<a class="navigator__link" href="#${sectionId}">${sectionHeader}</a>`;

        newElement.innerHTML = innerHtmlStr;
        parentBlock.appendChild(newElement);
    });

    const navigatorLinks = document.querySelectorAll('.navigator__link');

    navigatorLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

function toggleMenu() {
    curtain.classList.toggle('sprclss--display-none');
    navigator.classList.toggle('navigator--showed');
}

function setVldtField(input, captionWrapper, captionText, state) {
    captionWrapper.textContent = captionText;
    if (state) {
        input.classList.remove('vldt__input--invalid');
        captionWrapper.classList.remove('vldt__caption--invalid')
    } else {
        input.classList.add('vldt__input--invalid');
        captionWrapper.classList.add('vldt__caption--invalid')
    }
}

function validateNombre() {
    let captionText;
    let state;

    if (nombreVldtInput.value === '') {
        captionText = 'Ingresá tu nombre.';
        state = false;
    } else {
        captionText = '';
        state = true;
    }
    setVldtField(nombreVldtInput, nombreVldtCaption, captionText, state);
    
    return state;
}

function validateEmail() {
    let captionText;
    let state;
    const mailRegexp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (mailRegexp.test(emailVldtInput.value)) {
        captionText = '';
        state = true;
    } else {
        captionText = 'Ingresá un email válido.'
        state = false;
    }
    setVldtField(emailVldtInput, emailVldtCaption, captionText, state);

    return state;
}

function validateMessage() {
    let captionText;
    let state;

    if (messageVldtInput.value === '') {
        captionText = 'Escribí tu mensaje.';
        state = false;
    } else {
        captionText = '';
        state = true;
    }
    setVldtField(messageVldtInput, messageVldtCaption, captionText, state);

    return state;
}

function validateForm() {
    let nombreVldtState = validateNombre();
    let emailVldtState = validateEmail();
    let messageVldtState = validateMessage();
    let res =  nombreVldtState && emailVldtState && messageVldtState;

    return res;
}

function resetValidations() {
    let fields2vldt = [
        {
            input: nombreVldtInput,
            caption: nombreVldtCaption,
        },
        {
            input: emailVldtInput,
            caption: emailVldtCaption,
        },
        {
            input: messageVldtInput,
            caption: messageVldtCaption,
        },
    ]
    
    fields2vldt.forEach(object => {
        setVldtField(object.input, object.caption, '', true);
    });

    nombreVldtInput.removeEventListener('input', validateNombre);
    emailVldtInput.removeEventListener('input', validateEmail);
    messageVldtInput.removeEventListener('input', validateMessage);
}

function setNoBuiltLinks() {
    noBuiltLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Enlace no diponible.');
        });
    });
}

document.addEventListener('DOMContentLoaded', ()=> {
    setNavigator();
    menuBtn.addEventListener('click', toggleMenu);
    curtain.addEventListener('click', toggleMenu);

    contactFormResetBtn.addEventListener('click', () => {
        resetValidations();
    });

    contactFormSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateForm()) {
            contactForm.submit();
            alert('Mensaje enviado con éxito.');
        } else {
            nombreVldtInput.addEventListener('input', validateNombre);
            emailVldtInput.addEventListener('input', validateEmail);
            messageVldtInput.addEventListener('input', validateMessage);
        }
    });

    setNoBuiltLinks();
});

onload = () => {
    opening();
}
