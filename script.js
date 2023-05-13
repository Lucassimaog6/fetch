const countriesUl = document.getElementById('countries');
const favoritesUl = document.getElementById('favorites');

let countriesList = [];
let favoritesList = [];

async function FetchAPI() {
	const response = await fetch('https://restcountries.com/v3.1/all');
	const json = await response.json();
	countriesList = json.map((country) => {
		return {
			name: country.name.common,
			capital: country.capital,
			region: country.region,
			flags: country.flags.svg,
		};
	});
	loadCountries();
}

FetchAPI();

function loadCountries() {
	countriesUl.textContent = '';
	countriesList.forEach(({ name, capital, region, flags }, i) => {
		const li = document.createElement('li');
		li.classList.add(
			'p-4',
			'rounded-lg',
			'shadow-lg',
			`bg-[url('${flags}')]`,
			'bg-no-repeat',
			'bg-cover',
			'bg-center',
			'relative'
		);
		const div = document.createElement('div');
		div.classList.add('backdrop-blur', 'backdrop-brightness-50', 'text-white', 'w-fit', 'p-4', 'rounded-lg');

		const p_name = document.createElement('p');
		p_name.innerText = `Nome: ${name}`;

		const p_capital = document.createElement('p');
		p_capital.innerText = `Capital: ${capital}`;

		const p_region = document.createElement('p');
		p_region.innerText = `Região: ${region}`;

		const button = document.createElement('button');
		button.classList.add(
			'absolute',
			'bottom-4',
			'right-4',
			'bg-white',
			'rounded-full',
			'p-1',
			'shadow-lg',
			'text-gray-900'
		);

		const svg = document.createElement('svg');
		svg.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path></svg>';
		button.appendChild(svg);
		button.addEventListener('click', () => {
			favoriteCountry(i);
		});

		div.appendChild(p_name);
		div.appendChild(p_capital);
		div.appendChild(p_region);
		li.appendChild(div);
		li.appendChild(button);

		countriesUl.appendChild(li);
	});
}

function loadFavorites() {
	favoritesUl.innerHTML = '';
	favoritesList.forEach(({ name, capital, region, flags }) => {
		const li = document.createElement('li');
		li.classList.add(
			'p-4',
			'rounded-lg',
			'shadow-lg',
			`bg-[url('${flags}')]`,
			'bg-no-repeat',
			'bg-cover',
			'bg-center',
			'relative'
		);
		const div = document.createElement('div');
		div.classList.add('backdrop-blur', 'backdrop-brightness-50', 'text-white', 'w-fit', 'p-4', 'rounded-lg');

		const p_name = document.createElement('p');
		p_name.innerText = `Nome: ${name}`;

		const p_capital = document.createElement('p');
		p_capital.innerText = `Capital: ${capital}`;

		const p_region = document.createElement('p');
		p_region.innerText = `Região: ${region}`;

		const button = document.createElement('button');
		button.classList.add(
			'absolute',
			'bottom-4',
			'right-4',
			'bg-white',
			'rounded-full',
			'p-1',
			'shadow-lg',
			'text-gray-900'
		);

		const svg = document.createElement('svg');
		svg.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path></svg>';
		button.appendChild(svg);
		button.addEventListener('click', () => {
			favoriteCountry(i);
		});

		div.appendChild(p_name);
		div.appendChild(p_capital);
		div.appendChild(p_region);
		li.appendChild(div);
		li.appendChild(button);

		favoritesUl.appendChild(li);
	});
}

function favoriteCountry(index) {
	favoritesList.push(countriesList[index]);
	countriesList.splice(index, 1);
	loadCountries();
	loadFavorites();
}
