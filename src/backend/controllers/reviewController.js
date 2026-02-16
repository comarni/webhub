const { addReview, listReviewsForUser } = require("../models/reviewModel");
const { notifyActivity } = require("../services/n8nService");

async function create(req, res) {
  try {
    const { projectId, reviewedUserId, rating, comment } = req.body;
    if (!projectId || !reviewedUserId || !rating) {
      return res.status(400).json({ message: "Campos incompletos" });
    }

    if (Number(reviewedUserId) === req.user.id) {
      return res.status(400).json({ message: "No puedes valorarte a ti mismo" });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: "La valoración debe ser entre 1 y 5" });
    }

    await addReview({
      projectId,
      reviewerId: req.user.id,
      reviewedUserId,
      rating,
      comment: comment || "",
    });

    await notifyActivity({ action: "review_created", projectId, reviewerId: req.user.id, reviewedUserId });
    return res.status(201).json({ message: "Reseña guardada" });
  } catch (error) {
    return res.status(500).json({ message: "Error al guardar reseña", error: error.message });
  }
}

async function byUser(req, res) {
  try {
    const data = await listReviewsForUser(Number(req.params.userId));
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener reseñas", error: error.message });
  }
}

module.exports = { create, byUser };
