const axios = require('axios')

exports.getGithubProfile = function (name) {
  return axios.get(`https://api.github.com/users/${name}`)
}
