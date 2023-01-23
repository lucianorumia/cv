const menuBtn = document.getElementById('menu-btn');
const curtain = document.querySelector('.curtain');
const navigator = document.querySelector('.navigator');

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

function opening() {
    const openingBlck = document.querySelector('.opening')
    openingBlck.classList.add('opening--hide');
    
    setTimeout(() => {
        openingBlck.parentNode.removeChild(openingBlck);
    }, 1510);
}

function toggleMenu() {
    curtain.classList.toggle('sprclss--display-none');
    navigator.classList.toggle('navigator--showed');
}

document.addEventListener('DOMContentLoaded', ()=> {
    setNavigator();
    menuBtn.addEventListener('click', toggleMenu);
    curtain.addEventListener('click', toggleMenu);
    
});

onload = () => {
    opening();
}