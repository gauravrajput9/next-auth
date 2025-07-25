import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error(
    "Missing required environment variables: GITHUB_ID and GITHUB_SECRET. " +
    "Please check your .env.local file and ensure GitHub OAuth app is configured."
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "Missing NEXTAUTH_SECRET environment variable. " +
    "Please add NEXTAUTH_SECRET to your .env.local file."
  );
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, account }) {
      return token;
    },
  },
});



export { handler as GET, handler as POST };
