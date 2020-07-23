function DashboardComponent() {
	const anchorContainer = document.getElementById('dashboard__hero-list');
	this.onInit = function () {
		const promotedHeroList = heroList.splice(0, 4);
		const promotedHeroArray = promotedHeroList.map(mapItemToAnchor);
		console.log(promotedHeroArray);
		console.log(promotedHeroList);
		promotedHeroArray.forEach(addAnchorToHtml);
	};

	function mapItemToAnchor(hero) {
		let transformedElement = document.createElement('a');
		transformedElement.href = '../hero-detail/hero-detail.component.html';
		transformedElement.innerText = hero.name;
		return transformedElement;
	}

	function addAnchorToHtml(heroAnchor) {
		if (anchorContainer) anchorContainer.appendChild(heroAnchor);
		console.log(anchorContainer);
	}
}

let dashboardComponent = new DashboardComponent();
dashboardComponent.onInit();
