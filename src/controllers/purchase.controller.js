import dotenv from 'dotenv';
dotenv.config();
import Product from "../models/product/product.model.js";
import Imprest from "../models/imprest/imprest.model.js";
import messages from "../helpers/messages.js";
import Purchase from "../models/purchase/purchase.model.js";
import ImprestProduct from "../models/imprest_product/imprest.product.model.js";
import Email from "../models/email/email.model.js";
import nodemailer from "nodemailer";
import ShortUniqueId from 'short-unique-id';

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

const initiateProductPurchase = async (req, res) => {
  try {
    const bodyReq = req.body.data;
    const initiatedPOs = [];

    for (let i = 0; i < bodyReq?.length; i++) {
      const imprest = await ImprestProduct.findOne({
        where: {
          imprest_id: bodyReq[i]?.imprest_id,
          product_id: bodyReq[i]?.product_id,
        },
        include: [
          {
            model: Product,
          },
          {
            model: Imprest,
          },
        ]
      });

      // Check if imprest exists and update purchaseEventTriggered to true
      if (imprest && imprest?.purchaseEventTriggered !== true) {
        await ImprestProduct.update(
          { purchaseEventTriggered: true },
          {
            where: {
              imprest_id: bodyReq[i]?.imprest_id,
              product_id: bodyReq[i]?.product_id,
            },
          }
        );
      }

      const uid = new ShortUniqueId();
      const uidWithTimestamp = uid.stamp(10);

      // Create initiation email message
      const initiationEmailMessage = `Purchase event triggered for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${uidWithTimestamp}`;
      await Email.create({ message: initiationEmailMessage, notificationType: "Purchase Order Triggered", emailtype: true, alertMode: 1 });

      // Continue with the rest of your logic...
      if (imprest && imprest?.purchaseEventTriggered !== true) {
        const obj = { ...bodyReq[i], initiated: true, received: false, purchaseOrderId: uidWithTimestamp, shipped: false, delivered: false };
        await Purchase.create(obj);

        const successEmailMessage = `Purchase has been initiated for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${uidWithTimestamp}`;
        await Email.create({ message: successEmailMessage, emailtype: true, notificationType: "Purchase Order Initiated", alertMode: 1 });

        const stockDetails = `Purchase Order ID: ${uidWithTimestamp}\nProduct: ${imprest?.Product?.description}\nimprest: ${imprest?.imprest?.name}\nAvailable Stock: ${imprest?.available_stock}\nMax Stock: ${imprest?.max_stock}\nMin Stock: ${imprest?.min_stock}`;

        initiatedPOs.push({
          imprestId: bodyReq[i]?.imprest_id,
          productId: bodyReq[i]?.product_id,
          productName: imprest?.Product?.description,
          imprestName: imprest?.imprest?.name,
          stockDetails,
        });
      } else {
        const failureEmailMessage = `Purchase failed for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${uidWithTimestamp}`;
        await Email.create({ message: failureEmailMessage, emailtype: false, notificationType: "Purchase Order Failed", alertMode: 1 });
      }
    }

    if (initiatedPOs.length > 0) {
      const customerEmail = process.env.CUSTOMER_EMAIL;
      const customerEmailSubject = 'Purchase Orders Initiated';
      const customerEmailMessage = `Dear Customer,\n\nThe following Purchase Order(s) have been initiated:\n\n${initiatedPOs.map(po => `PO for imprest_id: ${po.imprestId} and product_id: ${po.productId}\n${po.stockDetails}\n\n`).join('')}`;
      await sendEmail(customerEmail, customerEmailSubject, customerEmailMessage);
      const purchaseData = await Purchase.findAll({
        include: [
          {
            model: Product,
          },
          {
            model: Imprest,
          },
        ],
      });
      res.status(200).json(purchaseData);
    }
    else {
      const purchaseData = await Purchase.findAll({
        include: [
          {
            model: Product,
          },
          {
            model: Imprest,
          },
        ],
      });
      res.status(200).json({ status: false, messages: messages.PurchaseProductMessage.CREATE_ERROR_MESSAGE, data: purchaseData });
    }

  } catch (error) {
    res
      .status(400)
      .json({ error: messages.PurchaseProductMessage.CREATE_ERROR_MESSAGE });
  }
};

const receiveProductPurchase = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await Purchase.findOne({
      where: {
        purchaseOrderId: purchaseId
      }
    });
    const imprest = await ImprestProduct.findOne({
      where: {
        imprest_id: purchase?.imprest_id,
        product_id: purchase?.product_id,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Imprest,
        },
      ]
    });
    const successEmailMessage = `Accepting Purchase has been triggered for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${purchaseId}`;
    await Email.create({ message: successEmailMessage, notificationType: "Accepting Purchase Order Triggered", emailtype: true, alertMode: 1 });
    if (imprest && purchase?.initiated === true && purchase?.shipped === false && purchase?.delivered === false) {
      await purchase.update({ received: true });
      const successEmailMessage = `Purchase acceptance successful for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${purchaseId}`;
      await Email.create({ message: successEmailMessage, notificationType: "Purchase Order Accepted", emailtype: true , alertMode: 1});
      const purchaseData = await Purchase.findAll();
      res.status(200).json(purchaseData);
    } else {
      const failureEmailMessage = `Purchase acceptance failed for Purchase Order ID: ${purchaseId}`;
      await Email.create({ message: failureEmailMessage, notificationType: "Purchase Order Acceptance Failed", emailtype: false, alertMode: 1 });
      const purchaseData = await Purchase.findAll();
      res.status(200).json({ status: false, message: failureEmailMessage, data: purchaseData });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.PurchaseProductMessage.CREATE_ERROR_MESSAGE });
  }
};

const shipProductPurchase = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await Purchase.findOne({
      where: {
        purchaseOrderId: purchaseId
      }
    });
    const imprest = await ImprestProduct.findOne({
      where: {
        imprest_id: purchase?.imprest_id,
        product_id: purchase?.product_id,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Imprest,
        },
      ]
    });
    const successEmailMessage = `Shipping Purchase has been triggered for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${purchaseId}`;
    await Email.create({ message: successEmailMessage, notificationType: "Shipping Purchase Order Triggered", emailtype: true, alertMode: 1 });
    if (imprest && purchase?.initiated === true && purchase?.received === true && purchase?.delivered === false) {
      await purchase.update({ shipped: true });
      const successEmailMessage = `Purchase shipment successful for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${purchaseId}`;
      await Email.create({ message: successEmailMessage, notificationType: "Purchase Order Shipped", emailtype: true, alertMode: 1 });
      const purchaseData = await Purchase.findAll();
      res.status(200).json(purchaseData);
    } else {
      const failureEmailMessage = `Purchase shipment failed for Purchase Order ID: ${purchaseId}`;
      await Email.create({ message: failureEmailMessage, notificationType: "Purchase Order shipment Failed", emailtype: false, alertMode: 1 });
      const purchaseData = await Purchase.findAll();
      res.status(200).json({ status: false, message: failureEmailMessage, data: purchaseData });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.PurchaseProductMessage.CREATE_ERROR_MESSAGE });
  }
};

const deliverProductPurchase = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await Purchase.findOne({
      where: {
        purchaseOrderId: purchaseId
      }
    });
    const imprest = await ImprestProduct.findOne({
      where: {
        imprest_id: purchase?.imprest_id,
        product_id: purchase?.product_id,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Imprest,
        },
      ]
    });
    const successEmailMessage = `Delivering Purchase has been triggered for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${purchaseId}`;
    await Email.create({ message: successEmailMessage, notificationType: "Delivering Purchase Order Triggered", emailtype: true, alertMode: 1 });
    if (imprest && purchase?.initiated === true && purchase?.received === true && purchase?.shipped === true) {
      // purchase event false
      const { id } = imprest;
      const findData = await ImprestProduct.findByPk(id);
      const dataSet = {
        available_stock: imprest?.max_stock - imprest?.available_stock,
        purchaseEventTriggered: false,
      };
      await findData.update(dataSet);
      await purchase.update({ delivered: true });
      const successEmailMessage = `Purchase Delivered successful for Imprest: ${imprest?.imprest?.name} and Product: ${imprest?.Product?.description} with Purchase Order ID: ${purchaseId}`;
      await Email.create({ message: successEmailMessage, notificationType: "Purchase Order Delivered", emailtype: true, alertMode: 1 });
      const purchaseData = await Purchase.findAll();
      res.status(200).json(purchaseData);
    } else {
      const failureEmailMessage = `Purchase delivery failed for Purchase Order ID: ${purchaseId}`;
      await Email.create({ message: failureEmailMessage, notificationType: "Purchase Order Delivery Failed", emailtype: false, alertMode: 1 });
      const purchaseData = await Purchase.findAll();
      res.status(200).json({ status: false, messages: failureEmailMessage, data: purchaseData });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.PurchaseProductMessage.CREATE_ERROR_MESSAGE });
  }
};

const fetchProductPurchase = async (req, res) => {
  try {
    const purchaseData = await Purchase.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: Imprest,
        },
      ],
    });
    res.status(200).json(purchaseData);
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.PurchaseProductMessage.CREATE_ERROR_MESSAGE });
  }
};

export default {
  initiateProductPurchase,
  receiveProductPurchase,
  shipProductPurchase,
  deliverProductPurchase,
  fetchProductPurchase,
};
