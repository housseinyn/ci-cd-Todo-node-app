const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({
      extended: true
}));


const methodOverride = require("method-override");
app.use(methodOverride("_method", {
      methods: ["POST", "GET"]
}));

const fgschema = require("./models/artschema.js");

mongoose.connect('mongodb://admin:password@mongo:27017',{ useNewUrlParser: true, useUnifiedTopology: true });

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the public folder to serve static files
app.use(express.static(__dirname + "/public"));

//find and show all the data in the database
app.get("/", (req, res) => {
      fgschema.find({}, (err, myData) => {
            if (err) {
                  console.log(err);
            } else {
                  res.render("index.ejs", {
                        data: myData
                  });
            }
      });
});
//create a new data
app.post('/create', (req, res) => {
      const myData = new fgschema({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
      });
      myData.save().then(() => {
            res.redirect('/');
      });
});
//update the data in the database
app.get("/update/:id", (req, res) => {
      const id = req.params.id;
      fgschema.find({}, (err, myData) => {
            res.render("update.ejs", { data: myData, fgid: id });
      });
});
app.put("/update/:id", (req, res) => {
      const id = req.params.id;
      fgschema.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
      }, (err, myData) => {
            if (err) {
                  console.log(err);
            } else {
                  res.redirect("/");
            }
      });
}
);
//delete the data in the database
app.delete("/delete/:id", (req, res) => {
      fgschema.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                  console.log(err);
            } else {
                  res.redirect("/");
            }
      });
}
);
//



app.listen(3000, () => console.log('Server started!'));