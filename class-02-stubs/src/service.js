class Service {
  static async makeRequest(url) {
    return fetch(url).then(res => (res.json()));
  }

  static async getPlanets(url) {
    return fetch(url).then(res => (res.json()));
  }
}

module.exports = Service;