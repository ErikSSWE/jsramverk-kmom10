module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      text: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const TextEditor = mongoose.model("textEditor", schema);
  return TextEditor;
};