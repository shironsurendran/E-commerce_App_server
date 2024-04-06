// const Order = require('../models/Order');
// const Address = require('../models/Address');
// const Cart = require('../models/Cart');
// const Product =  require('../models/Product');
// const User = require('../models/User');

// exports.createOrder = async(req,res) =>{
//     let id = req.body.id;
//     let cart = req.body.cart;
//     let address = req.body.address;
//     console.log("hihihihi",id)
//     if(id != null && id != 'undefind' && cart.length != null ){
//       await  Address.findOne({_id:req.body.address}).then(add=>{
//             let location = {address:add.address,locality:add.locality,city:add.city,state:add.state,pincode:add.pincode,name:add.name,phone:add.phone,Type:add.Type};
//             // console.log(address);
//             if(address != null){
//                 Cart.find({_id:{$in :cart}}).then(data=>{
//                     let order = data.map(x=>{return {product :x.Product,quantity:x.quantity,size:x.size}});
//                     let totol = new Order({
//                         userId:req.body.id,
//                         Product:order,
//                         address:location,
//                         total:req.body.total
//                     }).save().then(docs=>{
//                         res.status(200).json(docs)
//                     }).catch(err=>{
//                         res.status(404).json(err)
//                     })
//                 }).catch(err=>{
//                     res.status(404).json(err);
//                 })  
//             }else{
//                 res.status(404).json({warning:"please put user address"});
//             }
//         }).then(data=>{
//             Cart.deleteMany({_id:{$in:cart}}).then(data=>{
//                 res.status(200).json(data);
//             }).catch(err=>res.json(err));
//         })
//     }else{
//         res.status(404).json({message:"invalid process"});
//     }
// }

// exports.getOrder = async(req,res) =>{
//     let id = req.body.id;
//     Order.find({userId:id},[],{sort:{'_id':-1}})
//     .populate({path:'Product.product'})
//     .populate({path:'userId'})
//     .then(docs=>{res.json(docs)}).catch(err=>{res.json(err)})
// }

// exports.findProducts = (req,res) =>{
//     let productid = req.params.productid;
//     Order.find({'Product._id': productid },
//             {Product:
//                 { $elemMatch:
//                     {
//                         _id: productid
//                     }
//                 }
//             }).populate('Product.product')
//             .then(docs=>{
//                {docs?res.status(200).json(docs):res.status(200).json({message:'Product Not Found'})} 
//             }).catch(err=>{
//                 res.status(404).json(err);
//             })
// }

// exports.findOrderDetails = (req,res) =>{
//     let OrderId = req.params.OrderId;
//     Order.find({OrderId:OrderId})
//     .populate({path:'Product.product'})
//     .populate({path:'userId'})
//     .then(docs=>{res.json(docs)}).catch(err=>{res.json(err)})

// }

// exports.cancelOrder = async(req,res)=>{
//         try{
//             if(req.body.id != null && req.body.id != 'undefined'){
//                 const docs = await Order.updateOne({_id:req.body.id},{$set:{status:req.body.status}})
//                 res.status(200).json(docs);
//             }
//         }catch(err){
//             res.status(404).json(err)
//         }
// }

// exports.delOrder =(req,res)=>{
//     let id = req.body.id;
//     Order.deleteOne({_id:id}).then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         res.json(err)
//     })
// }

const Order = require('../models/Order');
const Address = require('../models/Address');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    let id = req.body.id;
    let cart = req.body.cart;
    let address = req.body.address;

    if (id && cart && cart.length) {
      const add =  Address.findOne({ _id: req.body.address });
      if (add) {
        let location = {
          address: add.address,
          locality: add.locality,
          city: add.city,
          state: add.state,
          pincode: add.pincode,
          name: add.name,
          phone: add.phone,
          Type: add.Type
        };

        const data = await Cart.find({ _id: { $in: cart } });
        let order = data.map(x => ({
          product: x.Product,
          quantity: x.quantity,
          size: x.size
        }));

        const newOrder = new Order({
          userId: id,
          Product: order,
          address: location,
          total: req.body.total
        });

        const savedOrder =  newOrder.save();
        await Cart.deleteMany({ _id: { $in: cart } });

        res.status(200).json(savedOrder);
      } else {
        res.status(404).json({ warning: "Address not found" });
      }
    } else {
      res.status(404).json({ message: "Invalid process" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOrder = async (req, res) => {
  try {
    let id = req.body.id;
    const orders = await Order.find({ userId: id })
      .sort({ _id: -1 })
      .populate({ path: "Product.product" })
      .populate({ path: "userId" });

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findProducts = async (req, res) => {
  try {
    let productid = req.params.productid;
    const orders = await Order.find(
      { "Product._id": productid },
      { Product: { $elemMatch: { _id: productid } } }
    )
      .populate("Product.product");

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findOrderDetails = async (req, res) => {
  try {
    let orderId = req.params.orderId;
    const order = await Order.findOne({ _id: orderId })
      .populate({ path: "Product.product" })
      .populate({ path: "userId" });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    let id = req.body.id;
    const updatedOrder = await Order.updateOne(
      { _id: id },
      { $set: { status: req.body.status } }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delOrder = async (req, res) => {
  try {
    let id = req.body.id;
    const deletedOrder = await Order.deleteOne({ _id: id });

    res.json(deletedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};
