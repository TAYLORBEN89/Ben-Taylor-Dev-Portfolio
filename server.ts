import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API Route: Generate personalized holographic event badges using Gemini
  app.post("/api/generate-badge", async (req, res) => {
    try {
      const { name, role, skills, interest } = req.body;

      const userSkills = skills || "General Teching";
      const userInterest = interest || "Venture Shipping";
      const userRole = role || "Developer";

      // Lazy check for key to prevent startup crashes
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY is not configured or uses placeholder value. Generating sandbox fallback badge.");
        
        // Provide a lovely mock fallback when key is not loaded yet so developers/previewers don't get stuck
        const badgeTitle = `${userSkills.split(',')[0].trim().toUpperCase()} COGNITIVE PROTO-ENGINEER`;
        return res.json({
          badgeTitle: badgeTitle,
          badgeMotto: `Orchestrating ${userInterest.toLowerCase()} through decentralized nodes of reality.`,
          visualSymbol: "✦",
          accessLevel: `SANDBOX_NODE_${Math.floor(100 + Math.random() * 900)}`,
          warning: "Using Sandbox local generator. Configure your GEMINI_API_KEY in Secrets for the real neural system!"
        });
      }

      // Initialize Gemini Client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are a high-tech conference experience engine at our futuristic launch event (called "Venture Ship").
User details:
- Name: ${name}
- Stated Role: ${userRole}
- Skills/Keywords: ${userSkills}
- Primary Interest: ${userInterest}

Generate a hyper-futuristic, elegant, double-barrel Sci-Fi specialty craft title, a philosophy motto, a custom single-glyph visual symbol, and a unique access/security code for their digital ticket. Keep it highly styled, professional, cyberpunk, and polished. Do not use generic clichés. Make sure the badgeTitle is in CAPITAL letters and fits on a standard graphic ticket.

Example Output format:
- badgeTitle: "INTERSTELLAR METRIC PIPELINE SYNTHESIZER" or "COGNITIVE GRAPH VECTOR SHAPER"
- badgeMotto: "Calibrating real-time visual streams into low-latency cognitive vectors."
- visualSymbol: "⏃" or "❆" or "◈" or "⚡" or "⚜" or "✺"
- accessLevel: "LEVEL_09_OPS_ROOT" or "SECURE_VECTOR_KIND"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              badgeTitle: {
                type: Type.STRING,
                description: "Futuristic specialty title in upper case, maximum 45 characters, professional and high-tech"
              },
              badgeMotto: {
                type: Type.STRING,
                description: "Philosophical sci-fi tech philosophy or tagline, maximum 80 characters"
              },
              visualSymbol: {
                type: Type.STRING,
                description: "A single beautiful ASCII or Unicode glyph representing their energy (e.g., ✦, ◈, ⚡, ⏃, ⚛, ⌬, ⌥)"
              },
              accessLevel: {
                type: Type.STRING,
                description: "Custom classified access clearance ID, uppercase, e.g., LEVEL_08_CORE_VIP"
              },
            },
            required: ["badgeTitle", "badgeMotto", "visualSymbol", "accessLevel"]
          }
        }
      });

      if (!response.text) {
        throw new Error("No response text returned from Gemini API");
      }

      const badgeData = JSON.parse(response.text.trim());
      res.json(badgeData);
    } catch (error: any) {
      console.error("Gemini badge generation failed:", error);
      res.status(500).json({
        error: "Engine overload: Failed to process biometric badge. Switch to offline sandbox fallback instead.",
        details: error?.message || String(error)
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Mount Vite midddleware
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Venture Ship Event Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to boot:", err);
  process.exit(1);
});
