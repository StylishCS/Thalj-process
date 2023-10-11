const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser } = require("../services/loginDriversServices");
const { getId } = require("../services/signUpDriversServices");

async function loginController(req, res, next) {
  try {
    const result = await getUser(req.body.email, req.body.password);
    if (!(await bcrypt.compare(req.body.password, result[0].password))) {
      return res.status(400).json({ msg: "password isn't correct" });
    }
    result[0].proofOfIdentityFront =
      "http://mircle50-001-site1.atempurl.com/" +
      result[0].proofOfIdentityFront;
    result[0].proofOfIdentityBack =
      "http://mircle50-001-site1.atempurl.com/" + result[0].proofOfIdentityBack;
    result[0].residenceCardFront =
      "http://mircle50-001-site1.atempurl.com/" + result[0].residenceCardFront;
    result[0].residenceCardBack =
      "http://mircle50-001-site1.atempurl.com/" + result[0].residenceCardBack;
    result[0].drivingLicense =
      "http://mircle50-001-site1.atempurl.com/" + result[0].drivingLicense;
    result[0].vehicleLicense =
      "http://mircle50-001-site1.atempurl.com/" + result[0].vehicleLicense;
    result[0].operatingCard =
      "http://mircle50-001-site1.atempurl.com/" + result[0].operatingCard;
    result[0].transferDocument =
      "http://mircle50-001-site1.atempurl.com/" + result[0].transferDocument;
    delete result[0].password;
    const id = await getId(req.body.email);
    const token = await jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    return res.status(200).json({ data: result, token });
  } catch (error) {
    return res.status(400).json({
      msg: "The email address or mobile number you entered isn't connected to an account.",
    });
  }
}

module.exports = { loginController };
