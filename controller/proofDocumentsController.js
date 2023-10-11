const fs = require("fs");
const driverServices = require("../services/proofDocumentsServices");

exports.proofDocuments = async (req, res) => {
  try {
    let result;
    let driver = await driverServices.getDriver(req.user.id);
    if (!driver[0]) {
      return res.status(404).json({ errors: ["driver not found"] });
    }

    if (!req.files) {
      return res.status(400).json({
        errors: [{ msg: "Files is Required" }],
      });
    }
    let data = {
      proofOfIdentityFront: req.files.proofOfIdentityFront[0].filename,
      proofOfIdentityBack: req.files.proofOfIdentityBack[0].filename,
      residenceCardFront: req.files.residenceCardFront[0].filename,
      residenceCardBack: req.files.residenceCardBack[0].filename,
      drivingLicense: req.files.drivingLicense[0].filename,
      vehicleLicense: req.files.vehicleLicense[0].filename,
      operatingCard: req.files.operatingCard[0].filename,
      transferDocument: req.files.transferDocument[0].filename,
    };

    result = await driverServices.proofDocuments(data, req.user.id);

    if (!result) {
      return res.status(400).send("Documents uploaded failed");
    }
    return res.status(200).send("Documents uploaded successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Internal server error" });
  }
};
