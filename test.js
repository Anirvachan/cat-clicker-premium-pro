var model = {
	currentCat : null,
	cats : [{name : "bruce",
			 source : "bruce.jpg",
			 count : 0},
			 {name : "tabby",
			 source : "tabby.jpg",
			 count : 0},
			 {name : "tom",
			 source : "tom.jpg",
			 count : 0}			 
			]
};

var octopus = {

	init : function() {
		model.currentCat = model.cats[0];

		catView.init();
		catListView.init();
		adminView.init();
	},

	getCat : function() {
		return model.currentCat;
	},

	setCat : function(cat) {
		model.currentCat = cat;
	},

	getCats : function() {
		return model.cats;
	},

	incrementCount : function() {
		model.currentCat.count++;
	},

	updateCat : function(catClone) {
		var index = null;
		for (var i=0; i<model.cats.length; i++) {
			if (model.currentCat === model.cats[i]) {
				model.currentCat = catClone;
				model.cats[i] = catClone;
				console.log(i);
			}
		}
	},

	toggleVisibility : function() {

	}
};

var catView = {
	init : function() {
		this.catName = document.getElementById("cat-name");
		this.catImage = document.getElementById("cat-image");
		this.catCount = document.getElementById("cat-count");

		this.catImage.addEventListener("click", function() {
			octopus.incrementCount();
			console.log(octopus.getCat().count);
			catView.render();
			if (adminView.adminPanel.style.visibility === "visible") {
				adminView.render();
			}
		});

		this.render();
	},

	render : function() {
		var cat = octopus.getCat();
		this.catName.textContent = cat.name;
		this.catCount.textContent = cat.count;
		this.catImage.src = cat.source;
	}
};

var catListView = {
	init : function() {
		this.catList = document.getElementById('cat-list');

		this.render();

		
	},
	render : function() {
		this.catList.innerHTML = '';

		var cats = octopus.getCats();
		for (var i=0; i<cats.length; i++) {
			elem = document.createElement('button');
			elem.textContent = cats[i].name;
			elem.addEventListener("click", (function(catCopy) {
				return function() {
				console.log('clicked', elem);
				octopus.setCat(catCopy);
				catView.render();

				if (adminView.adminPanel.style.visibility === 'visible') {
					adminView.render();
				}
				}
				
			}(cats[i])));
			this.catList.appendChild(elem);
			this.catList.appendChild(document.createElement('br'));

		}
	}
}

var adminView = {
	init : function() {
		this.adminButton = document.getElementById('admin-button');
		this.adminPanel = document.getElementById('admin-panel');
		this.saveButton = document.getElementById('save-button');
		this.nameInput = document.getElementById('name-input');
		this.urlInput = document.getElementById('url-input');
		this.clicksInput = document.getElementById('clicks-input');

		this.adminPanel.style.visibility = 'hidden';

		this.adminButton.addEventListener('click', function() {
			adminView.render();
		})

		this.saveButton.addEventListener('click', function() {
			console.log('saveButton');
			var newCat = {name : adminView.nameInput.value,
						  source : adminView.urlInput.value,
						  count : adminView.clicksInput.value};
			octopus.updateCat(newCat);
			catView.render();
			catListView.render();
			adminView.adminPanel.style.visibility = 'hidden';

		})
	},

	render : function() {
			console.log('admin');
			adminView.adminPanel.style.visibility = 'visible';
			var currentCat = octopus.getCat();
			adminView.nameInput.value = currentCat.name;
			adminView.urlInput.value = currentCat.source;
			adminView.clicksInput.value = currentCat.count;

		
	}
}

octopus.init();