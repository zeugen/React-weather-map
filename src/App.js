import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';

const api = {
	key: 'f146b412ccd06fcc9539bbd996c54bec'
	// base: 'https://api.openweathermap.org/data/2.5/'
};
const city = 'london';
// const base = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`;
function App(){
	const [ query, setQuery ] = useState('nairobi');
	const [ weather, setWeather ] = useState({});
	const [ searchWord, setSearchWord ] = useState('');
	const [ icon, setIcon ] = useState('');

	useEffect(
		() => {
			getWeatherData();
		},
		[ query ]
	);

	const getWeatherData = async () => {
		const response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`
		);
		const weatherData = await response.json();

		console.log(weatherData);
		const weatherIcon = weatherData.weather[0].icon;
		// const iconApi = await fetch('http://openweathermap.org/img/w/' + weatherIcon + '.png');
		// setIcon(iconApi);
		setWeather(weatherData);
	};

	const updateSearch = (e) => {
		setSearchWord(e.target.value);
		console.log(searchWord);
	};
	const getSearchResults = (e) => {
		e.preventDefault();
		setQuery(searchWord);
		setSearchWord('');
	};

	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div className='app'>
			<div className='wrapper'>
				<div className='widget'>
					<div className='container-fluid'>
						<div className='row justify-content-center'>
							<div className='col-md-5 mx-auto'>
								<form onSubmit={getSearchResults}>
									<div className='search-box'>
										<div className='input-group mb-2'>
											<input
												type='text'
												className='form-control'
												value={searchWord}
												onChange={updateSearch}
											/>
											<div className='input-group-append'>
												<button className='btn btn-success'>Search</button>
											</div>
										</div>
									</div>
								</form>
								<h2>{searchWord}</h2>
							</div>
						</div>
						{typeof weather.main != 'undefined' ? (
							<div>
								<div className='row justify-content-center mt-5 mt-sm-4 '>
									<div className='col-md-6 mx-auto location-box'>
										<h2 className='text-center'>
											{weather.name}, {weather.sys.country}
										</h2>
										<h6 className='date text-center'>{dateBuilder(new Date())}</h6>
										<div className='weather-box text-center mt-5'>
											<h3>Temperature: {Math.round(weather.main.temp)}&#xb0;C, </h3>
											<h3>
												<span>
													<img src={icon} style={{ width: '.95rem' }} alt='' />
												</span>{' '}
												{weather.weather[0].description}
											</h3>
										</div>
									</div>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
