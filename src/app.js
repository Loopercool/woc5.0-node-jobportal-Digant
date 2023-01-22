const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn")
const Register = require("./model/registers");
const exp = require("constants");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partial_path = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);


app.get("/", (req, res) => {
    res.render("index")
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {//register
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if (password === confirmpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword
            })
            const registerd = await registerEmployee.save();
            res.status(201).render("index");  
        }
        else{
            res.send("password are not maching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {//login
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("Password not matching")
        }
    } catch (error) {
         res.status(400).send("Invalid Email or Password");
    }
})

app.listen(port, () => {
    console.log(`server is running at port number ${port}`)
    
})