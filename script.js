const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const row = document.querySelector(".row");

const apiKey = "2833d555dee3517850f7e12386dc9f3f";

// ! Hava durumuna göre arkaplan resmi getirmek için;
const weatherColors = {
    Clear : "#f1c40f",
    Clouds : "#3498db",
    Rain : "#2ecc71",
    Snow : "#ecf0f1",
    Mist : "#95a5a6",
    Thenderstorm : "#8e44ad",
    Drizzle : "#d35400",
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    
    const city = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
    .then((response)=> response.json())
    .then((data)=> {
        console.log(data)
        const cityName = data.city.name;
        const countryName = data.city.country;

        // console.log(data.list)
        const forecasts = data.list.filter((forecast)=>{
            return forecast.dt_txt.includes("12:00:00");
        })
        console.log(forecasts)

        row.innerHTML = "";

        forecasts.forEach((veri)=>{
            console.log(veri);

            // ! Hava durumu iconlarını getirmek için;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${veri.weather[0].icon}.png`;

            // ! Tarihi Düzenlemek İçin;
            const date = new Date(veri.dt_txt);
            console.log(date)

            const formattedDate = date.toLocaleDateString("tr-TR",{
                day : "numeric",
                month : "long",
                year : "numeric",
                weekday : "long"
            })

            console.log(formattedDate)

            // ! Hava durumu tanımını çekmek için;
            const weatherDescription = (veri.weather[0].description)[0].toLocaleUpperCase() + (veri.weather[0].description).slice(1);

            // ! Havanın Derecesini Almak İçin;
            const weatherTemprature = Math.round(veri.main.temp);

            // ! Hava durumu arka planı;
            const weatherBackgroundColor = weatherColors[veri.weather[0].main];
            console.log(weatherBackgroundColor);

            row.innerHTML += `
            <div class="col-4">
                <div class="card m-3" style = "background-color:${weatherBackgroundColor}">
                    <img src=${weatherIconUrl} class="card-img-top weather-icon" alt="...">
                    <div class="card-body">
                    <h5 class="card-title custom-font">${cityName}, ${countryName}</h5>
                    <p class="card-text">${formattedDate}</p>
                    <p class="card-text">${weatherTemprature}°C</p>
                    <p class="card-text">${weatherDescription}</p>
                    </div>
                </div>
            </div>
            `
        })

    })
})

