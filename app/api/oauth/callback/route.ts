import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
  );

  const { tokens } = await oauth2Client.getToken(code!);

  const oldRefreshToken = await prisma.googleRefreshToken.findFirst();
  if (oldRefreshToken) {
    await prisma.googleRefreshToken.delete({
      where: { id: oldRefreshToken.id },
    });
  }

  await prisma.googleRefreshToken.create({
    data: { token: tokens.refresh_token! },
  });

  return NextResponse.redirect(
    new URL("/dashboard?message=refresh-token-berhasil-diperbarui", request.url)
  );
}
