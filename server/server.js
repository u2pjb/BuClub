const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET route - Allows to get all the items
// example: localhost:3000/clothes?page=0&perPage=2 -- get request
app.get("/people", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  // original example is db.json
  fs.readFile("memdb.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const start = page * perPage;
    const end = start + perPage;

    const result = jsonData.members.slice(start, end);

    res.status(200).json({
      items: result,
      total: jsonData.members.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.members.length / perPage),
    });
  });
});

// POST route - Allows to add a new item
// example: localhost:3000/clothes
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.post("/people", (req, res) => {
  const {
    firstname,
    lastname,
    addressline1,
    addressline2,
    addressline3,
    addressline4,
    postcode,
    phonenumber,
    email,
    paid,
    notes,
    image,
  } = req.body;

  fs.readFile("memDB.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const maxId = jsonData.members.reduce(
      (max, item) => Math.max(max, item.id),
      0
    );

    const newItem = {
      id: maxId + 1,
      firstname,
      lastname,
      addressline1,
      addressline2,
      addressline3,
      addressline4,
      postcode,
      phonenumber,
      email,
      paid,
      notes,
      image: "assets/images/dflt_img.jpg",
    };

    jsonData.members.push(newItem);

    fs.writeFile("memDB.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).json(newItem);
    });
  });
});

// PUT route - Allows to update an item
// example: localhost:3000/clothes/1
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.put("/people/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    firstname,
    lastname,
    addressline1,
    addressline2,
    addressline3,
    addressline4,
    postcode,
    phonenumber,
    email,
    paid,
    notes,
    image,
  } = req.body;

  fs.readFile("memDB.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const index = jsonData.members.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.members[index] = {
      id,
      firstname,
      lastname,
      addressline1,
      addressline2,
      addressline3,
      addressline4,
      postcode,
      phonenumber,
      email,
      paid,
      notes,
      image,
    };

    fs.writeFile("memDB.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(200).json(jsonData.members[index]);
    });
  });
});

// DELETE route - Allows to delete an item
// example: localhost:3000/clothes/1
app.delete("/people/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("memDB.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const index = jsonData.members.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.members.splice(index, 1);

    fs.writeFile("memDB.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(204).send();
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
