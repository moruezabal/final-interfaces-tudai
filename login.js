const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const inputEmailLogin = document.getElementById('imput-email-login');
const spanEmailLogin = document.getElementById('span-email-login');
const spanPassLogin = document.getElementById('span-pass-login');
const inputPassLogin = document.getElementById('pass-login');

const inputEmailSingin = document.getElementById('imput-email-singin');
const spanEmailSingin = document.getElementById('span-email-singin');
const spanPassSingin = document.getElementById('span-pass-singin');
const inputPassSingin = document.getElementById('pass-singin');

const btnIngresar = document.getElementById('boton-ingresar');
const btnRegistrar = document.getElementById('boton-registrar');

const barraLoading = document.querySelector('.loading');
const eyeIcons = document.querySelectorAll('.far');

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//TRANSICIONES
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// LOG IN
inputEmailLogin.addEventListener('focusout', e => {
	const input = e.currentTarget;
	if(!isValidEmail(input.value)){
		input.style.color = 'red';
		setSpan(spanEmailLogin, "Por favor, ingrese un email válido");
	}
})

inputPassLogin.addEventListener('focus', e => {
	spanPassLogin.innerHTML = "";
})

inputEmailLogin.addEventListener('focus', e => {
	e.currentTarget.style.color = 'black';
	spanEmailLogin.innerHTML = "";
	spanPassLogin.innerHTML = "";
})

eyeIcons.forEach(icon => {
	icon.addEventListener('click', e => {
		eyeIcons.forEach(icon =>{
			icon.classList.toggle("icono_ocultar");
		});
		inputPassLogin.setAttribute('type', inputPassLogin.type === 'password' ? 'text': 'password');
	});
});

btnIngresar.addEventListener('click', e => {
	e.preventDefault();

	if(!inputEmailLogin.value){
		return setSpan(spanEmailLogin, "Por favor, ingrese un email válido");
	}

	if(!inputPassLogin.value){
		return setSpan(spanPassLogin, "Por favor, ingrese una contraseña");
	}

	if(Object.keys(registers).includes(inputEmailLogin.value)){
		if(validarUsuario(inputEmailLogin.value,inputPassLogin.value)){
			setTimeout( () => window.location.href = "home.html", 4000 );
			const progressBar = barraLoading.firstElementChild
			progressBar.classList.add('progress');
			progressBar.firstElementChild.classList.add('color');
		}
		else{
			return setSpan(spanPassLogin, "La contraseña no es válida");
		}
	}
	else{
		const errorMessage = isValidEmail(inputEmailLogin.value) ? "No existe un usuario con el mail ingresado" : "Por favor, ingrese un email válido";
		return setSpan(spanEmailLogin,errorMessage);
	}
});

// SING IN --> Codigo repetido, se debería agrupar inputs por comportamiento
inputEmailSingin.addEventListener('focusout', e => {
	const input = e.currentTarget;
	if(!isValidEmail(input.value)){
		input.style.color = 'red';
		setSpan(spanEmailSingin, "Por favor, ingrese un email válido");
	}
});

inputEmailSingin.addEventListener('focus', e => {
	e.currentTarget.style.color = 'black';
	spanEmailSingin.innerHTML = "";
	spanPassSingin.innerHTML = "";
});

inputPassSingin.addEventListener('focus', e => {
	spanPassSingin.innerHTML = "";
})

btnRegistrar.addEventListener('click', e => {
	e.preventDefault();

	if(!inputEmailSingin.value){
		return setSpan(spanEmailSingin, "Por favor, ingrese un email válido");
	}

	if(!inputPassSingin.value){
		return setSpan(spanPassSingin, "Por favor, ingrese una contraseña");
	}

	agregarUsuario(inputEmailSingin.value,inputPassSingin.value);
	console.log(registers);
});

const validarUsuario = (user, pass) => registers[user] === pass;

const setSpan = (span, message) => {
	span.style.color = 'red';
	span.innerHTML = message;
};

const registers = {
	'moruezabal@gmail.com': 'zane',
	'admin@gmail.com':'admin',
	'user3@gmail.com':'123456'
};

const agregarUsuario = (email, pass) => registers[email] = pass;


