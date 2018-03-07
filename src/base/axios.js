import axois from 'axios';

// https://github.com/axios/axios
// create axios with default configure and return instance
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

module.exports = instance;
