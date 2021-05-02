const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const ms = require("ms");
const passport = require("passport");
const passportJwt = require('passport-jwt');

//this is for local verification strategy of passport
const authLocal = (req, res, next) => {
  try {
    passport.authenticate("local", { session: false }, function (err, user, info) {
        if (err || !user) {
          let error = createError(401, err);
          return next(error);
        }

        const JWT_EXPIRATION_MS = ms(
          process.env.AUTH_EXPIRATION_DAYS
        ).toString();

        const payload = {
          userId: user._id.toString(),
          role: user.role,
          expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
        };

        //Assign payload to req.user
        req.login(payload, { session: false }, function (err) {
          if (err) {
            return next(err);
          }
        });

        const token = jwt.sign(
          JSON.stringify(payload),
          process.env.AUTH_SECRET_KEY
        );

        req.token = token; // allocate token to req variable

        return next();
      }
    )(req, res, next);
    // return next();
  } catch (err) {
    next(err);
  }
};

const authJwt = (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, function (err, user, info) {
        if (err || !user) {
          let error = createError(401, err);
          return next(error);
        }

        //Assign payload to req.user
        req.login(info, { session: false }, function (err) {
          if (err) {
            return next(err);
          }
        });

        let tokenFn = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
        req.token = tokenFn(req); // allocate token to req variable

        return next();
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(403, 
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }

    return next();
  };
};

module.exports = {
  authLocal,
  authJwt,
  authorize
};
