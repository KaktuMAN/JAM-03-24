let login = "";
let year = 0;
let logtimes = [];
fetch("https://intra.epitech.eu/user/?format=json")
  .then(response => response.json())
  .then(data => {
    login = data.login;
    year = data.promo;
  })
  .catch(error => console.error('Error:', error));
fetch(`https://intra.epitech.eu/user/${login}/netsoul/?format=json`)
  .then(response => response.json())
  .then(data => {
    data.forEach((logtime) => {
      logtimes.push({"timestamp": logtime[0], "duration": logtime[1]});
    })
  })
  .catch(error => console.error('Error:', error));

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    mail: login,
    promotion: year,
    logTimes: logtimes
  })
};

fetch("http://localhost:8080/", options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));