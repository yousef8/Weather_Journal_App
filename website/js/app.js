let d = new Date();
let newDate = d.getMonth()+'.'+ (d.getDate() + 1)+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '91fbdc88c931181afb748405998121e9';

// Event listener to add function to existing HTML DOM element
const generate = document.querySelector('#generate');
generate.addEventListener('click', operation);

/* Function called by event listener */
function operation() {
    const zipCode = + document.querySelector('#zipcode').value;
    const feeling = document.querySelector('#feelings').value;

    const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;

    apiData(baseURL)
    .then((data) => {
        postData('/addData', {'date': newDate, 'temp': data.main.temp, 'feeling': feeling});
    })
    .then(() => {updateUI()});
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
    const projectData = await res.json();
    const last_index = projectData.length -1;
    console.log("Updating UI")
    console.log(projectData);
    try {
        document.querySelector('#date').textContent = `On ${projectData[last_index].date}`;
        document.querySelector('#temp').textContent = `Temperature is  ${projectData[last_index].temp}`;
        document.querySelector('#content').textContent = `You are feeling ${projectData[last_index].feeling}`;
    }catch(error) {
    console.log("No data exist", error);
    }
}