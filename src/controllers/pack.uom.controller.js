import PackUnitOfMeasure from "../models/pack_unit_of_measure/pack.uom.model.js";
import Message from "../helpers/messages.js";
const getPackUnitOfMeasure = async (req, res) => {
    try {
        const PackUomLists = await PackUnitOfMeasure.findAll({});
        res.json(PackUomLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

export default {
    getPackUnitOfMeasure
}