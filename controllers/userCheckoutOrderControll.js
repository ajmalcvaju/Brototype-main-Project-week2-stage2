const User = require("../model/userModel");
const Address=require("../model/addressModel");
const Order = require("../model/orderModel");

const checkoutAddAddress=async (req, res) =>{
    try {
      const {houseName,street,district,state,pincode,addressType}=req.body
    const email=req.session.email
    const user = await User.findOne({ email });
    const userId=user._id 
    console.log(userId) 
    const address=new Address({userId:userId,houseName:houseName,street:street,district:district,state:state,pincode:pincode,addressType:addressType})
    const addressData=await address.save()
    
    const addresses = await Address.find({ userId });
    res.redirect("/checkout")
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
   }
   const checkoutEditAddress=async (req, res) =>{
    try {
        const addId=req.query.id
        console.log(addId)
        const {houseName,street,district,state,pincode,addressType}=req.body
        await Address.updateOne(
          { _id: addId },
          { $set: {houseName,street,district,state,pincode,addressType} }
        );
        const email=req.session.email
          const user = await User.findOne({email});
          const userId = user._id
          const addresses = await Address.find({ userId });
        res.redirect("/checkout")
   } catch (error) {
    console.log(error.message);
   }
   }
   const orderCancell=async(req,res)=>{
    try {
       const orderId=req.query.orderId
       const productId=req.query.productId
    console.log(orderId)
    console.log(productId)
    const order = await Order.updateOne(
      {_id:orderId,'items.productId': productId},
      { $set: { 'items.$.status': 'Cancelled' } }
  );
  res.redirect("/orderStatus")
     
    } catch (error) {
        console.log(error.message);
    }
   }


   module.exports={checkoutAddAddress,checkoutEditAddress,orderCancell}