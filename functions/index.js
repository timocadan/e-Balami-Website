/**
 * Firebase Cloud Functions v2
 * Telegram notification system for new orders
 */

const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {defineSecret} = require("firebase-functions/params");

// Initialize Firebase Admin
initializeApp();

// Telegram Bot Secrets (DO NOT hardcode secrets in source)
const TELEGRAM_BOT_TOKEN = defineSecret("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = defineSecret("TELEGRAM_CHAT_ID");

/**
 * Escape special characters for MarkdownV2
 */
function escapeMarkdownV2(text) {
  if (!text) return "";
  return String(text)
      .replace(/\_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/\~/g, "\\~")
      .replace(/\`/g, "\\`")
      .replace(/\>/g, "\\>")
      .replace(/\#/g, "\\#")
      .replace(/\+/g, "\\+")
      .replace(/\-/g, "\\-")
      .replace(/\=/g, "\\=")
      .replace(/\|/g, "\\|")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(/\./g, "\\.")
      .replace(/\!/g, "\\!");
}

/**
 * Get collection name in Somali
 */
function getCollectionNameSomali(collectionName) {
  if (collectionName === "dalabyadaDhamaystiran") {
    return "Caafimaadka";
  } else if (collectionName === "dalabyadaFarsamada") {
    return "Farsamada";
  }
  return collectionName;
}

/**
 * Format order details for Telegram message (Premium Format)
 */
/**
 * Extract service name(s) from different order schemas (Caafimaad + Farsamo).
 * @param {object} orderData Firestore document data
 * @return {string|null} service string if available
 */
function extractServiceType(orderData) {
  // Caafimaad (often uses `services` array or string)
  if (Array.isArray(orderData.services)) {
    // Could be array of strings or objects
    const mapped = orderData.services
        .map((s) => {
          if (typeof s === "string") return s;
          if (s && typeof s === "object") return s.title || s.name || s.label || null;
          return null;
        })
        .filter(Boolean);
    return mapped.length ? mapped.join(", ") : null;
  }

  if (typeof orderData.services === "string" && orderData.services.trim()) {
    return orderData.services.trim();
  }

  // Farsamo (dashboard uses `service`)
  if (typeof orderData.service === "string" && orderData.service.trim()) {
    return orderData.service.trim();
  }

  // Fallbacks (in case mobile app uses different keys)
  const candidates = ["serviceType", "generalService", "adeeg", "adeegga", "category"];
  for (const key of candidates) {
    if (typeof orderData[key] === "string" && orderData[key].trim()) {
      return orderData[key].trim();
    }
  }

  return null;
}

/**
 * Extract location from different order schemas (Caafimaad + Farsamo).
 * @param {object} orderData Firestore document data
 * @return {string|null} location string if available
 */
function extractLocation(orderData) {
  // Caafimaad (city/destination)
  if (orderData.city && orderData.destination) {
    return `${orderData.city} → ${orderData.destination}`;
  }
  if (orderData.city) return orderData.city;
  if (orderData.destination) return orderData.destination;

  // Farsamo (dashboard uses `location` + `address`)
  const loc = typeof orderData.location === "string" ? orderData.location.trim() : "";
  const addr = typeof orderData.address === "string" ? orderData.address.trim() : "";
  if (loc && addr) return `${loc} - ${addr}`;
  if (loc) return loc;
  if (addr) return addr;

  // Fallbacks
  const candidates = ["goobta", "addressLine", "area", "district"];
  for (const key of candidates) {
    if (typeof orderData[key] === "string" && orderData[key].trim()) {
      return orderData[key].trim();
    }
  }

  return null;
}

/**
 * Build a Telegram message for an order.
 * @param {object} orderData Firestore document data
 * @param {string} collectionName Firestore collection name
 * @return {string} formatted message (MarkdownV2)
 */
function formatOrderMessage(orderData, collectionName) {
  const qaybta = getCollectionNameSomali(collectionName);
  const customerName = orderData.name || null;
  const phone = orderData.phone || null;
  const serviceType = extractServiceType(orderData);
  const location = extractLocation(orderData);
  let details = null;
  if (typeof orderData.details === "string" && orderData.details.trim()) {
    details = orderData.details.trim();
  }

  const dashboardLink = "https://ebalami.com/dashboard";

  // Build message parts
  let message = `🚨 *DALAB CUSUB \\- e\\-BALAMI*\n`;
  message += `──────────────────\n`;

  // Qaybta (always shown)
  message += `📁 *Qaybta:* ${escapeMarkdownV2(qaybta)}\n`;

  // Macaamiilka (only if exists)
  if (customerName) {
    message += `👤 *Macaamiilka:* ${escapeMarkdownV2(customerName)}\n`;
  }

  // Taleefanka (only if exists)
  if (phone) {
    message += `📞 *Taleefanka:* ${escapeMarkdownV2(phone)}\n`;
  }

  // Adeegga (only if exists)
  if (serviceType) {
    message += `🛠️ *Adeegga:* ${escapeMarkdownV2(serviceType)}\n`;
  }

  // Goobta (only if exists)
  if (location) {
    message += `📍 *Goobta:* ${escapeMarkdownV2(location)}\n`;
  }

  // Faahfaahin (Farsamo often uses details)
  if (details) {
    message += `📝 *Faahfaahin:* ${escapeMarkdownV2(details)}\n`;
  }

  message += `──────────────────\n`;
  message += `🕒 Fadlan la xidhiidh macaamiilka\\.\n`;
  message += `🔗 [Gal Dashboard\\-ka si aad u maamusho](${escapeMarkdownV2(dashboardLink)})`;

  return message;
}

/**
 * Send Telegram notification
 */
async function sendTelegramNotification(orderData, collectionName) {
  try {
    const message = formatOrderMessage(orderData, collectionName);
    const token = TELEGRAM_BOT_TOKEN.value();
    const chatId = TELEGRAM_CHAT_ID.value();
    const telegramApiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      throw new Error(`Telegram API error: ${errorData.description || response.statusText}`);
    }

    const result = await response.json();
    console.log("Telegram notification sent successfully:", result.message_id);
    return result;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    throw error;
  }
}

/**
 * Cloud Function: Triggered when a new order is created in dalabyadaDhamaystiran
 */
exports.ebalamiOrderOne = onDocumentCreated(
    {
      document: "dalabyadaDhamaystiran/{orderId}",
      region: "us-central1",
      secrets: [TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID],
    },
    async (event) => {
      const orderData = event.data.data();
      const orderId = event.params.orderId;

      console.log(`New order created in dalabyadaDhamaystiran: ${orderId}`);

      try {
        await sendTelegramNotification(orderData, "dalabyadaDhamaystiran");
        console.log(`Telegram notification sent for order ${orderId}`);
      } catch (error) {
        console.error(`Error processing order ${orderId}:`, error);
        // Don't throw - we don't want to fail the function
        // The order is already created, we just couldn't send the notification
      }
    },
);

/**
 * Cloud Function: Triggered when a new order is created in dalabyadaFarsamada
 */
exports.ebalamiOrderTwo = onDocumentCreated(
    {
      document: "dalabyadaFarsamada/{orderId}",
      region: "us-central1",
      secrets: [TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID],
    },
    async (event) => {
      const orderData = event.data.data();
      const orderId = event.params.orderId;

      console.log(`New order created in dalabyadaFarsamada: ${orderId}`);

      try {
        await sendTelegramNotification(orderData, "dalabyadaFarsamada");
        console.log(`Telegram notification sent for order ${orderId}`);
      } catch (error) {
        console.error(`Error processing order ${orderId}:`, error);
        // Don't throw - we don't want to fail the function
        // The order is already created, we just couldn't send the notification
      }
    },
);
