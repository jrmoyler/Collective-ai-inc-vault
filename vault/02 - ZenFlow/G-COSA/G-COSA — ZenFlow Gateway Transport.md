---
title: G-COSA — ZenFlow Gateway Transport
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM
  url: https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk
  title: G-COSA Comprehensive Architecture & Blueprint
---
# G-COSA — ZenFlow Gateway Transport

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[001 — ZenFlow MOC]]
- [[ZenFlow Master Blueprint]]

## Full source section

```text
5. The ZenFlow Gateway (Central Hub)
To visualize and command all 25 Mac Minis simultaneously, we use a Node.js/Express gateway running RabbitMQ Server-Sent Events (SSE). This sits on the central Master Laptop.
import express from 'express';
import cors from 'cors';
import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const EXCHANGE_NAME = 'gcosa_cognitive_frames'; 

app.use(cors());
app.use(express.json());

let clients = [];

// SSE Endpoint for the Virtual Boardroom Dashboard
app.get('/api/stream', (req, res) => {
   res.setHeader('Content-Type', 'text/event-stream');
   res.setHeader('Cache-Control', 'no-cache');
   res.setHeader('Connection', 'keep-alive');
   
   res.write(`data: ${JSON.stringify({ type: 'CONNECTION', message: 'ZenFlow Gateway Connected' })}\n\n`);

   const clientId = Date.now();
   clients.push({ id: clientId, res });
   console.log(`[ZenFlow] Boardroom connected. ID: ${clientId}`);

   req.on('close', () => {
       clients = clients.filter(c => c.id !== clientId);
   });
});

const broadcastToClients = (data) => {
   clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
};

// Listen for telemetry from all 25 Mac Minis (Divisions, Parent, Engineering)
async function startRabbitMQListener() {
   try {
       const connection = await amqp.connect(RABBITMQ_URL);
       const channel = await connection.createChannel();
       await channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: false });
       const q = await channel.assertQueue('', { exclusive: true });
       await channel.bindQueue(q.queue, EXCHANGE_NAME, '');

       channel.consume(q.queue, (msg) => {
           if (msg.content) {
               try {
                   // Receives GeometricCognitiveFrames from the Mac Minis
                   broadcastToClients(JSON.parse(msg.content.toString()));
               } catch (error) {
                   console.error('Frame parse error', error);
               }
           }
       }, { noAck: true });
   } catch (error) {
       setTimeout(startRabbitMQListener, 5000); 
   }
}

app.listen(PORT, () => {
   console.log(`[ZenFlow] Terminal Gateway running on port ${PORT}`);
   startRabbitMQListener();
});
```

## Source
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk) — Section 5 — The ZenFlow Gateway (Central Hub). Read in full from Drive on 2026-10-06.

### Source records
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk)

<!-- drive-expansion:bd9204733084d87eef4b -->
