import Brand from "../models/brand/brand.model.js";
import Message from "../helpers/messages.js";
import Hospital from "../models/hospital/hospital.model.js";
import Product from "../models/product/product.model.js";

const getBrand = async (req, res) => {
  try {
    const BrandList = await Brand.findAll({
      include: Hospital
    });
    res.status(200).json(BrandList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const createBrand = async (req, res) => {
  try {
    const brandData = req.body;
    const newBrand = await Brand.create(brandData);
    res.status(201).json(newBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brandData = req.body;

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: Message.BrandMessage.ID_NOTFOUND_MESSAGE });
    }

    const updatedBrand = await brand.update(brandData);
    res.status(200).json(updatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const productReferences = await Product.findOne({ where: { brand_id: id } });

    if (productReferences) {
      return res.status(400).json({ error: Message.BrandMessage.REFERENCE_MESSAGE });
    }

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: Message.ServerMessage.ID_NOTFOUND_MESSAGE });
    }

    const deletedBrand = brand.toJSON();
    await brand.destroy();

    res.status(200).json({ message: Message.BrandMessage.DELETE_SUCCESS_MESSAGE, deletedBrand });
  } catch (error) {
    res.status(500).json({ error: Message.ServerMessage.DELETE_ERROR_MESSAGE });
  }
};



const getOneBrand = async (req, res) => {
  try {
    // console.log(req,"req"+res)
    const { id } = req.params;
    const brand = await Brand.findByPk(id, {
      include: Hospital,
    });

    if (!brand) {
      return res.status(404).json({ error: Message.BrandMessage.ID_NOTFOUND_MESSAGE });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};


export default {
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getOneBrand
};