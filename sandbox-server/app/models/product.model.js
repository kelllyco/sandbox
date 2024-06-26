module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            description: String,
            category: String,
            price: Number,
            available: Boolean,
            image: String
        }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Product = mongoose.model("product", schema);
    return Product;

}