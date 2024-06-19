import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv';
dotenv.config();

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthResponse {
  status: number;
  user: User;
}

async function authenticate(email: string, password: string): Promise<AuthResponse> {
  try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/validate_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    let data = await response.json();
    console.log("this is the data")
    console.log(data);

    if (response.status !== 200) {
      throw new Error("Either the user does not exist or the password is incorrect");
    }

    let user: User = {
      id: data.id,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email
    }

    let authResponse: AuthResponse = {
      status: 200,
      user: user
    }

    console.log("this is the auth response");
    console.log(authResponse);

    return authResponse;
  } catch (error) {
    console.log("this is the error");
    console.log(error);
    let authResponse: AuthResponse = {
      status: 400,
      user: {
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: ""
      }
    }

    return authResponse;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (credentials) {
          const { username, password } = credentials;
          let new_user: User | null = null;
          try {
            let response: AuthResponse = await authenticate(username, password);

            console.log("this is the response");
            console.log(response);

            if (response.status !== 200) {
              throw new Error("Either the user does not exist or the password is incorrect");
            }

            new_user = response.user;

            return new_user;
          } catch (error) {
            throw new Error("Either the user does not exist or the password is incorrect");
          }

          return new_user;
        }
        return null; // Return null if credentials are undefined
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: "secret",
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        return token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.username) {
        session.user = {
          id: token.id,
          username: token.username || '',
          email: token.email,
          first_name: token.first_name,
          last_name: token.last_name
        };
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
