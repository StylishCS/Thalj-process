async function orderRegister(req, res, next) {
  try {
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
    console.log(req.billingData);
    let data = {
      auth_token: req.authRes,
      delivery_needed: "false",
      amount_cents: "10000",
      currency: "EGP",
      items: [
        {
          name: "delivery",
          amount_cents: req.body.price,
        },
      ],
      shipping_data: {
        apartment: req.billingData.senderInfo.apartmentNumber,
        email: req.user.email,
        floor: req.billingData.senderInfo.floorNumber,
        first_name: req.user.name.split(" ")[0],
        street: req.billingData.senderInfo.location,
        building: req.billingData.senderInfo.buildingNumber,
        phone_number: req.billingData.senderInfo.phoneNumber,
        city: req.billingData.senderInfo.region,
        country: "KSA",
        last_name: req.user.name.split(" ")[1],
      },
    };
    let request = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    let response = await request.json();
    req.orderData = response;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
}

// let billing = {
//       apartment: response2.senderInfo.apartmentNumber,
//       email: req.user.email,
//       floor: response2.senderInfo.floorNumber,
//       first_name: req.user.name.split(" ")[0],
//       street: response2.senderInfo.location,
//       building: response2.senderInfo.buildingNumber,
//       phone_number: response2.senderInfo.phoneNumber,
//       shipping_method: "Delivery",
//       city: response2.senderInfo.region,
//       last_name: req.user.name.split(" ")[1],
//     };
module.exports = orderRegister;
