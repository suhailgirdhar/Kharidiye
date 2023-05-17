const login = async function (req, res, next) {

    console.log(req.flash("signup-message"));

    if (!req.user) {

        res.render("login", {
            username: "Log in",
            signup: "Sign up",
        });

    }

    if (req.user) {
        res.redirect("/profile");
    }
    
}

module.exports = login