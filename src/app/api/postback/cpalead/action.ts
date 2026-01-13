"use server";

import { prisma, PrismaTransactionClient } from "@/lib/prisma";

interface PostbackData {
  userId: string;
  payout: number;
  offerName: string;
  ip: string;
  source: string;
}

export async function processPostback(data: PostbackData) {
  const { userId, payout, offerName, ip, source } = data;

  // Use transaction to ensure data consistency
  await prisma.$transaction(async (tx: PrismaTransactionClient) => {
    // 1. Ensure user exists (create if not)
    await tx.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });

    // 2. Update user balance
    await tx.user.update({
      where: { id: userId },
      data: {
        balance: { increment: payout },
        totalEarned: { increment: payout },
      },
    });

    // 3. Record transaction
    await tx.transaction.create({
      data: {
        userId,
        amount: payout,
        source,
        offerName,
        ip,
        status: "completed",
      },
    });
  });

  console.log("Postback processed:", {
    userId,
    payout,
    offerName,
    source,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}