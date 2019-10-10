const axios = require('axios');

exports.biolucidaclient_module = function()  {

  const endpoint = "biolucida/"
  let token = undefined

  const image_endpoint = (image_id) => {
    return endpoint + 'image/' + image_id
  }

  const region_endpoint = (image_id, width, height, zoom) => {
    return endpoint + 'region/' + image_id + '/' + width + '-' + height + '-0-0-0-' + zoom
  }

  const valid_response = (respone) => {
    let valid = false;
    if ("status" in respone && respone["status"] === "success") {
      valid = true;
    }
    return valid;
  }

  const get_image_info = (image_id) => {
    return axios.get(image_endpoint(image_id), {headers: {'token': token}}
    ).then( response => {
      return response.data
    }).catch( error => {
      console.log("------- Biolucida client get image info request error ---------")
      console.log(error);
    });
  }

  const get_region_data = (image_id, width, height, zoom) => {
    return axios.get(region_endpoint(image_id, width, height, zoom), {responseType: 'arraybuffer', headers: {'token': token}}
    ).then(response => {
      return new Buffer(response.data, 'binary').toString('base64')
    }).catch(error => {
      console.log("------- Biolucida client get region data request error ---------")
      console.log(error);
    });
  }


  this.get_thumbnail = (element, image_id) => {
    get_image_info(image_id).then(image_info => {
      if (valid_response(image_info)) {
        let levels = image_info['levels']
        let last_level_index = levels.length - 1
        let last_level = levels[last_level_index]
        get_region_data(image_id, last_level['w'], last_level['h'], last_level_index).then( image => {
          element.src = "data:image/jpeg;base64," + image
        })
      } else {
        console.log("------- Biolucida client get thumbnail request error ---------")
        console.log(image_info)
      }
    })
  }
}
