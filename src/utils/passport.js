// passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    clientID: "492147582846-cnvmg9au6p1e92mjelabvk7h2io7coii.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    passReqToCallback: true,
    scope: ['profile', 'email']
}, function (req, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((userProfile, done) => {
  done(null, userProfile);
});

passport.deserializeUser((userProfile, done) => {
  done(null, userProfile);
});

// Export a function to configure and return the Passport instance
module.exports = function configurePassport() {
    return passport;
};
