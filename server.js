import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateApprovalRequest } from './requestValidator.js';

const app = express();
const prisma = new PrismaClient(); // 1. This boots up your link to MySQL Workbench!

app.use(express.json());

// The main route where doctors submit claims
app.post('/api/requests', async (req, res) => {
  // 2. Validate the incoming data through our Zod guard
  const validation = validateApprovalRequest(req.body);

  if (!validation.success) {
    return res.status(400).json({ 
      error: "Invalid data submitted", 
      details: validation.error 
    });
  }

  const validData = validation.data;

  try {
    // 3. Prepare the data payload for Prisma
    const queryPayload = {
      type: validData.type,
      notes: validData.notes,
    };

    // 4. If it's a Pre-Auth or Prescription, seamlessly pack the nested sub-tables
    if (validData.type === 'PRE_AUTH') {
      queryPayload.preAuthDetails = {
        create: validData.details
      };
    } else if (validData.type === 'PRESCRIPTION') {
      queryPayload.prescriptionDetails = {
        create: validData.details
      };
    }

    // 5. Fire the query! Prisma automatically converts this JavaScript into SQL statements
    const newRequest = await prisma.approvalRequest.create({
      data: queryPayload,
      include: {
        preAuthDetails: true,
        prescriptionDetails: true,
      }
    });

    // 6. Return the fully saved entry back to the provider
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