// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import CrendentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { nanoid } from "nanoid";
import client from "@/db/index";
import { validateZodInput } from "@/validators";
import { UserZodSchema } from "@/schema";
import UserService from "@/services/user";
import { encryptString, signJwtToken, verifyJwtToken } from "@/utils/auth";
import UserModel from "@/models/user";
import bcrypt from "bcrypt";

const generateAccessToken = async ({ accessToken, user, isRefresh }: any) => {
  try {
    const verifAccessToken = await verifyJwtToken(accessToken);
    if (!isRefresh && !accessToken) {
      const encryptData = encryptString(JSON.stringify(user));
      const signToken = await signJwtToken({ user: encryptData });
      return signToken;
    }
    if (isRefresh && verifAccessToken.isError) {
      // make a db call
      const result = await UserService.getCurrentUser(user.id);
      if (result.isError) throw new Error(result.message);
      const encryptData = encryptString(JSON.stringify(result.data));
      const signToken = await signJwtToken({ user: encryptData });
      return signToken;
    }
    return accessToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const authOptions: any = {
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return nanoid(32);
    },
  },
  providers: [
    CrendentialsProvider({
      name: "crendentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const user = await UserModel.findOne({
            email: credentials?.email,
          }).select("+password");

          // if (!user) throw new Error("Wrong Email");

          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            user.password
          );

          if (!passwordMatch) throw new Error("Wrong Password");

          // validate the inputs
          const parsedResult = validateZodInput(credentials, UserZodSchema);
          if (parsedResult.isError) throw new Error(parsedResult.message);
          // make db calls her
          const result = await UserService.getCurrentUser(user._id);
          if (result.isError) throw new Error(result.message);
          return result.data;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID || '',
    //   clientSecret: process.env.GITHUB_SECRET || "",
    //   profile: async (user) => {
    //     const isBlocked = user?.hasOwnProperty("isBlocked")
    //       ? user.isBlocked
    //       : false;
    //     const role = user?.hasOwnProperty("role") ? user.role : "user";
    //     const isVerifiedEmail = user?.hasOwnProperty("emailVerified")
    //       ? user?.emailVerified
    //       : true;
    //     const avatar = user?.avatar_url;
    //     const createdAt = user?.hasOwnProperty("createdAt")
    //       ? user?.createdAt
    //       : new Date().toISOString();
    //     const updatedAt = user?.hasOwnProperty("updatedAt")
    //       ? user?.updatedAt
    //       : new Date().toISOString();
    //     return {
    //       id: user?.id,
    //       name: user?.name,
    //       email: user?.email,
    //       role,
    //       isBlocked,
    //       avatar,
    //       isVerifiedEmail,
    //       createdAt,
    //       updatedAt,
    //     };
    //   },
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "",
    //   clientSecret: process.env.GOOOGLE_SECRET || "",
    //   profile: async (user) => {
    //     const isBlocked = user?.hasOwnProperty("isBlocked")
    //       ? user.isBlocked
    //       : false;
    //     const role = user?.hasOwnProperty("role") ? user.role : "user";
    //     const isVerifiedEmail = user?.hasOwnProperty("email_verified")
    //       ? user?.email_verified
    //       : true;
    //     const avatar = user?.picture;
    //     const createdAt = user?.hasOwnProperty("createdAt")
    //       ? user?.createdAt
    //       : new Date().toISOString();
    //     const updatedAt = user?.hasOwnProperty("updatedAt")
    //       ? user?.updatedAt
    //       : new Date().toISOString();
    //     const id = user?.id ? user?.id : user?.sub;
    //     return {
    //       id,
    //       name: user?.name,
    //       email: user?.email,
    //       role,
    //       isBlocked,
    //       isVerifiedEmail,
    //       avatar,
    //       createdAt,
    //       updatedAt,
    //     };
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, crendentials }: any) {
      console.log("sign in", user, account, email);

      return true;
    },
    async redirect({ url, baseUrl }: any) {
      console.log("redirect", url, baseUrl);
      if (url.startsWith("/")) return url;
      return baseUrl;
    },
    async session({ session, token, user }: any) {
      console.log("session", session, user, token);
      if (token) {
        session.user = token?.user;
        session.accessToken = token?.accessToken;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log('jwt', token, user, account, profile, isNewUser);
      
      if (token && user) {
        const _user = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          avatar: user.avatar,
        };
        // create a fn generate access token
        const accessToken = await generateAccessToken({
          accessToken: token?.accessToken,
          user: _user,
          isRefresh: false,
        });
        token.user = _user;
        token.accessToken = accessToken;
        
        console.log('token && user', token, _user);
      }

      if (token && !user) {
        const _user = token?.user;
        // create a fn generate access token
        const accessToken = await generateAccessToken({
          accessToken: token?.accessToken,
          user: _user,
          isRefresh: true,
        });
        token.user = _user;
        token.accessToken = accessToken;
        
        console.log('token && !user', token, _user);
      }

      return token;
    },
  },
  pages: {
    error: "/auth/error",
  },
};

export default authOptions;
