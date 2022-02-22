const blobContainer = document.querySelector('#blob-container');
const tools = document.querySelectorAll('.tools__nav-item');
const pageSize = {
	width: window.innerWidth,
	height: window.innerHeight,
};
const itemCountVW = Math.floor(pageSize.width / 50) + 1;
const itemCountVH = Math.floor(pageSize.height / 50) + 1;
let canDraw = false;
let isErasing = false;

for (let c = 0; c < itemCountVW * itemCountVH; c++) {
	const blob = document.createElement('div');
	blob.classList.add('blob');
	blobContainer.appendChild(blob);
}

tools.forEach((tool) => {
	tool.addEventListener('click', () => {
		tools.forEach((tool) => {
			tool.classList.remove('active');
		});
		tool.classList.add('active');
		if (tool.classList.contains('tools__nav-item--erase')) {
			isErasing = true;
		}
		if (tool.classList.contains('tools__nav-item--draw')) {
			isErasing = false;
		}
		if (tool.classList.contains('tools__nav-item--delete')) {
			const tl = gsap.timeline({ repeat: 0 });
			tl.to('.blob.active', {
				duration: 0,
				scale: 0,
				ease: 'power2.out',
				stagger: {
					grid: 'auto',
					from: 'random',
					ease: 'power3.out',
					amount: 0.5,
				},
			});
			tl.add(() => {});
		}
	});
});

const gridItems = document.querySelectorAll('.blob');
document.addEventListener('mousedown', (e) => {
	canDraw = true;
});
document.addEventListener('mouseup', (e) => {
	canDraw = false;
});

gridItems.forEach((item) => {
	item.addEventListener('mousedown', () => {
		if (isErasing) {
			item.classList.remove('active');
		} else {
			item.classList.add('active');
		}
	});
	item.addEventListener('mousemove', () => {
		if (canDraw) {
			item.classList.add('active');
		}
		if (canDraw && isErasing) {
			item.classList.remove('active');
		}
	});
});

tools.forEach((tool) => {
	tool.addEventListener('click', () => {
		tools.forEach((tool) => {
			tool.classList.remove('active');
		});
		tool.classList.add('active');
		if (tool.classList.contains('tools__nav-item--erase')) {
			isErasing = true;
		}
		if (tool.classList.contains('tools__nav-item--draw')) {
			isErasing = false;
		}
		if (tool.classList.contains('tools__nav-item--delete')) {
			canDraw = false;
			isErasing = true;
			const tl = gsap.timeline({ repeat: 0 });
			tl.to('.blob.active', {
				duration: 0,
				scale: 0,
				ease: 'power2.out',
				stagger: {
					grid: 'auto',
					from: 'random',
					ease: 'power3.out',
					amount: 0.5,
				},
			});
			tl.add(() => {
				gridItems.forEach((item) => {
					item.style.transform = 'scale(1)';
					item.classList.remove('active');
				});
			});
		}
	});
});
