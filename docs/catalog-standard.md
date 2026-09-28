# Exception by K&I — Product Data Standard

The standard every Shopify product follows, so search engines, shopping feeds
and AI shopping assistants can understand the catalog accurately. New products
must meet it before they are published.

**Ground rule: never invent a fact.** If a field below can't be confirmed from
the physical product, the supplier, or the owner, leave it empty and add the
product to the "missing data" list. An empty field is fine; a wrong one is not.

---

## 1. Core fields

| Field | Rule |
|---|---|
| **Title** | Follows the category formula in §2. Natural, readable, ≤ 70 characters, no pipes, no repeated words, no occasion words unless the design is specific to that occasion. |
| **Handle** | Lowercase words describing the product. Set once at launch and **never changed after the URL is live**; if a change is unavoidable, create a URL redirect in the same step. |
| **Vendor** | `Exception by K&I` |
| **Product type** | The plain product noun: `Serving Dish`, `Casserole`, `Cake Stand`, `Serving Tray`, `Sweets Box`, `Serving Bowl Set`, `Vanity Set`, `Dessert Stand`. Never an occasion or collection name. |
| **Category** | Shopify Standard Product Taxonomy (see §6). Required. |
| **Status** | `Draft` until the checklist in §9 passes. |

## 2. Title formulas

Order: what makes it distinctive, then what it is, then the key feature.

| Category | Formula | Example |
|---|---|---|
| Serveware | `[Construction] [Material] [Shape] [Noun] with [Key feature]` | Hand-Hammered Stainless Steel Oval Serving Dish with Gold Handles |
| Sets | `…[Noun], Set of [N]` | Mirror-Polished Rectangular Serving Trays, Set of Two |
| Cookware | `[Construction] [Material/Finish] [Noun] with Lid` | Hand-Hammered Stainless Steel Casserole with Lid |
| Occasion-specific décor | `[Motif] [Material/Colour] [Noun] with [Key feature]` | Arabic Calligraphy Pierced Sweets Box with Ceramic Insert |

- Sizes, capacities and finishes that vary by variant belong in **variant
  options**, not the title.
- "Silver" and "gold" describe a **colour or finish** only when the material is
  also stated (e.g. "gold-plated", "gold-tone"), so nobody reads them as
  precious metal.

## 3. Description structure

Written as semantic HTML (`<p>`, `<h3>`, `<ul>`) so it reads well on mobile and
is easy for machines to parse. Leave out any section with no confirmed facts;
don't pad it.

1. **Intro** (1–2 sentences): what it is and why someone would want it.
2. **Key features**: 3–5 bullets, each one concrete and checkable.
3. **Materials & dimensions**: material, finish, dimensions and capacity per size.
4. **What's included**: piece count and every item.
5. **Ideal for**: real uses and occasions, in plain language (this is where
   "iftar table", "Eid hosting" and "housewarming gift" belong, once each and
   only if true).
6. **Care**: exact instructions, including dishwasher and oven use only if confirmed.
7. **Shipping**: one line that links to the shipping policy; no invented delivery times.

Target 120–250 words. No keyword lists, no filler, no text copied from other
products.

## 4. SEO metadata

- **SEO title**: `[Short product name] | Exception by K&I`, ≤ 60 characters.
- **SEO description**: 120–155 characters, a complete sentence that ends
  cleanly (never cut off mid-word). What it is, the key feature, and the sizes
  or pieces.

## 5. Structured fields (metafields)

Use Shopify's **category metafields** where the category provides them (colour,
material, pattern and similar). Use a custom `specs` namespace for everything
else. Each metafield has a definition so it can be edited in the admin and read
by the storefront.

| Metafield | Type | Level | Example |
|---|---|---|---|
| `specs.material_detail` | single line text | product | Hand-hammered stainless steel; gold-plated handles |
| `specs.finish` | single line text | product/variant | Hammered, polished |
| `specs.style` | list of text | product | Modern, Middle Eastern |
| `specs.dimensions` | single line text | **variant** | 10 in L × 6.5 in W × 1.5 in H |
| `specs.capacity` | single line text | variant | 8 qt |
| `specs.piece_count` | integer | product | 3 |
| `specs.included_items` | list of text | product | Stemmed dish; covered jar; tray |
| `specs.primary_use` | single line text | product | Serving dish |
| `specs.secondary_uses` | list of text | product | Fruit bowl; dates and sweets |
| `specs.occasions` | list of text | product | Everyday; Hosting; Ramadan; Eid; Housewarming |
| `specs.gift_suitable` | boolean | product | true |
| `specs.care_instructions` | multi-line text | product | Hand wash… |
| `specs.dishwasher_safe` | boolean | product | *(only if confirmed)* |
| `specs.food_safe` | boolean | product | *(only if confirmed)* |
| `specs.country_of_origin` | single line text | product | *(only if confirmed)* |

**Variant fields:** SKU (`EKI-[PRODUCT CODE]-[VARIANT]`), barcode (GTIN/UPC,
**only if one is really assigned**, otherwise blank), weight (real shipping
weight; used for shipping rates and feeds), and compare-at price (only when
there is a genuine earlier selling price).

## 6. Category map

| Products | Shopify category |
|---|---|
| Casseroles | Home & Garden > Kitchen & Dining > Cookware & Bakeware > Cookware > Casserole Dishes |
| Oval serving dish | Home & Garden > Kitchen & Dining > Tableware > Serveware > Serving Platters |
| Mirror trays | Home & Garden > Kitchen & Dining > Tableware > Serveware > Serving Trays |
| Cake stand, dessert stand | Home & Garden > Kitchen & Dining > Tableware > Serveware > Cake Stands |
| Nesting bowls | Home & Garden > Kitchen & Dining > Tableware > Serveware > Serving Bowls |
| Sweets boxes | *To be confirmed once the product's function is confirmed* |
| Vanity set | *To be confirmed once the product's function is confirmed* |

## 7. Images

- **Minimum:** a clean hero image, a second angle, and a close-up of detail or
  texture. **Recommended:** a real in-use lifestyle photo (for Ramadan pieces, a
  real iftar or dates setting, but only with genuine photography).
- Square or 4:5 ratio, at least 2048 px on the long side, no text overlays on
  catalog images.
- **Alt text**: describe what is actually visible in *that* image, in one
  sentence of 8–20 words. Different for every image. Don't repeat the title,
  and don't list keywords.

## 8. Tags and collections

- Tags drive automated collections, so use a controlled vocabulary only:
  `occasion:ramadan-eid`, `occasion:wedding`, `occasion:housewarming`,
  `use:hosting`, `use:everyday`, `gift`. Remove free-form duplicates.
- Collections are **automated** (tag or category rules), so new products land
  in the right place automatically.
- Don't create a collection until at least **4 products** genuinely belong in
  it.

## 9. Pre-publish checklist

- [ ] Title follows the formula; SEO title and description within length limits
- [ ] Category set; product type is the product noun
- [ ] Description has intro, features, materials/dimensions, what's included and care
- [ ] All metafields that have confirmed facts are filled; everything else is on the missing-data list
- [ ] Every variant has a SKU, a real weight and a real price; barcode only if genuine
- [ ] At least 3 images, each with unique alt text
- [ ] In at least one automated collection
- [ ] No invented facts, reviews or ratings
