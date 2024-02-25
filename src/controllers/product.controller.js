import Product from "../models/product/product.model.js";
import PackUnitOfMeasure from "../models/pack_unit_of_measure/pack.uom.model.js";
import UnitOfMeasure from "../models/unit_of_measure/unitof.measure.model.js";
import ProductForm from "../models/product_form/product.form.model.js";
import Brand from "../models/brand/brand.model.js";
import GenericName from "../models/generic_name/generic.name.model.js";
import Message from "../helpers/messages.js";
import { isProductHasReference } from "../validations/validation.js";

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await Product.create(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll(
            {
                include: [
                    PackUnitOfMeasure,
                    UnitOfMeasure,
                    ProductForm,
                    Brand,
                    GenericName
                ],
            }
        );
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const product = await Product.findByPk(id);
        const updatedProduct = await product.update(productData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
    }
};


const getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: Message.ProductMessage.ID_NOTFOUND_MESSAGE });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const hasReferences = await isProductHasReference(id);
    if (hasReferences) {
        return res.status(400).json({ error: Message.ProductMessage.REFERENCE_MESSAGE });
    }

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: Message.ProductMessage.ID_NOTFOUND_MESSAGE });
            return;
        }
        await product.destroy({
            include: [
                PackUnitOfMeasure,
                UnitOfMeasure,
                ProductForm,
                Brand,
                GenericName,
            ],
        });

        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

export default {
    getAllProducts,
    createProduct,
    updateProduct,
    getOneProduct,
    deleteProduct
};
