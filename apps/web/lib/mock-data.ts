export type DishPreview = {
  id: string;
  name: string;
  restaurantName: string;
  restaurantSlug: string;
  category: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  price: string;
  worthItScore: number;
  deliveryTime: string;
  distance: string;
  heat: "mild" | "medium" | "hot";
  isVeg: boolean;
  tags: string[];
  warningLabels: string[];
  summary: string;
  gradient: string;
};

export type RestaurantPreview = {
  slug: string;
  name: string;
  neighborhood: string;
  city: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  cuisines: string[];
  highlight: string;
  popularDish: string;
  distance: string;
  eta: string;
  coverGradient: string;
  openNow: boolean;
  qualitySignals: string[];
  summary: string;
};

export type ReviewPreview = {
  id: string;
  title: string;
  author: string;
  avatarHint: string;
  context: string;
  body: string;
  verification: string;
  trustScore: number;
  worthItScore: number;
  tags: string[];
  mediaCount: number;
  ownerReply?: string;
};

export type ReviewerPreview = {
  username: string;
  name: string;
  badge: string;
  points: number;
  level: string;
  specialty: string;
};

export const foodCategories = [
  "Biryani",
  "Dosa",
  "Desserts",
  "Street Food",
  "Seafood",
  "Kebabs",
  "Cafe",
  "Thalis"
];

export const filterGroups = {
  cuisine: ["Biryani", "South Indian", "Cafe", "Mughlai", "Desserts", "Street Food"],
  budget: ["Under ₹150", "Under ₹200", "₹₹ casual", "Premium night out"],
  sort: ["Trending", "Rating", "Distance", "Value", "Newest"],
  dietary: ["Veg", "Non-veg", "Egg friendly"],
  quick: ["Open now", "Bill verified", "Family friendly", "Late night", "Hidden gems"]
} as const;

export const trendingDishes: DishPreview[] = [
  {
    id: "hyderabadi-dum-biryani",
    name: "Hyderabadi Dum Biryani",
    restaurantName: "Nawab's Corner",
    restaurantSlug: "nawabs-corner",
    category: "Trending tonight",
    cuisine: "Mughlai",
    rating: 4.8,
    reviewCount: 312,
    price: "₹190",
    worthItScore: 9.3,
    deliveryTime: "26 min",
    distance: "1.2 km",
    heat: "hot",
    isVeg: false,
    tags: ["must try", "shareable", "late night"],
    warningLabels: ["slow service on weekends"],
    summary: "Deep masala, fluffy rice, and rare consistency at this price point.",
    gradient: "from-orange-200 via-amber-300 to-rose-300"
  },
  {
    id: "ghee-podi-dosa",
    name: "Ghee Podi Dosa",
    restaurantName: "Mylai Tiffin Room",
    restaurantSlug: "mylai-tiffin-room",
    category: "Breakfast legend",
    cuisine: "South Indian",
    rating: 4.7,
    reviewCount: 201,
    price: "₹145",
    worthItScore: 8.9,
    deliveryTime: "18 min",
    distance: "2.8 km",
    heat: "medium",
    isVeg: true,
    tags: ["crispy", "budget", "comfort"],
    warningLabels: [],
    summary: "Crunchy edges, proper ghee aroma, and one of the most trusted morning picks nearby.",
    gradient: "from-lime-200 via-emerald-200 to-cyan-200"
  },
  {
    id: "filter-coffee-tiramisu",
    name: "Filter Coffee Tiramisu",
    restaurantName: "Batter & Bean",
    restaurantSlug: "batter-and-bean",
    category: "Dessert cult pick",
    cuisine: "Cafe",
    rating: 4.7,
    reviewCount: 154,
    price: "₹220",
    worthItScore: 8.8,
    deliveryTime: "24 min",
    distance: "3.4 km",
    heat: "mild",
    isVeg: true,
    tags: ["trendy", "date night", "sweet"],
    warningLabels: ["slightly overpriced"],
    summary: "Airy, bitter-sweet, and photogenic enough to keep showing up in saved lists.",
    gradient: "from-stone-200 via-amber-100 to-orange-200"
  },
  {
    id: "peri-peri-paneer-roll",
    name: "Peri Peri Paneer Roll",
    restaurantName: "Wrap Theory",
    restaurantSlug: "wrap-theory",
    category: "Quick bite MVP",
    cuisine: "Street Food",
    rating: 4.5,
    reviewCount: 98,
    price: "₹129",
    worthItScore: 8.4,
    deliveryTime: "16 min",
    distance: "900 m",
    heat: "medium",
    isVeg: true,
    tags: ["mess-free", "portable", "student favorite"],
    warningLabels: [],
    summary: "A high-signal grab-and-go pick when you want flavor without stretching the budget.",
    gradient: "from-fuchsia-200 via-rose-200 to-orange-200"
  }
];

export const topReviewedDishes = [...trendingDishes].reverse();

export const hiddenGemDishes: DishPreview[] = [
  {
    id: "pepper-chicken-kebab",
    name: "Pepper Chicken Kebab",
    restaurantName: "Coal & Clay",
    restaurantSlug: "coal-and-clay",
    category: "Hidden gem",
    cuisine: "Kebabs",
    rating: 4.6,
    reviewCount: 41,
    price: "₹210",
    worthItScore: 9.1,
    deliveryTime: "23 min",
    distance: "2.2 km",
    heat: "hot",
    isVeg: false,
    tags: ["smoky", "protein heavy", "must try"],
    warningLabels: [],
    summary: "Tiny review count, unusually high trust score, and repeat praise for smokiness.",
    gradient: "from-stone-800 via-orange-500 to-amber-300"
  },
  {
    id: "malai-broccoli-chaat",
    name: "Malai Broccoli Chaat",
    restaurantName: "Saffron Courtyard",
    restaurantSlug: "saffron-courtyard",
    category: "Chef discovery",
    cuisine: "Modern Indian",
    rating: 4.5,
    reviewCount: 29,
    price: "₹240",
    worthItScore: 8.7,
    deliveryTime: "28 min",
    distance: "4.1 km",
    heat: "mild",
    isVeg: true,
    tags: ["family friendly", "creamy", "shareable"],
    warningLabels: [],
    summary: "A surprising share plate with strong presentation ratings and almost no downside flags.",
    gradient: "from-emerald-100 via-lime-100 to-yellow-100"
  }
];

export const featuredRestaurants: RestaurantPreview[] = [
  {
    slug: "nawabs-corner",
    name: "Nawab's Corner",
    neighborhood: "Indiranagar",
    city: "Bengaluru",
    rating: 4.7,
    reviewCount: 918,
    priceRange: "₹₹",
    cuisines: ["Biryani", "Mughlai"],
    highlight: "Loved for deep masala flavor and unusually generous biryani portions.",
    popularDish: "Most ordered: Dum Biryani",
    distance: "1.2 km away",
    eta: "22-28 min",
    coverGradient: "from-stone-950 via-orange-800 to-amber-400",
    openNow: true,
    qualitySignals: ["bill verified strong", "late-night favorite"],
    summary: "Taste wins by a wide margin, but peak-time service needs better pacing."
  },
  {
    slug: "mylai-tiffin-room",
    name: "Mylai Tiffin Room",
    neighborhood: "Jayanagar",
    city: "Bengaluru",
    rating: 4.5,
    reviewCount: 664,
    priceRange: "₹",
    cuisines: ["South Indian", "Breakfast"],
    highlight: "Fast service, high trust score, and dependable breakfast discovery.",
    popularDish: "Most ordered: Podi Dosa",
    distance: "2.8 km away",
    eta: "15-20 min",
    coverGradient: "from-emerald-900 via-teal-700 to-lime-300",
    openNow: true,
    qualitySignals: ["open now", "value champion"],
    summary: "A routine-safe option where value and speed are as strong as the flavor itself."
  },
  {
    slug: "batter-and-bean",
    name: "Batter & Bean",
    neighborhood: "Koramangala",
    city: "Bengaluru",
    rating: 4.6,
    reviewCount: 433,
    priceRange: "₹₹₹",
    cuisines: ["Cafe", "Desserts"],
    highlight: "Date-night dessert pick with highly shareable photo and video reviews.",
    popularDish: "Most ordered: Coffee Tiramisu",
    distance: "3.4 km away",
    eta: "20-26 min",
    coverGradient: "from-stone-900 via-rose-700 to-orange-300",
    openNow: false,
    qualitySignals: ["photogenic", "premium"],
    summary: "Excellent presentation and atmosphere, but some diners question the pricing on smaller plates."
  },
  {
    slug: "wrap-theory",
    name: "Wrap Theory",
    neighborhood: "HSR Layout",
    city: "Bengaluru",
    rating: 4.4,
    reviewCount: 281,
    priceRange: "₹",
    cuisines: ["Rolls", "Street Food"],
    highlight: "Young crowd favorite with quick delivery and solid handheld meals.",
    popularDish: "Most ordered: Peri Peri Paneer Roll",
    distance: "900 m away",
    eta: "15-18 min",
    coverGradient: "from-rose-900 via-orange-700 to-yellow-300",
    openNow: true,
    qualitySignals: ["student favorite", "quick bite"],
    summary: "Best when you want convenience and flavor density over dine-in ambience."
  }
];

export const nearbyRestaurants = featuredRestaurants.slice(0, 3);
export const hiddenGemRestaurants: RestaurantPreview[] = featuredRestaurants.filter((restaurant) =>
  ["wrap-theory", "mylai-tiffin-room"].includes(restaurant.slug)
);

export const reviewFeed: ReviewPreview[] = [
  {
    id: "review-1",
    title: "The rice stayed fluffy even on delivery",
    author: "Ayesha Rahman",
    avatarHint: "AR",
    context: "Dinner for 2 · Bill verified",
    body: "The spice bloom hits first, then the mint and saffron round it out. Portion was enough for two light eaters, and the chicken stayed juicy.",
    verification: "Bill verified",
    trustScore: 92,
    worthItScore: 9.4,
    tags: ["value", "shareable", "delivery"],
    mediaCount: 4,
    ownerReply: "Thanks for noticing the portion consistency. We've tightened weekend packing too."
  },
  {
    id: "review-2",
    title: "Worth waking up early for",
    author: "Vikram N",
    avatarHint: "VN",
    context: "Breakfast solo · Photo verified",
    body: "Edges were crisp, the podi had real heat, and the ghee actually came through. Coffee service was quick, which matters when the line gets long.",
    verification: "Photo verified",
    trustScore: 84,
    worthItScore: 8.7,
    tags: ["breakfast", "crispy", "quick bite"],
    mediaCount: 2
  },
  {
    id: "review-3",
    title: "Beautiful plating, just watch the price",
    author: "Mira Joseph",
    avatarHint: "MJ",
    context: "Date night · Video review",
    body: "Texture was excellent and the bitterness from the coffee balanced the cream well. I would reorder, but only when I'm specifically in the mood for a premium dessert stop.",
    verification: "Video verified",
    trustScore: 79,
    worthItScore: 7.8,
    tags: ["dessert", "premium", "presentation"],
    mediaCount: 3
  }
];

export const topReviewers: ReviewerPreview[] = [
  {
    username: "rheasips",
    name: "Rhea S",
    badge: "Biryani Expert",
    points: 1280,
    level: "Gold Scout",
    specialty: "Late-night biryani and kebab hunts"
  },
  {
    username: "kabirplates",
    name: "Kabir P",
    badge: "Street Food Hunter",
    points: 940,
    level: "Silver Scout",
    specialty: "Budget wins under ₹150"
  },
  {
    username: "mirajourneys",
    name: "Mira J",
    badge: "Cafe Curator",
    points: 810,
    level: "Silver Scout",
    specialty: "Desserts, coffee, and photo-first finds"
  }
];

export const homeSignals = [
  {
    title: "AI review summary",
    copy: "Summarizes what diners consistently praise, what they tolerate, and when a dish stops feeling worth it."
  },
  {
    title: "Verified bill badge",
    copy: "Proof-backed reviews influence rankings more heavily and surface real price fairness."
  },
  {
    title: "Dish battles",
    copy: "Compare top picks head to head like Best Biryani Battle, not just restaurant stars."
  }
];

export const dishBattle = {
  title: "Best Biryani Battle",
  subtitle: "This week in Bengaluru",
  left: { name: "Nawab's Corner", score: 52, dish: "Hyderabadi Dum Biryani" },
  right: { name: "Royal Spice House", score: 48, dish: "Kolkata Biryani" }
};

export const recommendationOfTheDay = {
  headline: "What should I eat today?",
  recommendation: "Order the Ghee Podi Dosa before 10:30 AM for the strongest freshness and shortest waits.",
  reason: "Your current taste graph leans crispy, budget-friendly, and low-regret repeat orders."
};

export const leaderboard = [
  { rank: 1, name: "Rhea S", score: "1,280 pts" },
  { rank: 2, name: "Kabir P", score: "940 pts" },
  { rank: 3, name: "Mira J", score: "810 pts" }
];

export const restaurantDetails = {
  slug: "nawabs-corner",
  location: "100 Feet Road, Indiranagar, Bengaluru",
  hours: "11:30 AM - 11:45 PM",
  priceRange: "₹₹",
  ratingSummary: "4.7 overall from 918 reviews",
  aiSummary:
    "Most diners praise the depth of masala and portion size. Negative feedback clusters around weekend wait times and occasional packaging issues during rush hour.",
  gallery: ["Dining room", "Signature biryani", "Family table", "Tandoor counter"],
  warnings: ["slow service", "weekend rush"],
  stats: [
    { label: "Food quality", value: "4.8" },
    { label: "Service", value: "4.2" },
    { label: "Ambience", value: "4.4" },
    { label: "Price fairness", value: "4.3" }
  ]
};

export const dishDetails = {
  id: "hyderabadi-dum-biryani",
  aiSummary:
    "Worth it if you want strong spice layering and generous quantity. Less ideal when you need a quick, predictable dine-in experience on weekend nights.",
  attributeRatings: [
    { label: "Taste", value: "4.8" },
    { label: "Quantity", value: "4.5" },
    { label: "Value", value: "4.6" },
    { label: "Presentation", value: "4.2" }
  ],
  tags: ["spicy", "budget", "must try", "family friendly"],
  gallery: ["Top shot", "Close texture", "Bill proof", "Dining table"],
  comparison: [
    { name: "Nawab's Corner", price: "₹190", worthIt: "9.3", distance: "1.2 km" },
    { name: "Royal Spice House", price: "₹210", worthIt: "8.8", distance: "1.8 km" },
    { name: "Biryani Lab", price: "₹175", worthIt: "8.2", distance: "2.6 km" }
  ]
};

export const profileSummary = {
  name: "Ayesha Rahman",
  username: "ayesharahman",
  bio: "Tracks late-night biryani wins, dessert detours, and dependable family dining spots across Bengaluru.",
  badges: ["Biryani Expert", "Bill Verified Pro", "Top 1% Reviewer"],
  favorites: ["Hyderabadi Dum Biryani", "Filter Coffee Tiramisu", "Pepper Chicken Kebab"],
  stats: [
    { label: "Points", value: "1,280" },
    { label: "Level", value: "Gold Scout" },
    { label: "Verified rate", value: "62%" },
    { label: "Helpfulness", value: "94%" }
  ]
};

export const adminDashboard = {
  stats: [
    { label: "Flagged reviews", value: "14", trend: "+3 today" },
    { label: "Bills pending", value: "8", trend: "avg 18 min SLA" },
    { label: "Restaurant approvals", value: "5", trend: "2 urgent" },
    { label: "Reported owners", value: "2", trend: "stable" }
  ],
  moderationQueue: [
    "Possible duplicate biryani review with reused bill image",
    "Hygiene complaint cluster at one newly listed outlet",
    "Owner reply reported for abusive tone"
  ]
};

export const ownerDashboard = {
  stats: [
    { label: "Weekly views", value: "12.8k", trend: "+11%" },
    { label: "Review conversion", value: "8.4%", trend: "+1.8%" },
    { label: "Top dish", value: "Dum Biryani", trend: "52% of saves" },
    { label: "Trust score", value: "88/100", trend: "+4" }
  ],
  actions: [
    "Reply to 4 recent dish reviews",
    "Update menu price for Butter Chicken Biryani",
    "Upload a sharper cover for your restaurant hero image"
  ]
};
