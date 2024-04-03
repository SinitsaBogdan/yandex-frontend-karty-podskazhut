const lightThemeBtn = document.querySelector(
	'.header__theme_button_type_light'
);
const darkThemeBtn = document.querySelector('.header__theme_button_type_dark');

window.onload = () => {
	const themeInLocal = localStorage.getItem('theme');
	if (themeInLocal) {
		setDarkTheme();
	} else {
		setLightTheme();
	}
};

lightThemeBtn.onclick = () => {
	setLightTheme();
	localStorage.removeItem('theme');
};

darkThemeBtn.onclick = () => {
	setDarkTheme();
	localStorage.setItem('theme', 'dark');
};

function setDarkTheme() {
	document.querySelector('.page').classList.add('theme_dark');
	lightThemeBtn.classList.remove('header__theme_button_is_active');
	darkThemeBtn.classList.add('header__theme_button_is_active');
	darkThemeBtn.disabled = true;
	lightThemeBtn.disabled = false;
}

function setLightTheme() {
	document.querySelector('.page').className = 'page';
	darkThemeBtn.classList.remove('header__theme_button_is_active');
	lightThemeBtn.classList.add('header__theme_button_is_active');
	darkThemeBtn.disabled = false;
	lightThemeBtn.disabled = true;
}
