# Compound Gym Replit Theme

A custom Shopify theme built for **Compound Gym** (7523 South Fwy, Houston, TX 77021) — a private strength and performance facility selling memberships, day passes, and personal training.

---

## Theme Overview

| Feature | Detail |
|---|---|
| Theme name | Compound Gym Replit Theme |
| Shopify OS | Online Store 2.0 (JSON templates) |
| Typography | System fonts only — no external requests |
| Button radius | 3px |
| Schema markup | GymOrHealthClub, Product, Service, BreadcrumbList |
| SEO | Canonical URLs, Open Graph, Twitter Card, one H1/page |

---

## Step 1: Push to GitHub

1. Create a new **private** repository on GitHub (e.g. `compound-gym-shopify-theme`).
2. Push the contents of the `shopify-gym-theme/` directory to that repository's **main branch**. The repository root should contain the `assets/`, `config/`, `layout/`, etc. folders directly.

```bash
cd shopify-gym-theme
git init
git remote add origin https://github.com/YOUR_USERNAME/compound-gym-shopify-theme.git
git add .
git commit -m "Initial theme"
git push -u origin main
```

---

## Step 2: Connect GitHub to Shopify

1. In Shopify Admin, go to **Online Store → Themes**.
2. Click **Add theme** → **Connect from GitHub**.
3. Follow the OAuth flow to authorize Shopify's GitHub integration.
4. Select your repository (`compound-gym-shopify-theme`) and the **main** branch.
5. Click **Connect**.
6. Once imported, click **Publish** to make it your live theme, or **Customize** to preview first.

> **Note:** Any future pushes to the `main` branch will automatically sync with Shopify within a few minutes.

---

## Step 3: Create Navigation Menus

The theme requires two menus in Shopify Admin → **Navigation**:

### Main Menu (handle: `main-menu`)
| Title | URL |
|---|---|
| Memberships | `/pages/memberships` |
| Day Passes | `/pages/passes` |
| Personal Training | `/pages/personal-training` |
| Shop | `/collections/apparel` |
| About | `/pages/about` |
| Contact | `/pages/contact` |

### Footer Menu (handle: `footer`)
Same links as the main menu, or a subset.

---

## Step 4: Create Pages with the Right Templates

Each page must be created in Shopify Admin → **Online Store → Pages** and assigned the correct template:

| Page Title | URL Handle | Template |
|---|---|---|
| Memberships | `memberships` | `page.memberships` |
| Day Passes | `passes` | `page.passes` |
| Personal Training | `personal-training` | `page.personal-training` |
| About | `about` | `page.about` |
| Contact | `contact` | `page.contact` |

To assign a template in the page editor: on the right sidebar, find **Theme template** and select the correct one from the dropdown.

---

## Step 5: Create the Apparel Collection

1. Go to **Products → Collections → Create collection**.
2. Set the title to `Apparel`.
3. Set the handle to `apparel` (URL: `/collections/apparel`).
4. The collection will use the `collection.json` template automatically.

---

## Step 6: Configure Theme Settings

Go to **Online Store → Themes → Customize** and fill in settings under each section:

### General
- **Gym Name**: Compound Gym
- **Logo**: Upload your logo image
- **Default share image**: Upload an image for social sharing (1200×630 recommended)

### Colors
Pre-configured with Compound Gym's default palette. Adjust if needed:
- Primary: `#0a0a0a` (near black)
- Accent: `#c41e1e` (red)
- Background: `#ffffff`

### Contact Info
- **Street address**: 7523 South Fwy
- **City**: Houston
- **State**: TX
- **ZIP**: 77021
- **Hours**: Open 24/7
- **Phone / Email**: Add when available

### Google Maps
The embed URL is pre-configured with the Compound Gym location. To update:
1. Go to [Google Maps](https://maps.google.com), search for Compound Gym.
2. Click **Share → Embed a map → Copy HTML**.
3. Extract only the `src="..."` URL from the `<iframe>` tag.
4. In Theme Settings → **Google Maps**, paste the URL.

### Social Media
Add your Instagram, Facebook, TikTok, and YouTube URLs.

---

## Step 7: Configure Google Reviews App

The theme includes a `google-reviews` section on the homepage that hosts the embed widget from the **Google Reviews app by Omega Commerce**.

### To configure:
1. Install the **Google Reviews** app from the Shopify App Store.
2. In the app, create a widget and copy the **embed code**.
3. In Shopify → **Online Store → Themes → Customize**.
4. On the homepage, find the **"Google Reviews"** section.
5. Paste the embed code into the **"Google Reviews widget embed code"** field.
6. Click **Save**.

---

## Step 8: Assign Template to Personal Training Page

The Personal Training page has a built-in contact form, process steps, trainer profile, and FAQ. To configure the trainer profile:

1. In **Customize → Personal Training page** (make sure you're on the `/pages/personal-training` page).
2. Find the **Personal Training** section.
3. Under **Trainer Profile**: upload a photo, enter trainer name, credentials, bio, years coaching, and clients trained.
4. Toggle the **Show process steps**, **Show trainer profile**, and **Show FAQ** checkboxes as needed.

---

## GymMaster Membership Signup

The membership and day pass CTAs link directly to the GymMaster portal:
- **Monthly**: `https://compoundgym.gymmasteronline.com/portal/signup/details/ad5acee646af8e593628728d9e3d83a4`
- **6-Month**: `https://compoundgym.gymmasteronline.com/portal/signup/details/cfa0a4024b7035e8d0fc042f6b821c47`
- **Annual**: `https://compoundgym.gymmasteronline.com/portal/signup/details/9bf612326405e7ba7949bb88aa20a881`

These links can be updated in `sections/memberships-pricing.liquid` and `sections/day-passes.liquid` if the GymMaster portal URLs change.

---

## Theme Structure

```
shopify-gym-theme/
├── assets/
│   ├── main.css          # All theme styles (system fonts, 3px radius, no glass)
│   └── main.js           # Mobile menu, thumbnails, smooth scroll — no dependencies
├── config/
│   ├── settings_schema.json   # Theme editor settings definitions
│   └── settings_data.json     # Pre-populated Compound Gym defaults
├── layout/
│   └── theme.liquid      # Master layout: schema.org, OG tags, canonical, fonts
├── locales/
│   └── en.default.json   # Translation strings
├── sections/
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── footer.liquid         # Includes Google Maps embed
│   ├── hero.liquid
│   ├── gym-highlights.liquid
│   ├── memberships-pricing.liquid
│   ├── day-passes.liquid
│   ├── pt-services.liquid    # Full PT page: formats, process, trainer, form, FAQ
│   ├── google-reviews.liquid # App widget placeholder
│   ├── apparel-grid.liquid
│   ├── about-story.liquid
│   ├── contact-info.liquid
│   ├── main-page.liquid      # Generic page content renderer
│   └── main-product.liquid   # Product detail with schema
├── snippets/
│   ├── breadcrumbs.liquid    # BreadcrumbList schema + visible nav
│   ├── price-card.liquid     # Reusable pricing card
│   ├── trainer-card.liquid   # Trainer profile card
│   ├── product-card.liquid   # Apparel product card
│   ├── icon.liquid           # Inline SVG icons
│   └── social-links.liquid   # Social media link row
└── templates/
    ├── index.json
    ├── page.json             # Generic page fallback
    ├── page.memberships.json
    ├── page.passes.json
    ├── page.personal-training.json
    ├── page.about.json
    ├── page.contact.json
    ├── collection.json
    ├── product.json
    ├── cart.liquid
    └── customers/
        ├── login.liquid
        ├── register.liquid
        └── account.liquid
```

---

## SEO Implementation

- **GymOrHealthClub** JSON-LD schema fires on every page (in `layout/theme.liquid`).
- **BreadcrumbList** schema fires on all inner pages (via `snippets/breadcrumbs.liquid`).
- **Product** JSON-LD on product pages (in `sections/main-product.liquid`).
- **ItemList** JSON-LD on collection pages (in `sections/apparel-grid.liquid`).
- **GymOrHealthClub** with address on the contact page (in `sections/contact-info.liquid`).
- Canonical URL tag on every page.
- Open Graph and Twitter Card tags on every page.
- One H1 per page, enforced by section design.
- Semantic HTML: `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<address>`.
