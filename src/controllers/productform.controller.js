import ProductForm from "../models/product_form/product.form.model.js";
import Message from "../helpers/messages.js";
const getProductFrom = async (req, res) => {
    try {
        const ProductFromList = await ProductForm.findAll({});
        res.json(ProductFromList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

export default {
    getProductFrom,
};