const request = require('request')



const data = (email, callback) => {
    const url = 'https://script.googleusercontent.com/a/macros/juicesupplycompany.com/echo?user_content_key=JRcfc79PQd6fSiswEMgb8h-1Uvlk1g-iIjhXyiT2OU59OeKwJrMrf7IuIogY5HVplca5RjIH-jdIBUbDOD0nurrzPlcLG2XiOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCPN61pSWtBEo-3pL4KcNPpXa3lSn6LDfpoAPxoDu5zVzmjbbMW9ZEiTq4_eFHiiEYGJVVrrcLn94tlJBvksOqimzBIu5f_SQ2y2dH5QhfK7s76CDEpq_XZZPpA76_vnHbHqLXJsnpwzNz9Jw9Md8uu&lib=MWCVIWCdHMAb33AphfpbKETJdmpy7TQ7w'
    if(!isEmail(email)){
        const result = {
            status : 401,
            data : null
        }
        callback(undefined, result)
    }
    else
    {
        request({url}, (error, response) => {
            if(error) {
                    callback('Unable to connect', undefined)
                }
                else {
                    const data = JSON.parse(response.body)[0].data
                    const resultArr = filterData(email,data)
                    const result = {
                        status : 201,
                        data : resultArr
                    }
                    callback(undefined, result)
                }
            })
            
    }
}


function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function filterData(email, mainData) {
    const resultArry = mainData.filter(function(r){
        return r.email.toString().toLowerCase() === email
    })
      
      return resultArry;
  }

module.exports = data
 