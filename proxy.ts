import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  // apiAuthGooglePrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // const { pathname } = req.nextUrl;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isApiAuthGoogleRoute = nextUrl.pathname.startsWith(apiAuthGooglePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API Auth routes
  if (isApiAuthRoute) {
    return; // Kembali tanpa melakukan apa-apa
  }
  // // Allow API Auth routes
  // if (isApiAuthGoogleRoute) {
  //   return; // Kembali tanpa melakukan apa-apa
  // }

  // Allow public routes
  if (isPublicRoute) {
    return; // Kembali tanpa melakukan apa-apa
  }

  // Redirect logged-in users trying to access auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return; // Kembali tanpa melakukan apa-apa
  }

  // Protect private routes (e.g., /settings)
  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return; // Allow access to all other routes for logged-in users
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
