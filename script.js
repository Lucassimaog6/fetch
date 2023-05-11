const table = document.getElementById('countries');
let countries = [];

window.addEventListener('load', () => {
	fetchApi().then((json) => {
		loadTable(json);
	});
});

async function fetchApi() {
	const response = await fetch('https://restcountries.com/v3.1/all');
	const json = await response.json();
	return json;
}

function loadTable(data) {
	data.forEach((country) => {
		table.innerHTML += `
		<li 
		class="grid grid-cols-2 gap-4 p-4 rounded-lg shadow-lg"
		style="background-image: url(${country.flags.png}); background-size: cover; background-position: center; background-repeat: no-repeat;"
		>
			<h1>${country.name.common}</h1>
			<h3>${country.capital}</h3>
		</li>
		`;
	});
}
