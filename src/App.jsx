import { useState, useEffect } from 'react';

function App() {
	const [country, setCoutry] = useState([]);
	const [favorite, setFavorite] = useState([]);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('Todas');

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('./newData.json');
			const data = await response.json();
			console.log(data);
			setCoutry(data);
		};
		fetchData();
	}, []);

	const favoriteCountry = (c) => {
		setFavorite([...favorite, c]);
		let newCountries = country.filter((fc) => fc.name !== c.name);
		setCoutry(newCountries);
	};

	const removeFavoriteCountry = (f) => {
		setCoutry([...country, favorite]);
		let newFavorite = favorite.filter((ff) => ff.name !== f.name);
		setFavorite(newFavorite);
	};

	function orderCountry(a, b) {
		if (a.name > b.name) {
			return 1;
		} else if (a.name < b.name) {
			return -1;
		} else {
			return 0;
		}
	}

	function filterCountry(country) {
		if (search === '') {
			return country;
		} else if (country.name.toLowerCase().includes(search.toLowerCase())) {
			return country;
		}
	}

	function filterRegion(country) {
		if (filter === 'Todas') {
			return country;
		} else if (country.region === filter) {
			return country;
		}
	}

	return (
		<>
			<main className='p-4 gap-4 grid grid-cols-2'>
				<div className='col-span-2 flex flex-col gap-2'>
					<div className='w-full flex justify-between'>
						<div className='w-full border-2 border-gray-300 rounded-l-lg'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Todas'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Todas'}
								/>
								Todas
							</label>
						</div>
						<div className='w-full border-2 border-l border-gray-300'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Americas'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Americas'}
								/>
								America
							</label>
						</div>
						<div className='w-full border-2 border-l border-gray-300'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Africa'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Africa'}
								/>
								Africa
							</label>
						</div>
						<div className='w-full border-2 border-l border-gray-300'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Asia'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Asia'}
								/>
								Asia
							</label>
						</div>
						<div className='w-full border-2 border-l border-gray-300'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Europe'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Europe'}
								/>
								Europe
							</label>
						</div>
						<div className='w-full border-2 border-l border-gray-300'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Oceania'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Oceania'}
								/>
								Oceania
							</label>
						</div>
						<div className='w-full border-2 border-l border-gray-300 rounded-r-lg'>
							<label className='flex gap-2 p-2'>
								<input
									type='radio'
									value='Antarctic'
									onClick={(e) => setFilter(e.target.value)}
									checked={filter === 'Antarctic'}
								/>
								Polar
							</label>
						</div>
					</div>
					<input
						className='w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
						type='text'
						placeholder='Pesquisar'
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<ul className='grid grid-cols-1 xl:grid-cols-2 auto-rows-min gap-4'>
					{country
						.filter(filterRegion)
						.filter(filterCountry)
						.sort(orderCountry)
						.map((country, i) => (
							<li
								key={country.name}
								className='p-4 overflow-hidden rounded-lg shadow-lg grid grid-cols-[1fr_auto] items-center aspect-video relative'
							>
								<img
									className='absolute -z-10 object-cover w-full h-full brightness-50'
									src={country.flag}
								/>
								<div className='text-white w-fit p-4 rounded-lg'>
									<p className='text-lg capitalize [text-shadow:_2px_2px_5px_rgb(0_0_0_/_100%)]'>
										Nome: {country.name}
									</p>
									<p className='text-lg capitalize [text-shadow:_2px_2px_5px_rgb(0_0_0_/_100%)]'>
										Capital: {country.capital}
									</p>
									<p className='text-lg capitalize [text-shadow:_2px_2px_5px_rgb(0_0_0_/_100%)]'>
										Região: {country.region}
									</p>
								</div>
								<button
									onClick={() => favoriteCountry(country)}
									className='self-end '
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='32'
										height='32'
										viewBox='0 0 28 28'
									>
										<path
											fill='#FFFFFF'
											d='M12.701 3.908c.532-1.078 2.069-1.078 2.6 0l2.692 5.452l6.017.875c1.19.173 1.664 1.634.804 2.473l-1.06 1.033a7.5 7.5 0 0 0-10.587 8.342l-4.547 2.39c-1.064.56-2.307-.343-2.104-1.528l1.028-5.993l-4.355-4.244c-.86-.839-.385-2.3.804-2.473l6.017-.875l2.691-5.452ZM27 20.5a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0Zm-6-4a.5.5 0 0 0-1 0V20h-3.5a.5.5 0 0 0 0 1H20v3.5a.5.5 0 1 0 1 0V21h3.5a.5.5 0 1 0 0-1H21v-3.5Z'
										/>
									</svg>
								</button>
							</li>
						))}
				</ul>
				<ul className='grid grid-cols-1 xl:grid-cols-2 auto-rows-min gap-4'>
					{favorite
						.filter(filterRegion)
						.filter(filterCountry)
						.sort(orderCountry)
						.map((favorite, i) => (
							<li
								key={favorite.name}
								className='p-4 overflow-hidden rounded-lg shadow-lg grid grid-cols-[1fr_auto] items-center aspect-video relative'
							>
								<img
									className='absolute -z-10 object-cover w-full h-full brightness-50'
									src={favorite.flag}
								/>
								<div className='text-white w-fit p-4 rounded-lg'>
									<p className='text-lg capitalize [text-shadow:_2px_2px_5px_rgb(0_0_0_/_100%)]'>
										Nome: {favorite.name}
									</p>
									<p className='text-lg capitalize [text-shadow:_2px_2px_5px_rgb(0_0_0_/_100%)]'>
										Capital: {favorite.capital}
									</p>
									<p className='text-lg capitalize [text-shadow:_2px_2px_5px_rgb(0_0_0_/_100%)]'>
										Região: {favorite.region}
									</p>
								</div>
								<button
									onClick={() => removeFavoriteCountry(favorite)}
									className='self-end '
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='32'
										height='32'
										viewBox='0 0 28 28'
									>
										<path
											fill='#FFFFFF'
											d='M12.701 3.908c.532-1.078 2.069-1.078 2.6 0l2.692 5.452l6.017.875c1.19.173 1.664 1.634.804 2.473l-1.06 1.033a7.5 7.5 0 0 0-10.587 8.342l-4.547 2.39c-1.064.56-2.307-.343-2.104-1.528l1.028-5.993l-4.355-4.244c-.86-.839-.385-2.3.804-2.473l6.017-.875l2.691-5.452ZM27 20.5a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0Zm-9.146-3.354a.5.5 0 0 0-.708.707l2.647 2.646l-2.647 2.647a.5.5 0 0 0 .708.707l2.646-2.646l2.646 2.646a.5.5 0 0 0 .708-.707L21.207 20.5l2.647-2.647a.5.5 0 0 0-.708-.707L20.5 19.792l-2.646-2.646Z'
										/>
									</svg>
								</button>
							</li>
						))}
				</ul>
			</main>
		</>
	);
}

export default App;
