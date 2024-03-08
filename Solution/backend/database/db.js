const mongoose = require("mongoose")
const password = encodeURIComponent('Smit');

const dbConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://smitgoti2103:${process.env.MONGO_KEY}@cluster0.ztqnnsj.mongodb.net/RestaurantOrder`)
    } catch (e) {
        console.log(e);
    }

}

module.exports = dbConnect;
