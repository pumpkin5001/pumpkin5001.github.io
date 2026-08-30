const canvas = document.getElementById('canvas2');
const ctx2 = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;


class Particle {
	constructor(x, y) {

		this.x = x;
		this.y = y;
		this.movesToCenter = true;
		this.centerX = canvas.width / 2;
		this.centerY = canvas.height / 2;
		this.radius = 6;
		this.speed = (1 - Math.random() * 0.9) / 2
		this.draw()
	}
	draw(context) {
		// ctx2.restore()
		ctx2.beginPath();
		ctx2.fillStyle = 'yellow';
		ctx2.strokeStyle = 'red'
		ctx2.lineWidth = 2
		ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx2.stroke();
		// ctx2.fill();
	}
	// update(){
	// 	this.x = this.x;
	// 	this.y =this. y;
	// }
	// update(){
	// this.x += 1;
	// this.y += 1;
	// console.log('hj')

	// }
}

class Effect {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.centerX = canvas.width / 2;
		this.centerY = canvas.height / 2;
		this.radiusEffect = 380
		// this.radiusSpeed = 0.8 * Math.random() / 10
		this.effectParticles = [];
		this.fps = 200	// this.frameTimer = 0	

		this.frameInterval = 1000 / this.fps;
		this.totalTime = 0.0;
	}
	init(numberOfParticles) {


		for (let i = 0; i < numberOfParticles; i++) {
			//распределим случайным образом по окружности
			let angle = Math.PI * 2 * Math.random();
			let x = this.radiusEffect * Math.sin(angle) + this.centerX;
			let y = this.radiusEffect * Math.cos(angle) + this.centerY;
			this.effectParticles.push(new Particle(x, y));
		}
	}

	draw(context) {

		// console.log('draw')
		// ctx2.resstore()
		// ctx2.fill = 'orange'
		this.effectParticles.forEach(effectParticle => effectParticle.draw(context));
		ctx2.strokeStyle = 'red';

		ctx2.beginPath()
		// ctx2.arc(this.centerX, this.centerY, this.radiusEffect, 0, Math.PI * 2);
		ctx2.stroke();



		// this.radiusEffectMin = this.radiusEffect * (1 - 0.3)


		ctx2.beginPath()
		// ctx2.arc(this.centerX, this.centerY, this.radiusEffectMin, 0, Math.PI * 2);
		ctx2.stroke()



	}
	update(deltaTime) {
		if (this.totalTime > this.frameInterval) {
			this.totalTime = 0
		} else { this.totalTime += deltaTime; }




		// this.radiusEffectMin = this.radiusEffect * (.9 + Math.sin(this.totalTime * 0.6) * 0.25) * 0.8;
		this.radiusEffectMin = this.radiusEffect * (.9 + Math.sin(this.totalTime * 0.6) * 0.25) * 0.8;

		this.effectParticles.forEach(effectParticle => {


			// effectParticle.update()//если  из Particle

			// function normalize(v) {
			// 	const len = Math.hypot(v.x, v.y);
			// 	if (len === 0) return { x: 0, y: 0 }; // Защита от деления на ноль
			// 	return { x: v.x / len, y: v.y / len };
			// }

			const vec = { x: (this.centerX - effectParticle.x) + 200 * Math.random(), y: (this.centerY - effectParticle.y) - 200 * Math.random() };
			// const vec = { x: (this.centerX - effectParticle.x) + 200 * Math.sin(this.totalTime * 0.6), y: (this.centerY - effectParticle.y) + 200 * Math.sin(this.totalTime * 0.6) };
			// + 200 * Math.random()


			if (Math.hypot((this.centerX - effectParticle.x), (this.centerY - effectParticle.y)) < this.radiusEffectMin) {
				effectParticle.movesToCenter = false;
				// console.log('1')
			}

			if ((!effectParticle.movesToCenter) && (Math.hypot((this.centerX - effectParticle.x), (this.centerY - effectParticle.y)) > this.radiusEffect)) {
				effectParticle.movesToCenter = true;
				// console.log('2')
			}

			if (!effectParticle.movesToCenter) {
				vec.x *= -1;
				vec.y *= -1;
			}
			2

			// console.log(normalize(vec)); // 
			effectParticle.x += vec.x * effectParticle.speed * deltaTime;
			effectParticle.y += vec.y * effectParticle.speed * deltaTime;





		})

	}

}


// }

const effect = new Effect(canvas.width, canvas.height);

effect.init(1000);

let lastTime = 0;

function animate(timeStamp) {
	const deltaTime = timeStamp - lastTime;
	// console.log(timeStamp, lastTime)
	// console.log(deltaTime)
	lastTime = timeStamp;
	ctx2.fillStyle = 'green';
	ctx2.clearRect(0, 0, canvas.width, canvas.height)
	effect.draw(ctx2)
	effect.update(deltaTime / 1000);


	requestAnimationFrame(animate);

}

animate(0);

