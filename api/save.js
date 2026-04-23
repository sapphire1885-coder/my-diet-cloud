import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // 只允许 POST 请求（提交数据）
  if (req.method === 'POST') {
    try {
      // 接收从手机发来的 JSON 数据
      const data = JSON.parse(req.body);
      
      // 将数据存入名为 'diet_logs' 的云端列表中
      await kv.lpush('diet_logs', data);
      
      return res.status(200).json({ status: 'ok', message: '数据已同步到云端！' });
    } catch (e) {
      // 如果出错，返回错误信息
      return res.status(500).json({ error: e.message });
    }
  }
  
  // 如果不是 POST 请求，报错
  res.status(405).json({ error: 'Method not allowed' });
}
