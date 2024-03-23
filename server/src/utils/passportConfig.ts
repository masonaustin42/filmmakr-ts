import passport from 'passport'
import { StrategyOptions } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../db/schemas/user.js'
import bcrypt from 'bcrypt'

// Initialize Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/login/google/callback',
    } as StrategyOptions,
    (accessToken, refreshToken, profile, done) => {
      done(null, profile)
    },
  ),
)

passport.serializeUser((user: any, done: Function) => done(null, user.id))
passport.deserializeUser(async (user: any, done: Function) => done(null, user))
