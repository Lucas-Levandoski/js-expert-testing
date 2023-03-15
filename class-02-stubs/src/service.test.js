const Service = require("./service");
const assert = require("assert");

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

; (async () => {
  {
    const dados = await Service.getPlanets(BASE_URL_2);

    console.log(JSON.stringify(dados));
  }

})();