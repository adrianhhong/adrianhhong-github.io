---
title: 'Exploiting JWT with the "none" Algorithm'
excerpt: 'Exploiting JWT with the "none" Algorithm'
coverImage: "/assets/blog/preview/cover.jpg"
date: "2024-11-02T00:00:00.000Z"
author:
  name: Adrian Hong
  picture: "/assets/blog/authors/joe.jpeg"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
tags: ["CTF", "Exploit"]
---

I recently participated in a CTF where my team came second. Below was an interesting Web problem, which we managed to solve.

# The Problem

The challenge presented you with the source code to a typical Javascript Express application allowing you to create and log in as users.

![warnet](/assets/posts/jwt/warnet.png)

The flag is stored in a local file `/flag.txt` which will be read and rendered into `admin` page if we can pass the `authMiddleware`.

```js:routes/admin.js {1,3-4} showLineNumbers
import { Router } from "express";
import fs from "node:fs";
import authMiddleware from "../middleware/auth.js";

const router = Router();

let flag;

try {
  flag = fs.readFileSync("./flag.txt", "utf8");
} catch (err) {
  console.error(err, "no admin route will be loaded");
}

router.get("/admin", authMiddleware, async (req, res) => {
  res.render("admin", { flag });
});

export default router;
```

The `authMiddleware` accesses your cookie and specifically looks for a user with a callsign of `admin`. If we are the `admin`, we reach `next()` and pass the middleware.

```js:middleware/auth.js
    ...
        if (
            !(await db.users.findOne({
                where: { id: user.id, callsign: "admin" },
            }))
        ) {
            return res.render("error", { message: "get out!" });
        }
    ...

    next();
```

# Investigation

## Login is admin?

The first thing you might try is to login as `admin` so that our cookie passes the `authMiddleware`.

![login](/assets/posts/jwt/login.png)

The database is seeded initially with a single `admin` user.

```js:db_seed.js
import { randomBytes } from "crypto";

export const users = [
    {
        id: 1,
        callsign: "admin",
        password: randomBytes(16).toString("hex"),
        godMode: true
    }
];
```

Having a look at the `POST` `/login` endpoint reveals the difficulty with this method.

```js:routes/auth.js
router.post("/login", async (req, res) => {
    if (typeof req.body === "undefined") return res.render("error", { message: "please provide valid data." });

    const { callsign, password } = req.body;

    const user = await db.users.findOne({
        where: { callsign }
    });

    if (!user) return res.render("error", { message: "there is no organization member by that callsign." });

    if(!bcrypt.compareSync(password, user.password)) return res.render("error", { message: "provide a valid personnel provided."});

    const token = jwt.sign({ id: user.id, callsign: user.callsign, god_mode: user.godMode }, secretKey, {
        expiresIn: "1h",
    });

    res.cookie("session", token);

    res.render("message", { message: "logged in." });
})
```

There is no way around this, if this method were to succeed we would need to provide a password that matches the password of the initial `admin` seed. This password is a random 16 byte hex string and to brute force this value would take an extremely long time.

## Create an admin user?

Instead of looking at how we can login as an existing user, the next step might be to look at exploits with the registering of users. If somehow we can create another user with the `admin` callsign, or override the existing `admin` user, we might be able to change the password, and obtain the flag.

```js:routes/auth.js
router.post("/register", async (req, res) => {
    if (typeof req.body === "undefined") return res.render("error", { message: "please provide valid data." });

    const { callsign, password, confirm_pass: confirmPass } = req.body;

    if (password !== confirmPass) return res.render("error", { message: "passwords must be identical." });

    const possibleUser = await db.users.findOne({
        where: { callsign }
    });

    if (possibleUser) return res.render("error", { message: "callsign already used by personnel" });

    await db.users.create({
        callsign,
        password,
        godMode: false,
    });
    return res.render("message", { message: "registered successfully." });
});
```

Looking at the `register` endpoint, there does not seem to be an easy solution to bypass this. Before creating a user, we verify if there is already a user has been created already. Since the database is already seeded with an `admin` callsign, there is no way to create another user with the callsign `admin`.

# The Solution - the "none" algorithm

The solution lies in the way we are handling JWT tokens. JSON Web Tokens (JWT) are a secure and self-contained way to transmit information between parties. It consists of a Header, Payload and Signature separated by dots.

Let's look at a sample user. When I register a new user, and login, it returns me a `session` cookie.

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiY2FsbHNpZ24iOiJ1c2VyIiwiZ29kX21vZGUiOmZhbHNlLCJpYXQiOjE3MzExMjM5NjksImV4cCI6MTczMTEyNzU2OX0.mPlZC4q7BokwcbExIldln84Ei3X0fTt7j9lyMHULH9o
```

Throwing this in `https://jwt.io/` illustrates the 3 components of our JWT.

![jwt](/assets/posts/jwt/jwt.png)

1. Our header is signed using HMAC SHA256 or RSA and is of type JWT.
2. Our payload consists of our user information. We have the callsign `user` and are the second user `id: 2` (the first being the initial seeded `admin` user).
3. Our signature which is our header and payload that has been signed with a `secret key`. In this case the `secret key` is randomised, so very difficult to brute force.

```js:helpers/auth.js
const secretKey = crypto
  .randomBytes(64 / 2)
  .toString("hex")
  .slice(0, 128);
```

So what is the solution?

If you look carefully at code which decodes and verifies the JWT, we can see the vulnerability.

```js:middleware/auth.js
...

const decoded = jwt.decode(userCookie, { complete: true });
const user = jwt.verify(userCookie, decoded.signature ? secretKey : null, {
  algorithm: decoded.header.alg,
});

...
```

We first decode the cookie. Then we check if a signature is provided. If it isn't, we use `null` as our secret key. We also get the `alg` from the decoded cookie.

This is bad! The reason is because there is a sneaky algorithm that can be leveraged, aptly called the ["none"](https://datatracker.ietf.org/doc/html/rfc7518#section-3.6) algorithm. The "none" algorithm does not check the signature, allowing us to send a modified payload which the backend will blindly accept.

Let's modify our JWT to use the "none" algorithm and pretend to be `admin`.

![jwt-modified](/assets/posts/jwt/jwt-modified.png)

Replacing our session token with this new JWT, and heading to the `/admin` endpoint gives us the flag!

![flag](/assets/posts/jwt/flag.png)

# Takeaways

Never use the algorithm in the user provided JWT to decode the JWT. Doing so will allow the user to provide whatever payload they want with the "none" algorithm.
