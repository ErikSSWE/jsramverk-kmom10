const db = require("../models");
const TextEditor = db.textEditors;

// Create and Save a new TextEditor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a TextEditor
    const textEditor = new TextEditor({
      title: req.body.title,
      text: req.body.text,
    });
  
    // Save TextEditor in the database
    textEditor
      .save(textEditor)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the TextEditor."
        });
      });
};

// Retrieve all TextEditors from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    TextEditor.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving textEditors."
        });
      });
};

// Find a single TextEditor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    TextEditor.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found TextEditor with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving TextEditor with id=" + id });
      });
};

// Update a TextEditor by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    TextEditor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update TextEditor with id=${id}. Maybe TextEditor was not found!`
          });
        } else res.send({ message: "TextEditor was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TextEditor with id=" + id
        });
      });
};

// Delete a TextEditor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    TextEditor.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete TextEditor with id=${id}. Maybe TextEditor was not found!`
          });
        } else {
          res.send({
            message: "TextEditor was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TextEditor with id=" + id
        });
      });
};

// Delete all TextEditors from the database.
exports.deleteAll = (req, res) => {
    TextEditor.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} TextEditors were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all textEditors."
        });
      });
};

// Find all published TextEditors
exports.findAllPublished = (req, res) => {
    TextEditor.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving textEditors."
        });
      });
};
