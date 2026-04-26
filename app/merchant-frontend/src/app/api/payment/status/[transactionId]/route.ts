import { NextResponse } from "next/server";

const STEPS = [
  { status: "processing", step: "validateWebhook" },
  { status: "processing", step: "convertFx" },
  { status: "processing", step: "depositContract" },
  { status: "processing", step: "notifyFacilitator" },
  { status: "completed", step: null },
] as const;

const startTimes = new Map<string, number>();

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  const { transactionId } = await params;

  if (!startTimes.has(transactionId)) {
    startTimes.set(transactionId, Date.now());
  }

  const elapsed = Date.now() - startTimes.get(transactionId)!;
  const stepIndex = Math.min(Math.floor(elapsed / 1200), STEPS.length - 1);
  const current = STEPS[stepIndex]!;

  return NextResponse.json(current);
}
