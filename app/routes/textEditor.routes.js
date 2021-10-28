const auth = require("../middleware/auth");

module.exports = app => {
    const textEditors = require("../controllers/textEditor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new TextEditor
    router.post("/", textEditors.create);
  
    // Retrieve all TextEditors
    router.get("/", textEditors.findAll);
  
    // Retrieve all published TextEditors
    router.get("/published", textEditors.findAllPublished);
  
    // Retrieve a single TextEditor with id
    router.get("/:id", textEditors.findOne);
  
    // Update a TextEditor with id
    router.put("/:id", textEditors.update);
  
    // Delete a TextEditor with id
    router.delete("/:id", textEditors.delete);
  
    // Create a new TextEditor
    router.delete("/", textEditors.deleteAll);
  
    app.use('/api/textEditors', auth, router);
};
