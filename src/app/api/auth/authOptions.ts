import { connectDB } from "@/lib";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "theinkedclown2024",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!userFound) throw new Error("Email is incorrect!");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Password is incorrect!");
        return userFound;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("jwt session", session);
      // console.log("jwt token", token);
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }

      if (user) {
        const u = user as unknown as any;
        token.picture = u.avatar;
        return {
          ...token,
          id: u.id,
          role: u.role,
          avatar: u.avatar,
          isBlocked: u.isBlocked,
        };
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("S ==> session", session, token);

      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          name: token.name,
          role: token.role,
          avatar: token.avatar,
          isBlocked: token.isBlocked,
        },
      };
    },
  },
};

// import CrendentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { nanoid } from "nanoid";
// import client from "@/db/index";
// import { validateZodInput } from "@/validators";
// import { UserZodSchema } from "@/schema";
// import UserService from "@/services/user";
// import { encryptString, signJwtToken, verifyJwtToken } from "@/utils";
// import UserModel from "@/models/user";
// import bcrypt from "bcrypt";

// const generateAccessToken = async ({ accessToken, user, isRefresh }: any) => {
//   try {
//     const verifAccessToken = await verifyJwtToken(accessToken);
//     if (!isRefresh && !accessToken) {
//       const encryptData = encryptString(JSON.stringify(user));
//       const signToken = await signJwtToken({ user: encryptData });
//       return signToken;
//     }
//     if (isRefresh && verifAccessToken.isError) {
//       // make a db call
//       const result = await UserService.getCurrentUser(user.id);
//       if (result.isError) throw new Error(result.message);
//       const encryptData = encryptString(JSON.stringify(result.data));
//       const signToken = await signJwtToken({ user: encryptData });
//       return signToken;
//     }
//     return accessToken;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// const authOptions: any = {
// adapter: MongoDBAdapter(client),
// session: {
//   strategy: "jwt",
//   maxAge: 30 * 24 * 60 * 60, // 30 days
//   updateAge: 24 * 60 * 60,
//   generateSessionToken: () => {
//     return nanoid(32);
//   },
// },
//   providers: [
//     CrendentialsProvider({
//       name: "crendentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter your email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },
//       async authorize(credentials) {
//         try {
//           const user = await UserModel.findOne({
//             email: credentials?.email,
//           }).select("+password");

//           if (!user) throw new Error("Wrong Email");

//           const passwordMatch = await bcrypt.compare(
//             credentials!.password,
//             user.password
//           );

//           if (!passwordMatch) throw new Error("Wrong Password");

//           // validate the inputs
//           const parsedResult = validateZodInput(credentials, UserZodSchema);
//           if (parsedResult.isError) throw new Error(parsedResult.message);
//           // make db calls her
//           const result = await UserService.getCurrentUser(user._id);
//           if (result.isError) throw new Error(result.message);
//           return result.data;
//         } catch (error: any) {
//           throw new Error(error.message);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, crendentials }: any) {
//       console.log("sign in", user, account, email);

//       return true;
//     },
//     async redirect({ url, baseUrl }: any) {
//       console.log("redirect", url, baseUrl);
//       if (url.startsWith("/")) return url;
//       return baseUrl;
//     },
//     async session({ session, token, user }: any) {
//       console.log("session", session, user, token);
//       if (token) {
//         session.user = token?.user;
//         session.accessToken = token?.accessToken;
//       }
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }: any) {
//       console.log('jwt', token, user, account, profile, isNewUser);

//       if (token && user) {
//         const _user = {
//           id: user.id,
//           email: user.email,
//           role: user.role,
//           name: user.name,
//           avatar: user.avatar,
//         };
//         // create a fn generate access token
//         const accessToken = await generateAccessToken({
//           accessToken: token?.accessToken,
//           user: _user,
//           isRefresh: false,
//         });
//         token.user = _user;
//         token.accessToken = accessToken;

//         console.log('token && user', token, _user);
//       }

//       if (token && !user) {
//         const _user = token?.user;
//         // create a fn generate access token
//         const accessToken = await generateAccessToken({
//           accessToken: token?.accessToken,
//           user: _user,
//           isRefresh: true,
//         });
//         token.user = _user;
//         token.accessToken = accessToken;

//         console.log('token && !user', token, _user);
//       }

//       return token;
//     },
//   },
//   pages: {
//     error: "/auth/error",
//   },
// };

// export default authOptions;
