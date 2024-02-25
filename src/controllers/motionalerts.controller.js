import messages from "../helpers/messages.js";
import Email from "../models/email/email.model.js";
import ObjectDetection from "../models/objectDetection/objectDetection.model.js"
import motionAlertModel from "../models/merakicamera/motionalerts.model.js";
import ObjectCountTable from "../models/objectDetection/objectCount.model.js";

const handleMotionAlert = async (req, res) => {
  try {
    const alertData = req.body;
    const newAlertData = await motionAlertModel.create(alertData);
    res.status(201).json(newAlertData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: messages.NotificationMessage.ALERT_ERROR_MESSAGE_CREATE });
  }
};

const fetchAlerts = async (req, res) => {
  try {
    const ObjectDetectionData = await ObjectDetection.findAll();
    res.status(200).json(ObjectDetectionData);
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.NotificationMessage.ALERT_FAILED_MESSAGE });
  }
}

const fetchCamersAlerts = async (req, res) => {
  try {
    const motionAlertData = await motionAlertModel.findAll();
    res.status(200).json(motionAlertData);
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.NotificationMessage.ALERT_FAILED_MESSAGE });
  }
}

const fetchObjectAlerts = async (req, res) => {
  try {
    const ObjectCountData = await ObjectCountTable.findAll();
    res.status(200).json(ObjectCountData);
  } catch (error) {
    res
      .status(400)
      .json({ error: messages.NotificationMessage.ALERT_FAILED_MESSAGE });
  }
}

const handleObjectDetectionAlert = async (req, res) => {
  try {
    let { serialNo, data } = req.body
    if (serialNo == null || (typeof serialNo === "string" && serialNo?.trim().length === 0)) {
      const successEmailMessage = `Irregular Object has been detected on Camera at - ${new Date()}`;
      await Email.create({ message: successEmailMessage, emailtype: false, notificationType: "Object Detected", alertMode: 2 });
      await ObjectDetection.create({ serialNo: serialNo, logStatus: false, logs: successEmailMessage, objectCount: data?.count, shelf: data?.shelf });
      await ObjectCountTable.create({ serialNo: serialNo, objectCount: data?.count, shelf: data?.shelf });

      res
        .status(404).json({ error: messages.NotificationMessage.CREATE_ERROR_MESSAGE });
    }
    else {
      const successEmailMessage = `Irregular Object has been detected on Camera Serial Number - ${serialNo} at - ${new Date()}`;
      await Email.create({ message: successEmailMessage, emailtype: true, notificationType: "Object Detected", alertMode: 2 });
      await ObjectDetection.create({ serialNo: serialNo, logStatus: false, logs: successEmailMessage, objectCount: data?.count, shelf: data?.shelf });

      const existingRecord = await ObjectCountTable.findOne({ where: { serialNo: serialNo } });
      if (existingRecord) {
        await ObjectCountTable.update({ objectCount: data?.count, shelf: data?.shelf }, { where: { serialNo: serialNo } });
      } else {
        await ObjectCountTable.create({ serialNo: serialNo, objectCount: data?.count, shelf: data?.shelf });
      }

      res.status(200).json({ status: true, messsage: messages.NotificationMessage.CREATE_SUCCESS_MESSAGE });
    }
  } catch (error) {
    res
      .status(404)
      .json({ error: messages.NotificationMessage.CREATE_ERROR_MESSAGE });
  }
}

const handleObjectDetectionAction = async (req, res) => {
  try {
    let { alertID } = req.body
    if (alertID == null) {
      res
        .status(404)
        .json({ error: messages.NotificationMessage.ALERT_FAILED_MESSAGE });
    }
    else {
      const findData = await ObjectDetection.findByPk(alertID);
      await findData.update({ logStatus: true });
      res.status(200).json({ status: true, messsage: messages.NotificationMessage.ALERT_SUCCESS_MESSAGE });
    }
  } catch (error) {
    res
      .status(404)
      .json({ error: messages.NotificationMessage.CREATE_ERROR_MESSAGE });
  }

}

export default {
  handleMotionAlert,
  fetchAlerts,
  fetchObjectAlerts,
  fetchCamersAlerts,
  handleObjectDetectionAlert,
  handleObjectDetectionAction
};
