let popular = document.getElementById("popular")
let geoLocation = document.getElementById("geoLocation")
let todayWeather = document.querySelector("#todays-forecast")
let FutureWeather = document.getElementById("future-forecast")
let time = document.getElementById("currentTime")
let currentCity = document.querySelector(".weatherInfo")
let bg = document.querySelector("#weatherInfo")

function getWeatherdat(){
    let city = document.getElementById("search").value
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c873745b8adc58393d29eeb7abc89fc3`;

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(res){
        // console.log(res)
        append(res)
        getForecastData(res.coord.lat,res.coord.lon)
        // getweather()
    })
    .catch(function(err){
        return err
    })
}


function getlocation(lat,lon){

    const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c873745b8adc58393d29eeb7abc89fc3`;

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(res){
        // console.log(res)
        append(res)
        getForecastData(res.coord.lat,res.coord.lon)
        // coord: {lon: 75.3533, lat: 19.9026}
        
    })
    .catch(function(err){
        return err
    })
}

function getForecastData(lat,lon){

    const url =  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=c873745b8adc58393d29eeb7abc89fc3`;

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(res){
        console.log(res)
        append2(res)
        // append(res)
    })
    .catch(function(err){
        return err
    })
}

setInterval(() => {
    const time1 = new Date();
    const hour = time1.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time1.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    time.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`


    if(hour < 18 ){
        bg.style.backgroundImage = `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Sunny.png")`;
    }
    else{
        bg.style.backgroundImage = `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Clear Night.png")`;
    }
}, 1000);




function append(data){
    currentCity.innerHTML = null
    let map = document.getElementById("gmap_canvas")
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    currentCity.innerHTML =
    `<div class="currentTemp">
        <div class="temp">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
            <h1>${data.main.temp}°C</h1>
        </div>
        <div class="currentWeather">
            <h3 class="today-weather">${data.weather[0].main}</h3>
            <p class="feelsLike">FEELS LIKE ${data.main.feels_like}°C</p>
        </div>
        <div class="DayExpect">
            <p>Expect ${data.weather[0].main}. The high will be ${data.main.temp_max}°C.</p>
        </div>
    </div>
    <div class="todays-info">
        <div class="wind">
            <p>WIND</p>
            <p class="wind-speed">${data.wind.speed}km/h <i class="fa-solid fa-wind"></i></p>
        </div>
        <div class="humidity">
            <p>HUMIDITY</p>
            <p class="current-humidity"><i class="fa-solid fa-droplet"></i> ${data.main.humidity}%</p>
        </div>
        <div class="visibility">
            <p>VISIBILITY</p>
            <p class="current-visibility">${(data.visibility)/1000} km</p> 
        </div>
        <div class="pressure">
            <p>PRESSURE</p>
            <p class="current-pressure">${data.main.pressure} mb</p> 
        </div>
        <div class="sunrise">
            <p>Sunrise</p>
            <p class="current-dew">${window.moment(data.sys.sunrise * 1000).format('HH:mm a')}</p> 
        </div>
        <div class="sunset">
        <p>Sunset</p>
        <p class="air-quality">${window.moment(data.sys.sunset * 1000).format('HH:mm a')}</p>
    </div>
    </div>`;

    popular.innerHTML=
    `<div class="city1">
        <i class="fa-solid fa-location-pin"> </i>  
        <p>${data.name}</p>
        <p class="ptemp"><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt=""> ${data.main.temp}°C</p>
        <p class="sunrise1">Sunrise: <img src="https://cdn4.iconfinder.com/data/icons/iconsland-weather/PNG/256x256/Sunrise.png" alt="" id="sun"> ${window.moment(data.sys.sunrise * 1000).format('HH:mm a')}</p>
        <p class="sunset1">Sunset: <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/sunset-4242324-3520638.png" alt="" id="sun"> ${window.moment(data.sys.sunset * 1000).format('HH:mm a')}</p>
    </div>`;

    geoLocation.innerHTML =
    `<i class="fa-solid fa-house"></i>
    <p id="CityName">${data.name} , ${(data.sys.country)}</p>`;
}

function append2(data){
    todayWeather.innerHTML = null;
    FutureWeather.innerHTML = null;
    
    data.daily.forEach(function(ele,index){
        if(index == 0){
            console.log("if wala",ele)
            todayWeather.innerHTML=
            `<div class="today">
            <p>${window.moment(ele.dt*1000).format('DD')} Today</p>   
            </div>
            <div class="Todays-temp">
                <img src="http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png" alt="">
                <div>
                    <p class="temp">${ele.temp.max}°C</p>
                    <p class="temp">${ele.temp.min}°C</p>
                </div>
                <div class="todays-Weather">
                    <p class="today-weather">${ele.weather[0].description}</p>
                    <p class="humidity"><i class="fa-solid fa-droplet"></i> ${ele.humidity}%</p>
                </div>
            </div>`;
        }
        else{
            
            console.log("else wala",ele)
            FutureWeather.innerHTML +=
            `<div>
                <div class="day">
                    <p>${window.moment(ele.dt*1000).format('DD ddd')}</p>   
                </div>
                <div class="days-temp">
                    <img src="http://openweathermap.org/img/wn/${ele.weather[0].icon}.png" alt="">
                    <div>
                        <p class="day-temp">${ele.temp.max}°C</p>
                        <p class="day-temp">${ele.temp.min}°C</p>
                    </div>
                </div>
            </div>`
        }
    })

}

// https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Sunny.png
// https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Clear Night.png


function getweather (){
    navigator.geolocation.getCurrentPosition(success);
    
        function success(position){
            var crd = position.coords;
    
            // console.log('Your current position is:');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`More or less ${crd.accuracy} meters.`);
    
            getlocation(crd.latitude,crd.longitude)
        }
}
window.onload(getweather ());