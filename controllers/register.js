const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, username, password: Npassword } = req.body
    if (!email || !username || !Npassword) return res.json({ status: "error", error: "Please enter your email, name and password." });
    else {
        db.query('SELECT user_email FROM users WHERE user_email = ?', [email], async (err, result) => {
            if(err) throw err;
            if(result[0]) return res.json({ status: "error", error: "Email has already been registered." })
            else {
                const hashPass = await bcrypt.hash(Npassword, 8);
                db.query('INSERT INTO users SET ?', {user_email: email, user_name: username, user_password: hashPass}, (error, result) => {
                    if(error) throw error;
                    return res.json({ status: "success", success: "User has been registered."})
                })
            }
        })
    }
}

module.exports = register;