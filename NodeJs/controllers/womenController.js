const Women = require("../models/women");
const checkAuth = require('../middleware/CheckAuth');
//insert product
exports.insertWomen = (req, res) => {
  const women = new Women({
    userId: req.userData._id,
    brand: req.body.brand,
    name: req.body.name,
    Rate: req.body.Rate,
    description: req.body.description,
    code: req.body.code,
    productImage: req.body.productImage,
    size: req.body.size,
    offer:req.body.offer
  })
    women.save()
    .then(docs => {
      res.status(200).json({
        message: "Create successfully",
        user_id: docs.userId,
        Brand: docs.brand,
        ProductName: docs.name,
        ProductRate: docs.Rate,
        Description: docs.description,
        productImage: docs.productImage,
        Size: docs.size,
        offer:docs,offer,
        Id: docs._id,
        Status: {
          response: "200 Ok",
          method: "POST"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

//get product

exports.get_product = (req, res) => {
  Women.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json({
	Total:data.length,
	Products:data
	});
    }
  });
};

exports.filter = (req, res) => {
  var a = req.body.Rate;
  if (req.body.brand == "all") {
    Women.find(function(err, data) {
      if (err) return handleError(err);
      if (data) {
        res.json(data);
      } else {
        res.status(500).json(err);
      }
    });
  } 
  else {
    if (req.body.Rate ==  null) 
    {
      var query = Women.where(req.body);
      query.find(function(err, data) {
        if (err) return handleError(err);
        if (data) {
          res.json(data);
        } else {
          res.status(500).json(err);
        }
      });
    } else {
            if(a.length == 2){
              let c = a[0];
              let b = a[1];
              Women.find({ Rate: { $gte: c, $lte: b } })
                .then(docs => {
                  res.json(docs);
                })
                .catch(err => {
                  res.json(err);
                });
            }
            else{
              let c = a[0];
              Women.find({Rate:{$gte:c}})
              .then(docs=>{
                res.json(docs);
              }).catch(err=>{
                res.json(err);
              })
            }
    }
  }
};

exports.getProductByCode = (req,res)=>{
  const code = req.params.code;
  Women.find({code:code},(err,data)=>{
    if(err) return handleError(err);
    if(data){
      res.json(data)
    }else{
      res.status(500).json(err)
    }
  })
}

exports.updateProduct = (req,res) =>{
  const code = req.params.code;
  Women.updateOne({code:code},{$set:req.body},(err,data)=>{
    if(err) return handleError(err);
    if(data){
      res.json(data)
    }else{
      res.json(err)
    }
  })
}