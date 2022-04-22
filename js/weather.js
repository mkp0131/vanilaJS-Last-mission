{
  const getWeather = (API_KEY) => {
    navigator.geolocation?.getCurrentPosition(({ coords, timestamp }) => {
      const lat = coords.latitude;
      const lon = coords.longitude;

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((json) => {
          const weather = json.weather[0].description;
          const temp = json.main.temp;
          const location = json.name;
          weatherHTML.innerHTML = `${weather.toUpperCase()} ${temp}°C<br/><span>${location.toUpperCase()}</span>`;
          weatherHTML.style.opacity = 1;
        })
        .catch((err) => {
          console.error('에러발생', err);
        });
    });
  };

  fetch('//api.lililli.kr/weather_api_github_io.php')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      getWeather(res.api_key);
    })
    .catch((err) => {
      console.error('에러발생', err);
    });
}
