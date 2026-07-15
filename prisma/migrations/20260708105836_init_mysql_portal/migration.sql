-- CreateTable
CREATE TABLE `ApprovalRequest` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('PRE_AUTH', 'CLAIMS', 'REFERRAL', 'PRESCRIPTION') NOT NULL,
    `status` ENUM('PENDING', 'AI_REVIEWED', 'APPROVED', 'DENIED', 'ESCALATED') NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreAuthDetails` (
    `id` VARCHAR(191) NOT NULL,
    `requestId` VARCHAR(191) NOT NULL,
    `procedureCode` VARCHAR(191) NOT NULL,
    `icd10Codes` VARCHAR(191) NOT NULL,
    `facility` VARCHAR(191) NOT NULL,
    `scheduledDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PreAuthDetails_requestId_key`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrescriptionDetails` (
    `id` VARCHAR(191) NOT NULL,
    `requestId` VARCHAR(191) NOT NULL,
    `drugName` VARCHAR(191) NOT NULL,
    `ndcCode` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `PrescriptionDetails_requestId_key`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PreAuthDetails` ADD CONSTRAINT `PreAuthDetails_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ApprovalRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionDetails` ADD CONSTRAINT `PrescriptionDetails_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ApprovalRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
