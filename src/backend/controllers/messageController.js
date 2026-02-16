const { sendMessage, getConversation } = require("../models/messageModel");
const { notifyActivity } = require("../services/n8nService");

async function send(req, res) {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
      return res.status(400).json({ message: "receiverId y content son requeridos" });
    }

    await sendMessage({ senderId: req.user.id, receiverId, content });
    await notifyActivity({ action: "message_sent", senderId: req.user.id, receiverId });
    return res.status(201).json({ message: "Mensaje enviado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al enviar mensaje", error: error.message });
  }
}

async function conversation(req, res) {
  try {
    const otherUserId = Number(req.params.otherUserId);
    const messages = await getConversation(req.user.id, otherUserId);
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener conversación", error: error.message });
  }
}

module.exports = { send, conversation };
