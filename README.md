# Tech Sanrakshanam – तकनीकी संरक्षणम् (Full Stack Website)

![Tech Sanrakshanam](https://img.shields.io/badge/Tech-Sanrakshanam-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-blue?style=for-the-badge&logo=express)
![EJS](https://img.shields.io/badge/Templates-EJS-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-Commercial-important?style=for-the-badge)

A production-ready Node.js + Express website for **Tech Sanrakshanam**, featuring a rich blog, FAQ, product/service catalogue, an Innovation Lab showcase, and a fully functional community discussion forum with persistent storage.

## 🇮🇳 About

Tech Sanrakshanam (तकनीकी संरक्षणम्) is committed to protecting and advancing India's technological infrastructure. We are:
- ✅ **MSME Verified** - Recognized by Ministry of MSME
- ✅ **ISO 27001:2013 Certified** - International Information Security Standards
- ✅ **GeM Registered** - Government e-Marketplace Partner
- ✅ **Make in India** - Proudly Indian Company

## 🚀 Highlights

### Website Modules
- 🏠 Home, 📦 Products, 🛠️ Services, 💡 Solutions, 📊 Projects
- 🔬 Innovation Lab, ❓ FAQ, 📝 Blog (rich formatting), 👥 Community forum

### Design Features
- 🎨 **Modern Indian Design** - Saffron, white, green color palette
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast & Dynamic** - Built with Node.js and Express
- 🌐 **SEO Optimized** - Meta tags and semantic HTML
- ♿ **Accessible** - WCAG compliant
- 🎭 **Smooth Animations** - CSS animations and transitions
- 🔒 **Secure** - Form validation and security best practices

### Sanskrit Elements
- 🕉️ Sanskrit slokas throughout the website
- 📜 Traditional Indian wisdom integrated with modern tech
- 🎨 Devanagari font support

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm (bundled with Node.js)
- Modern web browser

## 🔧 Setup (Windows PowerShell)

1) Navigate to the project directory (adjust path if different)

```powershell
cd C:\Users\dhruv\Downloads\techspl
```

2) Install dependencies

```powershell
npm install
```

3) Start the server

```powershell
npm start
```

4) Optional: developer auto-reload

```powershell
npm i -g nodemon
npm run dev
```

5) Open the site at http://localhost:3000

## 📁 Project Structure

```
techspl/
├── server.js              # Express server and routes
├── package.json           # Project dependencies
├── views/                 # EJS templates
│   ├── partials/
│   │   ├── header.ejs    # Header with navigation
│   │   └── footer.ejs    # Footer with links
│   ├── index.ejs         # Home page
│   ├── products.ejs      # Products catalogue
│   ├── services.ejs      # Services page
│   ├── solutions.ejs     # Solutions page
│   ├── projects.ejs      # Projects portfolio
│   ├── innovation.ejs    # Innovation Lab
│   ├── faq.ejs          # FAQ page
│   ├── blog.ejs         # Blog listing
│   ├── blog-post.ejs    # Individual blog post
│   └── community.ejs    # Community & forum
├── public/               # Static assets
│   ├── css/
│   │   └── style.css    # Complete stylesheet
│   ├── js/
│   │   └── main.js      # Client-side JavaScript
│   └── images/          # Image assets
├── data/                 # JSON-based persistence (created automatically)
└── README.md            # This file
```

## 🎨 Key Pages

### 1. Home Page (/)
- Hero section with company tagline
- Key statistics and certifications
- Core services overview
- Industries served
- Call-to-action sections

### 2. Catalogue
- **Products** (/products) - IT products and hardware
- **Services** (/services) - IT services and consulting
- **Solutions** (/solutions) - Industry-specific solutions
- **Projects** (/projects) - Case studies and portfolio

### 3. Innovation Lab (/innovation)
- Active research projects
- R&D focus areas (AI, IoT, Drones, Blockchain)
- Academic partnerships
- Innovation statistics

### 4. Blog (/blog)
- Featured article + category filtering
- Individual posts at `/blog/:id`
- Rich content parser supports:
   - `##` H2, `###` H3 headings
   - `![alt](url)` images with captions
   - `> quote` blockquotes
   - `-`/`*` bulleted lists

### 5. FAQ (/faq)
- Searchable questions
- Category-wise organization
- Accordion interface
- Additional resources

### 6. Community (/community)
- Discussion forum with categories and dynamic counts
- Click through to view a discussion `/community/discussion/:id`
- Reply to a discussion (AJAX)
- New Discussion modal with validation and persistence

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Templating engine
- **Body-Parser** - Request parsing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox
  - CSS Variables
  - Animations & Transitions
  - Responsive design
- **Vanilla JavaScript** - No jQuery dependency
- **Font Awesome** - Icons
- **Google Fonts** - Poppins & Devanagari fonts

### External Resources
- Unsplash (images), Font Awesome (icons), Google Fonts

## 💾 Data & “DB” Details

This project uses simple, file-based JSON persistence (no external DB). Files are stored under the `data/` directory and are created automatically on first run or first write.

Core files:
- `blogPosts.json`: list of blog post objects
- `discussions.json`: community discussions and replies
- `faqs.json`, `products.json`, `services.json`, `solutions.json`, `projects.json`, `innovations.json`: content catalogs

Save/load helpers live in `server.js`:
- `loadData(filename, defaultData)` – returns parsed JSON or default
- `saveData(filename, data)` – writes JSON to disk

### Blog Post Schema
```json
{
   "id": 1,
   "title": "string",
   "excerpt": "short summary",
   "content": "rich text with ##, ###, images, lists, quotes",
   "date": "YYYY-MM-DD",
   "category": "Cybersecurity | IoT | Drones | Technology | Blockchain | ...",
   "tags": ["array", "of", "strings"],
   "image": "https://...",
   "author": "string",
   "readTime": "e.g. 18 min read"
}
```

### Discussion Schema
```json
{
   "id": 1,
   "title": "string",
   "excerpt": "auto from first 120 chars of content",
   "content": "string",
   "category": "cybersecurity | iot-solutions | drone-tech | ai-ml | blockchain | networking | general",
   "author": "string",
   "createdAt": 1731000000000,
   "views": 0,
   "replies": [
      { "id": 1, "author": "string", "message": "string", "createdAt": 1731000000000 }
   ]
}
```

Notes:
- IDs are numeric and auto-incremented in memory when new items are added.
- Data is persisted via `saveData()` on create/update actions.
- For backups, copy the entire `data/` folder regularly.

## 🔌 Routes & API Endpoints

Public pages:
- `GET /` – Home
- `GET /products`, `/services`, `/solutions`, `/projects`, `/innovation`, `/faq`
- `GET /blog` – Blog listing
- `GET /blog/:id` – Blog post detail

Community:
- `GET /community` – Discussions list with per-category counts
- `GET /community/discussion/:id` – Discussion detail (increments `views`)
- `POST /community/discussion/new` – Create a discussion
   - body: `{ title, content, category, author }`
- `POST /community/discussion/:id/reply` – Add a reply
   - body: `{ author, message }`

Client-side interactivity lives in `public/js/main.js` for filtering, keyboard a11y, and UI behaviors; and inline `<script>` blocks inside EJS for page-specific features.

## 🎯 Core Features Implementation

### Interactive Elements
- ✅ Mobile menu toggle
- ✅ Smooth scrolling
- ✅ Scroll-to-top button
- ✅ Modal popups
- ✅ FAQ accordion
- ✅ Tab navigation
- ✅ Project filtering
- ✅ Form validation
- ✅ Animated counters
- ✅ Scroll animations

### Forms & Validation
- Contact form with validation
- Community form submission
- Newsletter subscription
- Email validation
- Required field checking
- Error messages

### Dynamic Content
- Sample blog posts
- Product listings
- Service descriptions
- Project portfolio
- Innovation projects
- FAQ database

## 🔒 Security

- Input validation on server for required fields
- Basic XSS mitigation in templates; prefer escaping user content
- Sessions via `express-session` (used for future admin needs)
   - IMPORTANT: Session secret is currently hardcoded in `server.js` – change it before production
- Use HTTPS in production and set secure cookies
- Consider rate limiting (e.g., `express-rate-limit`) and helmet (`helmet`) for headers in production

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🌟 Indian Design Elements

### Color Palette
- Saffron (#FF9933) - Energy and courage
- White (#FFFFFF) - Peace and truth
- Green (#138808) - Growth and prosperity
- Golden (#FFD700) - Wealth and wisdom
- Navy Blue (#000080) - Stability and trust

### Sanskrit Integration
```
सत्यं वद । धर्मं चर - Speak Truth, Practice Righteousness
योगः कर्मसु कौशलम् - Excellence in action is Yoga
विद्या ददाति विनयं - Knowledge bestows humility
```

## 🚀 Deployment

Choose one based on your infra and skills. All commands are provided as reference inside this README and may require adaptation.

### Option A) Traditional VM (Ubuntu/Debian) with PM2 + Nginx
1. Install Node.js 18 LTS and git
2. Clone repo and `npm ci`
3. Start with PM2: `pm2 start server.js --name techsanrakshanam`
4. Enable startup: `pm2 save && pm2 startup`
5. Put Nginx in front (reverse proxy) with gzip and TLS
6. Map persistent storage: ensure `/var/www/techspl/data` is writable by the node user

### Option B) Windows Server (IIS optional)
- Install Node.js 18+, `npm ci`, run `npm start` as a service using NSSM or PM2 for Windows
- If using IIS, configure ARR reverse proxy to http://127.0.0.1:3000

### Option C) Docker (recommended for portability)
Use this sample Dockerfile (create `Dockerfile` at project root):

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
- Build image: `docker build -t techsanrakshanam .`
- Persist data by mounting a volume: `-v /host/data:/app/data`
- Run: `docker run -d -p 3000:3000 -v techspl_data:/app/data --name techsanrakshanam techsanrakshanam`

Backups: snapshot or copy the mounted `/app/data` volume.

### Option D) Vercel (Serverless / Edge Deployment)

Vercel deployments run in serverless functions with an **ephemeral filesystem**. That means writes to `data/*.json` won't persist between requests or after redeployments. To deploy this app on Vercel you must externalize persistence (e.g. PlanetScale MySQL, Neon/Postgres, MongoDB Atlas, Turso/LibSQL, Supabase, or Vercel KV / Postgres). Below is a migration + deployment approach.

#### 1. Refactor server entry point
Split the Express app from the listener so Vercel can import the app without calling `app.listen()`. Create `app.js`:

```js
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: Replace JSON file persistence with DB models here.

module.exports = app;
```

Move route definitions from `server.js` into a new `routes/index.js` (or keep them in `app.js`). Then create `api/index.js` for Vercel:

```js
// api/index.js (Vercel serverless entry)
const app = require('../app');
module.exports = app;
```

Retain the original `server.js` for local/dev usage:

```js
// server.js (local only)
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Local server on http://localhost:${PORT}`));
```

#### 2. Replace JSON persistence
Implement a simple data layer. Example using PostgreSQL (Neon/Supabase) with Prisma:

```bash
npm install prisma @prisma/client
npx prisma init
```

Example Prisma schema excerpt:

```prisma
model Discussion {
   id         Int      @id @default(autoincrement())
   title      String
   excerpt    String?
   content    String
   category   String
   author     String?
   createdAt  DateTime @default(now())
   views      Int      @default(0)
   replies    Reply[]
}

model Reply {
   id          Int      @id @default(autoincrement())
   author      String?
   message     String
   createdAt   DateTime @default(now())
   discussion  Discussion @relation(fields: [discussionId], references: [id])
   discussionId Int
}
```

Run migrations: `npx prisma migrate deploy` on Vercel build.

#### 3. Environment Variables
Set the following in Vercel Project Settings:
- `SESSION_SECRET` (replace hardcoded secret)
- `DATABASE_URL` (Prisma connection string)

Update session config:
```js
session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }
})
```

#### 4. vercel.json Configuration
Add a `vercel.json` to map the serverless function and static assets:

```json
{
   "version": 2,
   "functions": {
      "api/index.js": { "runtime": "nodejs18.x" }
   },
   "routes": [
      { "src": "/(css|js|images)/(.*)", "dest": "/public/$1/$2" },
      { "src": "/(.*)", "dest": "/api/index.js" }
   ]
}
```

Static assets may need to be moved under `public/` with proper path references.

#### 5. Deployment Steps
1. Fork or push repo to GitHub
2. Import project in Vercel dashboard
3. Set env vars (DATABASE_URL, SESSION_SECRET)
4. (Optional) Add build command if using Prisma: `npx prisma generate`
5. Deploy – Vercel builds and provisions serverless functions
6. Test `/community` and create a discussion (ensure DB writes succeed)

#### 6. Limitations & Notes
- No local file writes: JSON persistence won't work — must use a DB.
- Avoid synchronous filesystem operations.
- Maintain stateless logic; use caching (Vercel Edge Config / Redis) for performance.
- Large blog content rendering is fine; consider caching parsed HTML if needed.

#### 7. Optional Optimizations
- Use incremental static regeneration for heavily static pages (home, products, services) by migrating them to Next.js later.
- Offload images to an object store (Cloudinary, S3) for bandwidth savings.

### Quick Vercel Health Checklist
- [ ] Session secret from env
- [ ] Database connected
- [ ] No file writes to /tmp except ephemeral caching
- [ ] Routes served from `api/index.js`
- [ ] Static assets resolving correctly
- [ ] 200 OK on `/blog` and `/community`

### Environment Variables
- `PORT` – defaults to `3000`
- For production, consider externalizing session secret and other secrets by refactoring `server.js` to read from env.

## 📊 Performance & SEO

- Lazy loading for images
- Minified CSS and JS (for production)
- Gzip compression
- Browser caching
- CDN for static assets
- Image optimization
 - Semantic HTML and descriptive meta tags

## 🔮 Roadmap / Future Enhancements

- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Real-time chat support
- [ ] Blog CMS integration
- [ ] Payment gateway integration
- [ ] API development
- [ ] Multi-language support
- [ ] PWA features
- [ ] Analytics dashboard
- [ ] Customer portal
- [ ] Migrate JSON storage to managed database (Postgres/MySQL/Mongo) & introduce ORM (Prisma/TypeORM)

## 🧩 Content Editing & Authoring

### Adding a Blog Post
1. Edit `data/blogPosts.json` (if absent, the server will create it on first save; initial data also lives in `server.js`).
2. Use the supported markdown-like syntax inside `content`:
   - `##` and `###` headings
   - `![Caption](https://image)` for images (displayed with caption)
   - `> Blockquotes`
   - `-` bulleted lists
3. Restart the server to pick up file edits (or implement a small admin UI later).

### Starting a New Discussion
1. Click “New Discussion” in `/community`
2. Fill the modal form; the post is saved to `data/discussions.json`
3. Replies are appended to the same file

Backups: copy the `data/` directory on a schedule.

## 🤝 Contributing

This is a proprietary project for Tech Sanrakshanam. For suggestions or improvements, please contact the development team.

## 📄 License

Copyright © 2025 Tech Sanrakshanam. All rights reserved.

## 📞 Contact

**Tech Sanrakshanam - तकनीकी संरक्षणम्**

- 📍 Address: Tech Park, Cyber City, Pune, Maharashtra 411014
- 📧 Email: info@techsanrakshanam.in
- ☎️ Phone: +91 20 1234 5678
- 🌐 Website: [Coming Soon]

---

**Made with ❤️ in India | 🇮🇳 Proudly Indian**

*"उद्यमेन हि सिध्यन्ति कार्याणि" - Success comes through effort*
>>>>>>> 8bb3fb6 (Initial commit: Tech Sanrakshanam full stack site)
