---
title: "Exploiting JWT with the None Algorithm"
excerpt: "Some important React lessons."
coverImage: "/assets/blog/preview/cover.jpg"
date: "2024-11-02T00:00:00.000Z"
author:
  name: Adrian Hong
  picture: "/assets/blog/authors/joe.jpeg"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
tags: ["CTF", "Exploit"]
---

I recently participated in a company run CTF where we came second. Below was an interesting Web problem, which we managed to solve.

# Warnet

The challenge presented you with the source code to a typical Javascript Express application allowing you to create and log in as users.

![Warnet](/assets/posts/jwt/warnet.png)

The flag is stored in a local file `/flag.txt`. Which will be read and rendered into `admin` page if we can pass the `authMiddleware`.

```js:routes/admin.js
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
