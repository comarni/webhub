async function notifyN8n(webhookUrl, payload) {
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Error notificando a n8n:", error.message);
  }
}

async function notifyNewProject(project) {
  await notifyN8n(process.env.N8N_WEBHOOK_NEW_PROJECT, {
    type: "new_project",
    timestamp: new Date().toISOString(),
    project,
  });
}

async function notifyMatchFound(matchData) {
  await notifyN8n(process.env.N8N_WEBHOOK_MATCH_FOUND, {
    type: "match_found",
    timestamp: new Date().toISOString(),
    matchData,
  });
}

async function notifyActivity(activity) {
  await notifyN8n(process.env.N8N_WEBHOOK_ACTIVITY, {
    type: "activity",
    timestamp: new Date().toISOString(),
    activity,
  });
}

module.exports = { notifyNewProject, notifyMatchFound, notifyActivity };
