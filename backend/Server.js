const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const bcrypt =require('bcrypt');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'Loginsystem',
});

const JWT_SECRET = 'your_jwt_secret_key'; 

app.post('/validate', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user";

    db.query(sql, (errr, result) => {
        if (errr) {
            res.json("Data Validate Error");
            console.error("Check Your database Connection");
        } else {
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].Email);

                if (email == result[i].Email) {
                    res.json({ message: "User Email already Exist" });
                    return;
                }
            }
            res.json({ Valid: "insert" });
        }
    });
});

app.post("/userinsert", async (req, res) => {
    const { email, password , type } = req.body;
    try {
        const epassword = await bcrypt.hash(password, 10);
        console.log(req.body);
        
        const sql = "INSERT INTO user SET ? ";
        db.query(sql, { Email: email, Password: epassword, type: type}, (err, results) => {
            if (err) {
                console.error(err);
                res.json({ Error: "User Sign up Error" });
            } else {
                // Generate JWT token
                const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ success: "User Sign up Successfully", token: token ,type:type});
            }
        });
    } catch (error) {
        res.json({ Error: "Error hashing password" });
    }
});



app.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE Email = ?";
    const { email, password } = req.body;
    db.query(sql, email, async (err, result) => {
        if (err) {
            res.json({ error: "Invalid Email or Password" });
        } else {
            if (result.length > 0) {
                const user = result[0];
                const match = await bcrypt.compare(password, user.Password);
                console.log(user);
                
                if (match) {
                    const token = jwt.sign(
                        { email: email },
                        JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    res.json({ token: token,type:user.type });
                } else {
                    res.json({ error: "Invalid Email or Password" });
                }
            } else {
                res.json({ error: "Invalid Email or Password" });
            }
        }
    });
});


app.get('/', async (req, res) => {
    await res.json("db connected");
});

app.listen(8000, () => {
    console.log("server running on port 8000");
});
