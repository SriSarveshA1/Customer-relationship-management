/**
 * Read from the .env file and export the PORT number to all other files
 * in the project
 */

 if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();//so this particular line will read the (key,value) pairs of .env file and (there is a particular object called process.env) and the key,value pairs in that .env file will be attached to this process.env object
}

module.exports = {
    PORT : process.env.PORT
}
