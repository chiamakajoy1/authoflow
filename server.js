import 'dotenv/config'; // 1. Crucial: This loads your DATABASE_URL from the .env file!
import express from 'express';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'; // 2. Import the Prisma 7 MySQL driver adapter
import { PrismaClient } from './generated/prisma/index.js'; // 3. Import your locally generated client
import { validateApprovalRequest } from './requestValidator.js';

const app = express();

// 4. Convert mysql:// connection string to mariadb:// for the driver adapter compatibility
const connectionString = process.env.DATABASE_URL.replace('mysql://', 'mariadb://');
const adapter = new PrismaMariaDb(connectionString);

// 5. Build your client with the adapter passed directly inside the constructor options
const prisma = new PrismaClient({ adapter });

app.use(express.json());

// The main route where doctors submit claims
app.post('/api/requests', async (req, res) => {
  const validation = validateApprovalRequest(req.body);

  if (!validation.success) {
    return res.status(400).json({ 
      error: "Invalid data submitted", 
      details: validation.error 
    });
  }

  const validData = validation.data;

  try {
    const queryPayload = {
      type: validData.type,
      notes: validData.notes,
    };

    if (validData.type === 'PRE_AUTH') {
      queryPayload.preAuthDetails = {
        create: validData.details
      };
    } else if (validData.type === 'PRESCRIPTION') {
      queryPayload.prescriptionDetails = {
        create: validData.details
      };
    }

    const newRequest = await prisma.approvalRequest.create({
      data: queryPayload,
      include: {
        preAuthDetails: true,
        prescriptionDetails: true,
      }
    });

    res.status(201).json({ 
      message: "Success! Record securely saved to MySQL database.", 
      data: newRequest 
    });

  } catch (error) {
    console.error("❌ Database insertion error:", error);
    res.status(500).json({ error: "Internal database failure while processing request." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🏥 Modern JavaScript ESM Health API running on port ${PORT}`);
});