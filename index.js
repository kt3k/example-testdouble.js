const axios = require('axios')

window = { alert () {} }

exports.getGithubProfile = function (name) {
  return axios.get(`https://api.github.com/users/${name}`)
}

exports.checkMoney = function (money, price) {
  if (money < price) {
    window.alert('残金が足りません')
  }
}
