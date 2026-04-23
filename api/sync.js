import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const checkin = await kv.get('diet_checkin') || {};
    const weight = await kv.get('diet_weight') || {};
    return res.status(200).json({ checkin, weightByDate: weight });
  } 
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await kv.set('diet_checkin', body.checkin);
    await kv.set('diet_weight', body.weightByDate);
    return res.status(200).json({ success: true });
  }
}
