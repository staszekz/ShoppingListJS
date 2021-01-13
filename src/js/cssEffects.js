import '../scss/index.scss';

const nav = document.querySelector('nav');

const addNavShadow = () => {
	if (window.scrollY > 50) {
		nav.classList.add('nav__shadow');
	} else {
		nav.classList.remove('nav__shadow');
	}
};

// window.onscroll = addNavShadow();

// const addNavbarBgrColor = () => {
// 	if (window.scrollY > 100) {
// 		navBar.classList.add('nav__bgr');
// 	}
// 	if (window.scrollY < 100) {
// 		navBar.classList.remove('nav__bgr');
// 	}
// };

window.addEventListener('scroll', addNavShadow);
