async function authPayment(req, res, next) {
  try {
    let data = {
      api_key: process.env.api_key_paymob,
    };
    let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await request.json();
    // console.log(response)
    req.authRes = response.token;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
}

module.exports = authPayment;