import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    buildTime: new Date().toISOString(),
    nodeVersion: process.version,
    envName: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA || null,
  });
}

