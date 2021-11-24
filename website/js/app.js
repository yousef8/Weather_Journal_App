let d = new Date();
let newDate = (d.getMonth() + 1) +'/'+ d.getDate()+'/'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=91fbdc88c931181afb748405998121e9&units=metric';

// Event listener to add function to existing HTML DOM element
const generate = document.querySelector('#generate');
generate.addEventListener('click', operation);

/* Function called by event listener */
function operation() {
    const zipCode = + document.querySelector('#zipcode').value;
    const feeling = document.querySelector('#feelings').value;

    const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us${apiKey}`;

    apiData(baseURL)
    .then((data) => {
        postData('/addData', {'date': newDate, 'temp': data.main.temp, 'feeling': feeling});
    })
    .then(() => {
        updateUI()
    });
}

/* Function to GET Web API Data*/
async function apiData(baseURL) {
    const res = await fetch(baseURL);
    return await res.json();
}

/* Function to POST data */
async function postData(url = '', object) {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {'Content-type': 'application/json; charset=UTf-8'}
    });
    console.log("Data have been posted");
}

// Update UI
async function updateUI() {
    const res = await fetch('/all');
    console.log("Updating UI")
    try {
        const projectData = await res.json();
        console.log(projectData);
        document.querySelector('#date').innerHTML = `On ${projectData.date}`;
        document.querySelector('#temp').innerHTML = `Temperature is  ${projectData.temp} Celcius`;
        document.querySelector('#content').innerHTML = `You are feeling ${projectData.feeling}`;
    }catch(error) {
        console.log("No data exist", error);
    }
}