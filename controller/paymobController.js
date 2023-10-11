async function payment(req, res) {
  console.log(req.paymentKey)
  res.status(200).json({
    msg: `https://accept.paymob.com/api/acceptance/iframes/793481?payment_token=${req.paymentKey.token}`,
  });
}

async function paymentStatus(req, res) {
  res.status(200).json({ data: res.req.query });
}

module.exports = { payment, paymentStatus };
