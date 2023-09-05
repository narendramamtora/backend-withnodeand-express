const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

//!to call this below function we have to go for user/1
exports.getProducts = (req, res, next) => {
const user1=1
  Product.findByPk(user1)
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  })
})
  .catch(err=>console.log(err))
};


exports.getProductUsers = (req, res, next) => {  
  const productId = 1;
  User.findAll({
    include: [
      {
        model: Cart,
        required: true, 
        include: [
          {
            model: Product,
            where: { id: productId },
          },
        ],
      },
    ],
  })
    .then(users => {
      res.render('shop/product-users', {
        users: users,
        pageTitle: 'Users who added this product to their cart',
        path: '/products',
      });
    })
    .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  })
})
  .catch(err=>console.log(err))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
}; 

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
  })
})
  .catch(err=>console.log(err))
};

//!we are getting the products of the existing user and render then on screen 
exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart=>{
    //?after creating the cart we can fetch the products now 
    return cart.getProducts().then(products=>{
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
  }).catch(err=>console.log(err))
})
.catch(err=>console.log(err))

});
}
exports.postCart = (req, res, next) => {
  const prodId = req. body.productId;
  let newQuantity=1;
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart
    return cart.getProducts({where:{id:prodId}})
  })
  //?if there is not products
  .then(products=>{
    let product;
    if(products.length>0){
      product= products[0] 
    }
    
    if(product){ // 
      const oldQuantity=product.cartItem.quantity
      newQuantity=oldQuantity+1;
       return product; // if we got the product then we can return it from here        
    }
    return Product.findByPk(prodId) 
  })
  //?here data will handle the new added product and the quantity
  .then(product=>{
    return fetchedCart.addProduct(product,{ 
      through:{ quantity:newQuantity } });
  })
  .then(()=>{
    res.redirect('/cart')
  })
  .catch(err=>console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
    req.user.getCart()
    .then(cart=>{
    return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
      const product=products[0]
      product.cartItem.destroy();
    })
    .then(result=>{
      res.redirect('/cart')
    })
    .catch(err=>console.log(err))
    
  }

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
