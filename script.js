const countriesUl = document.getElementById('countries');
const favoritesUl = document.getElementById('favorites');

const countriesTotal = document.getElementById('countries-total');
const favoritesTotal = document.getElementById('favorites-total');

let countriesList = [];
let favoritesList = [];

async function FetchAPI() {
	const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population');
	const json = await response.json();
	countriesList = json.map((country) => {
		return {
			name: country.name.common,
			capital: country.capital,
			region: country.region,
			flags: country.flags.svg,
			population: country.population,
		};
	});
	loadCountries();
}

FetchAPI();

function loadCountries() {
	const total = countriesList.reduce((a, b) => a + b.population, 0);
	countriesTotal.innerText = 'Total: ' + Intl.NumberFormat('pt-BR').format(total);
	constructList(countriesUl, countriesList);
}

function loadFavorites() {
	const total = favoritesList.reduce((a, b) => a + b.population, 0);
	favoritesTotal.innerText = 'Favorito: ' + Intl.NumberFormat('pt-BR').format(total);
	constructList(favoritesUl, favoritesList);
}

function constructList(ul, data) {
	ul.innerHTML = '';

	const g_li = document.createElement('li');
	g_li.classList.add('p-4', 'rounded-lg', 'shadow-lg', 'bg-no-repeat', 'bg-cover', 'bg-center', 'relative');

	const g_div = document.createElement('div');
	g_div.classList.add('backdrop-blur', 'backdrop-brightness-50', 'text-white', 'w-fit', 'p-4', 'rounded-lg');

	const g_p = document.createElement('p');

	const g_button = document.createElement('button');
	g_button.classList.add(
		'absolute',
		'bottom-4',
		'right-4',
		'bg-white',
		'rounded-full',
		'p-1',
		'shadow-lg',
		'text-gray-900'
	);

	const g_svg = document.createElement('svg');
	g_svg.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path></svg>';
	g_button.appendChild(g_svg);

	data.forEach(({ name, capital, region, flags }, i) => {
		const li = g_li.cloneNode(false);
		li.classList.add(`bg-[url('${flags}')]`);

		const div = g_div.cloneNode(false);

		const p_name = g_p.cloneNode(false);
		p_name.innerText = `Nome: ${name}`;

		const p_capital = g_p.cloneNode(false);
		p_capital.innerText = `Capital: ${capital}`;

		const p_region = g_p.cloneNode(false);
		p_region.innerText = `Região: ${region}`;

		const button = g_button.cloneNode(true);
		button.addEventListener('click', () => {
			favoriteCountry(i);
		});

		div.appendChild(p_name);
		div.appendChild(p_capital);
		div.appendChild(p_region);
		li.appendChild(div);
		li.appendChild(button);

		ul.appendChild(li);
	});
}

function favoriteCountry(index) {
	favoritesList.push(countriesList[index]);
	countriesList.splice(index, 1);
	loadCountries();
	loadFavorites();
}
