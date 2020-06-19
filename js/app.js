//	Global Declrations
const dySections = Array.from(document.querySelectorAll('.dynamic-sec'));
const dySecName = Array.from(document.querySelectorAll('.dynamic-sec h3'));
const dyList = document.querySelector('.side-bar-menu');
let fragment = document.createDocumentFragment();
const winHeight = window.innerHeight;

//	Creating the dynamic navigation menu
const dyNav = dySections.forEach((elem, index) => {
	
	const navItem = document.createElement('li');
	const navItemLink = document.createElement('a');
	const secName = `${dySecName[index].textContent}`;
	const linkURL = `section${index + 1}`;
	
    navItemLink.textContent = secName;
    dySections[index].setAttribute('id', linkURL);
	navItemLink.setAttribute('href', `#${linkURL}`);
	
	navItem.appendChild(navItemLink);
	fragment.appendChild(navItem);
	
	//	Highlighting sections on view
	window.addEventListener('scroll', () => {
		if (isInViewport(elem)){
			elem.classList.add('section-on-view');
			navItemLink.classList.add('sec-link-click');
		} else {
			elem.classList.remove('section-on-view');
			navItemLink.classList.remove('sec-link-click');
		}
	});
	
	//	Scrolling to selected section
	navItemLink.addEventListener('click', (evt) => {
	evt.preventDefault();
	elem.scrollIntoView({behavior: 'smooth'});
	});
	
});

document.addEventListener('DOMContentLoaded', dyNav);

//	Add the dynamic navigation menu to the DOM
dyList.appendChild(fragment);

//	Determine if an element is in Viewport
const isInViewport = (elem) => {
    const bounds = elem.getBoundingClientRect();
    const top = bounds.top;
    const bottom = bounds.bottom;
	if (bounds.height <= winHeight){
        return (top >= 0 && bottom <= winHeight);
    } else {
        return ((top <= winHeight*0.5 && top >= 0) || (bottom >= winHeight*0.5 && bottom <= 20*winHeight && top <= winHeight*0.5));
    }
};

//	Hiding the navigation bar while not scrolling
const navBar = document.querySelector('aside');
const onThisPage = document.querySelector('aside h2');
let waitTime = null;
window.addEventListener('scroll', () => {
	if (waitTime !== null){
        clearTimeout(waitTime);
        if (navBar.getBoundingClientRect().top <= -20){
            navBar.classList.remove('side-bar');
            navBar.style.position = 'fixed';
            navBar.classList.add('dynamic-bar');
            onThisPage.style.display = 'none';
        }
	}
	waitTime = setTimeout(() => {
        navBar.classList.remove('dynamic-bar');
        navBar.classList.add('side-bar');
        navBar.style.position = 'static';
        onThisPage.style.display = 'block';
	}, 700);
});

//	Adding a GoUp button
document.addEventListener('DOMContentLoaded', () => {
	const pageFooter = document.querySelector('.page-footer');
	const upButton = document.createElement('button');
	const buttonLink = document.createElement('a');
	const textHolder = document.createElement('span');
	textHolder.textContent = 'Top';
	
	//	Styling the button
	upButton.classList.add('go-to-top');

	//	Adding the GoUp button to the DOM
	buttonLink.appendChild(textHolder);
	upButton.appendChild(buttonLink);
	pageFooter.appendChild(upButton);
	
	//	Going to the top of the page
	upButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
	//	Hiding the button if it's in the fold of the page
	window.onscroll = () => {
		if (document.documentElement.scrollTop > winHeight*0.3 || document.body.scrollTop > winHeight*0.3) {
    		upButton.style.position = 'fixed';
  		} else {
    		upButton.style.position = 'static';
  		}
	};
});