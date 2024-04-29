/** Variables */
let files = [],
	dragArea = document.querySelector('.drag-area'),
	input = document.querySelector('.drag-area input'),
	button = document.querySelector('.card button');
select = document.querySelector('.drag-area .select');
 = document.querySelector('.container');

/** CLICK LISTENER */
select.addEventListener('click', () => input.click());


input.addEventListener('change', () => {
	let file = input.files;

	// if user select more than 1 image or no image
	if (file.length > 1 || file.length == 0) return;

	files.push(file[0]);
	input.files = null;
	container.innerHTML = `<div class="image">
    		<img src="${URL.createObjectURL(file[0])}" alt="image">
    		<span onclick="delImage(0)">&times;</span>
    	</div>`;
})

/* SHOW IMAGES */
function showImages() {
	let images = ''
	files.forEach((e, i) => {
		images += `<div class="image">
    		<img src="${URL.createObjectURL(e)}" alt="image">
    		<span onclick="delImage(${i})">&times;</span>
    	</div>`;
	});
	container.innerHTML = images;
}
/* DELETE IMAGE */
function delImage(index) {
	files.splice(index, 1);
	showImages();
}
/* INPUT CHANGE EVENT */
input.addEventListener('change', () => {
	let file = input.files;

	// if user select no image
	if (file.length == 0) return;

	for (let i = 0; i < file.length; i++) {
		if (file[i].type.split("/")[0] != 'image') continue;
		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}

	input.files = null;
	showImages();
})

/* DRAG & DROP */
dragArea.addEventListener('dragover', e => {
	e.preventDefault()
	dragArea.classList.add('dragover')
})

/* DRAG LEAVE */
dragArea.addEventListener('dragleave', e => {
	e.preventDefault()
	dragArea.classList.remove('dragover')
});

/* DROP EVENT */
dragArea.addEventListener('drop', e => {
	e.preventDefault()
	dragArea.classList.remove('dragover');

	let file = e.dataTransfer.files;
	for (let i = 0; i < file.length; i++) {
		/** Check selected file is image */
		if (file[i].type.split("/")[0] != 'image') continue;

		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}
	showImages();
});
// 
button.addEventListener('click', (e) => {
	let form = new FormData()
	files.forEach((file, index) => {
		form.append(`file[${index}]`, file)
	})
	console.log(form)
})