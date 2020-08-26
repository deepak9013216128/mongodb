const exress = require('express');
const path = require('path');

const admin = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = exress();

app.use(exress.urlencoded({ extended: false }));
app.use(exress.static(path.join(__dirname, 'public')))

app.use('/admin', admin.routes);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000, () => console.log('server is listening on port 3000'));