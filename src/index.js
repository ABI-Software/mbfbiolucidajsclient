const axios = require('axios');

//require("./styles/fdi_kb.css");

exports.biolucidaclient = function()  {

  const endpoint = "biolucida/"
  let secrets = require("./.secrets/therealmapcore.info")
  let token = undefined

  this.do_something = () => {
    console.log('doing something')
  }

  this.authenticate = () => {
    let data = {
         'username': secrets.username,
	     'password': secrets.password,
	     'token': secrets.token
    }
	axios.post(endpoint + 'authenticate/', data
	)
	.then(function (response) {
	  token = response.data.token
    })
    .catch(function (error) {
      console.log("------- Biolucida client authenticate request error ---------")
      console.log(error);
    })
    .then(function () {
    });
  }

  const initialise = () => {
    this.authenticate();
  }

  initialise();
}