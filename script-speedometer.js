
const numberInput = document.getElementById('num-input');


document.getElementById('up').addEventListener('click', function () {
	setWorkNumber(Number(numberInput.value) + 10);
});
document.getElementById('down').addEventListener('click', function () {
	setWorkNumber(Number(numberInput.value) - 10);
});
// numberInput.addEventListener('input', function () {
// 	if (isNaN(parseInt(numberInput.value))) {
// 		numberInput.value = 0;
// 	}
// });

function setWorkNumber(value) {
	const min = Number(numberInput.getAttribute('min'));
	const max = Number(numberInput.getAttribute('max'));

	if (value < min) {
		numberInput.value = min;
	} else if (value > max) {
		numberInput.value = max;
	} else {
		numberInput.value = value;
	}
}

function getWorkNamber() {
	let workNumber = parseInt(document.getElementById('num-input').value);// Переименовать в workNumber
	console.log(workNumber)

	if (isNaN(workNumber)) {
		return 0;
	}

	return workNumber
}

numberInput.addEventListener('blur', () => {
	let workNumber = parseInt(numberInput.value);
	let isIncorrect = false;
	if (isNaN(workNumber)) {
		isIncorrect = true;
	} else if (workNumber < 0 || workNumber > 500) {
		isIncorrect = true;
	}
	if (isIncorrect) {
		numberInput.value = '0';
	}
});


// class IputValidation {
// 	selectors = {
// 		form: '[data-is-input]',
// 		fieldErrors: '[data-is-input-errors]',
// 	}

// 	errorMessages = {
// 		valueMissing: () => 'введите значение',
// 		patternMismatch: ({ title }) => title || 'несоответствие формата, введите числовое значение не меньше минума шкалы и не превышающее максимума шкалы',
// 		tooShort: (minLength) => `короткое значение -MIN - ${minLength}`,
// 		tooLong: (maxLength) => `большое значение -MAX - ${maxLength}`,
// 	}
// 	constructor() {
// 		this.bindEvents()
// 	}

// 	validateField(fieldControlElement) {
// 		const errors = fieldControlElement.validity
// 		console.log(errors + 'hgf')
// 		const errorMessages = []

// 		Object.entries(this.errorMessages).forEach((errorType, getErrorMessage) => {
// 			if (errors[errorType]) {
// 				errorMessages.push(getErrorMessagerrorMessage(fieldControlElement))
// 			}
// 		})

// 		console.log(errorMessages + ' = errorMessages')
// 	}

// 	onBlur(event) {
// 		try {
// 			console.log(event)
// 			const { target } = event;
// 			console.log(target);
// 			const isInput = target.closest(this.selectors.form);
// 			const isRequired = target.required

// 			if (isInput && isRequired) {
// 				this.validateField(target)
// 			}
// 		} catch (error) {
// 			console.log('onblur error: ', error);
// 		}
// 	}

// 	bindEvents() {
// 		document.addEventListener('blur', (event) => {
// 			this.onBlur(event)
// 		}, { capture: true })
// 	}
// }

// new IputValidation()




window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 800;

	class Disk {
		constructor(sizeAll, diapason, diapasonAngle, minStep, unionStep) {


			this.sizeAll = sizeAll;
			this.diapason = diapason;
			this.diapasonAngle = diapasonAngle;
			this.minStep = minStep;
			this.unionStep = unionStep;
			this.kInner = 0.7;
			this.centerX = canvas.width / 2 - this.sizeAll / 2;
			this.centerY = canvas.height / 2 - this.sizeAll / 2;
			this.minAngleStep = (diapason / diapasonAngle)
			this.minAngleStep = this.diapasonAngle / (this.diapason / this.minStep);
			const segmentPoints = []
		}

		draw(context) {
			// let workNumber = getWorkNamber()


			this.diapason = this.diapason;
			this.diapasonAngle = this.diapasonAngle;
			this.minStep = this.minStep;
			this.unionStep = this.unionStep;

			ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.rotate((-this.diapasonAngle / 2 - 90) * (Math.PI * 2 / 360));
			//mark coordinates
			// ctx.fillStyle ='blue'
			// context.fillRect(0, 0, 30, 800);
			// ctx.fillStyle =' rgb(63, 65, 63)';
			// context.fillRect(0, 0, 800, 30);


			ctx.beginPath()
			const bgColor = window.getComputedStyle(document.body).getPropertyValue('--bgColor');
			ctx.fillStyle = bgColor;
			ctx.moveTo(0, 0);
			const circleOn = ctx.arc(0, 0, 400, (getWorkNamber() * (this.diapasonAngle / this.diapason)) * (Math.PI * 2 / 360), (Math.PI * 2));
			ctx.closePath()
			ctx.fill()

			ctx.restore();
			const gradientDisk = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 38, canvas.width / 2, canvas.height / 2, 400);


			gradientDisk.addColorStop(.2, "red");
			gradientDisk.addColorStop(.6, bgColor);
			gradientDisk.addColorStop(.7, "orange");



			ctx.fillStyle = gradientDisk;
			ctx.beginPath()
			const circleIn = ctx.arc(canvas.width / 2, canvas.height / 2, this.sizeAll * this.kInner, 0, Math.PI * 2);
			ctx.stroke();
			ctx.fill()


			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.rotate(-this.diapasonAngle / 2 * (Math.PI * 2 / 360));
			ctx.translate(-canvas.width / 2, -canvas.height / 2);


			// segmentPoints.push(new segmentPoint)

			const segmentPoint0 = new SegmentPoint(5, 60, 0, '0');
			segmentPoint0.draw(ctx, this.diapasonAngle / 2)


			let angle = this.diapasonAngle / 2 - this.minAngleStep / this.unionStep
			for (let i = this.minStep / this.unionStep; i <= this.diapason; i += (this.minStep / this.unionStep)) {
				ctx.rotate(Math.PI * 2 / 360 * (this.minAngleStep / this.unionStep));
				ctx.translate(-canvas.width / 2, -canvas.height / 2);

				if ((i) % (this.minStep) === 0) {
					// k++
					const segmentPoint = new SegmentPoint(6, 60, 0, i);
					segmentPoint.draw(ctx, angle);
					angle = angle - this.minAngleStep / this.unionStep

					// console.log(k, i, this.unionStep, this.unionStep * this.minStep)
				} else {
					const segmentPoint = new SegmentPoint(2, 40, 0, '');
					segmentPoint.draw(ctx, angle)
					angle = angle - this.minAngleStep / this.unionStep
				}

			}
			ctx.rotate(-this.diapasonAngle * Math.PI * 2 / 360)
			// ctx.save();

			ctx.rotate(-this.diapasonAngle * Math.PI * 2 / 360)
			ctx.font = '25px Arial';
			ctx.fillText('new mark', 0, 105)
			ctx.font = '30px Arial';
			ctx.fillStyle = 'rgb(63, 65, 63)'
			ctx.fillRect(-30, 57, 60, 30)
			ctx.fillStyle = 'white'
			ctx.fillText(getWorkNamber(), 0, 75)
			ctx.resetTransform()


		}
		update(deltaTime) {

			if (this.totalTime > this.frameInterval) {
				this.totalTime = 0
			} else { this.totalTime += deltaTime; }


		}
	}


	class SegmentPoint {
		constructor(width, height, angle, text) {
			this.width = width;
			this.height = height;
			this.angle = angle;
			this.text = text;
			this.offsetSegment = -260;
			this.offsetText = -160


		}

		draw(context, angle, text) {


			ctx.fillStyle = 'white';
			// this.text = '';		
			ctx.translate(canvas.width / 2, canvas.height / 2);
			const step = ctx.fillRect(0, this.offsetSegment, this.width, this.height);
			ctx.font = '30px Arial';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';

			ctx.save()
			ctx.translate(0, this.offsetText);
			ctx.rotate(angle * (Math.PI * 2 / 360));
			const stepText = ctx.fillText(this.text, 0, 0);
			ctx.restore()


		}


	}

	class Arrow {
		constructor(centerPointSize, height, width, offset, angle, disk) {
			this.centerPointSize = centerPointSize;
			this.height = height;
			this.width = width;
			this.offset = offset;
			this.disk = disk;
			// console.log(this.disk)
		}

		draw(context, angle) {
			this.disk = disk;
			// Create a conic gradient
			const gradientArrowConic = ctx.createConicGradient(-Math.PI / 2, 0, -this.height);
			gradientArrowConic.addColorStop(0.48, "transparent");
			gradientArrowConic.addColorStop(0.485, "white");
			gradientArrowConic.addColorStop(0.5, "green");
			gradientArrowConic.addColorStop(0.515, "white");
			gradientArrowConic.addColorStop(0.52, "transparent");

			//Create a radial gradient
			const gradientArrowCenter = ctx.createRadialGradient(0, 0, 20, 0, 0, 30);
			gradientArrowCenter.addColorStop(0, "green");
			gradientArrowCenter.addColorStop(0.9, "white");
			gradientArrowCenter.addColorStop(1, "green");



			this.centerPointSize = this.centerPointSize;
			this.height = this.height;
			this.width = this.width;
			this.offset = this.offset; ctx.rotate(0 * (Math.PI * 2 / 360));
			// ctx.fillStyle = 'green'* (Math.PI * 2 / 360)
			ctx.fillStyle = gradientArrowConic;
			ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.rotate(-this.disk.diapasonAngle / 2 * (Math.PI * 2 / 360))
			ctx.rotate(getWorkNamber() * this.disk.diapasonAngle / this.disk.diapason * (Math.PI * 2 / 360));
			//*** */
			ctx.fillRect(-this.width / 2, -this.height / 2 * this.offset, this.width, -this.height)
			// ctx.fillRect(0, this.height, this.width, this.height)
			// ctx.fillStyle = 'green'
			ctx.fillStyle = gradientArrowCenter
			ctx.beginPath()
			ctx.arc(0, 0, this.centerPointSize, 0, 360)
			ctx.fill()
			ctx.restore()
			ctx.resetTransform()
			// console.log(this.worksAngle)
			// console.log(this.disk + '    console.log(this.disk)')


		}
		update() {

		}

	}
	const disk = new Disk(400, 500, 240, 100, 5);
	// console.log(disk + '    console.log(this.disk2)')
	const arrow = new Arrow(30, 150, 25, -0.2, disk)


	ctx.resetTransform()



	let lastTime = 0;

	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		disk.draw(ctx);
		disk.update(ctx, deltaTime);
		arrow.draw(ctx);
		arrow.update(ctx, deltaTime);




		requestAnimationFrame(animate);

	}


	animate(0);




	// function resizeCanvas() {
	//     canvas.width = window.innerWidth;
	//     canvas.height = window.innerHeight;


	// }
	// window.addEventListener('resize', resizeCanvas)
	// 	resizeCanvas()
})


