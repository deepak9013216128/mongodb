const exress = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const app = exress();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(exress.urlencoded({ extended: false }));
app.use(exress.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById("5f7942f5aa7467cee2db9256")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404)

mongoConnect(() => {
  app.listen(3000, () =>
    console.log('server is listening on port 3000')
  );
})
