const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'users.json');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

async function fetchDataUsingFs() {
    try {
        // Read file synchronously
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("Hello")
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

app.get('/api/getUsers', async (req, res) => { 
    try {
        const data = await fetchDataUsingFs();
        const userdata = JSON.parse(data).users;
    
        return res.json(userdata);        
    } catch (error) {
        return error.message;
    }  
});

app.post('/api/findUser', async (req, res) => {
    try {
        const userReq = req.body;
        const users = await axios.get("http://localhost:3000/api/getUsers");
        const userdata = users.data;
        if (userReq.hasOwnProperty('name')) {
            const filteredData = userdata.filter((user) => user.name === userReq.name);
            return res.json(filteredData);
        } else if (userReq.hasOwnProperty('age')) {
            const filteredData = userdata.filter((user) => user.name === userReq.name);
            return res.json(filteredData);
        } else {
            console.log("NOt found keys")
        }        
    } catch (error) {
        return error.message;
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    // find user
    // 
    return res.json(req.body.username)
})

app.listen(port, () => {
    console.log("listening...", port);
});




// app.post('/api/user', async (req, res) => {

//     try {
//         console.log(req.body);
//         return res.json(req.body);
//     } catch (error) {
//         console.error('Error handling request:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

// const axios = require('axios');

// function fetchDataAndManipulate() {
//     return new Promise((resolve, reject) => {
//         // Fetch data from the API
//         axios.get('https://api.example.com/data')
//             .then(response => {
//                 const data = response.data;

//                 // Manipulate the data (e.g., filter or map)
//                 const filteredData = data.filter(item => item.property === 'value');

//                 // Resolve the promise with the filtered data
//                 resolve(filteredData);
//             })
//             .catch(error => {
//                 // Reject the promise with the error
//                 reject(error);
//             });
//     });
// }

// // Call the function to execute the assignment
// fetchDataAndManipulate()
//     .then(filteredData => {
//         // Output the result
//         console.log(filteredData);
//     })
//     .catch(error => {
//         console.error('Error fetching and manipulating data:', error.message);
//     });
