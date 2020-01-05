const express = require('express')
const axios = require('axios');
const app = express();

const port = 3001;

const KEY = 'AIzaSyA6N00_LlCQHniVf7kXU6Xy67DOzqc646U';


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});
app.get('/', async (req, res) => {

    console.log(req.query);
    const places = {data: null};
    
    // await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
    //     params: {
    //       location:'-33.8670522,151.1957362',
    //       radius:'1500',
    //       key: KEY
    //     }
    //   }).catch(err=>{console.log(err)});


    console.log(places);
    res.send(places.data);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))