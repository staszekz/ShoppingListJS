import '../scss/index.scss';

const nav = document.querySelector('nav');

const addNavShadow = () => {
	if (window.scrollY > 50) {
		nav.classList.add('nav__shadow');
	} else {
		nav.classList.remove('nav__shadow');
	}
};

window.addEventListener('scroll', addNavShadow);
