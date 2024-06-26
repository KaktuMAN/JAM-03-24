let login = "";
let year = 0;
let logtimes = [];

async function main() {
  let response = await fetch("https://intra.epitech.eu/user/?format=json");
  let data = await response.json();
  login = data.login;
  year = data.promo;
  response = await fetch(`https://intra.epitech.eu/user/${login}/netsoul/?format=json`);
  data = await response.json();
  data.forEach((logtime) => {
    logtimes.push({"timestamp": logtime[0], "duration": logtime[1]});
  });
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
  console.log(options);
  await fetch("https://jampi.pechart.fr/log", options);
}

main();