const User = require('../models/user');


exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users); // Send the users in JSON format
    })
    .catch(err => {
      res.status(500).json({ message: 'Fetching users failed.' });
    });
};

exports.getAddUser = (req, res, next) => {
    res.render('user/edit-user', {
      pageTitle: 'Add User',
      path: '/add-user',
      editing: false
      
    });
  };
  
  exports.postAddUser = (req, res, next) => {
    const userName = req.body.name;
    const Number = req.body.number;
    const Email = req.body.email;
    console.log('Received data from frontend:', userName, Number, Email);

    User.create({
      name:userName,
      number:Number,
      email:Email
 })
 .then(result=>{
   console.log('created user');
   console.log(res)
//   res.redirect('/user');
    })
    .catch(err=>console.log(err));
  }
  exports.getEditUser = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/user');
    }
    const useId = req.params.userId;
    User.findByPk(useId)
    .then(user => {
      if (!user) {
        return res.redirect('/user');
      }
      res.render('user/edit-user', {
        pageTitle: 'Edit User',
        path: '/edit-user',
        editing: editMode,
        user: user
      });
    })
    .catch(err=>console.log(err))
  };
  
  exports.postEditUser = (req, res, next) => {
    const useId = req.body.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedNumber = req.body.number;
    User.findByPk(useId)
    .then(user=>{
      user.name=updatedName;
      user.email=updatedEmail;
      user.number=updatedNumber;
      return user.save();
    })
    .then(result=>console.log('update user'))
    .catch(err=>console.log(err))
      res.redirect('/user');// here if we have to click on the reload to see the changes then we should move this line to then block under the result  or we can keep it under the catch 
  };
  
  exports.getUsers = (req, res, next) => {
    User.findAll()
      .then(users => {
        res.render('user', {
          prods: users,
          pageTitle: 'All Users',
          path: '/users'
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postDeleteUser = (req, res, next) => {
    const userId = req.params.userId; // Use req.params.userId
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        return user.destroy();
      })
      .then(result => {
        console.log('User deleted successfully');
        res.status(200).json({ message: 'User deleted successfully' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to delete user.' });
      });
  };
  