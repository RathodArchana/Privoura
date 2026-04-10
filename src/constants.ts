import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Beige Kurta",
    category: "Ethnic Wear",
    price: 1299,
    rating: 4.5,
    sustainabilityScore: 92,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Elegant cotton kurta perfect for summer gatherings. Ethically sourced organic cotton that breathes with you in humid weather.",
    tags: ["ethnic", "cotton", "beige", "summer", "sustainable"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=beige+kurta", price: 1299, rating: 4.2, sustainabilityScore: 85 },
      { platform: "Myntra", url: "https://myntra.com/beige-kurta", price: 1199, rating: 4.5, sustainabilityScore: 92 },
      { platform: "Ajio", url: "https://ajio.com/s/beige-kurta", price: 1350, rating: 4.0, sustainabilityScore: 88 }
    ],
    climateContext: ["sunny", "humid"],
    outfitPicks: ["8", "12"]
  },
  {
    id: "2",
    name: "Teal Running Shoes",
    category: "Footwear",
    price: 3499,
    rating: 4.8,
    sustainabilityScore: 88,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "High-performance running shoes with breathable recycled mesh. Designed for maximum comfort during sunny morning runs.",
    tags: ["sport", "teal", "running", "active", "recycled"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=teal+running+shoes", price: 3499, rating: 4.7, sustainabilityScore: 80 },
      { platform: "Myntra", url: "https://myntra.com/teal-running-shoes", price: 3299, rating: 4.8, sustainabilityScore: 88 }
    ],
    climateContext: ["sunny", "cloudy"]
  },
  {
    id: "3",
    name: "Golden Silk Saree",
    category: "Ethnic Wear",
    price: 5999,
    rating: 4.9,
    sustainabilityScore: 95,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Luxurious silk saree with intricate golden zari work. Hand-loomed by artisans using traditional sustainable techniques.",
    tags: ["ethnic", "silk", "golden", "wedding", "handcrafted"],
    links: [
      { platform: "Myntra", url: "https://myntra.com/golden-silk-saree", price: 5999, rating: 4.9, sustainabilityScore: 95 },
      { platform: "Nykaa", url: "https://nykaafashion.com/search?q=golden+silk+saree", price: 6200, rating: 4.8, sustainabilityScore: 94 }
    ],
    climateContext: ["cold", "sunny"],
    outfitPicks: ["11"]
  },
  {
    id: "4",
    name: "Brown Leather Boots",
    category: "Footwear",
    price: 4500,
    rating: 4.6,
    sustainabilityScore: 85,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    description: "Durable vegan leather boots for rugged terrain. Perfect for cold and rainy climates with superior grip.",
    tags: ["boots", "leather", "brown", "winter", "vegan"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=brown+leather+boots", price: 4500, rating: 4.5, sustainabilityScore: 82 },
      { platform: "Ajio", url: "https://ajio.com/s/brown-leather-boots", price: 4200, rating: 4.6, sustainabilityScore: 85 }
    ],
    climateContext: ["cold", "rainy"],
    outfitPicks: ["6"]
  },
  {
    id: "5",
    name: "Teal Cotton Shirt",
    category: "Western Wear",
    price: 899,
    rating: 4.2,
    sustainabilityScore: 90,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    description: "Casual teal shirt made from 100% organic cotton. Lightweight and perfect for sunny days.",
    tags: ["casual", "teal", "cotton", "summer", "organic"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=teal+cotton+shirt", price: 899, rating: 4.1, sustainabilityScore: 88 },
      { platform: "Myntra", url: "https://myntra.com/teal-cotton-shirt", price: 799, rating: 4.3, sustainabilityScore: 90 }
    ],
    climateContext: ["sunny", "humid"],
    outfitPicks: ["12"]
  },
  {
    id: "6",
    name: "Beige Trench Coat",
    category: "Western Wear",
    price: 7500,
    rating: 4.7,
    sustainabilityScore: 87,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    description: "Classic trench coat for a sophisticated look. Water-resistant finish ideal for rainy commutes.",
    tags: ["outerwear", "beige", "classic", "winter", "durable"],
    links: [
      { platform: "Myntra", url: "https://myntra.com/beige-trench-coat", price: 7500, rating: 4.7, sustainabilityScore: 87 },
      { platform: "Ajio", url: "https://ajio.com/s/beige-trench-coat", price: 7800, rating: 4.6, sustainabilityScore: 85 }
    ],
    climateContext: ["rainy", "cold"],
    outfitPicks: ["4", "10"]
  },
  {
    id: "7",
    name: "Golden Watch",
    category: "Accessories",
    price: 12000,
    rating: 4.9,
    sustainabilityScore: 98,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    description: "Premium golden watch with minimalist design. Solar powered for sustainable luxury.",
    tags: ["watch", "golden", "premium", "luxury", "solar"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=golden+watch", price: 12000, rating: 4.9, sustainabilityScore: 98 }
    ],
    climateContext: ["sunny", "cold", "rainy"]
  },
  {
    id: "8",
    name: "Brown Handbag",
    category: "Accessories",
    price: 2500,
    rating: 4.4,
    sustainabilityScore: 94,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Spacious brown handbag for daily essentials. Made from upcycled materials for the eco-conscious shopper.",
    tags: ["bag", "brown", "leather", "casual", "upcycled"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=brown+handbag", price: 2500, rating: 4.3, sustainabilityScore: 92 },
      { platform: "Myntra", url: "https://myntra.com/brown-handbag", price: 2300, rating: 4.5, sustainabilityScore: 94 }
    ],
    climateContext: ["sunny", "cloudy"]
  },
  {
    id: "9",
    name: "Teal Rain Jacket",
    category: "Western Wear",
    price: 2999,
    rating: 4.5,
    sustainabilityScore: 89,
    image: "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight waterproof jacket for rainy days. Compact and sustainable design.",
    tags: ["rain", "waterproof", "teal", "outdoor"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=teal+rain+jacket", price: 2999, rating: 4.5, sustainabilityScore: 89 }
    ],
    climateContext: ["rainy"]
  },
  {
    id: "10",
    name: "Beige Woolen Scarf",
    category: "Accessories",
    price: 1499,
    rating: 4.8,
    sustainabilityScore: 96,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
    description: "Soft merino wool scarf to keep you warm. Ethically sourced wool from certified farms.",
    tags: ["winter", "wool", "beige", "warm"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=beige+wool+scarf", price: 1499, rating: 4.8, sustainabilityScore: 96 }
    ],
    climateContext: ["cold"]
  },
  {
    id: "11",
    name: "Golden Jhumkas",
    category: "Ethnic Wear",
    price: 1999,
    rating: 4.7,
    sustainabilityScore: 91,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    description: "Traditional golden jhumkas with pearl drops. Handcrafted by local artisans.",
    tags: ["ethnic", "jewelry", "golden", "traditional"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=golden+jhumkas", price: 1999, rating: 4.7, sustainabilityScore: 91 }
    ],
    climateContext: ["sunny", "cold"]
  },
  {
    id: "12",
    name: "Brown Chinos",
    category: "Western Wear",
    price: 1799,
    rating: 4.3,
    sustainabilityScore: 86,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable slim-fit chinos for a smart-casual look. Organic cotton blend.",
    tags: ["casual", "brown", "cotton", "smart-casual"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=brown+chinos", price: 1799, rating: 4.3, sustainabilityScore: 86 }
    ],
    climateContext: ["sunny", "cloudy"]
  },
  {
    id: "13",
    name: "Indigo Denim Jacket",
    category: "Western Wear",
    price: 3200,
    rating: 4.6,
    sustainabilityScore: 93,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    description: "Classic denim jacket in deep indigo. Made from recycled cotton fibers.",
    tags: ["denim", "indigo", "casual", "recycled"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=indigo+denim+jacket", price: 3200, rating: 4.6, sustainabilityScore: 93 }
    ],
    climateContext: ["cold", "sunny"]
  },
  {
    id: "14",
    name: "White Linen Shirt",
    category: "Western Wear",
    price: 1599,
    rating: 4.4,
    sustainabilityScore: 97,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    description: "Breathable white linen shirt for ultimate summer comfort. Sustainable flax cultivation.",
    tags: ["linen", "white", "summer", "breathable"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=white+linen+shirt", price: 1599, rating: 4.4, sustainabilityScore: 97 }
    ],
    climateContext: ["sunny", "humid"]
  },
  {
    id: "15",
    name: "Floral Print Maxi Dress",
    category: "Western Wear",
    price: 2499,
    rating: 4.5,
    sustainabilityScore: 84,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    description: "Elegant floral maxi dress for garden parties. Soft viscose fabric from sustainable forests.",
    tags: ["dress", "floral", "summer", "feminine"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=floral+maxi+dress", price: 2499, rating: 4.5, sustainabilityScore: 84 }
    ],
    climateContext: ["sunny", "humid"]
  },
  {
    id: "16",
    name: "Black Yoga Leggings",
    category: "Western Wear",
    price: 1899,
    rating: 4.7,
    sustainabilityScore: 89,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
    description: "High-waisted yoga leggings with moisture-wicking technology. Made from recycled ocean plastic.",
    tags: ["yoga", "black", "activewear", "recycled"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=black+yoga+leggings", price: 1899, rating: 4.7, sustainabilityScore: 89 }
    ],
    climateContext: ["sunny", "cold", "humid"]
  },
  {
    id: "17",
    name: "Silk Slip Dress",
    category: "Western Wear",
    price: 4599,
    rating: 4.8,
    sustainabilityScore: 92,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    description: "A minimalist silk slip dress that drapes beautifully. Perfect for evening events.",
    tags: ["dress", "silk", "evening", "minimalist"],
    links: [
      { platform: "Myntra", url: "https://myntra.com/silk-slip-dress", price: 4599, rating: 4.8, sustainabilityScore: 92 }
    ],
    climateContext: ["sunny", "humid"]
  },
  {
    id: "18",
    name: "Oversized Blazer",
    category: "Western Wear",
    price: 5200,
    rating: 4.6,
    sustainabilityScore: 88,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80",
    description: "Structured oversized blazer in a neutral tone. A versatile piece for office or casual wear.",
    tags: ["blazer", "oversized", "neutral", "office"],
    links: [
      { platform: "Ajio", url: "https://ajio.com/s/oversized-blazer", price: 5200, rating: 4.6, sustainabilityScore: 88 }
    ],
    climateContext: ["cold", "cloudy"]
  },
  {
    id: "19",
    name: "Pleated Midi Skirt",
    category: "Western Wear",
    price: 2199,
    rating: 4.5,
    sustainabilityScore: 90,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
    description: "Flowy pleated midi skirt with an elastic waistband. Made from eco-friendly materials.",
    tags: ["skirt", "pleated", "midi", "eco-friendly"],
    links: [
      { platform: "Amazon", url: "https://amazon.in/s?k=pleated+midi+skirt", price: 2199, rating: 4.5, sustainabilityScore: 90 }
    ],
    climateContext: ["sunny", "cloudy"]
  },
  {
    id: "20",
    name: "Chunky Knit Sweater",
    category: "Western Wear",
    price: 3499,
    rating: 4.9,
    sustainabilityScore: 95,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    description: "Cozy chunky knit sweater made from organic cotton. Keeps you warm and stylish during winter.",
    tags: ["sweater", "knit", "winter", "organic"],
    links: [
      { platform: "Myntra", url: "https://myntra.com/chunky-knit-sweater", price: 3499, rating: 4.9, sustainabilityScore: 95 }
    ],
    climateContext: ["cold"]
  },
  {
    id: "21",
    name: "Women's A-Line Midi Dress",
    category: "Western Wear",
    price: 1999,
    rating: 4.6,
    sustainabilityScore: 85,
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    description: "Elegant A-line midi dress perfect for casual outings or office wear. Made with breathable cotton blend.",
    tags: ["dress", "a-line", "midi", "casual"],
    links: [
      { platform: "Amazon", url: "https://www.amazon.in/b?ie=UTF8&node=6648217031", price: 1999, rating: 4.6, sustainabilityScore: 85 }
    ],
    climateContext: ["sunny", "cloudy"]
  },
  {
    id: "22",
    name: "Women's Classic Denim Jacket",
    category: "Western Wear",
    price: 2499,
    rating: 4.7,
    sustainabilityScore: 88,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    description: "A timeless denim jacket that pairs perfectly with any outfit. Crafted from sustainably sourced denim.",
    tags: ["jacket", "denim", "classic", "casual"],
    links: [
      { platform: "Amazon", url: "https://www.amazon.in/b?ie=UTF8&node=6648217031", price: 2499, rating: 4.7, sustainabilityScore: 88 }
    ],
    climateContext: ["cold", "sunny"]
  }
];


