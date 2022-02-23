const request = require("request");

const data = (email, callback) => {
  const baseURL =
    "https://script.google.com/macros/s/AKfycbxIeJgXFpWXxYSGRpq0WBI8IlK0TPQlPWCysFXnn-qOs1JbirVtGl1dILflJnQJKUKT/exec";

  if (!isEmail(email)) {
    const result = {
      status: 401,
      data: null,
    };
    callback(undefined, result);
  } else {
    let url = baseURL + "?email=" + email;
    request({ url }, (error, response) => {
      if (error) {
        callback("Unable to connect", undefined);
      } else {
        const data = JSON.parse(response.body)[0].data;
        const resultArr = filterData(email, data);
        const result = {
          status: 201,
          data: resultArr,
        };
        callback(undefined, result);
      }
    });
  }
};

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function filterData(email, mainData) {
  const resultArry = mainData.filter(function (r) {
    return r.email.toString().toLowerCase() === email;
  });

  return resultArry;
}

module.exports = data;
