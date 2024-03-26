const express = require("express");
const app = express();
app.use(express.json());

// const fs = require("fs");
// const path = require('path');
// const filePath = path.resolve(__dirname, 'models/users.json');
const users = require('./models/users.json');

const port = 3001;

async function fetchDataUsingFs() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("Hello")
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

app.get('/api/test', async (req, res) => {
    console.log("Hello Testing!");
    return res.json("Testing Successful...")
});

app.get('/api/getUsers', async (req, res) => {
    const data = await fetchDataUsingFs();
    const userdata = JSON.parse(data);

    return res.json(userdata);
})

app.post('/api/findUser', async (req, res) => {
    const name = req.body.name;
    
    for(let i=0; i<users.length; i++){
        if(users[i].name == name){
            return res.json(users[i]);
        }
    }
    return res.json("User not found!")
})

app.listen(port, () => {
    console.log("listening...", port);
});