import Stock from "../models/stock/stock.model.js";
import Message from "../helpers/messages.js";

const getStockData = async (req, res) => {
  try {
    const stock = await Stock.findAll();
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const updateStockData = async (req, res) => {
  try {
    const { id } = req.params;
    const stockData = req.body;

    const stock = await Stock.findByPk(id);

    const updatedStockData = await stock.update(stockData);

    res.status(200).json(updatedStockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};

export default {
  getStockData,
  updateStockData
};