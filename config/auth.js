//To ensure if user is authenticated
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "please login to view this resource");
        res.redirect("/patients/login");
    }
};
