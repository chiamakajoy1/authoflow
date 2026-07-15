import { z } from 'zod';

const preAuthSchema = z.object({
  type: z.literal('PRE_AUTH'),
  notes: z.string().optional(),
  details: z.object({
    procedureCode: z.string().min(1, "Procedure code is required"),
    icd10Codes: z.string().min(1, "Diagnosis code is required"),
    facility: z.string().min(1, "Hospital/Facility name is required"),
    scheduledDate: z.string().datetime("Invalid date format, must be ISO string"),
  }),
});

const prescriptionSchema = z.object({
  type: z.literal('PRESCRIPTION'),
  notes: z.string().optional(),
  details: z.object({
    drugName: z.string().min(1, "Drug name is required"),
    ndcCode: z.string().min(1, "National Drug Code (NDC) is required"),
    dosage: z.string().min(1, "Dosage is required (e.g., 20mg)"),
    quantity: z.number().int().positive("Quantity must be a positive whole number"),
  }),
});

// We use the "export" keyword directly here now!
export const validateApprovalRequest = (data) => {
  if (data.type === 'PRE_AUTH') {
    return preAuthSchema.safeParse(data);
  } else if (data.type === 'PRESCRIPTION') {
    return prescriptionSchema.safeParse(data);
  }
  return { success: false, error: new Error("Invalid request type") };
};