const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/jobportal", {
    //seNewUrlParser:true,
    //useUnifiedTopology:true,
    //useCreateIndex:true 
}).then(() => {
    console.log(`connection successful`)
}).catch((err) => {
    console.log(`no connection`)
})