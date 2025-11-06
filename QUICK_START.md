# 🚀 Quick Start Guide - Tech Sanrakshanam Website

## Starting the Website

### Option 1: Simple Start
1. Open PowerShell or Command Prompt
2. Navigate to project folder:
   ```
   cd c:\Users\dhruv\Downloads\techspl
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open browser and go to: **http://localhost:3000**

### Option 2: Using Node Directly
```
node server.js
```

## Stopping the Server
Press `Ctrl + C` in the terminal

## 📍 Available Pages

Once the server is running, visit these URLs:

### Main Pages
- **Home**: http://localhost:3000/
- **Products**: http://localhost:3000/products
- **Services**: http://localhost:3000/services
- **Solutions**: http://localhost:3000/solutions
- **Projects**: http://localhost:3000/projects

### Content Pages
- **Innovation Lab**: http://localhost:3000/innovation
- **Blog**: http://localhost:3000/blog
- **FAQ**: http://localhost:3000/faq
- **Community**: http://localhost:3000/community

## ✨ Key Features to Test

### 1. Navigation
- Click on menu items
- Try mobile menu (resize browser)
- Use dropdown for Catalogue

### 2. Interactive Elements
- Scroll down to see animations
- Click FAQ questions to expand
- Use tabs in Community page
- Filter projects by status
- Search in FAQ page

### 3. Forms
- Click "Contact" button (top-right or any CTA)
- Fill out community form
- Try newsletter subscription

### 4. Scroll Features
- Scroll down to see "Scroll to Top" button
- Use smooth scrolling on anchor links
- Notice navbar effects on scroll

## 🎨 Design Highlights

### Indian Theme
- Saffron, white, green color scheme
- Sanskrit slokas on every page
- Traditional Indian aesthetic with modern design

### Certifications
- MSME badge in top bar
- ISO 27001 certificate
- GeM registration
- Made in India badge in footer

### Content Sections
- **6 Products** with icons and features
- **6 Services** with detailed descriptions
- **6 Solutions** for different industries
- **6 Projects** with client testimonials
- **4 Innovation** research areas
- **6 FAQ** categories with answers
- **Blog posts** with images from Unsplash
- **Community** discussion forum UI

## 🐛 Troubleshooting

### Server won't start?
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process if needed (replace PID)
taskkill /PID [process_id] /F

# Try different port (edit server.js)
const PORT = 3001;
```

### Missing dependencies?
```bash
npm install
```

### CSS not loading?
- Clear browser cache (Ctrl + Shift + Delete)
- Hard refresh (Ctrl + F5)
- Check browser console for errors

### Images not showing?
- Internet connection required (uses Unsplash CDN)
- Check browser console for blocked content

## 📱 Testing Responsiveness

### Desktop View
- Resize browser to full width (> 1024px)
- Check all layouts are centered

### Tablet View
- Resize to 768-1024px
- Some grids should become 2 columns

### Mobile View
- Resize to < 768px
- Menu should become hamburger icon
- All grids should be single column

## 🎯 What to Showcase

### For Clients/Stakeholders
1. **Home Page** - Company overview and stats
2. **Projects** - Success stories and testimonials
3. **Innovation Lab** - R&D capabilities
4. **Services** - Comprehensive offerings

### For Developers
1. **Clean Code Structure** - Well-organized files
2. **Modern Stack** - Node.js + Express + EJS
3. **Responsive Design** - Works on all devices
4. **Interactive Features** - Forms, modals, animations

### For Designers
1. **Indian Aesthetic** - Traditional meets modern
2. **Color Palette** - Saffron, white, green theme
3. **Typography** - Devanagari + Poppins fonts
4. **Animations** - Smooth transitions and effects

## 📊 Performance Tips

### For Best Experience
- Use Google Chrome or Firefox
- Enable JavaScript
- Allow images to load
- Use stable internet connection

### Monitor Performance
- Open browser DevTools (F12)
- Check Console for errors
- Check Network for slow requests
- Check Performance for optimization

## 🔐 Security Notes

- Forms are validated on client-side
- Email validation included
- XSS prevention implemented
- Safe HTML rendering with EJS

## 📞 Need Help?

If you encounter any issues:
1. Check browser console (F12 → Console)
2. Check terminal for server errors
3. Verify all files are in correct locations
4. Ensure Node.js is properly installed

## 🎉 Success Checklist

- [ ] Server starts without errors
- [ ] Home page loads with hero section
- [ ] All menu links work
- [ ] Mobile menu toggles correctly
- [ ] Forms can be submitted
- [ ] FAQ accordion works
- [ ] Projects can be filtered
- [ ] Scroll to top button appears
- [ ] Contact modal opens/closes
- [ ] Blog posts are visible
- [ ] Innovation lab content loads
- [ ] Community tabs switch properly
- [ ] Footer links are functional

## 🌟 Next Steps

1. **Customize Content** - Update server.js with real data
2. **Add Database** - Connect MongoDB or PostgreSQL
3. **Deploy Online** - Use Heroku, Vercel, or AWS
4. **Add Analytics** - Google Analytics integration
5. **SEO Optimization** - Meta tags and sitemap
6. **SSL Certificate** - For HTTPS in production

---

**Made with ❤️ in India | Tech Sanrakshanam - तकनीकी संरक्षणम्**

*Server is now running on: http://localhost:3000*
