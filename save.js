{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ kv \} from '@vercel/kv';\
export default async function handler(req, res) \{\
  if (req.method === 'POST') \{\
    try \{\
      const data = JSON.parse(req.body);\
      await kv.lpush('diet_logs', data);\
      return res.status(200).json(\{ status: 'ok' \});\
    \} catch (e) \{\
      return res.status(500).json(\{ error: e.message \});\
    \}\
  \}\
  res.status(405).json(\{ error: 'Method not allowed' \});\
\}}