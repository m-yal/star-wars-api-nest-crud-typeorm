export const sessionConfig = {
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: +process.env.SESSION_COOKIES_MAX_AGE }
}