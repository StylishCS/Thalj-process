const dashboardServices = require("../services/dashboardServices");

exports.dashboard = async (req, res) => {
  try {
    const dashboard = await dashboardServices.dashboard();
    if (dashboard.length > 0) {
      dashboard[0].proofOfIdentityFront =
        "http://mircle50-001-site1.atempurl.com/" +
        dashboard[0].proofOfIdentityFront;
      dashboard[0].proofOfIdentityBack =
        "http://mircle50-001-site1.atempurl.com/" +
        dashboard[0].proofOfIdentityBack;
      dashboard[0].residenceCardFront =
        "http://mircle50-001-site1.atempurl.com/" +
        dashboard[0].residenceCardFront;
      dashboard[0].residenceCardBack =
        "http://mircle50-001-site1.atempurl.com/" +
        dashboard[0].residenceCardBack;
      dashboard[0].drivingLicense =
        "http://mircle50-001-site1.atempurl.com/" + dashboard[0].drivingLicense;
      dashboard[0].vehicleLicense =
        "http://mircle50-001-site1.atempurl.com/" + dashboard[0].vehicleLicense;
      dashboard[0].operatingCard =
        "http://mircle50-001-site1.atempurl.com/" + dashboard[0].operatingCard;
      dashboard[0].transferDocument =
        "http://mircle50-001-site1.atempurl.com/" +
        dashboard[0].transferDocument;
      return res.status(200).json(dashboard);
    } else {
      res.status(404).json({ errors: ["not found"] });
    }
  } catch (error) {
    res.status(500).json({ errors: ["Internal server error"] });
  }
};

exports.Acceptance = async (req, res) => {
  try {
    const dashboard = await dashboardServices.Acceptance(req.params.id);
    if (dashboard) {
      res.status(200).json({ msg: "It has been Accepted" });
    } else {
      res.status(404).json({ errors: ["Not Accepted"] });
    }
  } catch (error) {
    res.status(500).json({ errors: ["Internal server error"] });
  }
};
