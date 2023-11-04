const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const Article = require('./models/Schema')
const orders = require('./models/orders')

//ejs files

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))

//auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//mongoose

const mongoose = require('mongoose');
const { get } = require('http');
const { render } = require('ejs');

mongoose
  .connect("mongodb+srv://Ahmad_RAQ:1w3r5y7i8@cluster0.wrxv6um.mongodb.net/?retryWrites=true&w=majority")
  .then(result => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.log(err);
  });

//pages

//edit

app.get("/data/:id", (req, res) => {
  const id = req.params.id
  Article.findById(req.params.id)
    .then((result) => {
      res.render("edit", { item: result, id: id });
    })
    .catch((err) => {
      console.log(err);
    });
})

//orders

app.get("/orders/:id", (req, res) => {
  const id = req.params.id
  res.render("orders", { id: id })
})

app.post("/orders/:id", (req, res) => {
  const article = new orders(req.body);

  article
    .save()
    .then(result => {
      res.redirect("/ordersSS/:id");
    })
    .catch(err => {
      console.log(err);
    });
})

//OrdersSS
app.get("/ordersSS/:id", (req, res) => {
  const id = req.params.id
  orders.find()
    .then((result) => {
      res.render("ordersSS", { item: result, id: id });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/ordersSS/:id", (req, res) => {
  const id = req.params.id
  const article = new orders(req.body);

  console.log(req.body);

  article
    .save()
    .then(result => {
      res.redirect(`/ordersSS/${id}`);
    })
    .catch(err => {
      console.log(err);
    });
})

/*coming soon

app.get('/edit/:id', (req, res) => {
    res.render('soon')
})

*/