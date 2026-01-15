import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '1mb' }));

const ethicalGuardrails = `Avoid risky, illegal, harmful, or discriminatory ideas. No gambling, no exploitation.
Assume low capital and encourage community-first approaches.`;

const fallbackIdeas = (
  inputs = {}
) => [
  {
    title: 'Skill-share Pop-up Workshops',
    category: 'Community micro-business',
    summary: `Host small weekend workshops in ${inputs.location || 'your area'} teaching your skills. Charge an affordable fee and partner with local schools or panchayat halls.`,
    reasoning: 'Low capital, leverages skills, builds trust locally.',
    steps: ['Pick 1-2 hour topics', 'Print simple flyers in Hindi/English', 'Collect fees via UPI', 'Offer follow-up kits'],
    plan: {
      budget: '₹2k-5k for print + snacks',
      revenueStreams: ['Ticket fee', 'Follow-up material'],
      localization: 'Use WhatsApp groups and local leaders to spread the word.',
    },
  },
  {
    title: 'Mobile Service-at-Home',
    category: 'Doorstep service',
    summary: `Provide at-home help using your skills—convenient for families and elders in ${inputs.location || 'your town'}.`,
    reasoning: 'Saves travel time, premium for convenience, minimal setup.',
    steps: ['Create a WhatsApp booking form', 'Offer 2-3 service packages', 'Bundle with small add-ons', 'Ask for referrals'],
    plan: {
      budget: '₹1k-3k for tools/transport',
      revenueStreams: ['Visit fee', 'Add-on products'],
      localization: 'List in local directories and share in housing/community groups.',
    },
  },
];

const buildIdeaPrompt = (inputs) => `You are an ethical startup coach for India.
${ethicalGuardrails}
Return 3-5 concise ideas as JSON array with fields: title, category, summary, reasoning, steps (list), plan {budget, revenueStreams, localization}.
User inputs: ${JSON.stringify(inputs)}
Language: ${inputs.language === 'hi' ? 'Hindi (simple)' : 'English (simple)'}
Emphasize low capital, local economy, and inclusivity.`;

const buildPlanPrompt = (idea, inputs) => `Create a lightweight business plan for this idea with simple Hindi/English mix if user language is Hindi.
${ethicalGuardrails}
Include budget, first 4 weeks roadmap, pricing suggestions, and local go-to-market.
Idea: ${JSON.stringify(idea)}
User inputs: ${JSON.stringify(inputs)}.`;

app.get('/', (_req, res) => res.json({ status: 'ok', message: 'IdeaForge API' }));

app.post('/generate-ideas', async (req, res) => {
  const inputs = req.body || {};
  if (!client) {
    return res.json({ ideas: fallbackIdeas(inputs), disclaimer: true });
  }
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful, ethical idea generator for India.' },
        { role: 'user', content: buildIdeaPrompt(inputs) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });
    const text = completion.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);
    return res.json({ ideas: parsed.ideas || parsed || [], disclaimer: true });
  } catch (error) {
    console.error('generate-ideas error', error.message);
    return res.status(200).json({ ideas: fallbackIdeas(inputs), disclaimer: true, note: 'fallback used' });
  }
});

app.post('/generate-plan', async (req, res) => {
  const { idea, inputs } = req.body || {};
  if (!client) {
    return res.json({
      plan: {
        budget: '₹5k starter kit',
        revenueStreams: ['Service fee', 'Add-ons'],
        localization: 'Partner with SHGs/NGOs to gain trust locally.',
        roadmap: ['Week 1: validate with 5 people', 'Week 2: pilot service', 'Week 3: gather feedback', 'Week 4: refine pricing'],
      },
      disclaimer: true,
    });
  }
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an ethical business plan coach for India.' },
        { role: 'user', content: buildPlanPrompt(idea, inputs) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });
    const text = completion.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);
    return res.json({ plan: parsed.plan || parsed, disclaimer: true });
  } catch (error) {
    console.error('generate-plan error', error.message);
    return res.status(200).json({ plan: null, error: 'Unable to craft plan right now.' });
  }
});

app.post('/save-idea', async (req, res) => {
  // Persistence is handled on the client via Firestore; this endpoint can be used for server-side logging if needed.
  return res.json({ status: 'ok', message: 'Client should store in Firestore. Nothing to do here.' });
});

app.post('/feedback', async (req, res) => {
  // Feedback can optionally be logged to a database; for now we acknowledge.
  return res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`IdeaForge API running on http://localhost:${port}`);
});
