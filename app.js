const exress = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error')

const app = exress();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(exress.urlencoded({ extended: false }));
app.use(exress.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404)

app.listen(3000, () => console.log('server is listening on port 3000'));