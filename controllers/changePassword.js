module.exports = (req, res) => {
    console.log("change password service is called for email " + req.body.email);
    res.status(200).send("OK");
}