// routes/aiRoutes.js
const express = require("express");
const OpenAI = require("openai");

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body; // array of { role: "user" | "assistant" | "system", content: string }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly AI medical assistant. You help patients by asking about their symptoms, suggesting possible causes, and optionally helping them book a doctor or order medication through the system. Always confirm before proceeding with bookings or orders." },
        ...messages
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router;



// // routes/aiRoutes.js
// import express from "express";
// import OpenAI from "openai";

// const router = express.Router();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// /**
//  * POST /api/ai/chat
//  * body: { messages: [{ role: "user"|"assistant"|"system", content: string }] }
//  *
//  * Returns:
//  * {
//  *   message: "friendly text reply for the user",
//  *   action: null | { name: "book_appointment"|"place_order", params: {...} },
//  *   raw: <full assistant raw text> // for debugging/fallback
//  * }
//  */
// router.post("/chat", async (req, res) => {
//   try {
//     const { messages } = req.body;
//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({ error: "messages array required" });
//     }

//     // System prompt instructs model to optionally return JSON action.
//     const systemPrompt = `
// You are MediLink AI, a friendly, cautious medical assistant. When interacting with a patient:
// - Answer naturally and clearly.
// - If you detect the user wants to book a doctor or order medication, propose the action and include a JSON "action" object (see schema below).
// - ALWAYS ask for explicit confirmation before executing any action.
// - Return a JSON blob ONLY inside a code block preceded by the tag JSON_RESPONSE (so it can be reliably parsed).
// - If no action required, respond normally (no JSON_ACTION).
    
// JSON schema (examples):
// {
//   "message": "Short user-facing text explaining what I propose",
//   "action": {
//     "name": "book_appointment",
//     "params": {
//       "specialty": "Dermatology",
//       "doctorId": "OPTIONAL_DOCTOR_ID_IF_KNOWN",
//       "date": "YYYY-MM-DD",
//       "time": "HH:MM",
//       "notes": "optional notes"
//     }
//   }
// }

// or

// {
//   "message": "I can place this order for you. Confirm?",
//   "action": {
//     "name": "place_order",
//     "params": {
//       "items": [
//         { "medicationId": "64a...", "quantity": 2 },
//         { "medicationId": "64b...", "quantity": 1 }
//       ],
//       "deliveryAddress": "123 Main St"
//     }
//   }
// }

// Make sure the primary assistant reply is still helpful text. If you include JSON, place it in a fenced code block and prefix with JSON_RESPONSE.
// `;

//     // Build request messages: system + conversation
//     const requestMessages = [
//       { role: "system", content: systemPrompt },
//       ...messages.map((m) => ({
//         role: m.role === "ai" ? "assistant" : "user",
//         content: m.content || m.text || "",
//       })),
//     ];

//     // call OpenAI chat completion
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // pick model you want and that you have access to
//       messages: requestMessages,
//       temperature: 0.2,
//       max_tokens: 800,
//     });

//     const assistantText = completion.choices?.[0]?.message?.content || "";

//     // Try to extract JSON_RESPONSE block
//     const jsonRegex = /JSON_RESPONSE\s*\n?```(?:json)?\s*([\s\S]*?)```/i;
//     const match = assistantText.match(jsonRegex);
//     let action = null;
//     let parsed = null;

//     if (match) {
//       try {
//         parsed = JSON.parse(match[1]);
//         if (parsed.action) action = parsed.action;
//       } catch (err) {
//         // ignore parse error; we'll return raw text so frontend can show it
//       }
//     }

//     // send back the assistant text and parsed action (if any)
//     return res.json({
//       message: assistantText, // raw assistant text for display
//       action,                // null or { name, params }
//       raw: assistantText,
//     });
//   } catch (err) {
//     console.error("AI chat error:", err);
//     return res.status(500).json({ error: "AI request failed" });
//   }
// });

// export default router;
