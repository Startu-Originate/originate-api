-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SYSTEM_ADMIN', 'TEAM_ADMIN', 'TEAM_MEMBER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AcquisitionChannel" AS ENUM ('OUTBOUND', 'INBOUND', 'META_ADS', 'GOOGLE_ADS', 'NONE', 'FARMER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TEAM_MEMBER',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateBirth" TIMESTAMP(3),
    "picture" TEXT,
    "gender" "Gender" DEFAULT 'MALE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamCompanyId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "state" TEXT,
    "city" TEXT,
    "website" TEXT,
    "linkedIn" TEXT,
    "segment" TEXT,
    "pipedriveApiKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "notes" TEXT,
    "linkedIn" TEXT,
    "position" TEXT,
    "department" TEXT,
    "phone" TEXT,
    "cellphone" TEXT,
    "origin" TEXT,
    "acquisitionChannel" "AcquisitionChannel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "leadCompanyId" TEXT NOT NULL,
    "responsibleId" TEXT NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "state" TEXT,
    "city" TEXT,
    "website" TEXT,
    "linkedIn" TEXT,
    "segment" TEXT,
    "numberEmployees" INTEGER,
    "organizationPipedriveId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "teamCompanyId" TEXT,
    "leadId" TEXT,
    "leadCompanyId" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "team_companies_name_key" ON "team_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "team_companies_cnpj_key" ON "team_companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lead_companies_name_key" ON "lead_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lead_companies_cnpj_key" ON "lead_companies"("cnpj");

-- CreateIndex
CREATE INDEX "lead_companies_name_idx" ON "lead_companies"("name");

-- CreateIndex
CREATE INDEX "logs_userId_idx" ON "logs"("userId");

-- CreateIndex
CREATE INDEX "logs_teamCompanyId_idx" ON "logs"("teamCompanyId");

-- CreateIndex
CREATE INDEX "logs_leadId_idx" ON "logs"("leadId");

-- CreateIndex
CREATE INDEX "logs_leadCompanyId_idx" ON "logs"("leadCompanyId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamCompanyId_fkey" FOREIGN KEY ("teamCompanyId") REFERENCES "team_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_leadCompanyId_fkey" FOREIGN KEY ("leadCompanyId") REFERENCES "lead_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_teamCompanyId_fkey" FOREIGN KEY ("teamCompanyId") REFERENCES "team_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_leadCompanyId_fkey" FOREIGN KEY ("leadCompanyId") REFERENCES "lead_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
