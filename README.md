<h1 align="center">Blog API</h1>

<p align="center">
    An API for my pet project, covering a wide range <br> of functionality used in real web applications.
</p>

<div align="center">
    <a href="#">Swagger doc (soon)</a> ·
    <a href="https://github.com/rmdxdev/miracle-api/issues">Report bug</a> ·
    <a href="https://github.com/rmdxdev/miracle-api/issues">Request feature</a>
</div>

### ⚡ Features

---

- 🚄 **Fast:** requests are cached and compressed (Compression, etc.)
- 🚀 **Optimize:** formatting photos in webp, returns only the required data. (Sharp, Prisma selecting, etc.)
- 🔒 **Safe:** data validation, http web security standards. (Express-validator, Helmet, etc.)
- ⚡ **Fast building:** fast project assembly with SWC.
- ✍🏻 **Readability:** good application structure, understandable code.

### ⚡ Tech Stack

---

Express, MongoDB, Typescript, Prisma, Express-Validator, Multer, Sharp, Nodemailer, Winston, Bcrypt, Uuid etc.

### ⚡ Run

---

**Start the server in dev mode**

```bash
npm run dev
```

**Build project**

```bash
npm run build
```

**Format all code (Prettier)**

```bash
npm run format:fix
```

**Format all code (ESLint)**

```bash
npm run lint:fix
```

### ⚡ Env

---

- API_PORT - server port (default is 5995)
- BCRYPT_SALT - password hashing salt
- DATABASE_URL - link to your database
- JWT_ACCESS_TOKEN - secret key for access token
- JWT_REFRESH_TOKEN - secret key for refresh token
- SMTP_EMAIL - email
- SMTP_PASSWORD - email password
- SMTP_PORT - smtp service port
- SMTP_SERVICE - smtp service name

### ⚡ Contribution

---

```
# Clone repo
git clone https://github.com/rmdxdev/blog-app-api.git

# Go to the directory
cd blog-app-api

# Create a branch with your feature
git checkout -b your-feature

# Make the commit with your changes
git commit -m 'feat: Your new feature'

# Send the code to your remote branch
git push origin your-feature
```

### ⚡ License

---

Miracle API is licensed under the MIT license.