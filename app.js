const exress = require('express');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = exress();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(exress.urlencoded({ extended: false }));
app.use(exress.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById("5f79d56d1644bf316cf013cd")
    .then(user => {
      req.user = user;
      next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404)

mongoose.connect(
  'mongodb+srv://deepak:LHMWm5mwySFXRj8@nodejs.zz6dw.mongodb.net/nodejs?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
  .then(() => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'deepak',
            email: 'deepak@gmail.com',
            cart: { items: [] }
          })
          user.save()
        }
      })
    app.listen(3000, () =>
      console.log('server is listening on port 3000')
    );
  })
