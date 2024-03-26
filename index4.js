// const fs = require("fs");
// const path = require('path');
const express = require("express")
const app = express();

app.use(express.json());
const userdata = require('./models/users.json');
// const filePath = path.resolve(__dirname, 'models/users.json');
const port = 4000;
// console.log(users);

async function fetchDataUsingFs() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
} 

app.get('/api/getUsers', async (req, res) => {
    const userdata = fetchDataUsingFs();
    return res.send(userdata);    
});

app.post('/api/addUser', async(req, res) => {
    const name = req.body.name;
    // const users = await fetchDataUsingFs();
    // const userdata = JSON.parse(users);
    // console.log(users);
    
    for(let i=0; i<userdata.length; i++){
        if(userdata[i].name == name){
            console.log("Found User", userdata[i].name);
            return res.json(userdata[i])
        }
    }
    return res.json("User not found!");
})

/// Route created here
app.get('/api/test', (req, res) =>{
    console.log("API testing...")
    return res.json("Test successful...")
});

app.listen(port, () => {
    console.log("Running ... on ", port);
});






//const filteredData = userdata.filter((user) => user.name === userReq.name);
