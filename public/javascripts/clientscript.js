const redElement = document.getElementById('red');
const orangeElement = document.getElementById('orange');
const greenElement = document.getElementById('green');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let redOn = false;
let greenOn = false;
let orangeOn = false;
let pid;
function startSignal() {
	pid = setInterval(() => {
		if (!redOn && !greenOn && !orangeOn) {
			redOn = true;
			greenOn = false;
			orangeOn = false;
		} else if (redOn) {
			redOn = false;
			greenOn = false;
			orangeOn = true;
		} else if (orangeOn) {
			redOn = false;
			greenOn = true;
			orangeOn = false;
		} else if (greenOn) {
			redOn = true;
			greenOn = false;
			orangeOn = false;
		}
		markSignal(redOn, orangeOn, greenOn);
	}, 1000);
	startButton.classList.add('disabled');
}

startButton.addEventListener('click', () => {
	startSignal();
	startButton.classList.add('disabled');
	stopButton.classList.remove('disabled');
});

stopButton.addEventListener('click', () => {
	clearInterval(pid);
	startButton.classList.remove('disabled');
	stopButton.classList.add('disabled');
});

function markSignal(red, orange, green) {
	if (red) {
		redElement.style.backgroundColor = 'red';
		orangeElement.style.backgroundColor = 'white';
		greenElement.style.backgroundColor = 'white';
	} else if (orangeOn) {
		redElement.style.backgroundColor = 'white';
		orangeElement.style.backgroundColor = 'orange';
		greenElement.style.backgroundColor = 'white';
	} else if (greenOn) {
		redElement.style.backgroundColor = 'white';
		orangeElement.style.backgroundColor = 'white';
		greenElement.style.backgroundColor = 'green';
	}
}

