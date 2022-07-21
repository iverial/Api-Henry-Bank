

async function isAdmin(req, res, next) {
    try {
        const { role } = req.user;

        if (role === "admin") {
            next();
            return;
        }
        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }

}
module.exports = { isAdmin };
