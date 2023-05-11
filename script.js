const table = document.getElementById('corpo');
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
		<tr class="bg-white border-b">
			<td class="px-6 py-4">${country.name.common}</td>
			<td class="px-6 py-4">${country.capital}</td>
			<td class="px-6 py-4">${country.flag}</td>
			<td class="px-6 py-4"><img class="h-10" src="${country.flags.png}"></td>
		</tr>
		`;
	});
}
