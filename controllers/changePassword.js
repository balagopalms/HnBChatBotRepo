module.exports = (req, res) => {
    console.log(JSON.stringify(req.body));
    console.log("change password service is called for email " + req.body.email);
    res.status(200).send('{"status": "OK"}');
}