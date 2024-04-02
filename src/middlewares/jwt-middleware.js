import JWT from "passport-jwt";
import { JWT_SECRET } from "../config/serverConfig.js";
import User from "../models/user.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const passportAuth = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      } else {
        done(null, user);
      }
    })
  );
};

export default { passportAuth };
