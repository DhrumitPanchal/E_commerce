const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "155788730594-ji9nohfds406o4mo0j8aor6p5msd8rsj.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
