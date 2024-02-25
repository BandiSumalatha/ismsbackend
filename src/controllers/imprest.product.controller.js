import ImprestProduct from "../models/imprest_product/imprest.product.model.js";
import Product from "../models/product/product.model.js";
import Imprest from "../models/imprest/imprest.model.js";
import UserRole from "../models/user/user.role.model.js";
import Cameras from "../models/camera/camera.model.js"
import messages from "../helpers/messages.js";

const getImprestProducts = async (req, res) => {
    try {
    const userId = req.user.id;
    const userRoles = await UserRole.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Imprest,
            }
        ],
    });
    const imprestProducts = await ImprestProduct.findAll(
        {
            where: { imprest_id: userRoles.map(userRole => userRole.imprest_id) },
            include: [
                {
                    model: Product,
                },
                {
                    model: Imprest,
                    include: [
                        {
                            model: Cameras,

                        },
                    ]
                },

            ],
        });

    res.status(200).json(imprestProducts)

    } catch (error) {
    res.status(500).json({ message: messages.ServerMessage.ERROR_MESSAGE })
    }
}

const fetchImprestProducts = async (req, res) => {
    try {
    const cameras = await Cameras.findAll()
    const imprestProducts = await ImprestProduct.findAll(
        {
            include: [
                {
                    model: Product,
                },
                {
                    model: Imprest
                },
            ],
        });

    const imprestData = {};
    imprestProducts.forEach(({ imprest, Product, ...rest }) => {
        if (imprest && imprest.id) {
            const id = imprest.id;
            if (!imprestData[id]) {
                imprestData[id] = {
                    ...rest?.dataValues,
                    imprest: { ...imprest.dataValues },
                    Product: { ...Product?.dataValues },
                    cameras: [],
                };
            }
            if (imprestData[id].cameras?.length < 1) {
                imprestData[id].cameras.push(cameras?.filter((val) => imprest.cameras?.split(",")?.includes(val?.camera_name)));
            }
        }
    });

    const imprestDataRes = Object.values(imprestData);
    res.status(200).json(imprestDataRes);

    } catch (error) {
        res.status(500).json({ message: messages.ServerMessage.ERROR_MESSAGE })
    }
}

const createImprestProduct = async (req, res) => {
    try {
        const imprestProductData = req.body;
        const imprestId = imprestProductData.imprest_id;
        const productId = imprestProductData.product_id;

        const existingImprestProduct = await ImprestProduct.findOne({
            where: {
                imprest_id: imprestId,
                product_id: productId,
            },
        });

        if (existingImprestProduct) {
            return res.status(400).json({
                error: 'Duplicate entry. This product is already associated with the specified imprest.',
            });
        }

        const imprestProduct = await ImprestProduct.create(imprestProductData);
        console.log(imprestProduct, "imprestProduct");
        res.status(201).json(imprestProduct);
    } catch (error) {
        // Handle other errors
        res.status(400).json({ error: messages.ImprestProductMessage.CREATE_ERROR_MESSAGE });
    }
};


const updateImprestProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const imprestProduct = req.body;
        if (imprestProduct.availablestock >= imprestProduct.maxstock
            || imprestProduct.maxstock <= imprestProduct.minstock) {
            return res.status(400).json({ error: messages.ImprestProductMessage.INVALID_STOCK_MESSAGE });
        }
        let dbImprestProduct = await ImprestProduct.findByPk(id);

        if (!dbImprestProduct) {
            return res.status(404).json({ error: 'ImprestProduct not found.' });
        }

        dbImprestProduct = await dbImprestProduct.update(imprestProduct);
        res.status(200).json(dbImprestProduct);
    } catch (error) {
        res.status(400).json({ error: messages.ImprestProductMessage.UPDATE_ERROR_MESSAGE });
    }
};

const getImprestProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const imprestProduct = await ImprestProduct.findByPk(id, {
            include: [
                { model: Imprest },
                { model: Product }
            ]
        });

        if (!imprestProduct) {
            return res.status(404).json({ error: messages.ImprestProductMessage.ID_NOTFOUND_MESSAGE });
        }

        res.status(200).json(imprestProduct);
    } catch (error) {
        res.status(500).json({ error: messages.ServerMessage.ERROR_MESSAGE });
    }
};


const deleteImprestProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const imprestProduct = await ImprestProduct.findByPk(id);

        if (!imprestProduct) {
            return res.status(404).json({ error: messages.ImprestProductMessage.ID_NOTFOUND_MESSAGE });
        }

        const deletedImprestProduct = imprestProduct.toJSON();

        await imprestProduct.destroy();

        res.status(200).json({ message: messages.ImprestProductMessage.UPDATE_SUCCESS_MESSAGE, deletedImprestProduct });
    } catch (error) {
        res.status(400).json({ error: messages.ImprestProductMessage.DELETE_ERROR_MESSAGE });
    }
};

export default {
    getImprestProducts,
    fetchImprestProducts,
    createImprestProduct,
    updateImprestProduct,
    getImprestProductById,
    deleteImprestProduct
}