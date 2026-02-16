const { createPayment, listPaymentsByProject } = require("../models/paymentModel");
const { notifyActivity } = require("../services/n8nService");

async function create(req, res) {
  try {
    const { projectId, developerId, amount, status } = req.body;
    if (!projectId || !developerId || !amount) {
      return res.status(400).json({ message: "Campos incompletos" });
    }

    await createPayment({
      projectId,
      companyId: req.user.id,
      developerId,
      amount,
      status,
    });
    await notifyActivity({ action: "payment_created", projectId, companyId: req.user.id, developerId, amount });
    return res.status(201).json({ message: "Pago registrado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar pago", error: error.message });
  }
}

async function byProject(req, res) {
  try {
    const data = await listPaymentsByProject(Number(req.params.projectId));
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener pagos", error: error.message });
  }
}

module.exports = { create, byProject };
