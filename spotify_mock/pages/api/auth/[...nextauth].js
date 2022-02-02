import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyAPI, { spotifyApi, LOGIN_URL } from "../../../lib/spotify"

// Token refresh function (token)
async function refreshAccessToken(token) {
  try {
    spotifyAPI.setAccessToken(token.accessToken)
    spotifyAPI.setRefreshToken(token.refreshToken)

    const {body: refreshedToken} = await spotifyAPI.refreshToken
    console.log("Refreshed token is", refreshedToken)

    spotifyApi.setAccessToken(token)
    spotifyApi.setRefreshToken(token.refreshToken)

    return {
      ...token, 
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken
    }
  } catch (error) {
    console.log(error)
    return {
      ...token, 
      error:"RefreshAccessTokenError"
    }

  }
}

// Credentials for API auth
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  }, 
  callbacks: {
    async jwt({token, account, user}) {

      // Initial sign in
      if (account && user) {
        return {
          ...token, 
          accessToken: account.access_token, 
          refreshToken: account.refresh_token, 
          username: account.username, 
          accessTokenExpires: account.expires_at * 1000
        }
      }
      // Return previous token if access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("Existing token is valid")
        return token
      }
      console.log("Access token has expired, refreshing...")
      return await refreshAccessToken(token)
      },

    async session({session, token}) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    }
    }
})