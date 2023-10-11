async function paymentKeyAuth(req, res, next) {
  try {
    // console.log(req.orderData.token);
    // console.log(req.orderData.id);
    let request2 = await fetch(
      `http://mircle50-001-site1.atempurl.com/orders/${req.params.orderId}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.headers.authorization}`,
        },
      }
    );
    let response2 = await request2.json();
    req.billingData = response2;
    // console.log(response2);
    let billing = {
      apartment: response2.senderInfo.apartmentNumber,
      email: req.user.email,
      floor: response2.senderInfo.floorNumber,
      first_name: req.user.name.split(" ")[0],
      street: response2.senderInfo.location,
      building: response2.senderInfo.buildingNumber,
      phone_number: response2.senderInfo.phoneNumber,
      shipping_method: "Delivery",
      city: response2.senderInfo.region,
      last_name: req.user.name.split(" ")[1],
      country: "KSA",
    };
    let data = {
      auth_token: req.authRes,
      amount_cents: req.body.price,
      expiration: 3600,
      order_id: req.orderData.id,
      billing_data: billing,
      currency: "EGP",
      integration_id: 4272185,
      lock_order_when_paid: "false",
    };
    let request = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    let response = await request.json();
    // console.log("payment key: ",response);
    req.paymentKey = response;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
}

module.exports = paymentKeyAuth;
