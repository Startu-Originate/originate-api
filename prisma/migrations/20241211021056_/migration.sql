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
    "userTeamId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_teams" (
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

    CONSTRAINT "users_teams_pkey" PRIMARY KEY ("id")
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
    "responsibleUserId" TEXT NOT NULL,
    "responsibleUserTeamId" TEXT NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads_companies" (
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

    CONSTRAINT "leads_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "userTeamId" TEXT NOT NULL,
    "leadId" TEXT,
    "leadCompanyId" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_teams_name_key" ON "users_teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_teams_cnpj_key" ON "users_teams"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_responsibleUserId_idx" ON "leads"("responsibleUserId");

-- CreateIndex
CREATE INDEX "leads_responsibleUserTeamId_idx" ON "leads"("responsibleUserTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "leads_companies_name_key" ON "leads_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "leads_companies_cnpj_key" ON "leads_companies"("cnpj");

-- CreateIndex
CREATE INDEX "leads_companies_name_idx" ON "leads_companies"("name");

-- CreateIndex
CREATE INDEX "logs_userId_idx" ON "logs"("userId");

-- CreateIndex
CREATE INDEX "logs_userTeamId_idx" ON "logs"("userTeamId");

-- CreateIndex
CREATE INDEX "logs_leadId_idx" ON "logs"("leadId");

-- CreateIndex
CREATE INDEX "logs_leadCompanyId_idx" ON "logs"("leadCompanyId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userTeamId_fkey" FOREIGN KEY ("userTeamId") REFERENCES "users_teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_leadCompanyId_fkey" FOREIGN KEY ("leadCompanyId") REFERENCES "leads_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_responsibleUserId_fkey" FOREIGN KEY ("responsibleUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_responsibleUserTeamId_fkey" FOREIGN KEY ("responsibleUserTeamId") REFERENCES "users_teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_userTeamId_fkey" FOREIGN KEY ("userTeamId") REFERENCES "users_teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_leadCompanyId_fkey" FOREIGN KEY ("leadCompanyId") REFERENCES "leads_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
