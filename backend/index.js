const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/vcet', {

})
    .then(() => {
        console.log('Connected to vcet database');
    })
    .catch((err) => {
        console.error(err);
    });

    

    const userSchema = new mongoose.Schema({
        totals: { type: Number, required: true },
    });
    
    const User = mongoose.model('homs', userSchema);
    
    module.exports = User;
    
app.use(express.json());
app.use(cors());

app.post('/register', async (req, resp) => {
    try {
        const user = new User(req.body);
        const result = await user.save();

        // Avoid sending the entire user object in the response
        const { __v, ...userWithoutVersion } = result.toObject();

        resp.send(userWithoutVersion);
        console.log(userWithoutVersion);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});