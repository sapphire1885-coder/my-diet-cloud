import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // 如果是获取数据 (打开网页时)
  if (req.method === 'GET') {
    const checkin = await kv.get('diet_checkin') || {};
    const weightByDate = await kv.get('diet_weight') || {};
    return res.status(200).json({ checkin, weightByDate });
  } 
  
  // 如果是保存数据 (点击打卡时)
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await kv.set('diet_checkin', body.checkin);
    await kv.set('diet_weight', body.weightByDate);
    return res.status(200).json({ success: true });
  }
}
