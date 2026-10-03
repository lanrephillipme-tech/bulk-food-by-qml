const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const app = document.querySelector("#app");

const categories = ["Grains", "Protein", "Live Protein", "Livestock", "Poultry", "Oil", "Tubers", "Fresh Produce", "Fruits", "Vegetables", "Legumes", "Spices", "Dairy", "Bakery", "Healthy Meals", "Imperishables", "Same-day Perishables", "Nigerian Staples", "African Produce", "Asian Produce", "American Produce", "European Pantry", "Street Market", "Roadside Market", "International Market", "Staff Packs", "Baby & Family"];
const defaultFoodTags = [
  "All Food",
  ...categories,
  "Rice",
  "Beans",
  "Garri",
  "Yam",
  "Plantain",
  "Egusi",
  "Palm oil",
  "Tomatoes",
  "Pepper",
  "Onions",
  "Fruits",
  "Vegetables",
  "Protein",
  "Live protein",
  "Livestock",
  "Live chicken",
  "Live turkey",
  "Live goat",
  "Live cow",
  "Live cattle",
  "Live ram",
  "Live catfish",
  "Egg crate",
  "Balanced diet",
  "Budget basket",
  "Cravings",
  "Same-day delivery",
  "Few hours delivery",
  "Imperishable",
  "Perishable",
  "African local",
  "Nigeria local",
  "Local market",
  "Street market",
  "Roadside market",
  "Neighbourhood market",
  "Township market",
  "Europe local",
  "Asia local",
  "America local",
  "Imported foodstuff"
];
const productCatalog = [
  {
    id: "prd_rice_25kg",
    title: "25kg Local Rice",
    category: "Grains",
    vendor: "Mainland Grain Depot",
    location: "Lagos",
    price: 42000,
    unit: "bag",
    tag: "Group buy",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_oil_5l",
    title: "5L Groundnut Oil",
    category: "Oil",
    vendor: "Adebayo Farms & Foods",
    location: "Lagos",
    price: 18500,
    unit: "gallon",
    tag: "Plan eligible",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_beans",
    title: "Honey Beans",
    category: "Grains",
    vendor: "Northern Fresh Market",
    location: "Abuja",
    price: 36000,
    unit: "paint bucket",
    tag: "Bulk discount",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_chicken",
    title: "Frozen Chicken Cuts",
    category: "Protein",
    vendor: "Cold Chain Foods",
    location: "Lagos",
    price: 28000,
    unit: "carton share",
    tag: "50% delivery",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_yam_crate",
    title: "Yam Tuber Crate",
    category: "Tubers",
    vendor: "Oyo Root Market",
    location: "Ibadan",
    price: 52000,
    unit: "crate",
    tag: "Weekly plan",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_tomato_basket",
    title: "Tomato Basket",
    category: "Fresh Produce",
    vendor: "Mile 12 Fresh Hub",
    location: "Lagos",
    price: 24000,
    unit: "basket",
    tag: "Promo",
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_staff_pack",
    title: "Staff Lunch Staples",
    category: "Staff Packs",
    vendor: "Bright Ventures Foods",
    location: "Lagos",
    price: 210000,
    unit: "bundle",
    tag: "Monthly plan",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_baby_cereal",
    title: "Baby Cereal Bulk Box",
    category: "Baby & Family",
    vendor: "Family Care Mart",
    location: "Abuja",
    price: 68000,
    unit: "box",
    tag: "5% outright",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_palm_oil_25l",
    title: "25L Palm Oil Keg",
    category: "Oil",
    vendor: "Eastern Oil Mill",
    location: "Enugu",
    price: 72000,
    unit: "keg",
    tag: "Quarterly plan",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_elubo_bag",
    title: "Elubo Yam Flour",
    category: "Tubers",
    vendor: "Oyo Root Market",
    location: "Ibadan",
    price: 46000,
    unit: "bag",
    tag: "Weekly plan",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_egusi_bag",
    title: "Egusi Seed Bag",
    category: "Grains",
    vendor: "Northern Fresh Market",
    location: "Abuja",
    price: 64000,
    unit: "bag",
    tag: "Bulk discount",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_crayfish_sack",
    title: "Dried Crayfish Sack",
    category: "Protein",
    vendor: "Calabar Seafood Depot",
    location: "Calabar",
    price: 98000,
    unit: "sack",
    tag: "Verified vendor",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_plantain_bunch",
    title: "Plantain Bunches",
    category: "Fresh Produce",
    vendor: "Edo Farm Gate",
    location: "Benin",
    price: 34000,
    unit: "bundle",
    tag: "Daily contribution",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_onion_bag",
    title: "Red Onion Bag",
    category: "Fresh Produce",
    vendor: "Sokoto Produce Line",
    location: "Sokoto",
    price: 41000,
    unit: "bag",
    tag: "Promo",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_catfish_carton",
    title: "Smoked Catfish Carton",
    category: "Protein",
    vendor: "Riverline Foods",
    location: "Port Harcourt",
    price: 118000,
    unit: "carton",
    tag: "Pay twice",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_garri_ijebu",
    title: "Ijebu Garri Paint Bucket",
    category: "Imperishables",
    vendor: "Ogun Cassava Mill",
    location: "Abeokuta",
    region: "nigeria",
    price: 14500,
    unit: "paint bucket",
    tag: "Imperishable",
    deliveryRule: "Stored pantry item - normal delivery",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_ofada_rice",
    title: "Ofada Rice Local Bag",
    category: "Grains",
    vendor: "Ogun Farm Cooperative",
    location: "Abeokuta",
    region: "nigeria",
    price: 58000,
    unit: "bag",
    tag: "African local",
    deliveryRule: "Pantry staple - standard delivery",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_ugu_bundle",
    title: "Ugu Vegetable Bundle",
    category: "Same-day Perishables",
    vendor: "Enugu Leaf Market",
    location: "Enugu",
    region: "nigeria",
    price: 8500,
    unit: "bundle",
    tag: "Same-day delivery",
    deliveryRule: "Perishable - same day or few hours delivery",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_pepper_mix",
    title: "Fresh Pepper & Tomato Mix",
    category: "Same-day Perishables",
    vendor: "Mile 12 Fresh Hub",
    location: "Lagos",
    region: "nigeria",
    price: 16500,
    unit: "basket",
    tag: "Few hours delivery",
    deliveryRule: "Perishable - dispatch within hours",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_mango_crate",
    title: "Sweet Mango Crate",
    category: "Fruits",
    vendor: "Benue Fruit Farmers",
    location: "Makurdi",
    region: "africa",
    price: 30000,
    unit: "crate",
    tag: "Same-day delivery",
    deliveryRule: "Perishable fruit - same day delivery",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_avocado_pack",
    title: "Avocado Healthy Pack",
    category: "Fruits",
    vendor: "Jos Plateau Farms",
    location: "Jos",
    region: "africa",
    price: 22000,
    unit: "pack",
    tag: "Balanced diet",
    deliveryRule: "Perishable - same day delivery",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_sardine_oats",
    title: "Oats & Sardine Protein Pantry",
    category: "Healthy Meals",
    vendor: "Family Care Mart",
    location: "Abuja",
    region: "global",
    price: 54000,
    unit: "bundle",
    tag: "Budget basket",
    deliveryRule: "Imperishable balanced meal bundle",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_pasta_tomato_eu",
    title: "Pasta & Tomato Pantry Pack",
    category: "European Pantry",
    vendor: "Euro Family Foods",
    location: "London",
    region: "europe",
    price: 38000,
    unit: "bundle",
    tag: "Europe local",
    deliveryRule: "Imperishable Europe pantry pack",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_potato_carrot_eu",
    title: "Potato, Carrot & Greens Box",
    category: "Vegetables",
    vendor: "North Sea Fresh Market",
    location: "Manchester",
    region: "europe",
    price: 29000,
    unit: "box",
    tag: "Same-day delivery",
    deliveryRule: "Perishable Europe produce - same day delivery",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prd_milk_bread_eggs_eu",
    title: "Milk, Bread & Eggs Basket",
    category: "Dairy",
    vendor: "Daily Table Europe",
    location: "Berlin",
    region: "europe",
    price: 26000,
    unit: "basket",
    tag: "Few hours delivery",
    deliveryRule: "Perishable dairy - few hours delivery",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
  }
];

const marketProduceSources = [
  {
    region: "nigeria",
    country: "Nigeria",
    vendor: "Nigeria Local Market Network",
    location: "Lagos",
    marketTypes: ["local market", "street market", "roadside market", "neighbourhood market", "township market"],
    items: [
      ["Ofada Rice", "Grains", "bag"],
      ["Abakaliki Rice", "Grains", "bag"],
      ["Tuwo Rice", "Grains", "bag"],
      ["White Garri", "Imperishables", "paint bucket"],
      ["Yellow Garri", "Imperishables", "paint bucket"],
      ["Ijebu Garri", "Imperishables", "paint bucket"],
      ["Cassava Tubers", "Tubers", "bundle"],
      ["Fufu Flour", "Tubers", "bag"],
      ["Yam Tubers", "Tubers", "crate"],
      ["Water Yam", "Tubers", "bundle"],
      ["Cocoyam", "Tubers", "basket"],
      ["Sweet Potatoes", "Tubers", "bag"],
      ["Ripe Plantain", "Fresh Produce", "bunch"],
      ["Unripe Plantain", "Fresh Produce", "bunch"],
      ["Honey Beans", "Legumes", "paint bucket"],
      ["Brown Beans", "Legumes", "paint bucket"],
      ["Black Eyed Peas", "Legumes", "bag"],
      ["Bambara Nuts", "Legumes", "bag"],
      ["Groundnuts", "Legumes", "bag"],
      ["Maize Cobs", "Grains", "sack"],
      ["Millet", "Grains", "bag"],
      ["Sorghum", "Grains", "bag"],
      ["Acha Fonio", "Grains", "bag"],
      ["Tomato Basket", "Same-day Perishables", "basket"],
      ["Tatashe Pepper", "Spices", "basket"],
      ["Scotch Bonnet Pepper", "Spices", "basket"],
      ["Ata Rodo Pepper", "Spices", "basket"],
      ["Red Onions", "Fresh Produce", "bag"],
      ["Spring Onions", "Fresh Produce", "bundle"],
      ["Okra", "Vegetables", "basket"],
      ["Garden Eggs", "Vegetables", "basket"],
      ["Ugu Leaves", "Same-day Perishables", "bundle"],
      ["Ewedu Leaves", "Same-day Perishables", "bundle"],
      ["Waterleaf", "Same-day Perishables", "bundle"],
      ["Bitterleaf", "Same-day Perishables", "bundle"],
      ["Scent Leaf", "Same-day Perishables", "bundle"],
      ["Uziza Leaf", "Same-day Perishables", "bundle"],
      ["Curry Leaf", "Spices", "bundle"],
      ["Cabbage", "Vegetables", "head"],
      ["Carrots", "Vegetables", "bag"],
      ["Cucumber", "Vegetables", "basket"],
      ["Green Beans", "Vegetables", "basket"],
      ["Mangoes", "Fruits", "crate"],
      ["Pawpaw", "Fruits", "crate"],
      ["Pineapple", "Fruits", "crate"],
      ["Watermelon", "Fruits", "piece"],
      ["Oranges", "Fruits", "bag"],
      ["Bananas", "Fruits", "bunch"],
      ["Coconuts", "Fruits", "bag"],
      ["Cashew Nuts", "Legumes", "bag"],
      ["Melon Seeds Egusi", "Spices", "bag"],
      ["Ogbono Seeds", "Spices", "bag"],
      ["Palm Oil", "Oil", "keg"],
      ["Groundnut Oil", "Oil", "gallon"],
      ["Sesame Seeds", "Spices", "bag"],
      ["Crayfish", "Protein", "sack"],
      ["Dry Fish", "Protein", "bundle"],
      ["Stockfish", "Protein", "bundle"],
      ["Smoked Catfish", "Protein", "carton"],
      ["Tilapia", "Protein", "carton"],
      ["Snails", "Protein", "basket"],
      ["Chicken", "Protein", "carton"],
      ["Live Broiler Chicken", "Live Protein", "bird"],
      ["Live Layer Chicken", "Live Protein", "bird"],
      ["Live Local Chicken", "Live Protein", "bird"],
      ["Live Turkey", "Live Protein", "bird"],
      ["Live Duck", "Live Protein", "bird"],
      ["Live Goat", "Live Protein", "head"],
      ["Live Ram", "Live Protein", "head"],
      ["Live Sheep", "Live Protein", "head"],
      ["Live Cow", "Live Protein", "head"],
      ["Live Cattle", "Live Protein", "head"],
      ["Live Catfish", "Live Protein", "kg"],
      ["Live Tilapia", "Live Protein", "kg"],
      ["Eggs", "Protein", "crate"],
      ["Goat Meat", "Protein", "kg"],
      ["Beef", "Protein", "kg"]
    ]
  },
  {
    region: "africa",
    country: "Ghana",
    vendor: "West African Township Market",
    location: "Accra",
    marketTypes: ["township market", "neighbourhood market", "roadside market", "regional market"],
    items: [
      ["Ghana Plantain", "Fresh Produce", "bunch"],
      ["Kontomire Leaves", "Vegetables", "bundle"],
      ["Garden Egg", "Vegetables", "basket"],
      ["Cassava Dough", "Tubers", "bag"],
      ["Yam", "Tubers", "crate"],
      ["Palm Nut", "Oil", "basket"],
      ["Tiger Nuts", "Legumes", "bag"],
      ["Smoked Tilapia", "Protein", "bundle"],
      ["Cocoa Beans", "Grains", "bag"],
      ["Shito Pepper Mix", "Spices", "jar"]
    ]
  },
  {
    region: "africa",
    country: "Kenya",
    vendor: "East African Open Market",
    location: "Nairobi",
    marketTypes: ["open-air market", "farm gate", "street market", "neighbourhood market"],
    items: [
      ["Sukuma Wiki", "Vegetables", "bundle"],
      ["Kale", "Vegetables", "bundle"],
      ["Maize Flour", "Grains", "bag"],
      ["Red Kidney Beans", "Legumes", "bag"],
      ["Green Grams", "Legumes", "bag"],
      ["Irish Potatoes", "Tubers", "bag"],
      ["Avocados", "Fruits", "crate"],
      ["Passion Fruit", "Fruits", "crate"],
      ["Tea Leaves", "Spices", "pack"],
      ["Nile Perch", "Protein", "carton"]
    ]
  },
  {
    region: "africa",
    country: "Ethiopia",
    vendor: "Horn of Africa Farm Market",
    location: "Addis Ababa",
    marketTypes: ["central market", "farm gate", "township market"],
    items: [
      ["Teff Grain", "Grains", "bag"],
      ["Injera Flour", "Grains", "bag"],
      ["Berbere Spice", "Spices", "pack"],
      ["Chickpeas", "Legumes", "bag"],
      ["Lentils", "Legumes", "bag"],
      ["Coffee Beans", "Spices", "bag"],
      ["Cabbage", "Vegetables", "head"],
      ["Beetroot", "Vegetables", "bag"],
      ["Barley", "Grains", "bag"],
      ["Honey", "Healthy Meals", "jar"]
    ]
  },
  {
    region: "africa",
    country: "Morocco",
    vendor: "North African Souk Market",
    location: "Casablanca",
    marketTypes: ["souk", "international market", "neighbourhood market"],
    items: [
      ["Couscous Wheat", "Grains", "bag"],
      ["Dates", "Fruits", "box"],
      ["Olives", "Oil", "jar"],
      ["Olive Oil", "Oil", "bottle"],
      ["Chickpeas", "Legumes", "bag"],
      ["Mint", "Spices", "bundle"],
      ["Harissa Pepper", "Spices", "jar"],
      ["Figs", "Fruits", "box"],
      ["Eggplant", "Vegetables", "basket"],
      ["Sardines", "Protein", "carton"]
    ]
  },
  {
    region: "asia",
    country: "India",
    vendor: "Asian International Market",
    location: "Mumbai",
    marketTypes: ["international market", "street market", "wholesale market"],
    items: [
      ["Basmati Rice", "Grains", "bag"],
      ["Chana Chickpeas", "Legumes", "bag"],
      ["Red Lentils", "Legumes", "bag"],
      ["Toor Dal", "Legumes", "bag"],
      ["Mustard Seeds", "Spices", "pack"],
      ["Turmeric Root", "Spices", "basket"],
      ["Ginger", "Spices", "bag"],
      ["Okra", "Vegetables", "basket"],
      ["Cauliflower", "Vegetables", "head"],
      ["Mangoes", "Fruits", "crate"],
      ["Curry Leaves", "Spices", "bundle"],
      ["Paneer", "Dairy", "pack"]
    ]
  },
  {
    region: "asia",
    country: "China",
    vendor: "East Asia Produce Market",
    location: "Guangzhou",
    marketTypes: ["wet market", "neighbourhood market", "international market"],
    items: [
      ["Jasmine Rice", "Grains", "bag"],
      ["Napa Cabbage", "Vegetables", "head"],
      ["Bok Choy", "Vegetables", "bundle"],
      ["Chinese Eggplant", "Vegetables", "basket"],
      ["Daikon Radish", "Vegetables", "bag"],
      ["Lotus Root", "Tubers", "bag"],
      ["Soybeans", "Legumes", "bag"],
      ["Mung Beans", "Legumes", "bag"],
      ["Shiitake Mushrooms", "Vegetables", "basket"],
      ["Mandarin Oranges", "Fruits", "crate"],
      ["Garlic", "Spices", "bag"],
      ["Tofu", "Protein", "pack"]
    ]
  },
  {
    region: "asia",
    country: "Thailand",
    vendor: "Southeast Asia Fresh Market",
    location: "Bangkok",
    marketTypes: ["floating market", "street market", "fresh market"],
    items: [
      ["Thai Jasmine Rice", "Grains", "bag"],
      ["Lemongrass", "Spices", "bundle"],
      ["Galangal", "Spices", "bag"],
      ["Thai Basil", "Spices", "bundle"],
      ["Bird Eye Chili", "Spices", "basket"],
      ["Coconut", "Fruits", "bag"],
      ["Green Papaya", "Fruits", "crate"],
      ["Pineapple", "Fruits", "crate"],
      ["Long Beans", "Vegetables", "bundle"],
      ["Fish Sauce Pantry Pack", "Protein", "bottle"]
    ]
  },
  {
    region: "europe",
    country: "United Kingdom",
    vendor: "European Neighbourhood Grocer",
    location: "London",
    marketTypes: ["neighbourhood market", "farmers market", "town market"],
    items: [
      ["Maris Piper Potatoes", "Tubers", "bag"],
      ["Carrots", "Vegetables", "bag"],
      ["Leeks", "Vegetables", "bundle"],
      ["Savoy Cabbage", "Vegetables", "head"],
      ["Apples", "Fruits", "crate"],
      ["Pears", "Fruits", "crate"],
      ["Strawberries", "Fruits", "punnet"],
      ["Oats", "Grains", "bag"],
      ["Cheddar Cheese", "Dairy", "block"],
      ["Free Range Eggs", "Protein", "crate"]
    ]
  },
  {
    region: "europe",
    country: "Italy",
    vendor: "Mediterranean Produce Market",
    location: "Rome",
    marketTypes: ["street market", "farmers market", "international market"],
    items: [
      ["Durum Wheat Pasta", "Grains", "pack"],
      ["Roma Tomatoes", "Fresh Produce", "crate"],
      ["Basil", "Spices", "bundle"],
      ["Zucchini", "Vegetables", "crate"],
      ["Eggplant", "Vegetables", "basket"],
      ["Olive Oil", "Oil", "bottle"],
      ["Grapes", "Fruits", "crate"],
      ["Lemons", "Fruits", "bag"],
      ["Mozzarella", "Dairy", "pack"],
      ["Cannellini Beans", "Legumes", "bag"]
    ]
  },
  {
    region: "europe",
    country: "Spain",
    vendor: "Iberian Local Market",
    location: "Madrid",
    marketTypes: ["municipal market", "street market", "neighbourhood market"],
    items: [
      ["Paella Rice", "Grains", "bag"],
      ["Sweet Peppers", "Vegetables", "basket"],
      ["Chickpeas", "Legumes", "bag"],
      ["White Beans", "Legumes", "bag"],
      ["Oranges", "Fruits", "bag"],
      ["Almonds", "Legumes", "bag"],
      ["Paprika", "Spices", "tin"],
      ["Olives", "Oil", "jar"],
      ["Sardines", "Protein", "carton"],
      ["Manchego Cheese", "Dairy", "block"]
    ]
  },
  {
    region: "america",
    country: "United States",
    vendor: "American Farmers Market",
    location: "Atlanta",
    marketTypes: ["farmers market", "neighbourhood market", "roadside stand"],
    items: [
      ["Sweet Corn", "Grains", "crate"],
      ["Idaho Potatoes", "Tubers", "bag"],
      ["Collard Greens", "Vegetables", "bundle"],
      ["Kale", "Vegetables", "bundle"],
      ["Blueberries", "Fruits", "punnet"],
      ["Apples", "Fruits", "crate"],
      ["Pumpkin", "Vegetables", "piece"],
      ["Black Beans", "Legumes", "bag"],
      ["Peanuts", "Legumes", "bag"],
      ["Chicken", "Protein", "pack"],
      ["Salmon", "Protein", "pack"],
      ["Milk", "Dairy", "gallon"]
    ]
  },
  {
    region: "america",
    country: "Mexico",
    vendor: "Latin American Mercado",
    location: "Mexico City",
    marketTypes: ["mercado", "street market", "international market"],
    items: [
      ["White Corn", "Grains", "sack"],
      ["Corn Tortilla Maize", "Grains", "bag"],
      ["Pinto Beans", "Legumes", "bag"],
      ["Black Beans", "Legumes", "bag"],
      ["Avocados", "Fruits", "crate"],
      ["Tomatillos", "Vegetables", "basket"],
      ["Jalapeno Peppers", "Spices", "basket"],
      ["Cilantro", "Spices", "bundle"],
      ["Limes", "Fruits", "bag"],
      ["Queso Fresco", "Dairy", "pack"]
    ]
  },
  {
    region: "america",
    country: "Brazil",
    vendor: "South American Open Market",
    location: "Sao Paulo",
    marketTypes: ["open market", "street market", "farm gate"],
    items: [
      ["Cassava", "Tubers", "bag"],
      ["Farofa Cassava Flour", "Tubers", "bag"],
      ["Black Beans", "Legumes", "bag"],
      ["Rice", "Grains", "bag"],
      ["Acerola Cherry", "Fruits", "crate"],
      ["Passion Fruit", "Fruits", "crate"],
      ["Bananas", "Fruits", "bunch"],
      ["Coffee Beans", "Spices", "bag"],
      ["Sugarcane", "Fresh Produce", "bundle"],
      ["Beef", "Protein", "kg"]
    ]
  },
  {
    region: "america",
    country: "Peru",
    vendor: "Andean Township Market",
    location: "Lima",
    marketTypes: ["township market", "highland market", "international market"],
    items: [
      ["Quinoa", "Grains", "bag"],
      ["Purple Corn", "Grains", "sack"],
      ["Yellow Potatoes", "Tubers", "bag"],
      ["Sweet Potatoes", "Tubers", "bag"],
      ["Lima Beans", "Legumes", "bag"],
      ["Aji Amarillo Pepper", "Spices", "basket"],
      ["Avocados", "Fruits", "crate"],
      ["Plantain", "Fresh Produce", "bunch"],
      ["Trout", "Protein", "carton"],
      ["Cacao Beans", "Grains", "bag"]
    ]
  }
];

const produceImageByCategory = {
  Grains: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  Protein: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
  "Live Protein": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80",
  Livestock: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80",
  Poultry: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80",
  Oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
  Tubers: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
  "Fresh Produce": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  Fruits: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
  Vegetables: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80",
  Legumes: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=80",
  Spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  Dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
  Imperishables: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  "Same-day Perishables": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
};

const produceImageSources = [
  { match: /ofada rice|ofada/, file: "Ofada Rice.jpg", credit: "Wikimedia Commons - Ofada rice" },
  { match: /\bgarri\b|\bgari\b|\beba\b/, file: "Garri also called cassava flakes.jpg", credit: "Wikimedia Commons - Garri" },
  { match: /yellow garri/, file: "Sack of Yellow Garri.jpg", credit: "Wikimedia Commons - Yellow garri" },
  { match: /cassava|fufu/, file: "Cassava tubers.jpg", credit: "Wikimedia Commons - Cassava tubers" },
  { match: /yam|water yam|tuber|pounded yam/, file: "Tubers of yam.jpg", credit: "Wikimedia Commons - Yam tubers" },
  { match: /sweet potato|potatoes/, file: "Nigerian Sweet Potato.jpg", credit: "Wikimedia Commons - Sweet potato" },
  { match: /plantain|banana/, file: "Bunches of Plantain.jpg", credit: "Wikimedia Commons - Plantain" },
  { match: /egusi|melon seed/, file: "Egusi seeds.jpg", credit: "Wikimedia Commons - Egusi seeds" },
  { match: /ogbono/, file: "Ogbono seeds.jpg", credit: "Wikimedia Commons - Ogbono seeds" },
  { match: /groundnut oil|peanut oil/, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - cooking oil photo", source: "https://unsplash.com/s/photos/cooking-oil" },
  { match: /palm oil|red oil/, file: "Bottled Palm-oil.jpg", credit: "Wikimedia Commons - Palm oil" },
  { match: /sesame/, image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - seeds and spices photo", source: "https://unsplash.com/s/photos/sesame-seeds" },
  { match: /beans|black eyed|kidney|pinto|soybeans|mung|lima|cannellini/, file: "Beans in the market.jpg", credit: "Wikimedia Commons - Beans in market" },
  { match: /scotch bonnet|ata rodo|tatashe|pepper|tomato|tomatillo|jalapeno|chili|chilli/, file: "Tomato and pepper seller.jpg", credit: "Wikimedia Commons - Tomato and pepper seller" },
  { match: /onion/, file: "Nigerian Onions.jpg", credit: "Wikimedia Commons - Nigerian onions" },
  { match: /okra|okro/, file: "Fresh okra for sale at market stall.jpg", credit: "Wikimedia Commons - Fresh okra" },
  { match: /ugu|pumpkin leaves/, file: "Ugu (pumkpin leaves).jpg", credit: "Wikimedia Commons - Ugu leaves" },
  { match: /waterleaf/, file: "Nigerian Waterleaf.jpg", credit: "Wikimedia Commons - Waterleaf" },
  { match: /bitterleaf|scent leaf|ewedu|uziza|curry leaf|leaf|kale|spinach|sukuma|kontomire|bok choy|cabbage|lettuce/, file: "A view of a vegetable section of a market in North Central Nigeria.jpg", credit: "Wikimedia Commons - Vegetable market" },
  { match: /crayfish|prawn|shrimp/, file: "Crayfish,a good food ingredients.jpg", credit: "Wikimedia Commons - Crayfish" },
  { match: /stockfish|dried cod/, file: "Stockfish,.jpg", credit: "Wikimedia Commons - Stockfish" },
  { match: /catfish|dry fish|smoked fish/, file: "Smoked Dried Catfish jpg.jpg", credit: "Wikimedia Commons - Smoked dried catfish" },
  { match: /snail/, file: "Nigerian Snails.jpg", credit: "Wikimedia Commons - Nigerian snails" },
  { match: /garden egg|eggplant|aubergine/, file: "Yellow garden eggs.jpg", credit: "Wikimedia Commons - Garden eggs" },
  { match: /mango/, file: "A big bowl of Fruits Salad 01.jpg", credit: "Wikimedia Commons - Nigerian fruit" },
  { match: /live.*(broiler|layer|local chicken|chicken)|poultry/, image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - live poultry photo", source: "https://unsplash.com/s/photos/live-chicken-farm" },
  { match: /live.*turkey|turkey/, file: "Domestic turkey.jpg", credit: "Wikimedia Commons - domestic turkey" },
  { match: /live.*duck|duck/, image: "https://images.unsplash.com/photo-1555852095-64e7428df0fa?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - duck photo", source: "https://unsplash.com/s/photos/duck-farm" },
  { match: /live.*goat|goat|livestock/, image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - goat livestock photo", source: "https://unsplash.com/s/photos/goat-farm" },
  { match: /live.*(cow|cattle)|cow|cattle/, image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - cattle farm photo", source: "https://unsplash.com/s/photos/cattle-farm" },
  { match: /live.*(ram|sheep)|ram|sheep/, image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - sheep livestock photo", source: "https://unsplash.com/s/photos/sheep-farm" },
  { match: /live.*(catfish|tilapia)|fish farm|fingerling/, image: "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - aquaculture fish photo", source: "https://unsplash.com/s/photos/fish-farm" },
  { match: /egg crate|eggs|free range eggs/, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - eggs photo", source: "https://unsplash.com/s/photos/egg-crate" },
  { match: /frozen chicken|chicken cuts|broiler|layer|local chicken|chicken/, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - chicken photo", source: "https://unsplash.com/s/photos/chicken-meat" },
  { match: /beef|cow meat/, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - beef protein photo", source: "https://unsplash.com/s/photos/beef" },
  { match: /goat meat|mutton/, image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - raw protein photo", source: "https://unsplash.com/s/photos/raw-meat" },
  { match: /smoked catfish|catfish|tilapia|trout|salmon|sardine|fish/, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - fish photo", source: "https://unsplash.com/s/photos/fish-market" },
  { match: /rice|basmati|jasmine|paella/, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - rice grain photo", source: "https://unsplash.com/s/photos/rice-grain" },
  { match: /corn|maize/, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - corn photo", source: "https://unsplash.com/s/photos/corn" },
  { match: /avocado/, image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - avocado photo", source: "https://unsplash.com/s/photos/avocado" },
  { match: /apple|pear|strawberr|blueberr|orange|lime|lemon|grape|fig|date|pineapple|papaya|pawpaw|watermelon|fruit/, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - fresh fruit photo", source: "https://unsplash.com/s/photos/fresh-fruit" },
  { match: /cheese|milk|paneer|dairy/, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - dairy photo", source: "https://unsplash.com/s/photos/dairy" },
  { match: /chicken|beef|goat|trout|tilapia|salmon|sardine|protein/, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - protein food photo", source: "https://unsplash.com/s/photos/fresh-meat" },
  { match: /ginger|turmeric|garlic|basil|mint|lemongrass|galangal|paprika|spice|berbere|harissa|cilantro/, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - spices photo", source: "https://unsplash.com/s/photos/spices" },
  { match: /bread|bakery/, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - bread photo", source: "https://unsplash.com/s/photos/bread" },
  { match: /baby cereal|cereal/, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - cereal grains photo", source: "https://unsplash.com/s/photos/cereal" },
  { match: /pasta|durum wheat/, image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - pasta pantry photo", source: "https://unsplash.com/s/photos/pasta" },
  { match: /staff lunch|staff pack|market saver|hunger relief|balanced diet|restaurant raw|school kitchen|bulk groceries|foodstuff starter|family basket/, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - bulk groceries photo", source: "https://unsplash.com/s/photos/grocery-box" },
  { match: /quinoa|oat|wheat|barley|couscous|teff|fonio|millet|sorghum|grain/, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80", credit: "Unsplash - grains photo", source: "https://unsplash.com/s/photos/grains" }
];

const rawMarketBasketLists = [
  {
    id: "raw_ofada_staples_list",
    title: "Ofada Rice Raw Staples List",
    category: "Nigerian Staples",
    vendor: "Ogun Farm Cooperative - local market",
    location: "Abeokuta",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["local market", "neighbourhood market", "township market"],
    price: 68000,
    unit: "raw basket",
    tag: "Raw market list",
    deliveryRule: "Uncooked staples - same day market delivery",
    items: ["Ofada rice", "Ata rodo pepper", "Palm oil", "Locust beans", "Plantain"],
    imageKey: "ofada rice tomato pepper palm oil"
  },
  {
    id: "raw_egusi_leaf_protein_list",
    title: "Egusi, Leaf & Dry Protein List",
    category: "Nigerian Staples",
    vendor: "Soup Raw Material Market - street market",
    location: "Lagos",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["street market", "roadside market", "local market"],
    price: 92000,
    unit: "raw basket",
    tag: "Raw soup-stuff list",
    deliveryRule: "Raw perishables and dry protein - few hours delivery",
    items: ["Egusi seeds", "Ugu leaves", "Crayfish", "Stockfish", "Palm oil", "Pepper"],
    imageKey: "egusi ugu crayfish stockfish"
  },
  {
    id: "raw_rice_party_staples_list",
    title: "Rice Party Raw Foodstuff List",
    category: "Nigerian Staples",
    vendor: "Bulk Staples Market - township market",
    location: "Abuja",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["township market", "international market", "local market"],
    price: 126000,
    unit: "bulk basket",
    tag: "Bulk raw list",
    deliveryRule: "Bulk uncooked foodstuff - scheduled delivery",
    items: ["Rice", "Tomatoes", "Tatashe pepper", "Onions", "Live chicken", "Groundnut oil"],
    imageKey: "rice tomato pepper chicken"
  },
  {
    id: "raw_beans_garri_plantain_list",
    title: "Beans, Garri & Plantain Raw List",
    category: "Nigerian Staples",
    vendor: "Neighbourhood Foodstuff Market - roadside market",
    location: "Ibadan",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["roadside market", "neighbourhood market"],
    price: 54000,
    unit: "family basket",
    tag: "Local raw list",
    deliveryRule: "Neighbourhood market pickup - proximity delivery",
    items: ["Honey beans", "Yellow garri", "Ripe plantain", "Palm oil"],
    imageKey: "beans plantain garri"
  },
  {
    id: "raw_yam_pepper_leaf_list",
    title: "Yam, Pepper & Leaf Raw List",
    category: "Nigerian Staples",
    vendor: "Oyo Root Market - local market",
    location: "Ibadan",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["local market", "street market"],
    price: 61000,
    unit: "root basket",
    tag: "Root crop raw list",
    deliveryRule: "Root crop basket - same day delivery",
    items: ["Yam tubers", "Palm oil", "Pepper", "Crayfish", "Ugu leaves"],
    imageKey: "yam tubers pepper ugu"
  },
  {
    id: "raw_seafood_protein_list",
    title: "Seafood Raw Protein List",
    category: "Protein",
    vendor: "Calabar Seafood Market - international market",
    location: "Calabar",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["international market", "local market"],
    price: 148000,
    unit: "protein basket",
    tag: "Raw protein list",
    deliveryRule: "Raw seafood protein - cold-chain or same-day delivery",
    items: ["Crayfish", "Stockfish", "Smoked catfish", "Dry fish"],
    imageKey: "crayfish stockfish catfish"
  },
  {
    id: "raw_asian_produce_list",
    title: "Asian Raw Produce List",
    category: "Asian Produce",
    vendor: "Asian International Market - international market",
    location: "Mumbai",
    country: "India",
    region: "asia",
    marketTypes: ["international market", "street market"],
    price: 73000,
    unit: "produce box",
    tag: "Asian raw list",
    deliveryRule: "Fresh raw produce - same day delivery",
    items: ["Jasmine rice", "Bok choy", "Ginger", "Garlic", "Tofu", "Thai basil"],
    imageKey: "bok choy ginger jasmine rice"
  },
  {
    id: "raw_american_farm_list",
    title: "American Raw Farm Box",
    category: "American Produce",
    vendor: "American Farmers Market - roadside stand",
    location: "Atlanta",
    country: "United States",
    region: "america",
    marketTypes: ["farmers market", "roadside stand"],
    price: 87000,
    unit: "farm box",
    tag: "American raw list",
    deliveryRule: "Farmers market raw box - standard delivery",
    items: ["Sweet corn", "Idaho potatoes", "Collard greens", "Apples", "Chicken"],
    imageKey: "corn potatoes greens"
  },
  {
    id: "raw_mediterranean_pantry_list",
    title: "Mediterranean Raw Pantry List",
    category: "European Pantry",
    vendor: "Mediterranean Produce Market - street market",
    location: "Rome",
    country: "Italy",
    region: "europe",
    marketTypes: ["street market", "international market"],
    price: 76000,
    unit: "pantry basket",
    tag: "European raw list",
    deliveryRule: "Raw pantry and produce - scheduled delivery",
    items: ["Durum wheat pasta", "Roma tomatoes", "Basil", "Olive oil", "Mozzarella"],
    imageKey: "tomato basil olive oil"
  },
  {
    id: "raw_latin_mercado_list",
    title: "Latin Mercado Raw Produce List",
    category: "American Produce",
    vendor: "Latin American Mercado - street market",
    location: "Mexico City",
    country: "Mexico",
    region: "america",
    marketTypes: ["mercado", "street market", "international market"],
    price: 69000,
    unit: "mercado box",
    tag: "Mercado raw list",
    deliveryRule: "Fresh raw mercado produce - same day delivery",
    items: ["White corn", "Pinto beans", "Avocados", "Tomatillos", "Limes"],
    imageKey: "corn beans avocado"
  }
];

const liveProteinMarketLists = [
  {
    id: "live_broiler_chicken_lot",
    title: "Live Broiler Chicken Lot",
    category: "Live Protein",
    vendor: "Lagos Poultry Farm Gate - farm gate",
    location: "Lagos",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["farm gate", "local market", "township market"],
    price: 18500,
    unit: "bird",
    tag: "Live poultry",
    deliveryRule: "Live animal pickup or handled delivery by verified vendor",
    items: ["Live broiler chicken", "Health check", "Farm gate pickup"],
    imageKey: "live broiler chicken poultry"
  },
  {
    id: "live_turkey_lot",
    title: "Live Turkey Lot",
    category: "Live Protein",
    vendor: "Ogun Poultry Market - farm gate",
    location: "Abeokuta",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["farm gate", "local market"],
    price: 52000,
    unit: "bird",
    tag: "Live turkey",
    deliveryRule: "Live turkey delivery requires vendor confirmation window",
    items: ["Live turkey", "Farm gate handling", "Vendor confirmation"],
    imageKey: "live turkey farm"
  },
  {
    id: "live_goat_lot",
    title: "Live Goat Market Lot",
    category: "Livestock",
    vendor: "Northern Livestock Line - township market",
    location: "Abuja",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["township market", "roadside market", "livestock market"],
    price: 96000,
    unit: "head",
    tag: "Live goat",
    deliveryRule: "Livestock delivery or buyer pickup after vendor confirmation",
    items: ["Live goat", "Weight estimate", "Health status", "Pickup schedule"],
    imageKey: "live goat livestock"
  },
  {
    id: "live_cattle_lot",
    title: "Live Cow / Cattle Lot",
    category: "Livestock",
    vendor: "Cattle Traders Cooperative - livestock market",
    location: "Kano",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["livestock market", "township market", "international market"],
    price: 620000,
    unit: "head",
    tag: "Live cattle",
    deliveryRule: "Large livestock requires scheduled inspection and transport",
    items: ["Live cow", "Live cattle", "Inspection slot", "Transport quote"],
    imageKey: "live cow cattle"
  },
  {
    id: "live_ram_sheep_lot",
    title: "Live Ram & Sheep Lot",
    category: "Livestock",
    vendor: "Festival Livestock Market - local market",
    location: "Ilorin",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["local market", "roadside market", "livestock market"],
    price: 145000,
    unit: "head",
    tag: "Live ram",
    deliveryRule: "Livestock pickup or scheduled transport",
    items: ["Live ram", "Live sheep", "Weight estimate", "Transport option"],
    imageKey: "live ram sheep"
  },
  {
    id: "live_catfish_lot",
    title: "Live Catfish Farm Lot",
    category: "Live Protein",
    vendor: "Ikorodu Fish Farm - farm gate",
    location: "Lagos",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["farm gate", "local market", "neighbourhood market"],
    price: 28000,
    unit: "kg",
    tag: "Live catfish",
    deliveryRule: "Live fish delivery in oxygenated container or farm pickup",
    items: ["Live catfish", "Farm weight", "Cold or live transport option"],
    imageKey: "live catfish fish farm"
  },
  {
    id: "live_tilapia_lot",
    title: "Live Tilapia Farm Lot",
    category: "Live Protein",
    vendor: "Epe Aquaculture Market - farm gate",
    location: "Epe",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["farm gate", "local market"],
    price: 26000,
    unit: "kg",
    tag: "Live tilapia",
    deliveryRule: "Live fish handling requires confirmed pickup or fast dispatch",
    items: ["Live tilapia", "Farm weight", "Handling confirmation"],
    imageKey: "live tilapia fish farm"
  },
  {
    id: "egg_crate_farm_lot",
    title: "Farm Egg Crate Lot",
    category: "Protein",
    vendor: "Layer Farm Depot - farm gate",
    location: "Ogun",
    country: "Nigeria",
    region: "nigeria",
    marketTypes: ["farm gate", "neighbourhood market"],
    price: 6200,
    unit: "crate",
    tag: "Egg crate",
    deliveryRule: "Fragile protein crate - same day delivery",
    items: ["Egg crate", "Layer farm supply", "Crate handling"],
    imageKey: "egg crate eggs"
  }
];

const globalMarketProduceCatalog = marketProduceSources.flatMap((source, sourceIndex) =>
  source.items.map(([name, category, unit], itemIndex) => {
    const localMarket = source.marketTypes[itemIndex % source.marketTypes.length];
    const photo = produceImageForItem(name, category, source);
    return {
      id: `mkt_${slug(source.country)}_${slug(name)}`,
      title: name,
      category,
      vendor: `${source.vendor} - ${localMarket}`,
      location: source.location,
      country: source.country,
      marketTypes: source.marketTypes,
      price: producePrice(category, sourceIndex, itemIndex),
      unit,
      tag: `${source.country} ${localMarket}`,
      image: photo.image,
      photoCredit: photo.credit,
      photoSource: photo.source,
      region: source.region,
      deliveryRule: produceDeliveryRule(category, localMarket),
      vendorInfo: `${name} commonly found through ${source.country} ${localMarket}, farm gate, neighbourhood, township, roadside, local, and international market channels.`
    };
  })
);

const rawMarketListCatalog = rawMarketBasketLists.map((item, index) => {
  const photo = produceImageForItem(`${item.imageKey} ${item.title} ${item.items.join(" ")}`, item.category, item);
  return {
    ...item,
    price: item.price + (index % 3) * 2500,
    image: photo.image,
    photoCredit: photo.credit,
    photoSource: photo.source,
    vendorInfo: `${item.title} includes ${item.items.join(", ")} from ${item.country} ${item.marketTypes.join(", ")} channels.`
  };
});

const liveProteinCatalog = liveProteinMarketLists.map((item, index) => {
  const photo = produceImageForItem(`${item.imageKey} ${item.title} ${item.items.join(" ")}`, item.category, item);
  return {
    ...item,
    price: item.price + (index % 2) * 1500,
    image: photo.image,
    photoCredit: photo.credit,
    photoSource: photo.source,
    vendorInfo: `${item.title} is a raw/live protein listing from ${item.country} ${item.marketTypes.join(", ")} channels. Confirm weight, health status, handling, pickup, and transport inside QML before payment.`
  };
});

productCatalog.push(...globalMarketProduceCatalog, ...rawMarketListCatalog, ...liveProteinCatalog);
productCatalog.forEach(applyProductImage);

function slug(value) {
  return String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function commonsImage(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=900`;
}

function commonsPage(fileName) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName).replace(/%20/g, "_")}`;
}

function produceImageForItem(name, category, source = {}) {
  const text = `${name} ${category} ${source.country || ""} ${source.region || ""}`.toLowerCase();
  const imageSource = produceImageSources.find((entry) => entry.match.test(text));
  if (imageSource) {
    return {
      image: imageSource.image || commonsImage(imageSource.file),
      credit: imageSource.credit,
      source: imageSource.source || commonsPage(imageSource.file),
      matched: true
    };
  }
  return {
    image: produceImageByCategory[category] || produceImageByCategory["Fresh Produce"],
    credit: "Unsplash - category fallback photo",
    source: "https://unsplash.com/s/photos/farm-produce",
    matched: false
  };
}

function itemImageLookupText(item) {
  const marketTypes = Array.isArray(item.marketTypes) ? item.marketTypes.join(" ") : item.marketTypes || "";
  const packageItems = Array.isArray(item.items) ? item.items.join(" ") : item.items || "";
  return [
    item.imageKey,
    item.title,
    item.category,
    item.tag,
    item.description,
    item.vendor,
    item.vendorInfo,
    item.deliveryRule,
    item.country,
    item.region,
    marketTypes,
    packageItems
  ].filter(Boolean).join(" ");
}

function applyProductImage(item) {
  const photo = produceImageForItem(itemImageLookupText(item), item.category, item);
  if (photo.matched || !item.image) {
    item.image = photo.image;
  }
  item.photoCredit = item.photoCredit || photo.credit;
  item.photoSource = item.photoSource || photo.source;
  return item;
}

function applyPackageImage(item) {
  const packageItem = { ...item };
  const photo = produceImageForItem(itemImageLookupText(packageItem), packageItem.category, packageItem);
  if (photo.matched || !packageItem.image_url) {
    packageItem.image_url = photo.image;
  }
  packageItem.photoCredit = packageItem.photoCredit || photo.credit;
  packageItem.photoSource = packageItem.photoSource || photo.source;
  return packageItem;
}

function producePrice(category, sourceIndex, itemIndex) {
  const base = {
    Grains: 36000,
    Protein: 68000,
    "Live Protein": 95000,
    Livestock: 180000,
    Poultry: 42000,
    Oil: 42000,
    Tubers: 28000,
    "Fresh Produce": 18000,
    Fruits: 22000,
    Vegetables: 14000,
    Legumes: 30000,
    Spices: 12000,
    Dairy: 26000,
    Imperishables: 24000,
    "Same-day Perishables": 15000,
    "Healthy Meals": 34000
  }[category] || 20000;
  return base + (sourceIndex % 5) * 3500 + (itemIndex % 7) * 1750;
}

function produceDeliveryRule(category, marketType) {
  if (/live protein|livestock|poultry/i.test(category)) {
    return "Live protein - vendor confirms health, handling, pickup, and transport";
  }
  if (/same-day|fresh|perish|fruit|vegetable|dairy/i.test(`${category} ${marketType}`)) {
    return "Perishable market produce - same day or few hours delivery";
  }
  if (/roadside|street|neighbourhood/i.test(marketType)) {
    return "Local market pickup - proximity-based delivery";
  }
  return "Bulk farm produce - standard market delivery";
}
const extraPackages = [
  {
    id: "pkg_market_saver",
    title: "Market Saver Weekly Pack",
    category: "Fresh Produce",
    vendor: "Mile 12 Fresh Hub",
    city: "Lagos",
    price: 95000,
    tag: "Daily or weekly",
    items: ["Tomatoes", "Pepper", "Onions", "Plantain", "Yam", "Leaf vegetables"],
    imageKey: "tomato pepper onions plantain yam",
    image_url: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_protein_plus",
    title: "Protein Plus Family Plan",
    category: "Protein",
    vendor: "Cold Chain Foods",
    city: "Lagos",
    price: 265000,
    tag: "Quarterly plan",
    items: ["Chicken", "Fish", "Eggs", "Crayfish"],
    imageKey: "chicken fish eggs crayfish",
    image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_soup_raw_materials",
    title: "Local Soup Raw Materials Pack",
    category: "Grains",
    vendor: "Calabar Seafood Depot",
    city: "Calabar",
    price: 175000,
    tag: "Pay twice",
    items: ["Egusi seeds", "Crayfish", "Stockfish", "Palm oil", "Pepper", "Ugu leaves"],
    imageKey: "egusi crayfish stockfish palm oil ugu",
    image_url: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_restaurant_base",
    title: "Restaurant Raw Food Starter",
    category: "Staff Packs",
    vendor: "Mainland Grain Depot",
    city: "Lagos",
    price: 480000,
    tag: "Monthly plan",
    items: ["Rice", "Beans", "Garri", "Groundnut oil", "Tomatoes", "Onions"],
    imageKey: "rice beans garri oil tomatoes onions",
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_school_kitchen",
    title: "School Kitchen Bulk Plan",
    category: "Staff Packs",
    vendor: "Bright Ventures Foods",
    city: "Lagos",
    price: 680000,
    tag: "Quarterly plan",
    items: ["Rice", "Beans", "Pasta", "Oil", "Vegetables", "Egg crates"],
    imageKey: "rice beans pasta oil egg crates",
    image_url: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_swallow_combo",
    title: "Swallow & Soup Combo",
    category: "Tubers",
    vendor: "Oyo Root Market",
    city: "Ibadan",
    price: 125000,
    tag: "Weekly plan",
    items: ["Yam tubers", "Garri", "Egusi seeds", "Crayfish", "Pepper", "Leaf vegetables"],
    imageKey: "yam garri egusi crayfish pepper",
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_balanced_family",
    title: "Balanced Diet Family Basket",
    category: "Healthy Meals",
    vendor: "QML Nutrition Basket",
    city: "Lagos",
    region: "global",
    price: 185000,
    tag: "Daily, weekly, monthly",
    description: "Rice, beans, vegetables, fruits, oil, and protein planned for a healthy home budget.",
    items: ["Rice", "Beans", "Vegetables", "Fruits", "Oil", "Protein"],
    imageKey: "rice beans vegetables fruits oil protein",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_hunger_relief",
    title: "Small-Small Hunger Relief Pack",
    category: "Budget basket",
    vendor: "QML Community Market",
    city: "Lagos",
    region: "africa",
    price: 45000,
    tag: "Daily contribution",
    description: "Affordable staples for homes that need steady food without waiting to be rich.",
    items: ["Rice", "Beans", "Garri", "Palm oil", "Onions"],
    imageKey: "rice beans garri palm oil onions",
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_fresh_same_day",
    title: "Same-Day Fresh Produce Box",
    category: "Same-day Perishables",
    vendor: "Nearby Farm Fresh",
    city: "Lagos",
    region: "global",
    price: 72000,
    tag: "Few hours delivery",
    description: "Perishable fruits and vegetables delivered same day from nearby vendors.",
    items: ["Tomatoes", "Pepper", "Leaf vegetables", "Fruit", "Okra"],
    imageKey: "tomatoes pepper leaf vegetables fruit okra",
    image_url: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_europe_weekly",
    title: "Europe Weekly Pantry Saver",
    category: "European Pantry",
    vendor: "Euro Family Foods",
    city: "London",
    region: "europe",
    price: 120000,
    tag: "Weekly plan",
    description: "Pasta, potatoes, oats, dairy, canned fish, and vegetables for Europe-based homes.",
    items: ["Pasta", "Potatoes", "Oats", "Dairy", "Sardines", "Vegetables"],
    imageKey: "pasta potatoes oats dairy sardines vegetables",
    image_url: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80"
  }
];
const roles = [
  ["Customer", "Active", "Buy food, save small-small, join group buys."],
  ["Vendor", "Apply", "List products, create packages, manage stock."],
  ["Financier", "Active", "Fund verified food plans and track returns."],
  ["Logistics", "Apply", "Register bike, car, van, truck, or trailer."],
  ["Corporate", "Apply", "Buy bulk food and distribute to staff addresses."]
];
const introSlides = [
  {
    title: "Welcome to Big Cart",
    text: "Fresh groceries, food plans, and group buys in one simple basket.",
    image: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Buy Quality Dairy Products",
    text: "Stock your home with everyday essentials from verified vendors.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Buy Premium Quality Fruits",
    text: "Browse fresh produce, compare prices, and save favorites.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Get Discounts On All Products",
    text: "Join group buys and unlock better prices on bulk food.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Premium Food At Your Doorstep",
    text: "Order verified bulk food and receive delivery when your plan qualifies.",
    image: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Buy Premium Quality Fruits",
    text: "Find colorful, market-fresh produce for everyday meals.",
    image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Buy Quality Dairy Products",
    text: "Keep milk, eggs, and pantry staples close to home.",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Get Discounts On All Products",
    text: "Save more with QML packages, group buys, and seasonal offers.",
    image: "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Buy Grocery",
    text: "Browse, save favorites, and checkout with a simple cart flow.",
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Fast Delivery",
    text: "Track dispatch from vendor pickup to your confirmed address.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Enjoy Quality Food",
    text: "Review your order and keep your favorite vendors close.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
  }
];
const reviewData = [
  ["Aroyan Arshoff", "4.8", "Fresh items, quick delivery, and clear payment updates."],
  ["Carlo Septimus", "4.5", "The basket matched the package and the vendor called before dispatch."],
  ["Carlos George", "4.5", "Good value for the group buy. I would order the fruit pack again."],
  ["Maren Kenter", "4.3", "Reliable delivery and friendly support when my address changed."]
];
const productComments = [
  ["Ada Okonkwo", "5.0", "The food quality was strong and the delivery partner confirmed my address before arrival."],
  ["Tomi Balogun", "4.7", "Good pricing for a bulk plan. I like that the vendor is verified."],
  ["Ife Martins", "4.5", "The discount made sense, and the package items matched what was listed."]
];
const merchantUploads = [
  {
    title: "Premium Garri Family Pack",
    merchant: "Northern Fresh Market",
    value: 185000,
    aiScore: 94,
    status: "auto approved",
    checks: ["Verified merchant", "3+ clear images", "Price within market range", "Delivery zone active"]
  },
  {
    title: "Office Rice & Oil Bundle",
    merchant: "Mainland Grain Depot",
    value: 540000,
    aiScore: 78,
    status: "needs documents",
    checks: ["3+ images required", "CAC certificate required", "Stock proof missing", "Higher value pay-as-you-go"]
  },
  {
    title: "Frozen Protein Monthly Box",
    merchant: "Cold Chain Foods",
    value: 320000,
    aiScore: 86,
    status: "auto approved",
    checks: ["Cold-chain profile verified", "3+ photos passed", "Rating above 4.3"]
  }
];
const adminRiskRules = [
  ["Up to ₦200k", "Minimal profile + verified phone/email + address"],
  ["₦200k - ₦500k", "Identity, BVN/NIN, card or bank account, delivery address"],
  ["Above ₦500k", "KYC, BVN/NIN, income or staff document/CV, CAC or employer proof where needed"],
  ["Merchant/admin uploads", "Products, packages, and plans require minimum 3 clear images plus vendor/admin writeup"],
  ["Delivery release", "Payment midpoint or policy threshold, OTP, live address confirmation, delivery photo"]
];
const financierPortfolio = [
  ["Nearby food-plan demand", "1-5km", 68000, 8500, "Low risk"],
  ["Corporate staff packs", "Lekki/V.I.", 1500000, 180000, "Medium risk"],
  ["Festive market loan pool", "Abuja", 420000, 51000, "Medium risk"]
];
const logisticsQueue = [
  ["Adebayo Farms, Mile 12", "Lekki Phase 1", "Van", 8500, "2.4km away"],
  ["Mainland Grain Depot", "Yaba", "Bike", 3200, "1.1km away"],
  ["Northern Fresh Market", "Gwarinpa", "Truck", 18500, "4.8km away"]
];
const vendorInventoryRows = [
  ["Egusi Seed Bag", "84 bags", "AI approved", "Restock at 20 bags"],
  ["25L Palm Oil Keg", "37 kegs", "Promo active", "5% outright discount"],
  ["Plantain Bunches", "122 bundles", "Fresh today", "Daily contribution"],
  ["Smoked Catfish Carton", "19 cartons", "Low stock", "Cold-chain proof needed"]
];
const vendorOrderRows = [
  ["QML-78291", "Monthly Family Food Pack", "Preparing", 145000],
  ["QML-78404", "Soup Raw Materials Pack", "Dispatch assigned", 175000],
  ["QML-78532", "Restaurant Raw Food Starter", "Awaiting midpoint", 480000]
];
const vendorWalletRows = [
  ["Available settlement", "Sales cleared after delivery proof", 245000],
  ["Pending escrow", "Orders still in progress", 612000],
  ["Promo deductions", "Discounts funded by vendor", -28500]
];
const financierTransactionRows = [
  ["QML-FIN-119", "Nearby food-plan demand", "Repayment active", 68000],
  ["QML-FIN-124", "Corporate staff packs", "Awaiting bank sign-off", 1500000],
  ["QML-FIN-127", "Festive market loan pool", "Profit generated", 51000]
];
const logisticsEarningsRows = [
  ["Completed trips", "18 deliveries this week", 188000],
  ["Weekly deductions", "Vehicle, insurance, and service cycle", -24500],
  ["Available payout", "Ready after proof review", 30200]
];
const walletActivities = [
  ["Customer wallets", "Deposits, weekly deductions, refunds", 42500000],
  ["Vendor settlements", "Sales minus fees and logistics", 34200000],
  ["Financier earnings", "Expected returns and repayments", 8200000],
  ["Logistics payouts", "Completed trips and bonuses", 3900000]
];
const activityUpdates = [
  ["product", "New product update", "Adebayo Farms added 5L Groundnut Oil promo stock.", "2 min ago", "Vendor"],
  ["comment", "New comment", "Ada commented on Monthly Family Food Pack quality.", "8 min ago", "Public review"],
  ["message", "Private message", "Northern Fresh Market replied about delivery timing.", "12 min ago", "Encrypted"],
  ["delivery", "Delivery update", "Van delivery assigned for Lekki Phase 1 order.", "18 min ago", "Dispatch"],
  ["movement", "Order movement", "Order #QML-09087 moved from confirmed to preparing.", "24 min ago", "Tracking"],
  ["payment", "Payment received", "Wallet received ₦75,000 for Family Food Pack.", "32 min ago", "Wallet"],
  ["profit", "Profit generated", "Vendor margin increased by ₦18,500 from completed sales.", "1 hr ago", "Analytics"]
];
const seededActivePlans = [
  {
    id: "plan_market_monthly",
    title: "Monthly Local Market Basket",
    total: 180000,
    paid: 72000,
    status: "active",
    cadence: "Monthly",
    paymentOptions: "Daily, weekly, monthly, pay twice, outright",
    items: ["Rice", "Beans", "Palm oil", "Tomatoes", "Onions"],
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "plan_soup_weekly",
    title: "Weekly Soup Raw Materials",
    total: 95000,
    paid: 38000,
    status: "active",
    cadence: "Weekly",
    paymentOptions: "Daily, weekly, pay once, outright",
    items: ["Egusi", "Crayfish", "Palm oil", "Dry fish", "Pepper"],
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "plan_protein_family",
    title: "Family Protein Basket",
    total: 265000,
    paid: 132500,
    status: "delivery_eligible",
    cadence: "Monthly",
    paymentOptions: "Weekly, monthly, quarterly, pay twice, outright",
    items: ["Chicken", "Fish", "Eggs", "Crayfish"],
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "plan_staff_food",
    title: "Staff Food Salary Basket",
    total: 420000,
    paid: 105000,
    status: "active",
    cadence: "Monthly",
    paymentOptions: "Monthly, quarterly, payroll deduction, outright",
    items: ["Rice", "Oil", "Beans", "Garri", "Protein"],
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80"
  }
];

let state = {
  summary: {},
  readiness: { services: [], blockers: [], launchReady: false },
  reconciliation: { totals: {}, recentLedger: [], duplicateWebhookEvents: [], failedWalletLookups: [], settlementReview: [], recentActions: [] },
  user: null,
  plans: [],
  packages: [],
  vendors: [],
  opportunities: [],
  deliveries: [],
  authScreen: localStorage.getItem("qmlAuthScreen") || "splash",
  authComplete: localStorage.getItem("qmlAuthComplete") === "true",
  authSession: JSON.parse(localStorage.getItem("qmlAuthSession") || "null"),
  signupRole: localStorage.getItem("qmlSignupRole") || "customer",
  splashDragStart: 0,
  settingsToggles: JSON.parse(localStorage.getItem("qmlSettingsToggles") || "null") || {
    twoFactor: false,
    paymentReminders: true,
    deliveryUpdates: true,
    nearbyTrips: true,
    bulkJobs: false
  },
  theme: localStorage.getItem("qmlTheme") || "light",
  screen: localStorage.getItem("qmlScreen") || "home",
  selectedPackageId: localStorage.getItem("qmlSelectedPackageId") || "",
  selectedProductId: localStorage.getItem("qmlSelectedProductId") || "prd_rice_25kg",
  selectedFinanceOpportunityId: localStorage.getItem("qmlSelectedFinanceOpportunityId") || "fin_1",
  selectedLogisticsTripId: localStorage.getItem("qmlSelectedLogisticsTripId") || "trip_2",
  selectedPlanId: localStorage.getItem("qmlSelectedPlanId") || "",
  selectedCategory: localStorage.getItem("qmlSelectedCategory") || "Fresh Produce",
  selectedFilter: localStorage.getItem("qmlSelectedFilter") || "All",
  selectedUpdateFilter: localStorage.getItem("qmlSelectedUpdateFilter") || "All",
  selectedFoodTag: localStorage.getItem("qmlSelectedFoodTag") || "All Food",
  selectedMoreOptions: JSON.parse(localStorage.getItem("qmlSelectedMoreOptions") || "null") || [],
  adminSection: localStorage.getItem("qmlAdminSection") || "Overview",
  selectedAdminUserId: localStorage.getItem("qmlSelectedAdminUserId") || "usr_ada",
  searchQuery: localStorage.getItem("qmlSearchQuery") || "",
  introSlide: Number(localStorage.getItem("qmlIntroSlide") || 0),
  activeRoles: JSON.parse(localStorage.getItem("qmlActiveRoles") || "{}"),
  roleData: normalizeRoleData(JSON.parse(localStorage.getItem("qmlRoleData") || "null") || {}),
  roleSuccess: JSON.parse(localStorage.getItem("qmlRoleSuccess") || "null") || null,
  documentView: JSON.parse(localStorage.getItem("qmlDocumentView") || "null") || null,
  userAvatar: localStorage.getItem("qmlUserAvatar") || "",
  balanceVisible: localStorage.getItem("qmlBalanceVisible") !== "false",
  loginPromoVisible: false,
  loyaltyPoints: Number(localStorage.getItem("qmlLoyaltyPoints") || 2840),
  selectedGroupId: localStorage.getItem("qmlSelectedGroupId") || "",
  groupBuys: JSON.parse(localStorage.getItem("qmlGroupBuys") || "null") || defaultGroupBuys(),
  profileDetails: JSON.parse(localStorage.getItem("qmlProfileDetails") || "null") || {},
  pendingUploadImages: {},
  foodTags: mergeDefaultFoodTags(JSON.parse(localStorage.getItem("qmlFoodTags") || "null")),
  vendorChats: JSON.parse(localStorage.getItem("qmlVendorChats") || "{}"),
  biometricEnabled: localStorage.getItem("qmlBiometricEnabled") === "true",
  liveLocation: JSON.parse(localStorage.getItem("qmlLiveLocation") || "null") || null,
  referralRewards: JSON.parse(localStorage.getItem("qmlReferralRewards") || "null") || [
    { title: "Welcome referral", meta: "QML-ADA-4821 used by 2 friends", amount: 5000, status: "Earned" },
    { title: "Food basket bonus", meta: "Unlocks after next successful referral order", amount: 7500, status: "Pending" }
  ],
  refundRequests: JSON.parse(localStorage.getItem("qmlRefundRequests") || "null") || [],
  accountReports: JSON.parse(localStorage.getItem("qmlAccountReports") || "null") || [],
  systemEvents: JSON.parse(localStorage.getItem("qmlSystemEvents") || "null") || [],
  userWallet: normalizeUserWallet(JSON.parse(localStorage.getItem("qmlUserWallet") || "null") || null),
  favorites: JSON.parse(localStorage.getItem("qmlFavorites") || "[]"),
  addresses: JSON.parse(localStorage.getItem("qmlAddresses") || "null") || defaultAddresses(),
  cards: JSON.parse(localStorage.getItem("qmlCards") || "null") || defaultCards(),
  userReviews: JSON.parse(localStorage.getItem("qmlUserReviews") || "[]"),
  orderHistory: JSON.parse(localStorage.getItem("qmlOrderHistory") || "null") || defaultOrderHistory(),
  customPlans: JSON.parse(localStorage.getItem("qmlCustomPlans") || "[]"),
  cartQuantities: JSON.parse(localStorage.getItem("qmlCartQuantities") || "{}"),
  cart: JSON.parse(localStorage.getItem("qmlCart") || "[]"),
  selectedPaymentOption: localStorage.getItem("qmlSelectedPaymentOption") || "outright",
  paymentMethod: "card",
  onboardingStep: Number(localStorage.getItem("qmlOnboardingStep") || 0),
  onboardingComplete: localStorage.getItem("qmlOnboardingComplete") === "true",
  onboarding: {
    country: "Nigeria",
    city: "Lagos",
    contact: "",
    purpose: "Buy food for myself",
    referralCode: ""
  }
};

boot();

async function boot() {
  applyTheme();
  await loadData();
  render();
}

async function loadData() {
  const [summary, userBundle, packages, products, vendors, opportunities, deliveries, readiness, reconciliation] = await Promise.all([
    api("/api/summary"),
    api("/api/users/usr_ada"),
    api("/api/packages?country=Nigeria"),
    api("/api/products"),
    api("/api/vendors"),
    api("/api/financing-opportunities"),
    api("/api/deliveries"),
    api("/api/readiness"),
    safeApi("/api/admin/wallet-reconciliation", { totals: {}, recentLedger: [], duplicateWebhookEvents: [], failedWalletLookups: [], settlementReview: [], recentActions: [] }, { admin: true })
  ]);
  const savedProfile = JSON.parse(localStorage.getItem("qmlUserProfile") || "null");
  const apiRoleData = normalizeApiRoleWallets(state.roleData, userBundle.wallets, userBundle.transactions);
  state = {
    ...state,
    summary,
    user: savedProfile || userBundle.user,
    plans: userBundle.plans,
    packages,
    apiProducts: products,
    vendors,
    opportunities,
    deliveries,
    readiness,
    reconciliation,
    activeRoles: { ...normalizeApiActiveRoles(userBundle.roles), ...state.activeRoles },
    roleData: apiRoleData,
    userWallet: normalizeApiUserWallet(userBundle.wallets, userBundle.transactions) || state.userWallet
  };
}

function render() {
  const path = window.location.pathname;
  if (path.startsWith("/admin")) {
    renderAdmin();
  } else {
    renderMobileApp();
  }
}

function renderMobileApp() {
  if (!state.authComplete) {
    renderAuthScreen();
    return;
  }

  if (!state.onboardingComplete) {
    renderOnboarding();
    return;
  }

  const screens = {
    home: renderHomeScreen,
    shop: renderShopScreen,
    detail: renderPackageDetailScreen,
    cart: renderCartScreen,
    checkout: renderCheckoutScreen,
    payment: renderPaymentScreen,
    plans: renderPlansScreen,
    sharePlan: renderSharePlanScreen,
    customPlan: renderCustomPlanScreen,
    profile: renderProfileScreen,
    settings: renderSettingsScreen,
    search: renderSearchScreen,
    filter: renderFilterScreen,
    liveLocation: renderLiveLocationScreen,
    proximityMap: renderProximityMapScreen,
    biometric: renderBiometricScreen,
    referrals: renderReferralScreen,
    rewards: renderRewardsScreen,
    leaderboard: renderLeaderboardScreen,
    groupBuys: renderGroupBuysScreen,
    createGroup: renderCreateGroupScreen,
    groupDetail: renderGroupDetailScreen,
    groupInvite: renderGroupInviteScreen,
    support: renderSupportScreen,
    creditScore: renderCreditScoreScreen,
    favorites: renderFavoritesScreen,
    orders: renderOrdersScreen,
    addresses: renderAddressesScreen,
    addAddress: renderAddAddressScreen,
    cards: renderCardsScreen,
    addCard: renderAddCardScreen,
    wallet: renderWalletScreen,
    deposit: renderDepositScreen,
    transfer: renderTransferScreen,
    autoDebit: renderAutoDebitScreen,
    receipt: renderReceiptScreen,
    invoice: renderInvoiceScreen,
    transactions: renderTransactionsScreen,
    notifications: renderNotificationsScreen,
    shippingMethod: renderShippingMethodScreen,
    shippingInfo: renderShippingInfoScreen,
    orderSuccess: renderOrderSuccessScreen,
    errorState: renderErrorStateScreen,
    cancelOrder: renderCancelOrderScreen,
    refundRequest: renderRefundRequestScreen,
    reportAccount: renderReportAccountScreen,
    trackOrder: renderTrackOrderScreen,
    category: renderCategoryScreen,
    products: renderProductsScreen,
    productReview: renderProductReviewScreen,
    reviewList: renderReviewListScreen,
    vendorDashboard: renderVendorDashboardScreen,
    vendorProducts: renderVendorProductsScreen,
    vendorCreateProduct: renderVendorCreateProductScreen,
    vendorPackages: renderVendorPackagesScreen,
    vendorCreatePackage: renderVendorCreatePackageScreen,
    vendorStock: renderVendorStockScreen,
    vendorPromo: renderVendorPromoScreen,
    vendorOrders: renderVendorOrdersScreen,
    vendorWallet: renderVendorWalletScreen,
    vendorAnalytics: renderVendorAnalyticsScreen,
    financierDashboard: renderFinancierDashboardScreen,
    financierOpportunities: renderFinancierOpportunitiesScreen,
    financierOpportunityDetail: renderFinancierOpportunityDetailScreen,
    financierPortfolio: renderFinancierPortfolioScreen,
    financierTransactions: renderFinancierTransactionsScreen,
    financierWallet: renderFinancierWalletScreen,
    financierRiskRules: renderFinancierRiskRulesScreen,
    logisticsDashboard: renderLogisticsDashboardScreen,
    logisticsTrips: renderLogisticsTripsScreen,
    logisticsTripDetail: renderLogisticsTripDetailScreen,
    logisticsProof: renderLogisticsProofScreen,
    logisticsEarnings: renderLogisticsEarningsScreen,
    logisticsVehicle: renderLogisticsVehicleScreen,
    logisticsAvailability: renderLogisticsAvailabilityScreen,
    corporateDashboard: renderCorporateDashboardScreen,
    corporateStaff: renderCorporateStaffScreen,
    corporateOrders: renderCorporateOrdersScreen,
    corporateWallet: renderCorporateWalletScreen,
    roleSuccess: renderRoleSuccessScreen,
    aboutMe: renderAboutMeScreen,
    reviews: renderReviewsScreen
  };
  const renderer = screens[state.screen] || renderHomeScreen;
  app.innerHTML = `${renderer()}${bottomNav()}${loginSuccessPromo()}${toastMarkup()}`;
}

function renderAuthScreen() {
  const screens = {
    splash: renderSplashScreen,
    signin: renderSignInScreen,
    signup: renderSignUpScreen,
    forgot: renderForgotPasswordScreen,
    verify: renderVerifyNumberScreen,
    otp: renderOtpScreen
  };
  const renderer = screens[state.authScreen] || renderSplashScreen;
  app.innerHTML = `${renderer()}${toastMarkup()}`;
}

function renderSplashScreen() {
  const slide = introSlides[Math.max(0, Math.min(state.introSlide, introSlides.length - 1))];
  return `
    <main class="auth-shell splash-screen intro-screen" onpointerdown="startSplashSwipe(event)" onpointerup="finishSplashSwipe(event)">
      <div class="status-row"><span>9:41</span><span>||| WiFi Bat</span></div>
      <div class="splash-produce">
        <img src="${slide.image}" alt="" />
      </div>
      <div class="splash-copy">
        <h1>${slide.title}</h1>
        <p>${slide.text}</p>
      </div>
      <div class="splash-bottom">
        <div class="splash-dots">${introSlides.map((_, index) => `<button class="${index === state.introSlide ? "active" : ""}" onclick="setIntroSlide(${index})" aria-label="Open slide ${index + 1}"></button>`).join("")}</div>
        <div class="intro-actions">
          <button class="text-link" onclick="goAuth('signin')">Skip</button>
          <button class="btn primary" onclick="${state.introSlide === introSlides.length - 1 ? "goAuth('signup')" : "nextIntroSlide()"}">${state.introSlide === introSlides.length - 1 ? "Get Started" : "Next"}</button>
        </div>
      </div>
    </main>
  `;
}

function renderSignInScreen() {
  return authForm("Sign in", "Access your food plans, wallet, QML score, and role portals.", `
    ${socialAuthButtons("signin")}
    <label>Email or phone number</label>
    <input id="authIdentifier" placeholder="ada@example.com or +234..." />
    <label>Password</label>
    <input id="authPassword" type="password" placeholder="Password" />
    <button class="text-link right" onclick="goAuth('forgot')">Forgot password?</button>
    <button class="btn primary full" onclick="finishAuth()">Sign in</button>
    <button class="btn ghost full" onclick="goAuth('signup')">Create account</button>
  `);
}

function renderSignUpScreen() {
  const selected = signupRequirement(state.signupRole);
  return authForm("Create account", "Choose the account type first. Requirements and dashboard access change by role.", `
    ${socialAuthButtons("signup")}
    <div class="signup-role-grid">
      ${signupRoles().map((role) => `<button type="button" class="${state.signupRole === role.key ? "selected" : ""}" onclick="selectSignupRole('${role.key}')"><strong>${role.label}</strong><span>${role.short}</span></button>`).join("")}
    </div>
    <section class="signup-requirement-card">
      <strong>${selected.title}</strong>
      <p>${selected.text}</p>
      <div>${selected.items.map((item) => `<span>${item}</span>`).join("")}</div>
    </section>
    <label>Full name</label>
    <input id="signupName" placeholder="Ada Okonkwo" />
    <label>Email or phone number</label>
    <input id="signupIdentifier" placeholder="+2348012345678" />
    <label>Password</label>
    <input id="signupPassword" type="password" placeholder="Create password" />
    <label>Referral code</label>
    <input id="signupReferral" placeholder="Optional, e.g. QML-ADA-4821" />
    <button class="btn primary full" onclick="beginRoleSignup()">Create ${selected.label} account</button>
    <button class="text-link" onclick="goAuth('signin')">Already have an account?</button>
  `);
}

function renderForgotPasswordScreen() {
  return authForm("Forgot password", "Enter your phone or email. We will send a secure verification code.", `
    <label>Email or phone number</label>
    <input placeholder="ada@example.com or +234..." />
    <button class="btn primary full" onclick="goAuth('otp')">Send code</button>
    <button class="btn ghost full" onclick="goAuth('signin')">Back to sign in</button>
  `);
}

function renderVerifyNumberScreen() {
  return authForm("Verify number", "Confirm the phone number that will protect your wallet and repayments.", `
    <label>Phone number</label>
    <input placeholder="+2348012345678" />
    <button class="btn primary full" onclick="goAuth('otp')">Send OTP</button>
    <button class="btn ghost full" onclick="goAuth('signup')">Back</button>
  `);
}

function renderOtpScreen() {
  return authForm("Enter OTP", "Type the 6 digit code sent to your phone or email.", `
    <div class="otp-row">${[1, 2, 3, 4, 5, 6].map((item) => `<input maxlength="1" inputmode="numeric" value="${item === 1 ? "1" : ""}" />`).join("")}</div>
    <button class="text-link" onclick="resendVerificationCode()">Resend code</button>
    <button class="btn primary full" onclick="finishAuth()">Verify and continue</button>
  `);
}

function authForm(title, subtitle, body) {
  return `
    <main class="auth-shell">
      <div class="status-row"><span>9:41</span><span>||| WiFi Bat</span></div>
      <header class="auth-top"><button onclick="goAuth('splash')">&lt;</button><h1>${title}</h1><span></span></header>
      <section class="auth-card">
        <div class="splash-logo small"><span>QML</span> FOOD</div>
        <p>${subtitle}</p>
        ${body}
      </section>
    </main>
  `;
}

function socialAuthButtons(mode) {
  return `
    <div class="social-auth-grid">
      <button type="button" onclick="continueWithProvider('google', '${mode}')"><b>G</b><span>Continue with Google</span></button>
      <button type="button" onclick="continueWithProvider('apple', '${mode}')"><b></b><span>Continue with Apple</span></button>
    </div>
    <div class="auth-divider"><span>or</span></div>
  `;
}

function signupRoles() {
  return [
    { key: "customer", label: "Customer", short: "Buy, save, wallet" },
    { key: "vendor", label: "Vendor", short: "List products" },
    { key: "financier", label: "Financier", short: "Fund plans" },
    { key: "logistics", label: "Logistics", short: "Deliver orders" },
    { key: "corporate", label: "Corporate", short: "Staff packs" }
  ];
}

function signupRequirement(role) {
  const requirements = {
    customer: {
      label: "customer",
      title: "Normal user access",
      text: "Can shop, create baskets, fund wallet, review products, request support, and build credit score.",
      items: ["Phone/email OTP", "Delivery address", "Wallet setup", "Optional BVN/NIN for higher limits"]
    },
    vendor: {
      label: "vendor",
      title: "Vendor signup requirements",
      text: "Can create products, packages, plans, promos, stock, delivery tracking, and vendor wallet after verification.",
      items: ["BVN/NIN", "Business/CAC or seller proof", "Minimum 3 product images", "Stock proof", "Bank/wallet settlement"]
    },
    financier: {
      label: "financier",
      title: "Financier signup requirements",
      text: "Can fund verified food opportunities, view risk, track portfolio, returns, and settlement.",
      items: ["BVN/NIN", "Source of funds", "Bank account", "Risk agreement", "Wallet funding"]
    },
    logistics: {
      label: "logistics",
      title: "Logistics signup requirements",
      text: "Can accept nearby trips, submit proof, track payout, deductions, vehicle profile, and availability.",
      items: ["BVN/NIN", "Vehicle profile", "Driver ID/license", "Live location", "Delivery proof agreement"]
    },
    corporate: {
      label: "corporate",
      title: "Corporate signup requirements",
      text: "Can create staff packs, payroll deductions, bulk orders, corporate wallet funding, and delivery address distribution.",
      items: ["Company details", "Authorized officer", "Staff list", "Payroll/paycycle terms", "Corporate wallet"]
    }
  };
  return requirements[role] || requirements.customer;
}

function filterButton() {
  return `
    <button class="filter-toggle" onclick="goToScreen('filter')" aria-label="Filter">
      <i></i><i></i><i></i>
    </button>
  `;
}

function homeHeroItems() {
  return marketplacePackages().slice(0, 6);
}

function homeHeroSlide(item) {
  const deposit = item.deposit_percent ?? item.depositPercent ?? 50;
  return `
    <article class="home-hero interactive-card" role="button" tabindex="0" onclick="openItemDetail('${item.id}')" onkeydown="cardKeyOpen(event, '${item.id}')">
      <img src="${item.image_url || ""}" alt="" />
      <div>
        <strong>${item.category}</strong>
        <h1>${item.title}</h1>
        <p>${money.format(Number(item.price))} - pay ${deposit}% or choose daily, weekly, monthly, quarterly.</p>
      </div>
    </article>
  `;
}

function activePlans() {
  const apiPlans = (state.plans || []).map((plan, index) => ({
    ...normalizePlan(plan),
    id: plan.id || `api_plan_${index}`,
    cadence: plan.cadence || "Weekly",
    paymentOptions: "Daily, weekly, monthly, pay twice, outright",
    items: plan.items || ["Rice", "Beans", "Oil", "Produce"],
    image: plan.image || seededActivePlans[index % seededActivePlans.length].image
  }));
  const custom = state.customPlans.map((plan) => ({ ...plan, status: plan.status || "custom_active" }));
  const known = new Set(custom.map((plan) => plan.id));
  return custom.concat(apiPlans, seededActivePlans.filter((plan) => !known.has(plan.id)));
}

function activePlanCard(plan) {
  const normalized = normalizePlan(plan);
  const progress = normalized.total ? Math.min(100, Math.round((normalized.paid / normalized.total) * 100)) : 0;
  return `
    <article class="active-plan-card interactive-card" role="button" tabindex="0" onclick="openPlanDetail('${plan.id}')" onkeydown="cardKeyOpenPlan(event, '${plan.id}')" style="background-image:url('${plan.image || seededActivePlans[0].image}')">
      <div>
        <span class="pill good">${formatStatus(normalized.status)}</span>
        <h3>${normalized.title}</h3>
        <p>${(plan.items || []).slice(0, 5).join(", ")}</p>
      </div>
      <div>
        <div class="progress"><i style="width:${progress}%"></i></div>
        <div class="plan-meta"><span>${money.format(normalized.paid)} saved</span><span>${money.format(Math.max(0, normalized.total - normalized.paid))} left</span></div>
        <small>${plan.cadence || "Flexible"} - ${plan.paymentOptions || "Weekly, monthly, outright"}</small>
        <div class="actions plan-actions">
          <button class="btn primary" onclick="event.stopPropagation(); startPlanPayment('${plan.id}')">Pay/save</button>
          <button class="btn secondary" onclick="event.stopPropagation(); openPlanDelivery('${plan.id}')">Delivery</button>
          <button class="btn ghost" onclick="event.stopPropagation(); buyPlanForFamily('${plan.id}')">Buy for family/friends</button>
          <button class="btn ghost" onclick="event.stopPropagation(); openPlanShare('${plan.id}')">Share</button>
        </div>
      </div>
    </article>
  `;
}

function customPlanPrompt(title, text, source) {
  return `
    <section class="custom-plan-prompt">
      <div><strong>${title}</strong><span>${text}</span></div>
      <button class="btn primary" onclick="goToScreen('customPlan')">Create plan</button>
    </section>
  `;
}

function appPromoCards() {
  const cards = [
    ["Eat balanced, pay small-small", "Create a healthy basket with grains, protein, fruits, vegetables, and oil, then save daily or weekly.", "Create plan", "customPlan", "basket"],
    ["Fight hunger with food plans", "QML helps homes avoid empty kitchens by planning affordable meals before money becomes plenty.", "Start saving", "plans", "mission"],
    ["Perishables move same day", "Fresh fruits, vegetables, dairy, and farm produce are matched to nearby vendors for same-day or few-hours delivery.", "Shop fresh", "shop", "fresh"],
    ["Location-based groceries", "Nigeria sees local foodstuff first; Africa, Asia, America, and Europe see regional market produce.", "Enable location", "liveLocation", "location"],
    ["Buy outright, save 5%", "Complete a wallet payment once and receive the automatic outright discount on eligible baskets.", "Shop deals", "shop", "deal"],
    ["Finance food access", "Financiers can support verified nearby food plans and help families eat better while earning returns.", "Explore roles", "profile", "finance"]
  ];
  return `<section class="promo-section"><div class="bigcart-section-title"><h2>More you can do</h2><span>Swipe to explore</span></div><div class="app-promo-carousel">${cards.map(([title, text, action, screen, tone]) => `<article class="app-promo-card ${tone}" role="button" tabindex="0" onclick="goToScreen('${screen}')"><span>QML</span><h3>${title}</h3><p>${text}</p><button>${action} &rsaquo;</button></article>`).join("")}</div></section>`;
}

function loginSuccessPromo() {
  if (!state.loginPromoVisible) return "";
  return `<div class="login-success-overlay" role="dialog" aria-modal="true" aria-labelledby="loginSuccessTitle"><section class="login-success-card"><button class="overlay-close" onclick="dismissLoginPromo()" aria-label="Close">&times;</button><div class="success-check">&#10003;</div><p class="eyebrow">Signed in securely</p><h2 id="loginSuccessTitle">Welcome back, ${firstName(normalizeUser(state.user).name)}</h2><p>Your next early payment can earn <strong>250 loyalty points</strong> and move you up the QML leaderboard.</p><div class="login-promo-benefit"><b>5% off</b><span>Pay outright on an eligible food basket</span></div><button class="btn primary full" onclick="openLoginPromoOffer()">View my rewards</button><button class="btn ghost full" onclick="dismissLoginPromo()">Continue to home</button></section></div>`;
}

function floatingCustomPlanButton() {
  return `<button class="floating-custom-plan" onclick="goToScreen('customPlan')" aria-label="Create custom food basket">${iconSvg("basket")}<b>Create basket</b></button>`;
}

function homeAvatar(user) {
  const fallback = firstName(user.name)[0];
  const content = state.userAvatar ? `<img src="${state.userAvatar}" alt="" />` : `<span>${fallback}</span>`;
  return `<button class="home-avatar" onclick="goToScreen('profile')" aria-label="Open profile">${content}</button>`;
}

function foodTagStrip() {
  return `
    <div class="scroll-chip-shell">
      <button class="chip-scroll-arrow previous" onclick="scrollChipRow(this, -1)" aria-label="Scroll food tags left">&lsaquo;</button>
      <section class="food-tag-strip scroll-chip-row" aria-label="Food tags">
      ${state.foodTags.map((tag) => `<button class="${state.selectedFoodTag === tag ? "active" : ""}" onclick="selectFoodTag('${tag}')">${tag}</button>`).join("")}
      </section>
      <button class="chip-scroll-arrow next" onclick="scrollChipRow(this, 1)" aria-label="Scroll food tags right">&rsaquo;</button>
    </div>
  `;
}

function balanceText(amount) {
  return state.balanceVisible ? money.format(Number(amount || 0)) : "••••••";
}

function balanceEyeButton(label = "balance") {
  return `<button class="balance-eye" onclick="toggleBalanceVisibility()" aria-label="${state.balanceVisible ? `Hide ${label}` : `Show ${label}`}">${iconSvg(state.balanceVisible ? "eye" : "eyeOff")}</button>`;
}

function iconSvg(name) {
  const icons = {
    basket: `<path d="M5 11h14l-1.4 8.4A2 2 0 0 1 15.6 21H8.4a2 2 0 0 1-2-1.6L5 11Z"/><path d="M8 11 12 3l4 8"/><path d="M9 15h.01"/><path d="M12 15h.01"/><path d="M15 15h.01"/>`,
    headset: `<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 15a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3v4Z"/><path d="M3 15a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3v4Z"/><path d="M13 19h2a4 4 0 0 0 4-4"/>`,
    mic: `<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>`,
    bell: `<path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>`,
    edit: `<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>`,
    camera: `<path d="M14.5 4 13 2h-2L9.5 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.5Z"/><circle cx="12" cy="12" r="3"/>`,
    image: `<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="m21 15-5-5L5 21"/>`,
    eye: `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`,
    eyeOff: `<path d="m3 3 18 18"/><path d="M10.6 10.6a3 3 0 0 0 3.8 3.8"/><path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-4 5.1"/><path d="M6.6 6.6C3.7 8.6 2 12 2 12s3.5 8 10 8a10.7 10.7 0 0 0 4.4-.9"/>`
  };
  return `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.basket}</svg>`;
}

function customPlanHistoryPanel() {
  const plans = state.customPlans;
  return `
    <section class="custom-plan-history">
      <div class="split"><h2>Custom plan history</h2><button class="link-btn" onclick="goToScreen('customPlan')">New</button></div>
      ${plans.length ? plans.map((plan) => {
        const progress = plan.total ? Math.round((Number(plan.paid || 0) / Number(plan.total || 1)) * 100) : 0;
        return `
          <article>
            <div><strong>${plan.title}</strong><span>${plan.items.join(", ")}</span></div>
            <b>${money.format(plan.paid)} / ${money.format(plan.total)}</b>
            <div class="progress"><i style="width:${Math.min(100, progress)}%"></i></div>
            <small>${[plan.duration, plan.vendor, plan.paymentOptions, plan.vendorPrice ? `market quote ${money.format(plan.vendorPrice)}` : ""].filter(Boolean).join(" - ")}</small>
          </article>
        `;
      }).join("") : emptyInline("No custom basket plan yet. Create one with fixed foodstuff and a budget.")}
    </section>
  `;
}

function selectedActivePlan() {
  return activePlans().find((plan) => plan.id === state.selectedPlanId) || activePlans()[0];
}

function applyPlanPayment(id, amount) {
  const custom = state.customPlans.find((plan) => plan.id === id);
  if (custom) {
    custom.paid = Math.min(Number(custom.total || 0), Number(custom.paid || 0) + Number(amount || 0));
    custom.status = custom.paid >= custom.total * 0.5 ? "delivery_eligible" : "custom_active";
    return;
  }
  const seeded = seededActivePlans.find((plan) => plan.id === id);
  if (seeded) {
    seeded.paid = Math.min(Number(seeded.total || 0), Number(seeded.paid || 0) + Number(amount || 0));
    seeded.status = seeded.paid >= seeded.total * 0.5 ? "delivery_eligible" : "active";
  }
}

function renderHomeScreen() {
  const user = normalizeUser(state.user);
  const plans = activePlans();

  return `
    <main class="mobile-frame">
      <header class="home-action-top">
        ${homeAvatar(user)}
        <div><strong>Hello, ${firstName(user.name)}</strong><span>Create food baskets, save, and track plans.</span></div>
        <button onclick="goToScreen('notifications')" aria-label="Notifications">${iconSvg("bell")}<b>${filteredUpdates().length}</b></button>
        <button onclick="contactSupport()" aria-label="Support">${iconSvg("headset")}</button>
      </header>
      <div class="bigcart-search home-search">
        <input placeholder="Search food, baskets, plans" onclick="goToScreen('search')" />
        ${filterButton()}
      </div>
      ${foodTagStrip()}
      <section class="home-carousel" aria-label="Featured local food plans">
        ${homeHeroItems().map(homeHeroSlide).join("")}
      </section>
      ${appPromoCards()}
      <div class="bigcart-section-title"><h2>Categories</h2><button class="arrow-link" onclick="goToScreen('category')" aria-label="View categories"></button></div>
      <section class="bigcart-categories">
        ${categories.slice(0, 6).map((category, index) => categoryBubble(category, index)).join("")}
      </section>
      <div class="bigcart-section-title"><h2>Active QML Plan</h2><button class="arrow-link" onclick="goToScreen('plans')" aria-label="View plans"></button></div>
      <section class="active-plan-carousel" aria-label="Active QML plans">
        ${plans.map(activePlanCard).join("")}
      </section>
      ${customPlanPrompt("Build a weekly or monthly food basket budget", "Choose fixed foodstuff, set your budget, then save gradually or pay outright.", "home")}
      ${homeMarketplaceSections().map(homeProductRail).join("")}
      <div class="bigcart-section-title"><h2>Featured products</h2><button class="arrow-link" onclick="goToScreen('products')" aria-label="View products"></button></div>
      <section class="product-grid">${allMarketplaceItems().slice(0, 8).map(productCard).join("")}</section>
      ${floatingCustomPlanButton()}
    </main>
  `;
}

function renderShopScreen() {
  const shopSections = shopMarketplaceSections();
  const packageItems = marketplacePackages();
  const filteredProducts = filteredMarketplaceProducts();
  const visibleProducts = filteredProducts.length ? filteredProducts : allMarketplaceItems().slice(0, 24);
  return `
    <main class="mobile-frame shop-frame">
      <header class="shop-top">
        <div>
          <p class="eyebrow">Bulk Food by QML</p>
          <h1>Find fresh bulk food</h1>
          <span>Lagos, Nigeria</span>
        </div>
        <button class="cart-bubble" onclick="goToScreen('cart')">${cartCount()}</button>
      </header>
      <div class="bigcart-search">
        <input placeholder="Search foods, packages, vendors" onclick="goToScreen('search')" />
        ${filterButton()}
      </div>
      ${shopOverviewPanel(allMarketplaceItems(), packageItems)}
      ${marketplaceFilterStrip()}
      <section class="category-strip shop-category-strip">${categories.map((category) => `<button onclick="selectCategory('${category}')">${category}</button>`).join("")}</section>
      ${shopSections.map(homeProductRail).join("")}
      <section class="shop-package-band">
        <div class="split section-title">
          <h2>Raw Foodstuff Packages</h2>
          <button class="link-btn" onclick="goToScreen('products')">View all</button>
        </div>
        <section class="compact-package-list shop-package-list">${packageItems.slice(0, 8).map(compactPackageCard).join("")}</section>
      </section>
      <section class="group-buy-banner shop-group-banner" role="button" tabindex="0" onclick="goToScreen('groupBuys')"><div><span>Buy together, pay less</span><h2>Start a food buying group</h2><p>Invite family, friends, or colleagues and split the bill equally.</p></div><button class="btn primary">View groups</button></section>
      <div class="split section-title">
        <h2>Food Materials</h2>
        <button class="link-btn" onclick="goToScreen('filter')">Filter</button>
      </div>
      <section class="product-grid">${visibleProducts.slice(0, 40).map(productCard).join("")}</section>
    </main>
  `;
}

function shopOverviewPanel(items, packages) {
  const freshCount = items.filter((item) => /fresh|produce|fruit|vegetable|tomato|pepper|okra|leaf|yam|plantain|same day|few hours/i.test(marketItemText(item))).length;
  const liveCount = items.filter((item) => /live protein|livestock|live chicken|live turkey|live goat|live cow|live cattle|live ram|live catfish|live tilapia/i.test(marketItemText(item))).length;
  const discountedCount = items.filter((item) => /discount|promo|bulk|group|5%|best price|pay 50|weekly|monthly/i.test(marketItemText(item))).length;
  const stats = [
    ["Listings", items.length],
    ["Fresh", freshCount],
    ["Live protein", liveCount],
    ["Discounted", discountedCount],
    ["Packages", packages.length]
  ];
  return `<section class="shop-summary-grid">${stats.map(([label, value]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join("")}</section>`;
}

function renderPackageDetailScreen() {
  const item = selectedPackage();
  const slots = Number(item.group_buy_slots ?? item.groupBuySlots ?? 0);
  const filled = Number(item.group_buy_filled ?? item.groupBuyFilled ?? 0);
  const depositPercent = Number(item.deposit_percent ?? item.depositPercent ?? 50);
  const deposit = Math.round(Number(item.price) * depositPercent / 100);
  const items = Array.isArray(item.items) ? item.items : String(item.items || item.category || "Food package").split(",").map((entry) => entry.trim()).filter(Boolean);
  const description = item.description || `${item.title} includes ${items.slice(0, 5).join(", ")} from ${item.vendor || "a verified vendor"}.`;
  const vendorInfo = item.vendorInfo || item.writeup || description;
  return `
    <main class="mobile-frame detail-frame">
      <header class="plain-topbar"><button onclick="goToScreen('shop')">&lt;</button><span></span><button onclick="toggleFavorite('${item.id}')">${favoriteIcon(item.id)}</button></header>
      ${imageGallery(item, "Package photos")}
      <section class="detail-sheet">
        <div class="split">
          <div>
            <strong class="price">${money.format(Number(item.price))}</strong>
            <h1>${item.title}</h1>
            <span class="muted">${item.vendor || "Verified vendor"} - ${item.category || "Food"} package</span>
          </div>
          <button class="heart-btn" onclick="toggleFavorite('${item.id}')">${favoriteIcon(item.id)}</button>
        </div>
        <p class="rating">4.8 ★★★★★ <span>(QML verified vendor)</span></p>
        <p class="muted">${description} Pay gradually, become delivery eligible at ${depositPercent}% contribution, then continue your balance.</p>
        <section class="vendor-writeup-card"><span>Vendor information</span><p>${vendorInfo}</p></section>
        <div class="info-grid">
          <div><span>Deposit</span><strong>${money.format(deposit)}</strong></div>
          <div><span>Delivery</span><strong>${depositPercent}% paid</strong></div>
          <div><span>Group slots</span><strong>${slots ? `${Math.max(slots - filled, 0)} left` : "Not needed"}</strong></div>
          <div><span>Plan</span><strong>2 weeks - 3 months</strong></div>
        </div>
        <h3>Items included</h3>
        <div class="item-list">${items.map((entry) => `<span>${entry}</span>`).join("")}</div>
        <div class="split detail-reviews-link"><h3>Reviews</h3><button class="link-btn" onclick="openProductReview('${item.id}')">View product review</button></div>
        <div class="quantity-row"><span>Quantity</span><button onclick="changeCartQuantity('${item.id}', -1)">-</button><strong>${itemQuantity(item.id)}</strong><button onclick="changeCartQuantity('${item.id}', 1)">+</button></div>
        <div class="actions">
          <button class="btn primary full" onclick="buyNow('${item.id}')">Add to cart</button>
          <button class="btn ghost full" onclick="startGroupForItem('${item.id}')">Create group & split price</button>
        </div>
      </section>
    </main>
  `;
}

function renderCartScreen() {
  const items = cartItems();
  const total = cartTotal(items);
  return `
    <main class="mobile-frame">
      ${screenHeader("Cart", "Review your food basket before checkout.", "shop")}
      <section class="stack">
        ${items.length ? items.map(cartRow).join("") : emptyState("Your cart is empty", "Add packages from the shop to start a food plan.")}
      </section>
      <section class="checkout-summary">
        <div class="split"><span>Subtotal</span><strong>${money.format(total)}</strong></div>
        <div class="split"><span>Outright 5% discount</span><strong>${money.format(Math.round(total * 0.05))}</strong></div>
        <div class="split"><span>Required 50%</span><strong>${money.format(Math.round(total * 0.5))}</strong></div>
        <div class="split"><span>Delivery estimate</span><strong>${money.format(items.length ? 4500 : 0)}</strong></div>
        <div class="cart-action-grid">
          <button class="btn ghost full" onclick="goToScreen('shop')">Add more products</button>
          <button class="btn primary full" ${items.length ? "" : "disabled"} onclick="goToScreen('checkout')">Continue to Checkout</button>
        </div>
      </section>
    </main>
  `;
}

function renderCheckoutScreen() {
  const items = cartItems();
  const total = cartTotal(items);
  return `
    <main class="mobile-frame">
      ${screenHeader("Checkout", "Choose how you want to pay and receive your food.", "cart")}
      <section class="plan-card">
        <h2>Payment option</h2>
        <div class="option-list">
          ${paymentOption("outright", "Pay outright", `${money.format(Math.round(total * 0.95))} after 5% discount`)}
          ${paymentOption("once", "Pay once, no discount", money.format(total))}
          ${paymentOption("twice", "Pay twice", `${money.format(Math.round(total / 2))} now, balance later`)}
          ${paymentOption("daily", "Contribute daily", `${money.format(Math.max(1000, Math.round(total / 30)))} per day estimate`)}
          ${paymentOption("weekly", "Contribute weekly", `${money.format(Math.round(total / 8))} per week estimate`)}
          ${paymentOption("monthly", "Contribute monthly", `${money.format(Math.round(total / 3))} per month estimate`)}
          ${paymentOption("quarterly", "Contribute quarterly", "Best for staff/corporate bulk plans")}
        </div>
      </section>
        <section class="plan-card">
          <h2>Delivery address</h2>
          <p class="muted">Lekki Phase 1, Lagos. Delivery partner will be assigned by package size and location.</p>
          <button class="btn ghost full" onclick="goToScreen('shippingInfo')">Change Address</button>
        </section>
        <button class="btn primary full" onclick="goToScreen('shippingInfo')">Continue Shipping</button>
    </main>
  `;
}

function renderPaymentScreen() {
  const items = cartItems();
  const plan = selectedActivePlan();
  const total = cartTotal(items) || Math.max(0, normalizePlan(plan).total - normalizePlan(plan).paid);
  return `
    <main class="mobile-frame">
      ${screenHeader("Payment", "Complete payment securely.", cartCount() ? "checkout" : "home")}
      <section class="score-card">
        <div><span class="muted">Amount to pay</span><div class="score">${money.format(total)}</div><span class="muted">Card, bank transfer, wallet, or saved card</span></div>
      </section>
      <section class="plan-card">
        <h2>Choose payment method</h2>
        <div class="option-list">
          ${paymentMethod("card", "Debit Card", "Pay with linked or new card")}
          ${paymentMethod("transfer", "Bank Transfer", "Generate virtual account")}
          ${paymentMethod("wallet", "QML Wallet", `Use available balance ${money.format(state.userWallet.balance)}`)}
          ${paymentMethod("ussd", "USSD", "Pay from your bank phone code")}
        </div>
        <button class="btn primary full" onclick="confirmPayment()">Confirm Payment</button>
      </section>
    </main>
  `;
}

function renderPlansScreen() {
  const plans = activePlans();
  return `
    <main class="mobile-frame">
      ${screenHeader("Food Plans", "Track active, upcoming, wishlist, and delivery eligible plans.", "home")}
      ${customPlanPrompt("Create your custom food basket", "Add rice, beans, oil, tubers, proteins, and produce, set a budget, then attach daily, weekly, monthly, quarterly, installment, or outright payment.", "plans")}
      <section class="active-plan-carousel wide" aria-label="All active QML plans">
        ${plans.map(activePlanCard).join("")}
      </section>
      <section class="stack">
        <article class="plan-card">
          <span class="pill">Wishlist</span>
          <h2>Festive Bulk Celebration Pack</h2>
          <p class="muted">Start weekly savings and become delivery eligible at 50%.</p>
          <button class="btn ghost full" onclick="selectPackage('pkg_festive')">Start Plan</button>
        </article>
      </section>
      ${customPlanHistoryPanel()}
      ${floatingCustomPlanButton()}
    </main>
  `;
}

function renderSharePlanScreen() {
  const plan = selectedActivePlan();
  const normalized = normalizePlan(plan);
  const remaining = Math.max(0, Number(normalized.total || 0) - Number(normalized.paid || 0));
  const shareUnit = Math.max(1000, Math.round((normalized.total || 100000) / 10));
  return `
    <main class="mobile-frame">
      ${screenHeader("Share Plan", "Send part of your active QML plan or custom basket to family and friends.", "plans")}
      <section class="plan-card share-plan-summary">
        <span class="pill good">${formatStatus(normalized.status)}</span>
        <h2>${normalized.title}</h2>
        <p class="muted">${(plan.items || []).slice(0, 6).join(", ")}</p>
        <div class="info-grid">
          <div><span>Plan value</span><strong>${money.format(normalized.total || 0)}</strong></div>
          <div><span>Saved</span><strong>${money.format(normalized.paid || 0)}</strong></div>
          <div><span>Available</span><strong>${money.format(remaining || normalized.total || 0)}</strong></div>
          <div><span>Payment</span><strong>${plan.paymentOptions || plan.cadence || "Flexible"}</strong></div>
        </div>
      </section>
      <section class="role-form-card">
        ${formField("Family/friend username", "@username or QML ID", "shareRecipient")}
        <label><span>Quantity / basket share</span><select id="shareQuantity"><option>1 share - ${money.format(shareUnit)}</option><option>2 shares - ${money.format(shareUnit * 2)}</option><option>3 shares - ${money.format(shareUnit * 3)}</option><option>Custom portion</option></select></label>
        ${formField("Delivery address", "Receiver address or saved address name", "shareAddress")}
        <label><span>Delivery type</span><select id="shareDeliveryType"><option>Bike delivery</option><option>Van delivery</option><option>Truck delivery</option><option>Pickup by receiver</option></select></label>
        <div class="role-warning">Only share inside QML. The receipt will include delivery tracking for bikes or verified driver details for vehicles.</div>
        <button class="btn primary full" onclick="confirmPlanShare()">Share with family/friend</button>
      </section>
    </main>
  `;
}

function renderCustomPlanScreen() {
  const foods = customBasketFoodOptions();
  const paymentOptions = ["Daily", "Weekly", "Monthly", "Quarterly", "Pay twice", "Pay once", "Outright 5% discount"];
  return `
    <main class="mobile-frame">
      ${screenHeader("Custom Basket", "Create a fixed foodstuff budget and payment plan.", "plans")}
      <section class="custom-plan-hero">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80" alt="" />
        <div>
          <h2>Build your own QML food basket</h2>
          <p>Select fixed items, set a budget, choose payment options, then start saving toward delivery eligibility.</p>
        </div>
      </section>
      <section class="role-form-card">
        ${formField("Plan name", "My Weekly Food Basket", "customPlanName")}
        ${formField("Budget", "150000", "customPlanBudget")}
        ${formField("Saving target", "50% before delivery", "customPlanTarget")}
        <label><span>Basket duration</span><select id="customPlanDuration">${optionSet(["1 month food basket", "2 months food basket", "3 months food basket"], "1 month food basket")}</select></label>
        <label><span>Fixed foodstuff, quantity, and price</span><div class="custom-basket-options">${foods.map(customBasketOption).join("")}</div></label>
        <label><span>Payment plan</span><select id="customPlanPaymentOption">${paymentOptions.map((item) => `<option>${item}</option>`).join("")}</select></label>
        <section class="vendor-competition-card">
          <div class="split"><h2>Vendor price competition</h2><span class="pill good">Policy control</span></div>
          <p>QML compares nearby vendor prices for the same basket and period, helping regularize prices while giving customers better offers.</p>
          ${vendorCompetitionRows().map(([vendor, price, note], index) => `<button type="button" class="${index === 0 ? "selected" : ""}" onclick="selectBasketVendor(this, '${vendor}', ${price})"><strong>${vendor}</strong><span>${money.format(price)} - ${note}</span></button>`).join("")}
        </section>
        <input id="customPlanVendor" type="hidden" value="${vendorCompetitionRows()[0][0]}" />
        <input id="customPlanVendorPrice" type="hidden" value="${vendorCompetitionRows()[0][1]}" />
        <button class="btn primary full" onclick="createCustomPlan()">Create basket plan</button>
      </section>
      ${customPlanHistoryPanel()}
    </main>
  `;
}

function renderProfileScreen() {
  const user = normalizeUser(state.user);
  return `
    <main class="mobile-frame">
      ${screenHeader("Profile", "Manage account, roles, verification, and referrals.", "home")}
      <section class="profile-card">
        <button class="avatar user-avatar-button" onclick="triggerProfilePhotoUpload()" aria-label="Change profile picture">${state.userAvatar ? `<img src="${state.userAvatar}" alt="" />` : firstName(user.name)[0]}<span>${iconSvg("camera")}</span></button>
        <input class="profile-photo-input" id="profilePhotoInput" type="file" accept="image/*" onchange="uploadProfilePhoto()" />
        <h1>${user.name}</h1>
        <button class="link-btn profile-photo-link" onclick="triggerProfilePhotoUpload()">Change photo</button>
        <p class="muted">${user.city}, ${user.country} - ${user.referralCode}</p>
        <div class="wallet-mini-row"><span>Personal wallet</span><div><strong>${balanceText(state.userWallet.balance)}</strong>${balanceEyeButton("personal wallet balance")}</div></div>
      </section>
        ${roleDashboardPanel()}
        ${customPlanPrompt("Create a custom basket plan", "Pick fixed foodstuff, create a budget, and start saving weekly/monthly or pay using available options.", "profile")}
        <section class="settings-list">
          ${settingsRow("About me", "Profile, contact, and eligibility details", "aboutMe")}
          ${settingsRow("Wallet", "Personal wallet, role wallets, ledgers, and transfers", "wallet")}
          ${settingsRow("My Orders", "Food plans, deliveries, and completed orders", "orders")}
          ${settingsRow("My Favorites", `${wishlistCount()} saved wishlist item${wishlistCount() === 1 ? "" : "s"}`, "favorites")}
          ${settingsRow("Reviews", "Ratings and feedback from recent orders", "reviewList")}
          ${settingsRow("My Address", "Home, office, and staff delivery addresses", "addresses")}
          ${settingsRow("Credit Cards", "Cards, banks, and repayment methods", "cards")}
          ${settingsRow("Transactions", "Wallet, deposits, repayments, settlements", "transactions")}
          ${settingsRow("Notifications", "Payment reminders and delivery updates", "notifications")}
          ${settingsRow("Live Location", "Enable proximity matching for food, vendors, and logistics", "liveLocation")}
          ${settingsRow("Credit Score", "QML rating, verification score, wallet behavior, and purchase eligibility", "creditScore")}
          ${settingsRow("Support", "Encrypted chat, call support, tickets, and help center", "support")}
          ${settingsRow("Referral & Rewards", "Invite users, track bonuses, and redeem glow rewards", "referrals")}
          ${settingsRow("Settings", "Security, roles, and app preferences", "settings")}
          ${settingsRow("Sign out", "Return to splash screen", "signout")}
        </section>
    </main>
  `;
}

function renderSettingsScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Settings", "Control security, notifications, roles, and app preferences.", "profile")}
      <section class="settings-list">
        ${appearanceToggleRow()}
        ${settingsRow("Biometric login", state.biometricEnabled ? "Enabled for quick secure login" : "Tap to activate fingerprint/face login", "biometric")}
        ${toggleRow("Two-factor authentication", "twoFactor")}
        ${toggleRow("Payment reminders", "paymentReminders")}
        ${toggleRow("Delivery updates", "deliveryUpdates")}
      </section>
      <h2 class="section-title">Role applications</h2>
      <section class="role-switch">
        ${roles.slice(1).map(roleApplicationCard).join("")}
      </section>
      <button class="btn ghost full section-title" onclick="restartOnboarding()">Restart Onboarding</button>
    </main>
    `;
  }

function renderVendorDashboardScreen() {
  if (!hasRole("vendor")) return roleLockedScreen("Vendor", "Create products, list packages, manage stock, promos, pricing, delivery monitoring, wallet, and profit analytics.");
  const vendor = state.roleData.vendor;
  const wallet = roleWallet("vendor");
  const sales = vendor.orders.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const profit = Math.round(wallet.balance * 0.13);
  const pendingOrders = vendor.orders.filter((item) => item.status !== "Completed").length;
  return `
    <main class="mobile-frame role-dashboard">
      ${screenHeader("Vendor Dashboard", "Products, packages, wallet, customers, stock, promos, delivery, and profit.", "profile")}
      <section class="role-metric-grid">
        ${roleMetric("Sales", money.format(sales), "vendorAnalytics", "View analytics")}
        ${roleMetric("Wallet", money.format(wallet.balance), "vendorWallet", "Open wallet")}
        ${roleMetric("Products", String(vendor.products.length), "vendorProducts", "Manage products")}
        ${roleMetric("Pending orders", String(pendingOrders), "vendorOrders", "Move orders")}
      </section>
      ${roleCapabilityChecklist("As a vendor you can", [
        "Create products and packages with prices, stock, documents, and payment plans.",
        "Submit listings for AI approval and make approved items visible in the marketplace.",
        "Update stock, create promos, move orders, monitor delivery, and request wallet withdrawal.",
        "Track sales, profit margin, repeat buyers, customer activity, and top performing food items."
      ])}
      <section class="role-action-grid">
        ${roleAction("Products", "Review listings and AI approval status.", "vendorProducts")}
        ${roleAction("Create product", "Upload goods/raw food materials for AI approval.", "vendorCreateProduct")}
        ${roleAction("Packages/plans", "Bundle rice, oil, beans, protein, tubers, and produce.", "vendorPackages")}
        ${roleAction("Manage stock", "Update availability, low-stock alerts, and quantities.", "vendorStock")}
        ${roleAction("Promos/pricing", "Set discounts, 5% outright offers, and seasonal deals.", "vendorPromo")}
        ${roleAction("Orders", "Track customer orders, delivery movement, and proof.", "vendorOrders")}
        ${roleAction("Wallet", "Settlements, escrow, withdrawals, and deductions.", "vendorWallet")}
        ${roleAction("Analytics", "Profit, sales growth, conversion, and top products.", "vendorAnalytics")}
      </section>
      ${rolePanel("Recent vendor activity", vendor.activities.slice(0, 5))}
    </main>
  `;
}

function renderVendorProductsScreen() {
  const products = state.roleData.vendor.products;
  return rolePage("vendor", "Vendor Products", "Listings are checked by AI before they appear in shop and home ranking.", "vendorDashboard", `
    <section class="stack">
      ${products.map((item) => roleRecord(item.title, `${item.stock} - ${money.format(item.price)}`, item.status, `${item.note} - ${photoSummary(item.photos)}`, "Edit", `goToScreen('vendorCreateProduct')`)).join("")}
    </section>
    <button class="btn primary full" onclick="goToScreen('vendorCreateProduct')">Create new product</button>
  `);
}

function renderVendorCreateProductScreen() {
  return rolePage("vendor", "Create Product", "Submit goods, raw food materials, pricing, documents, and delivery rules for AI approval.", "vendorDashboard", `
    <section class="role-form-card">
      ${formField("Product name", "Egusi Seed Bag", "vendorProductName")}
      ${formField("Category", "Grains, oil, protein, tubers...", "vendorProductCategory")}
      ${formField("Price", "64000", "vendorProductPrice")}
      ${formField("Stock quantity", "84 bags", "vendorProductStock")}
      ${textAreaField("Vendor product information", "Describe quality, origin, weight, packaging, freshness, warranty/return condition, and delivery handling.", "vendorProductInfo")}
      ${formField("Documents", "Stock proof, CAC, photo, certificate where required", "vendorProductDocs")}
      ${fileUploadField("Product photos", "vendorProductPhotos", "Minimum 3 clear photos are required: product, packaging/label, and stock/proof angle.")}
      <div class="role-warning">AI checks vendor verification, price range, product images, stock proof, and value requirements before auto-approval.</div>
      <button class="btn primary full" onclick="submitVendorProduct()">Submit product</button>
    </section>
  `);
}

function renderVendorPackagesScreen() {
  const packages = state.roleData.vendor.packages;
  return rolePage("vendor", "Packages & Plans", "Build bundled local food plans with daily, weekly, monthly, quarterly, installment, or outright payment.", "vendorDashboard", `
    <section class="stack">
      ${packages.map((item) => roleRecord(item.title, item.items, item.paymentOptions, `${money.format(item.price)} - ${photoSummary(item.photos)}`, "Manage", `goToScreen('vendorCreatePackage')`)).join("")}
    </section>
    <button class="btn primary full" onclick="goToScreen('vendorCreatePackage')">Create package or plan</button>
  `);
}

function renderVendorCreatePackageScreen() {
  return rolePage("vendor", "Create Package", "Combine produce, raw materials, pricing, payment options, and delivery terms.", "vendorPackages", `
    <section class="role-form-card">
      ${formField("Package name", "Soup Raw Materials Pack", "vendorPackageName")}
      ${formField("Included items", "Egusi, crayfish, palm oil, pepper, dry fish", "vendorPackageItems")}
      ${formField("Total value", "175000", "vendorPackagePrice")}
      ${formField("Payment options", "Daily, weekly, monthly, quarterly, pay twice, pay once, outright", "vendorPackagePayments")}
      ${formField("Outright discount", "5%", "vendorPackageDiscount")}
      ${formField("Listing type", "Package or Plan", "vendorPackageType")}
      ${textAreaField("Vendor package / plan information", "Describe included items, quantities, substitutions, freshness, payment terms, and delivery eligibility.", "vendorPackageInfo")}
      ${fileUploadField("Package / plan photos", "vendorPackagePhotos", "Minimum 3 photos are required: full basket, item spread, and packaging/proof angle.")}
      <button class="btn primary full" onclick="submitVendorPackage()">Create package</button>
    </section>
  `);
}

function renderVendorStockScreen() {
  return rolePage("vendor", "Stock Manager", "Update availability, low-stock alerts, and quantities customers can order.", "vendorDashboard", `
    <section class="stack">
      ${state.roleData.vendor.products.map((item) => roleRecord(item.title, item.stock, item.status, item.note, "Add stock", `updateVendorStock('${item.id}')`)).join("")}
    </section>
  `);
}

function renderVendorPromoScreen() {
  return rolePage("vendor", "Promos & Pricing", "Create discounts, outright offers, seasonal campaigns, and package price rules.", "vendorDashboard", `
    <section class="role-form-card">
      ${formField("Promo title", "Weekend bulk food discount", "vendorPromoTitle")}
      ${formField("Applies to", "Palm Oil Keg, Rice Bag, Soup Pack", "vendorPromoApplies")}
      ${formField("Discount", "5% outright or 3% package promo", "vendorPromoDiscount")}
      ${formField("Start / end date", "Today - Sunday", "vendorPromoDates")}
      <button class="btn primary full" onclick="saveVendorPromo()">Save promo</button>
    </section>
    ${rolePanel("Active promos", state.roleData.vendor.promos.map((item) => `${item.title} - ${item.discount} - ${item.applies}`))}
  `);
}

function renderVendorOrdersScreen() {
  return rolePage("vendor", "Vendor Orders", "Monitor order movement, chat for delivery only, and delivery proof before settlement.", "vendorDashboard", `
    <section class="stack">
      ${state.roleData.vendor.orders.map((item) => roleRecord(`${item.id} - ${item.title}`, money.format(item.amount), item.status, "Delivery chat is encrypted and wallet-only payment is required.", "Move order", `moveVendorOrder('${item.id}')`)).join("")}
    </section>
  `);
}

function renderVendorWalletScreen() {
  const wallet = roleWallet("vendor");
  return rolePage("vendor", "Vendor Wallet", "Track sales, escrow, withdrawals, fees, profit, and payout readiness.", "vendorDashboard", `
    <section class="role-wallet-list">
      ${[
        ["Available settlement", "Sales cleared after delivery proof", wallet.balance],
        ["Pending escrow", "Orders still in progress", wallet.escrow],
        ["Promo deductions", "Discounts funded by vendor", -28500]
      ].map(walletRoleRow).join("")}
    </section>
    ${rolePanel("Vendor wallet ledger", wallet.ledger.slice(0, 6).map((item) => `${item.title} - ${item.meta} - ${money.format(item.amount)}`))}
    <button class="btn primary full" onclick="requestVendorWithdrawal()">Request withdrawal</button>
  `);
}

function renderVendorAnalyticsScreen() {
  return rolePage("vendor", "Vendor Analytics", "Sales growth, profit margin, stock movement, customer activity, and package performance.", "vendorDashboard", `
    <section class="role-metric-grid">
      ${roleMetric("Conversion", "18.4%")}
      ${roleMetric("Profit margin", "13%")}
      ${roleMetric("Repeat buyers", "61")}
      ${roleMetric("Top product", "Palm Oil")}
    </section>
    ${rolePanel("Insights", ["Protein Plus Family Plan is growing fastest this week.", "Customers prefer weekly and monthly contribution plans.", "AI recommends restocking catfish cartons before promo renewal."])}
  `);
}

function renderFinancierDashboardScreen() {
  if (!hasRole("financier")) return roleLockedScreen("Financier", "View financing opportunities, nearby demand, expected returns, risk scores, transactions, and profit generation.");
  const finance = state.roleData.financier;
  const wallet = roleWallet("financier");
  const available = wallet.balance;
  const financed = wallet.escrow;
  const expected = finance.opportunities.filter((item) => item.funded).reduce((sum, item) => sum + Number(item.expectedReturn || 0), 0);
  return `
    <main class="mobile-frame role-dashboard">
      ${screenHeader("Financier Dashboard", "Nearby opportunities, financed plans, expected returns, transactions, and profit.", "profile")}
      <section class="role-metric-grid">
        ${roleMetric("Available", money.format(available), "financierWallet", "Open wallet")}
        ${roleMetric("Financed", money.format(financed), "financierPortfolio", "View portfolio")}
        ${roleMetric("Expected return", money.format(expected), "financierTransactions", "See returns")}
        ${roleMetric("Avg. risk", "Low-Med", "financierRiskRules", "Review rules")}
      </section>
      ${roleCapabilityChecklist("As a financier you can", [
        "Browse verified food-plan demand and finance opportunities by district or risk level.",
        "Fund opportunities from your wallet and see them move into your portfolio.",
        "Review repayment transactions, perform sign-off, and settle profit back to wallet.",
        "Use risk rules to understand KYC, BVN/NIN, delivery release, and value requirements."
      ])}
      <section class="role-action-grid">
        ${roleAction("Opportunities", "View nearby financeable food plans and demand.", "financierOpportunities")}
        ${roleAction("Portfolio", "Track financed plans, returns, and exposure.", "financierPortfolio")}
        ${roleAction("Transactions", "Review repayments, bank sign-off, and profit.", "financierTransactions")}
        ${roleAction("Wallet", "Available balance, earnings, and settlement.", "financierWallet")}
        ${roleAction("Risk rules", "KYC, BVN/NIN, limits, and delivery release rules.", "financierRiskRules")}
      </section>
      <section class="stack">
        ${finance.opportunities.map((item) => `
          <article class="role-opportunity">
            <div><strong>${item.title}</strong><span>${item.district} - ${item.risk}</span></div>
            <p>${money.format(item.amount)} available - ${money.format(item.expectedReturn)} expected return</p>
            <button class="btn secondary full" onclick="openFinanceOpportunity('${item.id}')">${item.funded ? "Review funded deal" : "Finance opportunity"}</button>
          </article>
        `).join("")}
      </section>
      ${rolePanel("Financier transactions", [
        ...finance.activities.slice(0, 5)
      ])}
    </main>
  `;
}

function renderFinancierOpportunitiesScreen() {
  return rolePage("financier", "Finance Opportunities", "Find verified food-plan demand within districts and fund available inventory safely.", "financierDashboard", `
    <section class="stack">
      ${state.roleData.financier.opportunities.map((item) => roleRecord(item.title, item.district, item.funded ? "Funded" : item.risk, `${money.format(item.amount)} available - ${money.format(item.expectedReturn)} expected`, item.funded ? "Review" : "Finance", `openFinanceOpportunity('${item.id}')`)).join("")}
    </section>
  `);
}

function renderFinancierOpportunityDetailScreen() {
  const item = selectedFinanceOpportunity();
  return rolePage("financier", "Opportunity Detail", "Review demand, verification, repayment cycle, risk, and expected return before financing.", "financierOpportunities", `
    <section class="role-form-card">
      <h2>${item.title}</h2>
      <p>${item.district} verified demand for bulk food plans. Bank sign-off and repayment-cycle rules are required before funds are released.</p>
      <div class="role-status-row"><span>Amount needed</span><strong>${money.format(item.amount)}</strong></div>
      <div class="role-status-row"><span>Expected return</span><strong>${money.format(item.expectedReturn)}</strong></div>
      <div class="role-status-row"><span>Risk level</span><strong>${item.risk}</strong></div>
      <div class="role-status-row"><span>Status</span><strong>${item.funded ? "Funded" : "Open"}</strong></div>
      <div class="role-warning">Funds stay inside the QML wallet and are released according to verification, repayment, and delivery rules.</div>
      <button class="btn primary full" onclick="financeOpportunity('${item.id}')">${item.funded ? "Already funded" : "Finance this opportunity"}</button>
    </section>
  `);
}

function renderFinancierPortfolioScreen() {
  return rolePage("financier", "Financier Portfolio", "All active funded plans, returns, repayment status, and exposure.", "financierDashboard", `
    <section class="stack">
      ${state.roleData.financier.opportunities.filter((item) => item.funded).map((item) => roleRecord(item.title, `${item.district} - ${money.format(item.amount)}`, item.risk, `${money.format(item.expectedReturn)} expected return`, "View", `openFinanceOpportunity('${item.id}')`)).join("") || emptyInline("No financed plans yet. Open Opportunities to fund a verified plan.")}
    </section>
  `);
}

function renderFinancierTransactionsScreen() {
  return rolePage("financier", "Finance Transactions", "Track funded plans, repayments, sign-offs, returns, and settlement movement.", "financierDashboard", `
    <section class="stack">
      ${state.roleData.financier.transactions.map((item) => roleRecord(`${item.id} - ${item.title}`, money.format(item.amount), item.status, "Transaction is tied to wallet and verification rules.", item.status === "Settled" ? "Details" : "Sign off", `signOffFinanceTransaction('${item.id}')`)).join("")}
    </section>
  `);
}

function renderFinancierWalletScreen() {
  return rolePage("financier", "Financier Wallet", "Available capital, financed exposure, expected returns, and withdrawal status.", "financierDashboard", `
    <section class="role-wallet-list">
      ${[
        ["Available to finance", "Usable balance for verified opportunities", roleWallet("financier").balance],
        ["Currently financed", "Active capital across plans", roleWallet("financier").escrow],
        ["Expected returns", "Projected earnings from active plans", state.roleData.financier.opportunities.filter((item) => item.funded).reduce((sum, item) => sum + Number(item.expectedReturn || 0), 0)]
      ].map(walletRoleRow).join("")}
    </section>
    ${rolePanel("Financier wallet ledger", roleWallet("financier").ledger.slice(0, 6).map((item) => `${item.title} - ${item.meta} - ${money.format(item.amount)}`))}
    <button class="btn primary full" onclick="topUpFinancierWallet()">Top up wallet</button>
  `);
}

function renderFinancierRiskRulesScreen() {
  return rolePage("financier", "Risk & Verification", "Understand the checks that protect financed food plans before delivery.", "financierDashboard", `
    <section class="stack">
      ${adminRiskRules.map(([title, text]) => roleRecord(title, "Requirement", "Policy", text, "Read")).join("")}
    </section>
  `);
}

function renderLogisticsDashboardScreen() {
  if (!hasRole("logistics")) return roleLockedScreen("Logistics", "Accept nearby deliveries, view payout, distance, weekly deductions, revenue, and delivery proof tasks.");
  const logistics = state.roleData.logistics;
  const wallet = roleWallet("logistics");
  const availableTrips = logistics.trips.filter((item) => item.status === "Available").length;
  const completedTrips = logistics.trips.filter((item) => item.status === "Completed").length;
  const todayPayout = wallet.balance;
  return `
    <main class="mobile-frame role-dashboard">
      ${screenHeader("Logistics Dashboard", "Nearby trips, payout, distance, vehicle, revenue, and delivery proof.", "profile")}
      <section class="role-metric-grid">
        ${roleMetric("Available trips", String(availableTrips), "logisticsTrips", "Accept trips")}
        ${roleMetric("Today payout", money.format(todayPayout), "logisticsEarnings", "View earnings")}
        ${roleMetric("Completed", String(completedTrips), "logisticsProof", "Proof history")}
        ${roleMetric("Closest job", logistics.trips.find((item) => item.status === "Available")?.distance || "None", "logisticsTripDetail", "Open route")}
      </section>
      ${roleCapabilityChecklist("As a logistics account you can", [
        "Turn on availability and accept nearby delivery jobs matched to your vehicle.",
        "Follow pickup, route, OTP, recipient sign-off, and delivery photo proof steps.",
        "Submit proof to complete a delivery and update payout, weekly revenue, and deductions.",
        "Manage vehicle profile, delivery radius, preferred districts, and earnings."
      ])}
      <section class="role-action-grid">
        ${roleAction("Nearby trips", "Accept jobs closest to your vicinity.", "logisticsTrips")}
        ${roleAction("Active trip", "Pickup, OTP, route, delivery photo, and sign-off.", "logisticsTripDetail")}
        ${roleAction("Proof upload", "Submit OTP, location, recipient photo, and notes.", "logisticsProof")}
        ${roleAction("Earnings", "Revenue, deductions, bonuses, and payout.", "logisticsEarnings")}
        ${roleAction("Vehicle", "Bike, car, van, truck, or trailer profile.", "logisticsVehicle")}
        ${roleAction("Availability", "Turn on duty mode and choose delivery radius.", "logisticsAvailability")}
      </section>
      <section class="stack">
        ${logistics.trips.map((item) => `
          <article class="role-opportunity">
            <div><strong>${item.pickup} to ${item.dropoff}</strong><span>${item.vehicle} - ${item.distance}</span></div>
            <p>${money.format(item.payout)} payout. Requires pickup confirmation, OTP, and delivery photo.</p>
            <button class="btn secondary full" onclick="acceptLogisticsTrip('${item.id}')">${item.status === "Available" ? "Accept delivery" : "Open delivery"}</button>
          </article>
        `).join("")}
      </section>
      ${rolePanel("Logistics earnings", [
        "Auxiliary revenue generated from completed bulk-food delivery",
        "Weekly deduction cycle calculated before payout",
        "Discount and bonus eligibility available after proof upload"
      ])}
    </main>
  `;
}

function renderLogisticsTripsScreen() {
  return rolePage("logistics", "Nearby Trips", "Accept available food delivery jobs based on distance, vehicle type, payout, and proof requirements.", "logisticsDashboard", `
    <section class="stack">
      ${state.roleData.logistics.trips.map((item) => roleRecord(`${item.pickup} to ${item.dropoff}`, `${item.vehicle} - ${item.distance}`, item.status, `${money.format(item.payout)} payout`, item.status === "Available" ? "Accept" : "Open", `acceptLogisticsTrip('${item.id}')`)).join("")}
    </section>
  `);
}

function renderLogisticsTripDetailScreen() {
  const item = selectedLogisticsTrip();
  const completedSteps = item.status === "Completed" ? 5 : item.status === "Accepted" ? 2 : 0;
  return rolePage("logistics", "Active Delivery", "Follow pickup, route, OTP, delivery proof, and bank/customer sign-off requirements.", "logisticsTrips", `
    <section class="role-map-card">
      <strong>${item.pickup} to ${item.dropoff}</strong>
      <span>${item.vehicle} - ${item.distance} - ${money.format(item.payout)} payout - ${item.status}</span>
    </section>
    <section class="role-proof-grid">
      ${["Pickup confirmed", "Route started", "Customer OTP", "Delivery photo", "Recipient sign-off"].map((step, index) => `<article class="${index < completedSteps ? "done" : ""}">${step}</article>`).join("")}
    </section>
    <button class="btn primary full" onclick="goToScreen('logisticsProof')">${item.status === "Completed" ? "View proof" : "Upload delivery proof"}</button>
  `);
}

function renderLogisticsProofScreen() {
  return rolePage("logistics", "Delivery Proof", "Submit OTP, live location, delivery photo, recipient confirmation, and incident notes.", "logisticsTripDetail", `
    <section class="role-form-card">
      ${formField("Customer OTP", "Enter 6 digit OTP", "logisticsOtp")}
      ${fileUploadField("Delivery photos", "logisticsPhotos", "Upload multiple photos: item, recipient, doorstep, and proof of condition.")}
      ${formField("Recipient name", "Who received the order?", "logisticsRecipient")}
      ${formField("Delivery notes", "Condition, time, and address confirmation", "logisticsNotes")}
      <button class="btn primary full" onclick="submitDeliveryProof()">Submit proof</button>
    </section>
  `);
}

function renderLogisticsEarningsScreen() {
  const wallet = roleWallet("logistics");
  return rolePage("logistics", "Logistics Earnings", "View auxiliary revenue, deductions, payout, bonuses, and weekly activity.", "logisticsDashboard", `
    <section class="role-wallet-list">
      ${[
        ["Completed trips", "Delivery payouts earned", wallet.pending],
        ["Weekly deductions", "Vehicle, insurance, and service cycle", -24500],
        ["Available payout", "Ready after proof review", wallet.balance]
      ].map(walletRoleRow).join("")}
    </section>
    ${rolePanel("Logistics wallet ledger", wallet.ledger.slice(0, 6).map((item) => `${item.title} - ${item.meta} - ${money.format(item.amount)}`))}
    ${rolePanel("Revenue notes", state.roleData.logistics.activities.slice(0, 5))}
  `);
}

function renderLogisticsVehicleScreen() {
  return rolePage("logistics", "Vehicle Profile", "Register the vehicle you use for food delivery and match with suitable jobs.", "logisticsDashboard", `
    <section class="role-form-card">
      ${formField("Vehicle type", "Bike, car, van, truck, trailer", "logisticsVehicleType", state.roleData.logistics.vehicle.type)}
      ${formField("Plate number", "ABC-123XY", "logisticsVehiclePlate", state.roleData.logistics.vehicle.plate)}
      ${formField("Capacity", "Small box, cartons, pallets, truck load", "logisticsVehicleCapacity", state.roleData.logistics.vehicle.capacity)}
      ${formField("Documents", "License, insurance, vehicle photo", "logisticsVehicleDocs", state.roleData.logistics.vehicle.docs)}
      <button class="btn primary full" onclick="saveLogisticsVehicle()">Save vehicle</button>
    </section>
  `);
}

function renderLogisticsAvailabilityScreen() {
  return rolePage("logistics", "Availability", "Turn on duty mode, set operating districts, and control trip radius.", "logisticsDashboard", `
    <section class="role-form-card">
      ${toggleRow("Available for nearby trips", "nearbyTrips")}
      ${toggleRow("Accept truck/bulk jobs", "bulkJobs")}
      ${formField("Delivery radius", "1-5km", "logisticsRadius", state.roleData.logistics.availability.radius)}
      ${formField("Preferred districts", "Yaba, Lekki, Ikeja", "logisticsDistricts", state.roleData.logistics.availability.districts)}
      <button class="btn primary full" onclick="updateLogisticsAvailability()">Update availability</button>
    </section>
  `);
}

function renderCorporateDashboardScreen() {
  if (!hasRole("corporate")) return roleLockedScreen("Corporate", "Create staff food programs, fund wallets, assign delivery addresses, and monitor payroll/paycycle deductions.");
  const corporate = state.roleData.corporate;
  const wallet = roleWallet("corporate");
  return `
    <main class="mobile-frame role-dashboard">
      ${screenHeader("Corporate Dashboard", "Staff packs, payroll deductions, wallet funding, delivery addresses, and sign-off.", "profile")}
      <section class="role-metric-grid">
        ${roleMetric("Staff", String(corporate.staff.length), "corporateStaff", "Manage staff")}
        ${roleMetric("Wallet", money.format(wallet.balance), "corporateWallet", "Fund wallet")}
        ${roleMetric("Active orders", String(corporate.orders.length), "corporateOrders", "Track orders")}
        ${roleMetric("Paycycle", corporate.paycycle, "corporateWallet", "Approve payroll")}
      </section>
      ${roleCapabilityChecklist("As a corporate account you can", [
        "Create staff food baskets and assign one to five delivery addresses per staff user.",
        "Fund corporate wallet, approve payroll deductions, and track bank sign-off.",
        "Monitor bulk orders, delivery movement, invoices, and funding receipts.",
        "Use proximity matching to allocate vendors and logistics partners close to staff locations."
      ])}
      <section class="role-action-grid">
        ${roleAction("Staff food packs", "Create and assign employee basket plans.", "corporateStaff")}
        ${roleAction("Orders", "Track staff bulk orders and delivery movement.", "corporateOrders")}
        ${roleAction("Wallet", "Funding, payroll deductions, invoices, and receipts.", "corporateWallet")}
        ${roleAction("Proximity map", "Match vendors and logistics near staff addresses.", "proximityMap")}
      </section>
      ${rolePanel("Corporate activity", corporate.activities.slice(0, 5))}
    </main>
  `;
}

function renderCorporateStaffScreen() {
  return rolePage("corporate", "Staff Food Packs", "Create staff baskets, upload staff list, and assign delivery addresses.", "corporateDashboard", `
    <section class="stack">
      ${state.roleData.corporate.staff.map((item) => roleRecord(item.name, item.address, item.plan, `${money.format(item.budget)} monthly budget`, "Assign", `assignCorporatePack('${item.id}')`)).join("")}
    </section>
    <section class="role-form-card">
      ${formField("Staff name", "Amaka Yusuf", "corporateStaffName")}
      ${formField("Staff delivery address", "Lekki Phase 1, Lagos", "corporateStaffAddress")}
      ${formField("Monthly food budget", "180000", "corporateStaffBudget")}
      <button class="btn primary full" onclick="addCorporateStaffPack()">Create staff pack</button>
    </section>
  `);
}

function renderCorporateOrdersScreen() {
  return rolePage("corporate", "Corporate Orders", "Monitor staff distribution, logistics assignment, payroll sign-off, and delivery proof.", "corporateDashboard", `
    <section class="stack">
      ${state.roleData.corporate.orders.map((item) => roleRecord(item.id, item.title, item.status, `${money.format(item.amount)} - ${item.delivery}`, "Move", `moveCorporateOrder('${item.id}')`)).join("")}
    </section>
  `);
}

function renderCorporateWalletScreen() {
  const wallet = roleWallet("corporate");
  return rolePage("corporate", "Corporate Wallet", "Fund staff packs, approve payroll deductions, and download invoices or receipts.", "corporateDashboard", `
    <section class="role-wallet-list">
      ${[
        ["Available balance", "Corporate wallet funding", wallet.balance],
        ["Payroll deduction", state.roleData.corporate.paycycle, -state.roleData.corporate.deduction],
        ["Pending distribution", "Staff food packs awaiting delivery", wallet.pending || 0]
      ].map(walletRoleRow).join("")}
    </section>
    <div class="cart-action-grid">
      <button class="btn primary" onclick="fundCorporateWallet()">Fund wallet</button>
      <button class="btn secondary" onclick="approveCorporatePayroll()">Approve payroll</button>
    </div>
    ${rolePanel("Corporate wallet ledger", wallet.ledger.slice(0, 6).map((item) => `${item.title} - ${item.meta} - ${money.format(item.amount)}`))}
  `);
}

function renderRoleSuccessScreen() {
  const success = state.roleSuccess || {
    title: "Activity completed",
    text: "Your role activity was completed successfully.",
    dashboard: "profile",
    nextScreen: "profile",
    nextLabel: "Continue"
  };
  return `
    <main class="mobile-frame success-screen">
      <div class="success-mark">✓</div>
      <h1>${success.title}</h1>
      <p>${success.text}</p>
      <button class="btn primary full" onclick="goToScreen('${success.nextScreen || success.dashboard}')">${success.nextLabel || "Continue"}</button>
      <button class="btn ghost full" onclick="goToScreen('${success.dashboard}')">Back to dashboard</button>
    </main>
  `;
}

function renderSearchScreen() {
  const chips = Array.from(new Set(["All Food", ...state.foodTags, "Group buy", "Pay 50%", "Festive pack", "Verified vendor"]));
  const matches = state.searchQuery ? allMarketplaceItems().filter((item) => itemMatchesQuery(item, state.searchQuery)).slice(0, 8) : [];
  return `
    <main class="mobile-frame">
      ${screenHeader("Search", "Find products, vendors, packages, and group buys.", "home")}
      <div class="bigcart-search"><input id="searchInput" placeholder="Enter food name to search or create tag" value="${state.searchQuery || ""}" /><button class="filter-toggle" onclick="runSearch()" aria-label="Search"><i></i><i></i><i></i></button></div>
      <div class="filter-action-row"><button class="btn secondary" onclick="createFoodTagFromSearch()">Create food tag</button><button class="btn ghost" onclick="goToScreen('filter')">Filters</button></div>
      ${chipSection("Search History", chips)}
      ${chipSection("Discover more", ["Staff packages", "Lowest price", "Near me", "Fresh produce", "Bulk rice"])}
      ${matches.length ? `<section class="product-grid">${matches.map(productCard).join("")}</section>` : ""}
      <section class="search-actions"><button onclick="runAssistedSearch('image')">${iconSvg("image")}Image Search</button><button onclick="runAssistedSearch('voice')">${iconSvg("mic")}Voice Search</button></section>
    </main>
  `;
}

function renderFilterScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Apply Filters", "Narrow food by price, vendor, plan, and delivery.", "shop")}
      <section class="filter-panel refined-filter-panel">
        <div class="filter-section-heading"><div><span>01</span><h2>Food tags</h2></div><small>Choose one</small></div>
        ${foodTagStrip()}
        <div class="filter-inline-create"><input id="newFoodTagInput" placeholder="Add food tag, e.g. Ofada rice" /><button class="btn secondary" onclick="createFoodTag()">Add tag</button></div>
        <div class="filter-section-heading"><div><span>02</span><h2>Shopping preference</h2></div><small>Choose one</small></div>
        <section class="filter-choice-grid">${["All", "Top Rated", "Pay 50%", "Group Buy", "Near Me", "Lowest Price", "Verified Vendor"].map((filter) => `<button class="${state.selectedFilter === filter ? "active" : ""}" onclick="selectMarketplaceFilter('${filter}')"><i></i>${filter}</button>`).join("")}</section>
        <div class="filter-section-heading"><div><span>03</span><h2>Price range</h2></div><small>Naira</small></div>
        <div class="two-inputs money-inputs"><label><span>Minimum</span><input id="filterMinPrice" inputmode="numeric" placeholder="0" /></label><label><span>Maximum</span><input id="filterMaxPrice" inputmode="numeric" placeholder="500,000" /></label></div>
        <div class="filter-section-heading"><div><span>04</span><h2>Minimum rating</h2></div><small>Verified reviews</small></div>
        <div class="filter-rating-row">${[3,4,5].map((rating) => `<button onclick="selectFilterRating(this, ${rating})">${rating} <span>&#9733;</span> & up</button>`).join("")}</div>
        <div class="filter-section-heading"><div><span>05</span><h2>More options</h2></div><small>Multiple allowed</small></div>
        <div class="filter-option-list">
          ${["Bulk discount", "Free shipping", "Same day delivery", "Pay 50%, get delivery", "Group buy available"].map(checkRow).join("")}
        </div>
      </section>
      <div class="filter-action-row fixed-bottom"><button class="btn ghost" onclick="clearFoodFilter()">Reset</button><button class="btn primary" onclick="applyFoodFilter()">Apply filter</button></div>
    </main>
  `;
}

function marketplaceFilterStrip() {
  return `<div class="scroll-chip-shell marketplace-chip-shell"><button class="chip-scroll-arrow previous" onclick="scrollChipRow(this, -1)" aria-label="Scroll filters left">&lsaquo;</button><section class="filter-bar scroll-chip-row">${["All", "Top Rated", "Pay 50%", "Group Buy", "Near Me", "Lowest Price", "Verified Vendor"].map((filter) => `<button class="${state.selectedFilter === filter ? "active" : ""}" onclick="selectMarketplaceFilter('${filter}')">${filter}</button>`).join("")}</section><button class="chip-scroll-arrow next" onclick="scrollChipRow(this, 1)" aria-label="Scroll filters right">&rsaquo;</button></div>`;
}

function renderLiveLocationScreen() {
  const location = state.liveLocation || { status: "Off", area: state.onboarding.city || "Lagos", radius: "1-5km", lat: "6.5244", lng: "3.3792" };
  return `
    <main class="mobile-frame">
      ${screenHeader("Live Location", "Use proximity matching for nearby food, vendors, financiers, and delivery partners.", "profile")}
      <section class="location-hero ${location.status === "Live" ? "glow" : ""}">
        <div class="map-grid">
          ${proximityDots().map((item) => `<button class="${item.type}" onclick="selectSearchChip('${item.label}')"><span>${item.short}</span><b>${item.distance}</b></button>`).join("")}
        </div>
        <h2>${location.status === "Live" ? "Live proximity is on" : "Location matching is off"}</h2>
        <p>${location.area} - ${location.radius} matching radius - ${location.lat}, ${location.lng}</p>
      </section>
      <section class="role-form-card">
        ${formField("Current area", "Lagos", "locationArea", location.area)}
        ${formField("Matching radius", "1-5km", "locationRadius", location.radius)}
        <button class="btn primary full" onclick="enableLiveLocation()">Enable live location</button>
        <button class="btn ghost full" onclick="goToScreen('proximityMap')">Open real live map</button>
      </section>
    </main>
  `;
}

function renderProximityMapScreen() {
  const nearby = proximityDots();
  return `
    <main class="mobile-frame">
      ${screenHeader("Proximity Map", "Match close food, vendors, logistics, and financiers around you.", "liveLocation")}
      <section class="location-hero glow tall">
        <div class="map-grid large">
          ${nearby.map((item) => `<button class="${item.type}" onclick="${item.action}"><span>${item.short}</span><b>${item.distance}</b></button>`).join("")}
        </div>
      </section>
      <section class="stack">
        ${nearby.map((item) => roleRecord(item.label, `${item.distance} from you`, item.kind, item.note, "Open", item.action)).join("")}
      </section>
    </main>
  `;
}

function renderBiometricScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Biometric Login", "Activate fingerprint or face login for secure wallet and checkout actions.", "settings")}
      <section class="biometric-card ${state.biometricEnabled ? "glow" : ""}">
        <div class="fingerprint-mark"></div>
        <h1>${state.biometricEnabled ? "Biometric is active" : "Secure quick access"}</h1>
        <p>${state.biometricEnabled ? "Wallet, checkout, and role dashboard actions can request biometric confirmation." : "Turn this on to protect wallet payments, transfers, withdrawals, and role dashboards."}</p>
        <button class="btn primary full" onclick="activateBiometric()">${state.biometricEnabled ? "Re-check biometric" : "Activate biometric"}</button>
      </section>
    </main>
  `;
}

function renderReferralScreen() {
  const user = normalizeUser(state.user);
  return `
    <main class="mobile-frame">
      ${screenHeader("Referral", "Invite users and earn QML wallet rewards.", "profile")}
      <section class="referral-card glow">
        <span>Your referral code</span>
        <h1>${user.referralCode}</h1>
        <p>Share this code with customers, vendors, financiers, logistics partners, or corporate buyers.</p>
        <button class="btn primary full" onclick="copyReferralCode()">Copy code</button>
      </section>
      <section class="role-action-grid">
        ${roleAction("Rewards", "View earned, pending, and redeemable bonuses.", "rewards")}
        ${roleAction("Invite customer", "Share customer onboarding link.", "")}
        ${roleAction("Invite vendor", "Share merchant onboarding link.", "")}
        ${roleAction("Invite logistics", "Share delivery partner onboarding link.", "")}
      </section>
    </main>
  `;
}

function renderRewardsScreen() {
  const total = state.referralRewards.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return `
    <main class="mobile-frame">
      ${screenHeader("Loyalty Rewards", "Earn more by paying early, staying consistent, and referring trusted users.", "referrals")}
      <section class="loyalty-hero glow">
        <div><span>Gold member</span><strong>${state.loyaltyPoints.toLocaleString()} pts</strong><p>160 points to Platinum</p></div>
        <div class="loyalty-ring" style="--progress:89"><b>89%</b><span>level</span></div>
      </section>
      <section class="loyalty-shortcuts">
        <button onclick="goToScreen('leaderboard')"><b>#12</b><span>Leaderboard</span></button>
        <button onclick="goToScreen('plans')"><b>5%</b><span>Early payer deal</span></button>
        <button onclick="goToScreen('wallet')"><b>${money.format(total)}</b><span>Cash rewards</span></button>
      </section>
      <div class="bigcart-section-title"><h2>Available opportunities</h2><span>Updated today</span></div>
      <section class="reward-opportunity-grid">
        ${rewardOpportunity("Early bird saver", "Pay 3 days before your due date", "+250 pts", "Pay early", "goToScreen('plans')", "early")}
        ${rewardOpportunity("Diligent payer streak", "Complete 4 contributions on time", "+500 pts", "View progress", "showToast('3 of 4 payments completed')", "streak")}
        ${rewardOpportunity("Outright purchase", "Pay once and save 5% instantly", "5% off", "Shop offer", "goToScreen('shop')", "discount")}
        ${rewardOpportunity("Verified referral", "Invite a friend who completes KYC", "+1,000 pts", "Invite", "goToScreen('referrals')", "referral")}
      </section>
      <div class="bigcart-section-title"><h2>Reward activity</h2></div>
      <section class="stack">
        ${state.referralRewards.map((item) => roleRecord(item.title, item.meta, item.status, `${money.format(item.amount)} reward`, item.status === "Earned" ? "Redeem" : "Track", item.status === "Earned" ? "redeemRewards()" : "showToast('Reward is still pending')")).join("")}
      </section>
      <button class="btn primary full" onclick="redeemRewards()">Redeem cash rewards to wallet</button>
    </main>
  `;
}

function rewardOpportunity(title, text, reward, action, handler, tone) {
  return `<article class="reward-opportunity ${tone}" role="button" tabindex="0" onclick="${handler}" onkeydown="if(event.key === 'Enter'){${handler}}"><span>${reward}</span><h3>${title}</h3><p>${text}</p><button onclick="event.stopPropagation();${handler}">${action} &rsaquo;</button></article>`;
}

function renderLeaderboardScreen() {
  const leaders = [
    [1, "Chioma O.", "Platinum", 6820], [2, "Tunde K.", "Platinum", 6410], [3, "Amina B.", "Platinum", 5980],
    [4, "Kelechi N.", "Gold", 4730], [5, "Ifeanyi A.", "Gold", 4210], [12, "Ada Okafor", "Gold", state.loyaltyPoints]
  ];
  return `
    <main class="mobile-frame">
      ${screenHeader("Leaderboard", "Top diligent payers this month. Rankings use verified, on-time QML wallet activity.", "rewards")}
      <section class="leader-podium">
        ${leaders.slice(0, 3).map(([rank, name, level, points], index) => `<article class="place-${rank}"><span>#${rank}</span><div>${name.split(" ").map((word) => word[0]).join("")}</div><strong>${name}</strong><p>${points.toLocaleString()} pts</p></article>`).join("")}
      </section>
      <section class="leader-list">
        ${leaders.slice(3).map(([rank, name, level, points]) => `<article class="${rank === 12 ? "current-user" : ""}"><b>#${rank}</b><div><strong>${name}</strong><span>${level} member</span></div><em>${points.toLocaleString()} pts</em></article>`).join("")}
      </section>
      <section class="leader-tip"><strong>Move up this week</strong><p>Pay your next contribution early to earn 250 points and protect your diligent payer streak.</p><button class="btn primary full" onclick="goToScreen('plans')">View next payment</button></section>
    </main>
  `;
}

function renderGroupBuysScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Group Buys", "Create a private buying circle, invite people, and split the product price.", "shop")}
      <section class="group-buy-intro">
        <div class="group-avatar-stack"><span>A</span><span>C</span><span>T</span><span>+</span></div>
        <h2>Better bulk prices, shared fairly</h2>
        <p>The organizer chooses the food. Each member pays their own share through the QML wallet. Delivery begins after the group is fully funded.</p>
        <button class="btn primary full" onclick="goToScreen('createGroup')">Create a buying group</button>
      </section>
      <div class="bigcart-section-title"><h2>Your groups</h2><span>${state.groupBuys.length} active</span></div>
      <section class="group-list">${state.groupBuys.map(groupBuyCard).join("") || emptyState("No group buys yet", "Create a group and invite people to split a bulk purchase.")}</section>
      <section class="wallet-safety-note"><strong>Protected group payments</strong><p>Every member pays QML directly. Never send money to an organizer or vendor outside the app.</p></section>
    </main>`;
}

function groupBuyCard(group) {
  const paid = group.members.reduce((sum, member) => sum + Number(member.paid || 0), 0);
  const percent = Math.min(100, Math.round((paid / Number(group.total || 1)) * 100));
  return `<article class="group-buy-card" role="button" tabindex="0" onclick="openGroupBuy('${group.id}')"><div class="split"><span class="pill good">${percent === 100 ? "Ready" : "Collecting"}</span><em>${group.members.length}/${group.memberLimit} members</em></div><h3>${group.name}</h3><p>${group.itemTitle}</p><div class="group-progress"><i style="width:${percent}%"></i></div><div class="split"><strong>${money.format(paid)} paid</strong><span>${percent}% funded</span></div><button>Open group &rsaquo;</button></article>`;
}

function renderCreateGroupScreen() {
  const items = allMarketplaceItems().slice(0, 20);
  const chosen = items.find((item) => item.id === state.selectedPackageId) || items[0] || {};
  return `
    <main class="mobile-frame">
      ${screenHeader("Create Group", "Choose a food package and how many people will share the bill.", "groupBuys")}
      <section class="role-form-card group-create-form">
        ${formField("Group name", "Family monthly food circle", "groupName")}
        <label><span>Food product or package</span><select id="groupItem" onchange="previewGroupSplit()">${items.map((item) => `<option value="${item.id}" ${item.id === chosen.id ? "selected" : ""}>${item.title} - ${money.format(Number(item.price))}</option>`).join("")}</select></label>
        <label><span>Number of people</span><select id="groupSize" onchange="previewGroupSplit()">${[2,3,4,5,6,8,10].map((count) => `<option value="${count}" ${count === 4 ? "selected" : ""}>${count} people</option>`).join("")}</select></label>
        <section id="groupSplitPreview" class="split-preview">${groupSplitPreview(chosen, 4)}</section>
        <label class="group-agreement"><input id="groupAgreement" type="checkbox" checked /><span>I understand every member must pay their share inside QML before checkout.</span></label>
        <button class="btn primary full" onclick="createGroupBuy()">Create group and invite members</button>
      </section>
    </main>`;
}

function groupSplitPreview(item, count) {
  const total = Number(item?.price || 0);
  return `<div><span>Total price</span><strong>${money.format(total)}</strong></div><div><span>Equal share per person</span><strong>${money.format(Math.ceil(total / Math.max(1, count)))}</strong></div><p>Shares update automatically when the group size changes.</p>`;
}

function selectedGroupBuy() {
  return state.groupBuys.find((group) => group.id === state.selectedGroupId) || state.groupBuys[0];
}

function renderGroupDetailScreen() {
  const group = selectedGroupBuy();
  if (!group) return `<main class="mobile-frame">${screenHeader("Group Buy", "Group not found.", "groupBuys")}${emptyState("Group unavailable", "Return to your groups and create a new buying circle.")}</main>`;
  const share = Math.ceil(group.total / group.memberLimit);
  const paid = group.members.reduce((sum, member) => sum + Number(member.paid || 0), 0);
  const percent = Math.min(100, Math.round((paid / group.total) * 100));
  return `
    <main class="mobile-frame">
      ${screenHeader(group.name, `${group.members.length} of ${group.memberLimit} members joined`, "groupBuys")}
      <section class="group-detail-hero"><span>${percent === 100 ? "Fully funded" : "Collecting contributions"}</span><h2>${group.itemTitle}</h2><div class="group-progress"><i style="width:${percent}%"></i></div><div class="group-totals"><div><small>Group total</small><strong>${money.format(group.total)}</strong></div><div><small>Each person</small><strong>${money.format(share)}</strong></div><div><small>Remaining</small><strong>${money.format(Math.max(0, group.total - paid))}</strong></div></div></section>
      <div class="group-action-row"><button onclick="goToScreen('groupInvite')"><b>+</b><span>Invite</span></button><button onclick="copyGroupLink()"><b>&#8599;</b><span>Share link</span></button><button onclick="payGroupShare()"><b>&#8358;</b><span>Pay share</span></button></div>
      <div class="bigcart-section-title"><h2>Members</h2><span>${group.members.filter((member) => member.status === "Paid").length} paid</span></div>
      <section class="group-member-list">${group.members.map((member, index) => `<article><div>${member.name.split(" ").map((word) => word[0]).join("").slice(0,2)}</div><section><strong>${member.name}${member.isOrganizer ? " (Organizer)" : ""}</strong><span>${member.status === "Paid" ? `${money.format(member.paid)} paid` : "Waiting for payment"}</span></section><em class="${member.status.toLowerCase()}">${member.status}</em>${member.status !== "Paid" ? `<button onclick="event.stopPropagation();markGroupMemberPaid(${index})">Demo pay</button>` : ""}</article>`).join("")}</section>
      <button class="btn primary full" ${percent < 100 ? "disabled" : ""} onclick="completeGroupCheckout()">${percent < 100 ? `Waiting for ${money.format(group.total - paid)}` : "Continue to checkout"}</button>
    </main>`;
}

function renderGroupInviteScreen() {
  const group = selectedGroupBuy();
  return `
    <main class="mobile-frame">
      ${screenHeader("Invite Members", `Add people to ${group?.name || "your buying group"}.`, "groupDetail")}
      <section class="role-form-card">
        ${formField("Name", "Friend or family member", "groupInviteName")}
        ${formField("Phone or email", "+234... or email@example.com", "groupInviteContact")}
        <button class="btn primary full" onclick="inviteGroupMember()">Send secure invitation</button>
        <button class="btn ghost full" onclick="copyGroupLink()">Copy private group link</button>
      </section>
      <section class="wallet-safety-note"><strong>Private invitation</strong><p>Only invited members can view this group. Payment is collected individually through each member's QML wallet.</p></section>
    </main>`;
}

function renderSupportScreen() {
  const tickets = [
    ["Delivery support", "Ask about rider, address, OTP, or proof", "supportDelivery"],
    ["Wallet/payment help", "Deposits, transfers, receipts, failed card payments", "supportWallet"],
    ["Vendor chat issue", "Private delivery chat, product questions, merchant response", "supportVendor"],
    ["KYC/account help", "BVN/NIN, profile, biometric, credit score, role access", "supportKyc"]
  ];
  return `
    <main class="mobile-frame">
      ${screenHeader("Support", "Encrypted support, toll-free call, ticket tracking, and help center.", "profile")}
      <section class="support-hero-card glow">
        <div><span>QML Support</span><h1>How can we help?</h1><p>Choose a support flow. Wallet payments must stay inside QML for verification and protection.</p></div>
        <button class="btn primary full" onclick="startSupportChat('General support')">Start encrypted chat</button>
        <button class="btn ghost full" onclick="callSupport()">Call toll-free</button>
      </section>
      <section class="role-action-grid">
        ${tickets.map(([title, text, id]) => `<button class="role-action-card" onclick="startSupportChat('${title}')" aria-label="${title}"><strong>${title}</strong><span>${text}</span><b>Open</b></button>`).join("")}
        ${roleAction("Refund process", "Request refund, track review, and receive wallet reversal.", "refundRequest")}
        ${roleAction("Report account", "Report fraud, unsafe behavior, or payment outside app request.", "reportAccount")}
      </section>
      <section class="support-ticket-list">
        ${supportTickets().map((item) => roleRecord(item.title, item.meta, item.status, item.note, "View", `startSupportChat('${item.title}')`)).join("")}
      </section>
    </main>
  `;
}

function renderCreditScoreScreen() {
  const user = normalizeUser(state.user);
  const score = creditScoreValue();
  return `
    <main class="mobile-frame">
      ${screenHeader("Credit Score", "Customer rating, verification strength, wallet behavior, and purchase eligibility.", "profile")}
      <section class="credit-score-card glow">
        <span>QML customer score</span>
        <strong>${score}</strong>
        <p>${score >= 720 ? "Excellent" : score >= 650 ? "Good" : "Building"} credit behavior - ${money.format(user.creditLimit || 500000)} estimated purchase limit</p>
      </section>
      <section class="credit-factor-grid">
        ${creditFactor("Identity", state.profileDetails?.nin && state.profileDetails?.bvn ? "Verified" : "Needs BVN/NIN", state.profileDetails?.nin && state.profileDetails?.bvn ? 92 : 48, "aboutMe")}
        ${creditFactor("Wallet", state.userWallet.ledger.length > 3 ? "Active history" : "Add transactions", Math.min(95, 55 + state.userWallet.ledger.length * 8), "wallet")}
        ${creditFactor("Orders", `${state.orderHistory.length} activities`, Math.min(94, 50 + state.orderHistory.length * 7), "orders")}
        ${creditFactor("Delivery address", `${state.addresses.length} saved`, Math.min(90, 45 + state.addresses.length * 12), "addresses")}
      </section>
      ${roleCapabilityChecklist("How to improve your score", [
        "Complete BVN/NIN, government ID, next of kin, work history, and education in About Me.",
        "Keep payments inside the QML wallet and complete active food plans on time.",
        "Use verified delivery addresses and confirm OTP/photo proof at delivery.",
        "Review vendors after orders and keep wallet/card or bank account active."
      ])}
    </main>
  `;
}

function renderCategoryScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Categories", "Choose the food group you want to browse.", "home")}
      <section class="category-screen-grid">
        ${categories.map((category, index) => `
          <button class="category-tile" onclick="selectCategory('${category}')">
            <span class="bubble-${index % 6} category-mark mark-${index % 6}" aria-hidden="true"></span>
            <strong>${category}</strong>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderProductsScreen() {
  const allProducts = allMarketplaceItems();
  const category = state.selectedCategory || "Fresh Produce";
  const filtered = allProducts.filter((item) => item.category === category);
  const products = filtered.length ? filtered : allProducts;
  return `
    <main class="mobile-frame">
      ${screenHeader(category, "Fresh picks, bulk bundles, and QML packages.", "category")}
      <section class="product-count-row">
        <span>${products.length} items</span>
        <button class="filter-toggle" onclick="goToScreen('filter')" aria-label="Filter"><i></i><i></i><i></i></button>
      </section>
      <section class="category-strip">${categories.map((item) => `<button class="${item === category ? "active" : ""}" onclick="selectCategory('${item}')">${item}</button>`).join("")}</section>
      <section class="product-grid">${products.map(productCard).join("")}</section>
    </main>
  `;
}

function renderProductReviewScreen() {
  const item = selectedMarketplaceItem();
  const similar = allMarketplaceItems().filter((entry) => entry.id !== item.id && (entry.category === item.category || entry.tag === item.tag)).slice(0, 4);
  const packages = allPackageProducts().slice(0, 5);
  const promos = allMarketplaceItems().filter((entry) => /discount|eligible|group|promo|festive/i.test(`${entry.tag} ${entry.category} ${entry.title}`)).slice(0, 4);
  const chatMessages = vendorChatMessages(item.vendor);
  return `
    <main class="mobile-frame product-review-frame">
      ${screenHeader("Product Reviews", "Details, comments, ratings, plans, packages, and offers.", "products")}
      <section class="review-product-hero">
        ${imageGallery(item, "Product photos")}
        <div>
          <span class="pill good">${item.tag || item.category}</span>
          <h1>${item.title}</h1>
          <p>${item.vendor} - ${item.location}</p>
          <strong>${money.format(Number(item.price))}<small> / ${item.unit}</small></strong>
        </div>
      </section>
      <section class="vendor-writeup-card"><span>Vendor product information</span><p>${item.vendorInfo || item.writeup || `${item.title} is supplied by ${item.vendor}. Review product photos, pricing, unit size, delivery terms, and verified vendor status before adding to cart.`}</p></section>

      <section class="preview-action-panel">
        <button class="btn primary full" onclick="addProductToCart('${item.id}')"><span class="bag-icon" aria-hidden="true"></span>Add to cart</button>
        <button class="btn secondary full" onclick="addProductAndCheckout('${item.id}')">Continue checkout</button>
        <button class="btn ghost full" onclick="startGroupForItem('${item.id}')">Create group & split price</button>
        <button class="btn ghost full" onclick="goToScreen('shop')">Add more products</button>
        <button class="btn ghost full" onclick="startVendorChat('${item.vendor}')">Chat vendor about delivery</button>
      </section>

      <section class="security-warning">
        <strong>Security warning</strong>
        <p>Only discuss delivery with the vendor or merchant. Do not send money outside the QML app wallet. Payments outside wallet verification are unsafe and not protected.</p>
      </section>

      <section class="vendor-chat-panel">
        <div class="split"><h2>Private delivery chat with ${item.vendor}</h2><span class="pill good">Encrypted</span></div>
        <p class="private-chat-note">This chat is strictly between you and the vendor/merchant. It is not public, not a product comment, and should only be used for delivery discussion.</p>
        <div class="chat-preview">
          ${chatMessages.map((message) => `<p class="${message.from === "You" ? "mine" : ""}"><strong>${message.from}:</strong> ${message.text}</p>`).join("")}
        </div>
        <div class="chat-input-row">
          <input id="vendorChatInput" placeholder="Private delivery message only" />
          <button onclick="sendVendorChat('${item.vendor}')">Send</button>
        </div>
      </section>

      <section class="review-stats-grid">
        <div><strong>4.8</strong><span>Average rating</span></div>
        <div><strong>128</strong><span>User reviews</span></div>
        <div><strong>96%</strong><span>Like this item</span></div>
      </section>

      <section class="comment-box">
        <h2>Add your review</h2>
        <div class="rating-picker">
          ${[1, 2, 3, 4, 5].map((star) => `<button onclick="setReviewRating(${star})">★</button>`).join("")}
        </div>
        <textarea id="reviewComment" placeholder="Share your comment about quality, price, delivery, or packaging"></textarea>
        <button class="btn primary full" onclick="submitProductReview()">Submit review</button>
      </section>

      <div class="split section-title"><h2>Customer comments</h2><button class="link-btn" onclick="goToScreen('reviews')">Write full review</button></div>
      <section class="stack">${state.userReviews.map((item) => productCommentCard([item.name, item.rating, item.text])).concat(productComments.map(productCommentCard)).join("")}</section>

      ${recommendationSection("Similar products", similar.length ? similar : allMarketplaceItems().slice(0, 4))}
      ${recommendationSection("Plans and packages", packages)}
      ${recommendationSection("Promotional and discounted", promos.length ? promos : allMarketplaceItems().slice(0, 4))}
    </main>
  `;
}

function renderReviewListScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Reviews", "What customers are saying about this product.", "detail")}
      <section class="review-summary-card">
        <strong>4.8</strong>
        <span>★★★★★</span>
        <p>Based on recent QML marketplace orders.</p>
      </section>
      <section class="stack">${state.userReviews.map((item) => reviewCard([item.name, item.rating, item.text])).concat(reviewData.map(reviewCard)).join("")}</section>
      <button class="btn primary full fixed-bottom" onclick="goToScreen('reviews')">Write review</button>
    </main>
  `;
}

function renderFavoritesScreen() {
  const favorites = state.favorites.map((id) => allMarketplaceItems().find((item) => item.id === id)).filter(Boolean);
  return simpleListScreen("Favorites", "Saved food packages and products.", "profile", favorites.length ? favorites.map((item) => cartRow({ ...item, kind: "product" })) : [emptyInline("No favorites yet. Tap the heart on products or packages to save them.")]);
}

function renderOrdersScreen() {
  return simpleListScreen("My Orders", "Completed, active, and delivery eligible food orders.", "profile", state.orderHistory.map((item) => orderRow(item.title, item.meta, item.status)));
}

function renderAddressesScreen() {
  return simpleListScreen("My Address", "Where QML logistics can deliver your orders.", "profile", [
    ...state.addresses.map((item) => orderRow(item.label, item.address, item.status)),
    `<button class="btn primary full" onclick="goToScreen('addAddress')">Add address</button>`
  ]);
}

function renderAddAddressScreen() {
  return formScreen("Add Address", "Add a new delivery location.", "addresses", ["Address label", "Street address", "City", "State", "Delivery instructions"], "Save address", "addresses", "address");
}

function renderCardsScreen() {
  return simpleListScreen("My Cards", "Cards and bank methods used for installments.", "profile", [
    ...state.cards.map((item) => orderRow(item.label, item.meta, item.status)),
    `<button class="btn primary full" onclick="goToScreen('addCard')">Add card</button>`
  ]);
}

function renderAddCardScreen() {
  return formScreen("Add Card", "Securely add a card for plans and repayments.", "cards", ["Name on the card", "Card number", "Month / Year", "CVV"], "Save card", "cards", "card");
}

function renderWalletScreen() {
  const roleWallets = activeRoleWalletCards();
  const history = combinedWalletHistory();
  return `
    <main class="mobile-frame">
      ${screenHeader("Wallet", "Personal wallet and role wallets for one account.", "profile")}
      <section class="wallet-hero-card">
        <div class="wallet-card-top"><span>Personal QML wallet</span><b>Secure</b></div>
        <div class="wallet-balance-line"><strong>${balanceText(state.userWallet.balance)}</strong>${balanceEyeButton("wallet balance")}</div>
        <p>Deposit, transfer, save toward baskets, pay for orders, and fund role wallets from one account.</p>
      </section>
      <section class="wallet-quick-grid">
        ${walletQuickAction("Deposit", "deposit", "goToScreen('deposit')")}
        ${walletQuickAction("Transfer", "transfer", "goToScreen('transfer')")}
        ${walletQuickAction("Add card", "card", "goToScreen('addCard')")}
        ${walletQuickAction("Auto debit", "auto", "goToScreen('autoDebit')")}
        ${walletQuickAction("History", "history", "goToScreen('transactions')")}
      </section>
      <section class="role-wallet-list">
        ${roleWallets.length ? roleWallets.join("") : emptyInline("Add vendor, financier, or logistics role to create dedicated role wallets.")}
      </section>
      <div class="split section-title"><h2>Transaction history</h2><button class="link-btn" onclick="goToScreen('transactions')">View all</button></div>
      <section class="wallet-history-list">
        ${history.slice(0, 10).map(walletHistoryRow).join("")}
      </section>
    </main>
  `;
}

function renderDepositScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Deposit", "Fund your QML wallet from card, bank transfer, USSD, or external account.", "wallet")}
      <section class="wallet-flow-card">
        ${formField("Amount", "100000", "depositAmount")}
        <label><span>Funding source</span><select id="depositSource"><option>Saved card</option><option>Bank transfer</option><option>USSD</option><option>External bank account</option></select></label>
        <div class="role-warning">Deposits go into your personal QML wallet. You can then transfer to vendor, financier, or logistics role wallets.</div>
        <button class="btn primary full" onclick="completeDeposit()">Deposit now</button>
      </section>
    </main>
  `;
}

function renderTransferScreen() {
  const roles = ["vendor", "financier", "logistics", "corporate"].filter(hasRole);
  return `
    <main class="mobile-frame">
      ${screenHeader("Transfer", "Move money between your personal wallet and role wallets.", "wallet")}
      <section class="wallet-flow-card">
        ${formField("Amount", "50000", "transferAmount")}
        <label><span>Destination wallet</span><select id="transferRole">${roles.length ? roles.map((role) => `<option value="${role}">${roleLabel(role)} wallet</option>`).join("") : "<option value=''>Add a role first</option>"}</select></label>
        <button class="btn primary full" onclick="completeTransfer()">Transfer now</button>
      </section>
    </main>
  `;
}

function renderAutoDebitScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Auto Debit", "Authorize automatic deductions from an external account for food plans.", "wallet")}
      <section class="wallet-flow-card">
        ${formField("External bank", "GTBank, Access, Zenith...", "autoDebitBank")}
        ${formField("Account number", "0123456789", "autoDebitAccount")}
        ${formField("Debit amount", "25000", "autoDebitAmount")}
        <label><span>Frequency</span><select id="autoDebitFrequency"><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>Daily</option></select></label>
        <div class="role-warning">QML never asks for bank login details. This creates an authorization record only.</div>
        <button class="btn primary full" onclick="activateAutoDebit()">Activate auto debit</button>
      </section>
    </main>
  `;
}

function renderReceiptScreen() {
  return renderDocumentScreen("Receipt", "Proof of completed wallet/payment activity.");
}

function renderInvoiceScreen() {
  return renderDocumentScreen("Invoice", "Payable or fundable wallet/activity invoice.");
}

function renderTransactionsScreen() {
  return simpleListScreen("Transactions", "Every deposit, transfer, card payment, order payment, plan contribution, and role-wallet movement.", "wallet", combinedWalletHistory().map(walletHistoryRow));
}

function renderNotificationsScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Updates", "Products, comments, messages, delivery, orders, payments, and profit.", "profile")}
      <section class="updates-summary-grid">
        ${updateStat("Products", "3 new")}
        ${updateStat("Messages", "2 private")}
        ${updateStat("Payments", money.format(75000))}
        ${updateStat("Profit", money.format(18500))}
      </section>
      <section class="updates-filter-row">
        ${["All", "Products", "Comments", "Messages", "Delivery", "Orders", "Payments", "Profit"].map((item) => `<button class="${state.selectedUpdateFilter === item ? "active" : ""}" onclick="selectUpdateFilter('${item}')">${item}</button>`).join("")}
      </section>
      <section class="updates-feed">
        ${filteredUpdates().map(updateCard).join("")}
      </section>
    </main>
  `;
}

function renderShippingMethodScreen() {
  return simpleListScreen("Shipping Method", "Choose the best delivery option for this order.", "checkout", [
    orderRow("Bike delivery", "Small product baskets", money.format(2500)),
    orderRow("Van delivery", "Bulk family packages", money.format(8500)),
    orderRow("Truck delivery", "Corporate or vendor bulk orders", money.format(18000))
  ]);
}

function renderShippingInfoScreen() {
  return formScreen("Shipping Information", "Confirm contact and delivery details.", "checkout", ["Receiver name", "Phone number", "Delivery address", "Nearest landmark"], "Continue", "shippingMethod");
}

function renderOrderSuccessScreen() {
  return `
    <main class="mobile-frame success-screen">
      <div class="success-mark">✓</div>
      <h1>Order confirmed</h1>
      <p>Your QML food plan has been created. You will be delivery eligible once your required contribution is reached.</p>
      <button class="btn primary full" onclick="goToScreen('trackOrder')">Track order</button>
      <button class="btn ghost full" onclick="goToScreen('refundRequest')">Request refund</button>
      <button class="btn ghost full" onclick="goToScreen('home')">Back home</button>
    </main>
  `;
}

function renderErrorStateScreen() {
  return `
    <main class="mobile-frame state-screen error-state">
      <div class="state-mark">!</div>
      <h1>Something needs attention</h1>
      <p>Your request could not be completed. No wallet debit will be finalized until the issue is resolved.</p>
      <button class="btn primary full" onclick="goToScreen('support')">Contact support</button>
      <button class="btn ghost full" onclick="goToScreen('home')">Back home</button>
    </main>
  `;
}

function renderCancelOrderScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Cancel Order", "Cancel eligible orders before dispatch and record the reason.", "orders")}
      <section class="role-form-card">
        <label><span>Order</span><select id="cancelOrderId">${state.orderHistory.map((item) => `<option value="${item.id}">${item.title}</option>`).join("")}</select></label>
        ${textAreaField("Reason", "Tell us why you want to cancel this order.", "cancelReason")}
        <div class="role-warning">Orders already delivered or settled may require a refund review instead of cancellation.</div>
        <button class="btn danger full" onclick="submitCancelOrder()">Cancel order</button>
      </section>
    </main>
  `;
}

function renderRefundRequestScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Refund Request", "Submit a refund claim for failed, cancelled, or unresolved activities.", "orders")}
      <section class="role-form-card">
        <label><span>Related activity</span><select id="refundOrderId">${state.orderHistory.map((item) => `<option value="${item.id}">${item.title}</option>`).join("")}</select></label>
        ${formField("Refund amount", "25000", "refundAmount")}
        <label><span>Reason</span><select id="refundReason"><option>Order cancelled before dispatch</option><option>Product unavailable</option><option>Wrong item delivered</option><option>Payment duplicate</option><option>Delivery failed</option></select></label>
        ${textAreaField("More details", "Describe what happened and attach evidence through support if needed.", "refundDetails")}
        <button class="btn primary full" onclick="submitRefundRequest()">Submit refund request</button>
      </section>
    </main>
  `;
}

function renderReportAccountScreen() {
  return `
    <main class="mobile-frame">
      ${screenHeader("Report Account", "Report suspicious user, vendor, financier, logistics, or corporate activity.", "support")}
      <section class="role-form-card">
        ${formField("Account or business name", "Vendor, merchant, rider, financier, user...", "reportName")}
        <label><span>Report type</span><select id="reportType"><option>Payment outside app request</option><option>Fraud or impersonation</option><option>Unsafe delivery behavior</option><option>Wrong product or misleading listing</option><option>Harassment or abusive chat</option></select></label>
        ${textAreaField("What happened?", "Provide details, order ID, chat context, or delivery proof.", "reportDetails")}
        <button class="btn danger full" onclick="submitAccountReport()">Submit report</button>
      </section>
    </main>
  `;
}

function renderTrackOrderScreen() {
  return simpleListScreen("Track Order", "Follow pickup, dispatch, and delivery proof.", "orders", [
    orderRow("Order confirmed", "Plan and delivery request created", "Done"),
    orderRow("Vendor preparing", "Adebayo Farms & Foods", "Now"),
    orderRow("Logistics assigned", "Van delivery pending pickup", "Next"),
    orderRow("Delivered", "OTP or photo proof required", "Pending"),
    `<div class="cart-action-grid"><button class="btn ghost" onclick="goToScreen('cancelOrder')">Cancel order</button><button class="btn secondary" onclick="goToScreen('refundRequest')">Refund process</button></div>`
  ]);
}

function renderAboutMeScreen() {
  const user = normalizeUser(state.user);
  const details = state.profileDetails || {};
  return `
    <main class="mobile-frame">
      ${screenHeader("About Me", "Complete personal details, identity, work, and next-of-kin information for KYC.", "profile")}
      <section class="role-form-card profile-kyc-card">
        <h2>Personal information</h2>
        ${formField("Full name", "Ada Okonkwo", "profileFullName", details.fullName || user.name)}
        ${formField("Email", "ada@example.com", "profileEmail", details.email || "")}
        ${formField("Phone number", "+234...", "profilePhone", details.phone || state.onboarding.contact)}
        <label><span>Gender / Sex</span><select id="profileGender">${optionSet(["Female", "Male", "Prefer not to say"], details.gender)}</select></label>
        <label><span>Marital status</span><select id="profileMaritalStatus">${optionSet(["Single", "Married", "Divorced", "Widowed", "Prefer not to say"], details.maritalStatus)}</select></label>
        ${formField("Religion", "Optional", "profileReligion", details.religion || "")}
        ${formField("Education", "Highest education level", "profileEducation", details.education || "")}
        <h2>Identity verification</h2>
        ${formField("NIN", "11 digit National Identification Number", "profileNin", details.nin || "")}
        ${formField("BVN", "11 digit Bank Verification Number", "profileBvn", details.bvn || "")}
        ${formField("Government ID type", "National ID, passport, voter card, driver's license", "profileIdType", details.idType || "")}
        ${fileUploadField("ID document / selfie proof", "profileIdPhotos", "Upload clear ID, selfie, or supporting verification image.")}
        <h2>Work and income</h2>
        ${formField("Occupation", "Trader, staff, business owner...", "profileOccupation", details.occupation || "")}
        ${formField("Employer / business name", "Company or business", "profileEmployer", details.employer || "")}
        ${formField("Work history", "Current role and previous work summary", "profileWorkHistory", details.workHistory || "")}
        ${formField("Monthly income range", "e.g. ₦150k - ₦500k", "profileIncome", details.income || "")}
        <h2>Next of kin</h2>
        ${formField("Next of kin name", "Full name", "profileNextOfKin", details.nextOfKin || "")}
        ${formField("Relationship", "Spouse, parent, sibling, friend", "profileNextRelation", details.nextRelation || "")}
        ${formField("Next of kin phone", "+234...", "profileNextPhone", details.nextPhone || "")}
        ${formField("Next of kin address", "Address", "profileNextAddress", details.nextAddress || "")}
        <button class="btn primary full" onclick="submitKycProfile()">Save KYC profile</button>
      </section>
    </main>
  `;
}

function renderReviewsScreen() {
  return formScreen("Write Review", "Rate your vendor, package, and delivery.", "orders", ["Rating", "Review title", "Review message"], "Submit review", "orders", "review");
}

function renderOnboarding() {
  const steps = [
    onboardingWelcome,
    onboardingLocation,
    onboardingAccount,
    onboardingVerify,
    onboardingPurpose,
    onboardingSecurity
  ];
  const currentStep = Number.isFinite(state.onboardingStep) ? state.onboardingStep : 0;
  const step = Math.max(0, Math.min(currentStep, steps.length - 1));
  state.onboardingStep = step;

  app.innerHTML = `
    <main class="onboarding-frame">
      <div class="onboarding-progress">
        ${steps.map((_, index) => `<span class="${index <= step ? "active" : ""}"></span>`).join("")}
      </div>
      ${steps[step]()}
    </main>
  `;
}

function onboardingWelcome() {
  return `
    <section class="splash-screen">
      <div class="status-row"><span>9:41</span><span>||| WiFi Bat</span></div>
      <div class="splash-copy">
        <h1>Welcome to</h1>
        <div class="splash-logo"><span>QML</span> FOOD</div>
        <p>Buy food in bulk, pay small-small, join group buys, and receive delivery when your plan qualifies.</p>
      </div>
      <div class="splash-produce">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80" alt="" />
      </div>
      <div class="splash-bottom">
        <div class="splash-dots"><span></span><i></i><i></i><i></i></div>
        <button class="btn primary" onclick="nextOnboarding()">Get Started</button>
      </div>
    </section>
  `;
}

function onboardingLocation() {
  return `
    <section class="onboarding-card">
      <p class="eyebrow">Step 1 of 5</p>
      <h1>Where are you buying from?</h1>
      <p class="muted">We use your location to show available food, vendors, group buys, and delivery partners.</p>
      <label>Country</label>
      <select id="countryInput">
        <option>Nigeria</option>
        <option>Ghana</option>
        <option>Kenya</option>
        <option>United Kingdom</option>
      </select>
      <label>City</label>
      <select id="cityInput">
        <option>Lagos</option>
        <option>Abuja</option>
        <option>Port Harcourt</option>
        <option>Ibadan</option>
      </select>
      <div class="onboarding-actions">
        <button class="btn ghost" onclick="previousOnboarding()">Back</button>
        <button class="btn primary" onclick="saveLocationAndNext()">Continue</button>
      </div>
    </section>
  `;
}

function onboardingAccount() {
  return `
    <section class="onboarding-card">
      <p class="eyebrow">Step 2 of 5</p>
      <h1>Create your QML account</h1>
      <p class="muted">Sign up with phone number or email. You can add biometrics and card linking after verification.</p>
      <label>Phone number or email</label>
      <input id="contactInput" placeholder="+2348012345678 or ada@example.com" value="${state.onboarding.contact}" />
      <div class="trust-list">
        <span>OTP verification</span>
        <span>One account, multiple roles</span>
        <span>Referral supported</span>
      </div>
      <div class="onboarding-actions">
        <button class="btn ghost" onclick="previousOnboarding()">Back</button>
        <button class="btn primary" onclick="saveContactAndNext()">Send OTP</button>
      </div>
    </section>
  `;
}

function onboardingVerify() {
  return `
    <section class="onboarding-card">
      <p class="eyebrow">Step 3 of 5</p>
      <h1>Verify your account</h1>
      <p class="muted">Enter the 6 digit code sent to ${state.onboarding.contact || "your phone or email"}.</p>
      <div class="otp-row">
        ${[1, 2, 3, 4, 5, 6].map((item) => `<input maxlength="1" inputmode="numeric" value="${item === 1 ? "1" : ""}" />`).join("")}
      </div>
      <button class="link-btn" onclick="resendVerificationCode()">Resend code</button>
      <div class="onboarding-actions">
        <button class="btn ghost" onclick="previousOnboarding()">Back</button>
        <button class="btn primary" onclick="nextOnboarding()">Verify</button>
      </div>
    </section>
  `;
}

function onboardingPurpose() {
  const purposes = [
    "Buy food for myself",
    "Buy food for family/group",
    "Sell food as a vendor",
    "Finance food plans",
    "Deliver orders",
    "Buy for staff/business"
  ];
  return `
    <section class="onboarding-card">
      <p class="eyebrow">Step 4 of 5</p>
      <h1>What do you want to do first?</h1>
      <p class="muted">You can activate more roles later from the same account.</p>
      <div class="purpose-grid">
        ${purposes.map((purpose) => `
          <button class="${state.onboarding.purpose === purpose ? "selected" : ""}" onclick="selectPurpose('${purpose}')">
            <strong>${purpose}</strong>
            <span>${purposeHint(purpose)}</span>
          </button>
        `).join("")}
      </div>
      <label>Referral code</label>
      <input id="referralInput" placeholder="Optional, e.g. QML-ADA-4821" value="${state.onboarding.referralCode}" />
      <div class="onboarding-actions">
        <button class="btn ghost" onclick="previousOnboarding()">Back</button>
        <button class="btn primary" onclick="saveReferralAndNext()">Continue</button>
      </div>
    </section>
  `;
}

function onboardingSecurity() {
  return `
    <section class="onboarding-card">
      <p class="eyebrow">Step 5 of 5</p>
      <h1>Secure your food wallet</h1>
      <p class="muted">Set up your first security options. These protect payments, card linking, and role applications.</p>
      <div class="setup-list">
        <div><strong>Create transaction PIN</strong><span>Required before payment</span></div>
        <div><strong>Enable biometrics</strong><span>Quick sign in on supported devices</span></div>
        <div><strong>Turn on 2FA</strong><span>Extra protection for role portals</span></div>
        <div><strong>Link card or bank</strong><span>Needed for plans and repayments</span></div>
      </div>
      <div class="onboarding-actions">
        <button class="btn ghost" onclick="previousOnboarding()">Back</button>
        <button class="btn primary" onclick="completeOnboarding()">Enter App</button>
      </div>
    </section>
  `;
}

function renderAdmin() {
  const navItems = ["Overview", "Control Center", "AI Approvals", "Users & KYC", "Marketplace", "Vendors", "Financiers", "Logistics", "Wallets", "Orders", "Support", "Refunds", "Reports", "Policies", "Audit"];
  app.innerHTML = `
    <div class="admin-shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">Q</div><div><strong>Bulk Food</strong><span class="muted">by QML</span></div></div>
        <nav class="admin-nav">
          ${navItems.map((item) => `<button class="${state.adminSection === item ? "active" : ""}" onclick="selectAdminSection('${item}')">${item}</button>`).join("")}
        </nav>
      </aside>
      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <p class="eyebrow">Super Admin Dashboard</p>
            <h1>Marketplace intelligence, role operations, wallets, and automated approvals</h1>
          </div>
          <div class="admin-top-actions">
            <button class="btn secondary" onclick="selectAdminSection('Audit')">Audit log</button>
            <button class="btn primary" onclick="selectAdminSection('AI Approvals')">AI policy active</button>
          </div>
        </header>

        <section class="admin-metrics">
          ${metric("Users", state.summary.users)}
          ${metric("Active Plans", state.summary.activePlans)}
          ${metric("Vendors", state.summary.vendors)}
          ${metric("Open Financing", money.format(state.summary.financingOpen ?? 0))}
          ${metric("Available Trips", state.summary.deliveriesAvailable)}
          ${metric("AI Queue", merchantUploads.length)}
          ${metric("Refunds", state.refundRequests.length)}
          ${metric("Reports", state.accountReports.length)}
        </section>

        <section class="admin-command-grid">
          ${commandCard("AI content approval", "Merchant uploads are scored and auto-approved when policy checks pass.", "94% pass rate")}
          ${commandCard("Wallet pulse", "Customer deposits, vendor settlements, financier returns, logistics payouts.", money.format(88800000))}
          ${commandCard("Verification coverage", "Identity, BVN/NIN, email, card or bank, address, documents.", "72% verified")}
          ${commandCard("Marketplace ranking", "Home/shop placement uses verification, reviews, likes, comments, demand, and recency.", "Live scoring")}
          ${commandCard("Refund control", "Review cancellations, failed deliveries, duplicate payments, and wallet reversals.", `${state.refundRequests.length} open`)}
          ${commandCard("Reports & safety", "Investigate accounts, payment-outside-app attempts, unsafe delivery, and abuse.", `${state.accountReports.length} reports`)}
        </section>

        <section class="admin-grid section-title admin-panel-grid">
          ${adminPanels()}
        </section>
      </main>
    </div>
    ${toastMarkup()}
  `;
}

function packageCard(item) {
  const slots = Number(item.group_buy_slots ?? item.groupBuySlots ?? 0);
  const filled = Number(item.group_buy_filled ?? item.groupBuyFilled ?? 0);
  const tag = slots > 0 ? `${Math.max(slots - filled, 0)} slots left` : `Pay ${item.deposit_percent ?? item.depositPercent}%, get delivery`;
  return `
    <article class="package-card interactive-card" role="button" tabindex="0" onclick="openItemDetail('${item.id}')" onkeydown="cardKeyOpen(event, '${item.id}')">
      <div class="package-media" style="background-image:url('${item.image_url || ""}')"><span class="pill good">${tag}</span></div>
      <div class="package-body">
        <h3>${item.title}</h3>
        <p>${item.description || (item.items || []).join(", ")}</p>
        <div class="split"><strong class="price">${money.format(Number(item.price))}</strong><button class="btn ghost" onclick="event.stopPropagation(); openItemDetail('${item.id}')">View Plan</button></div>
      </div>
    </article>
  `;
}

function featuredSlide(item) {
  const deposit = item.deposit_percent ?? item.depositPercent ?? 50;
  return `
    <article class="featured-slide interactive-card" role="button" tabindex="0" onclick="openItemDetail('${item.id}')" onkeydown="cardKeyOpen(event, '${item.id}')" style="background-image:url('${item.image_url || ""}')">
      <span class="pill good">${item.category}</span>
      <div>
        <h2>${item.title}</h2>
        <p>Pay ${deposit}% and become delivery eligible.</p>
        <button class="btn primary" onclick="event.stopPropagation(); openItemDetail('${item.id}')">Build Plan</button>
      </div>
    </article>
  `;
}

function compactPackageCard(item) {
  const slots = Number(item.group_buy_slots ?? item.groupBuySlots ?? 0);
  const filled = Number(item.group_buy_filled ?? item.groupBuyFilled ?? 0);
  const tag = slots > 0 ? `${Math.max(slots - filled, 0)} group slots` : `${item.deposit_percent ?? item.depositPercent}% deposit`;
  return `
    <article class="compact-package interactive-card" role="button" tabindex="0" onclick="openItemDetail('${item.id}')" onkeydown="cardKeyOpen(event, '${item.id}')">
      <div class="compact-image" style="background-image:url('${item.image_url || ""}')"></div>
      <div>
        <span class="pill good">${tag}</span>
        <h3>${item.title}</h3>
        <p>${item.vendor || "Verified vendor"}</p>
        <strong>${money.format(Number(item.price))}</strong>
      </div>
    </article>
  `;
}

function productCard(item) {
  return `
    <article class="product-card interactive-card" role="button" tabindex="0" onclick="openItemDetail('${item.id}')" onkeydown="cardKeyOpen(event, '${item.id}')">
      <button class="heart-btn product-heart" onclick="event.stopPropagation(); toggleFavorite('${item.id}')" aria-label="Save ${item.title}">${favoriteIcon(item.id)}</button>
      <div class="product-image" style="background-image:url('${item.image}')"><span class="pill">${item.tag}</span></div>
      <div class="product-body">
        <h3>${item.title}</h3>
        <p>${item.vendor} - ${item.location}</p>
        <small class="delivery-note">${item.deliveryRule || (/fresh|fruit|vegetable|dairy|perishable/i.test(`${item.category} ${item.tag}`) ? "Perishable - same day delivery" : "Location-based delivery")}</small>
        ${item.photoCredit ? `<small class="photo-note">${item.photoCredit}</small>` : ""}
        <div class="split"><strong class="price">${money.format(item.price)}</strong><span class="muted">/${item.unit}</span></div>
        <div class="product-action">
          <button onclick="event.stopPropagation(); addProductToCart('${item.id}')"><span class="bag-icon" aria-hidden="true"></span>Add to cart</button>
        </div>
      </div>
    </article>
  `;
}

function reviewCard([name, rating, text]) {
  return `
    <article class="review-card">
      <div class="review-avatar">${name[0]}</div>
      <div>
        <div class="split"><strong>${name}</strong><span>${rating} ★</span></div>
        <p>★★★★★</p>
        <small>${text}</small>
      </div>
    </article>
  `;
}

function productCommentCard([name, rating, text]) {
  return `
    <article class="product-comment-card">
      <div class="review-avatar">${name[0]}</div>
      <div>
        <div class="split"><strong>${name}</strong><span>${rating} ★</span></div>
        <p>${text}</p>
      </div>
    </article>
  `;
}

function recommendationSection(title, items) {
  return `
    <div class="split section-title"><h2>${title}</h2><button class="link-btn" onclick="goToScreen('products')">View all</button></div>
    <section class="recommendation-row">
      ${items.map(recommendationCard).join("")}
    </section>
  `;
}

function recommendationCard(item) {
  const image = item.image || item.image_url || "";
  return `
    <article class="recommendation-card interactive-card" role="button" tabindex="0" onclick="openItemDetail('${item.id}')" onkeydown="cardKeyOpen(event, '${item.id}')">
      <div style="background-image:url('${image}')"></div>
      <strong>${item.title}</strong>
      <span>${money.format(Number(item.price))}</span>
      <small>${item.tag || item.category}</small>
    </article>
  `;
}

function homeProductRail(section) {
  const subtitle = section.subtitle ? `<span>${section.subtitle}</span>` : "";
  return `
    <section class="home-product-section" aria-label="${section.title}">
      <div class="bigcart-section-title">
        <h2>${section.title}</h2>
        ${subtitle || `<button class="arrow-link" onclick="goToScreen('products')" aria-label="View ${section.title}"></button>`}
      </div>
      <div class="home-product-row">
        ${section.items.map((item) => productCard({ ...item, tag: section.badge || item.tag })).join("")}
      </div>
    </section>
  `;
}

function shopMarketplaceSections() {
  const items = allMarketplaceItems();
  const featured = localFirstItems(items.filter((item) => /featured|verified|picture list|live protein|raw list|nigeria local|farm fresh/i.test(marketItemText(item)) || item.photoSource)).slice(0, 10);
  const recentlyUploaded = localFirstItems([...items].reverse()).slice(0, 10);
  const discounted = localFirstItems(items.filter((item) => /discount|promo|5%|bulk|group|best price|lowest|deal|saver|pay 50|weekly|monthly/i.test(marketItemText(item)))).slice(0, 10);
  const freshProduce = localFirstItems(items.filter((item) => /fresh|produce|fruit|vegetable|tomato|pepper|okra|leaf|ugu|ewedu|waterleaf|plantain|yam|potato|tuber|farm gate|same day|few hours/i.test(marketItemText(item)))).slice(0, 10);

  return [
    { title: "Featured", subtitle: "Highlighted raw foodstuff, live protein, and market produce", badge: "Featured", items: featured.length ? featured : items.slice(0, 10) },
    { title: "Recently uploaded", subtitle: "Latest vendor, admin, and market catalog listings", badge: "New", items: recentlyUploaded },
    { title: "Discounted", subtitle: "Bulk, promo, group-buy, plan, and best-price listings", badge: "Discounted", items: discounted.length ? discounted : items.slice(0, 10) },
    { title: "Fresh produce", subtitle: "Vegetables, fruits, tubers, peppers, leaves, and farm-gate items", badge: "Fresh produce", items: freshProduce.length ? freshProduce : items.slice(0, 10) }
  ].filter((section) => section.items.length);
}

function homeMarketplaceSections() {
  const items = allMarketplaceItems();
  const products = marketplaceProducts();
  const market = userMarketRegion();
  const localSpotlight = localFirstItems(items).filter((item) => localMarketWeight(item, market) === 0).slice(0, 8);
  const marketChannelItems = localFirstItems(items.filter((item) => /local market|street|roadside|neighbourhood|township|farm gate|open-air|wet market|mercado|souk|floating market|central market|farmers market/i.test(marketItemText(item)))).slice(0, 8);
  const internationalItems = localFirstItems(items.filter((item) => /international market|imported|global|cross-border|diaspora|souk|mercado/i.test(marketItemText(item)))).slice(0, 8);
  const pictureCards = localFirstItems(items.filter((item) => item.photoSource || /produce card|market card|raw list|raw basket|protein lot|livestock|live protein/i.test(marketItemText(item)))).slice(0, 10);
  const rawListCards = localFirstItems(items.filter((item) => /raw list|raw basket|bulk basket|family basket|produce box|farm box|pantry basket|mercado box/i.test(marketItemText(item)))).slice(0, 8);
  const liveProteins = localFirstItems(items.filter((item) => /live protein|livestock|live poultry|live turkey|live goat|live cattle|live cow|live ram|live sheep|live catfish|live tilapia|farm egg/i.test(marketItemText(item)))).slice(0, 8);
  const byRecent = localFirstItems([...items].reverse()).slice(0, 8);
  const farmFresh = localFirstItems(items.filter((item) => /fresh|farm|tomato|plantain|vegetable|fruit|yam|tuber/i.test(marketItemText(item)))).slice(0, 8);
  const retailerPrices = localFirstItems(items.filter((item) => /mart|market|retail|depot|hub|store|foods/i.test(marketItemText(item)))).slice(0, 8);
  const lowStock = localFirstItems(products.filter(isGoingOutOfStock).concat(products.filter((item) => /low stock|scarce|few left/i.test(`${item.tag} ${item.status || ""}`)))).slice(0, 8);
  const bestPrice = [...items].sort((a, b) => valueScore(b) - valueScore(a)).slice(0, 8);
  const marketLabel = marketRegionLabel(market);
  const sections = [];

  if (market !== "global" && localSpotlight.length) {
    sections.push({
      title: market === "nigeria" ? "Nigeria local market feed" : `${marketLabel} local market feed`,
      subtitle: market === "nigeria" ? "Garri, yam, plantain, egusi, pepper, rice, oil, seafood, and daily staples" : `Regional farm produce and groceries for ${marketLabel} shoppers`,
      badge: market === "nigeria" ? "Nigeria local" : `${marketLabel} local`,
      items: localSpotlight
    });
  }

  if (marketChannelItems.length) {
    sections.push({
      title: "Street, roadside & neighbourhood markets",
      subtitle: "Foodstuff from local, township, roadside, farm gate, and open market channels",
      badge: "Local market",
      items: marketChannelItems
    });
  }

  if (liveProteins.length) {
    sections.push({
      title: "Live proteins and livestock",
      subtitle: "Live chicken, turkey, goat, cow, ram, fish, eggs, and raw protein supply",
      badge: "Live protein",
      items: liveProteins
    });
  }

  if (rawListCards.length) {
    sections.push({
      title: "Raw foodstuff basket lists",
      subtitle: "Uncooked staples, soup-stuff, pantry, farm boxes, and market shopping lists",
      badge: "Raw list",
      items: rawListCards
    });
  }

  if (pictureCards.length) {
    sections.push({
      title: "Farm produce picture cards",
      subtitle: "Photo-backed produce cards from local and international market sources",
      badge: "Picture list",
      items: pictureCards
    });
  }

  sections.push(
    { title: "Recently uploaded", subtitle: "New vendor and admin listings", badge: "New", items: byRecent },
    { title: "Farm Fresh", subtitle: "Fresh produce and raw food materials", badge: "Farm fresh", items: farmFresh.length ? farmFresh : byRecent },
    { title: "Retailers Price", subtitle: "Compare merchant and market rates", badge: "Retail price", items: retailerPrices.length ? retailerPrices : products.slice(0, 8) },
    { title: "Going out of stock", subtitle: "Low stock items to buy early", badge: "Low stock", items: lowStock.length ? lowStock : products.slice(-5) },
    { title: "Best price", subtitle: "Lowest price and strongest discount value", badge: "Best price", items: bestPrice }
  );

  if (internationalItems.length) {
    sections.push({
      title: "International market staples",
      subtitle: "Cross-border foodstuff, diaspora staples, and market imports",
      badge: "International",
      items: internationalItems
    });
  }

  return sections.filter((section) => section.items.length);
}

function isGoingOutOfStock(item) {
  const stockText = String(item.stock || item.note || item.tag || "");
  const amount = Number((stockText.match(/\d+/) || [0])[0]);
  return /low stock|restock|few|left|remaining/i.test(stockText) || (amount > 0 && amount <= 25);
}

function valueScore(item) {
  const price = Math.max(Number(item.price || 0), 1);
  const discountBoost = /discount|promo|5%|lowest|best|group|bulk/i.test(`${item.tag} ${item.title}`) ? 70000 : 0;
  const planBoost = /daily|weekly|monthly|pay|installment|outright/i.test(`${item.tag}`) ? 25000 : 0;
  return discountBoost + planBoost + (900000 / price);
}

function categoryBubble(category, index) {
  return `
    <button class="category-bubble" onclick="selectCategory('${category}')">
      <span class="bubble-${index % 6} category-mark mark-${index % 6}" aria-hidden="true"></span>
      <small>${category}</small>
    </button>
  `;
}

function packageAsProduct(item) {
  return applyProductImage({
    id: item.id,
    title: item.title,
    category: item.category,
    vendor: item.vendor || "Verified vendor",
    location: item.city || "Nigeria",
    country: item.country || "",
    marketTypes: item.marketTypes || [],
    price: Number(item.price),
    unit: "package",
    tag: item.category,
    image: item.image_url || "",
    image_url: item.image_url || "",
    region: item.region || "global",
    deliveryRule: item.description || item.tag || "Location-based package",
    photos: item.photos || [],
    items: item.items || [],
    vendorInfo: item.vendorInfo || item.description
  });
}

function allMarketplaceItems() {
  return localFirstItems(marketplaceProducts().concat(allPackageProducts()));
}

function allPackageProducts() {
  return marketplacePackages().map(packageAsProduct);
}

function mergeDefaultFoodTags(savedTags) {
  const saved = Array.isArray(savedTags) ? savedTags : [];
  return uniqueTags([...defaultFoodTags, ...saved, ...regionalMarketFoodTags()]);
}

function regionalMarketFoodTags() {
  const generated = marketProduceSources.flatMap((source) => [
    source.country,
    `${source.country} local`,
    `${source.country} market`,
    `${source.country} produce`,
    `${marketRegionLabel(source.region)} produce`,
    ...source.marketTypes.map(humanizeTag),
    ...source.items.flatMap(([name, category]) => [name, category])
  ]);
  return generated;
}

function uniqueTags(tags) {
  const seen = new Set();
  const output = [];
  tags.filter(Boolean).forEach((tag) => {
    const label = String(tag).trim();
    const key = label.toLowerCase();
    if (!label || seen.has(key)) return;
    seen.add(key);
    output.push(label);
  });
  return output;
}

function humanizeTag(value) {
  return String(value || "").replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function marketRegionLabel(region) {
  const labels = {
    nigeria: "Nigeria",
    africa: "African",
    asia: "Asian",
    america: "American",
    europe: "European",
    global: "Global"
  };
  return labels[String(region || "global").toLowerCase()] || humanizeTag(region || "Global");
}

function userMarketRegion() {
  const country = String(state?.onboarding?.country || state?.user?.country || "Nigeria").toLowerCase();
  if (/nigeria/.test(country)) return "nigeria";
  if (/uk|united kingdom|england|scotland|wales|ireland|france|germany|spain|italy|netherlands|belgium|europe/.test(country)) return "europe";
  if (/ghana|kenya|south africa|cameroon|benin|togo|egypt|morocco|africa/.test(country)) return "africa";
  if (/india|china|japan|thailand|vietnam|indonesia|philippines|korea|pakistan|bangladesh|malaysia|singapore|asia/.test(country)) return "asia";
  if (/united states|usa|u\.s\.|america|canada|mexico|brazil|peru|colombia|argentina|chile/.test(country)) return "america";
  return "global";
}

function itemAllowedForUserRegion(item) {
  const market = userMarketRegion();
  const region = String(item.region || "africa").toLowerCase();
  const text = marketItemText(item);
  if (market === "nigeria") return true;
  if (market === "europe") return ["europe", "global", "imported"].includes(region) || /europe|united kingdom|italy|spain|france|germany|international market/.test(text);
  if (market === "africa") return ["africa", "nigeria", "global", "local", "imported"].includes(region) || /africa|ghana|kenya|ethiopia|morocco|nigeria|international market/.test(text);
  if (market === "asia") return ["asia", "global", "imported"].includes(region) || /asia|india|china|thailand|japan|korea|vietnam|indonesia|philippines|international market/.test(text);
  if (market === "america") return ["america", "global", "imported"].includes(region) || /america|united states|usa|mexico|brazil|peru|canada|colombia|argentina|international market/.test(text);
  return true;
}

function marketplaceProducts() {
  const apiProducts = (state.apiProducts || []).map(apiProductAsMarketplaceItem);
  const vendorProducts = (state.roleData?.vendor?.products || []).map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category || "Local food",
    vendor: "My Vendor Store",
    location: state.onboarding.city || "Lagos",
    price: Number(item.price || 0),
    unit: "unit",
    tag: item.status || "Vendor listing",
    image: itemGalleryImages(item)[0],
    region: "local",
    country: state.onboarding.country || "Nigeria",
    marketTypes: ["local market", "neighbourhood market"],
    deliveryRule: item.category === "Same-day Perishables" ? "Perishable - same day delivery" : "Vendor delivery rule",
    photos: item.photos || [],
    vendorInfo: item.vendorInfo || item.note
  }));
  const knownIds = new Set(apiProducts.concat(vendorProducts).map((item) => item.id));
  return localFirstItems(apiProducts.concat(vendorProducts, productCatalog.filter((item) => !knownIds.has(item.id))).map(applyProductImage).filter(itemAllowedForUserRegion));
}

function apiProductAsMarketplaceItem(item) {
  const photos = Array.isArray(item.photos) ? item.photos : [];
  const image = photos[0] || item.image || item.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";
  return applyProductImage({
    id: item.id,
    title: item.title,
    category: item.category || "Groceries",
    vendor: item.vendor || item.vendor_name || "Verified QML vendor",
    location: item.location || item.city || "Nearby",
    price: Number(item.price || 0),
    unit: item.unit || "unit",
    tag: item.ai_status === "auto_approved" ? "AI approved" : item.status || "Vendor listing",
    image,
    photos,
    region: item.region || "global",
    country: item.country || item.country_name || "",
    marketTypes: Array.isArray(item.market_types) ? item.market_types : item.marketTypes || [],
    deliveryRule: item.delivery_rule || item.deliveryRule || (/fresh|fruit|vegetable|dairy|perishable/i.test(`${item.category} ${item.title}`) ? "Perishable - same day delivery" : "Location-based delivery"),
    vendorInfo: item.description || item.vendorInfo || "Verified grocery listing from the QML marketplace."
  });
}

function marketplacePackages() {
  const vendorPackages = (state.roleData?.vendor?.packages || []).map((item) => ({
    id: item.id,
    title: item.title,
    category: "Vendor Package",
    vendor: "My Vendor Store",
    city: state.onboarding.city || "Lagos",
    price: Number(item.price || 0),
    tag: item.paymentOptions,
    image_url: itemGalleryImages(item)[0],
    photos: item.photos || [],
    region: "local",
    country: state.onboarding.country || "Nigeria",
    marketTypes: ["local market", "neighbourhood market"],
    vendorInfo: item.vendorInfo || item.items
  }));
  const knownIds = new Set(vendorPackages.map((item) => item.id));
  return vendorPackages
    .concat(state.packages.concat(extraPackages).filter((item) => !knownIds.has(item.id)))
    .map(applyPackageImage)
    .filter(itemAllowedForUserRegion);
}

function itemMatchesQuery(item, query) {
  return marketItemText(item).includes(String(query || "").toLowerCase());
}

function marketItemText(item) {
  const marketTypes = Array.isArray(item.marketTypes) ? item.marketTypes.join(" ") : item.marketTypes || "";
  const packageItems = Array.isArray(item.items) ? item.items.join(" ") : item.items || "";
  return [
    item.title,
    item.category,
    item.vendor,
    item.location,
    item.city,
    item.country,
    item.region,
    item.tag,
    item.deliveryRule,
    item.vendorInfo,
    marketTypes,
    packageItems
  ].filter(Boolean).join(" ").toLowerCase();
}

function localFirstItems(items) {
  const market = userMarketRegion();
  return items
    .map((item, index) => ({ item, index, weight: localMarketWeight(item, market) }))
    .sort((a, b) => a.weight - b.weight || a.index - b.index)
    .map(({ item }) => item);
}

function localMarketWeight(item, market = userMarketRegion()) {
  const region = String(item.region || "africa").toLowerCase();
  const text = marketItemText(item);
  const localish = region === "local" || /local market|street|roadside|neighbourhood|township|farm gate|open-air|wet market|farmers market/.test(text);

  if (market === "nigeria") {
    if (region === "nigeria" || localish || /nigeria|lagos|abuja|ibadan|enugu|calabar|benin|sokoto|ofada|abakaliki|garri|egusi|ogbono|ugu|ewedu|yam|plantain|palm oil|crayfish|stockfish|catfish/.test(text)) return 0;
    if (region === "africa") return 1;
    if (["global", "imported"].includes(region)) return 2;
    return 3;
  }

  if (market === "africa") {
    if (region === "africa" || region === "nigeria" || /ghana|kenya|ethiopia|morocco|africa|nigeria/.test(text)) return 0;
    if (["global", "local", "imported"].includes(region)) return 1;
    return 2;
  }

  if (market === "asia") {
    if (region === "asia" || /india|china|thailand|japan|korea|vietnam|indonesia|philippines|asia/.test(text)) return 0;
    if (["global", "imported"].includes(region)) return 1;
    return 2;
  }

  if (market === "america") {
    if (region === "america" || /united states|usa|mexico|brazil|peru|canada|colombia|argentina|america/.test(text)) return 0;
    if (["global", "imported"].includes(region)) return 1;
    return 2;
  }

  if (market === "europe") {
    if (region === "europe" || /united kingdom|italy|spain|france|germany|europe/.test(text)) return 0;
    if (["global", "imported"].includes(region)) return 1;
    return 2;
  }

  if (["global", "imported"].includes(region)) return 0;
  return 1;
}

function filteredMarketplaceProducts() {
  const fallbackProducts = marketplaceProducts();
  let products = fallbackProducts;
  if (state.selectedFoodTag && state.selectedFoodTag !== "All Food") {
    products = products.filter((item) => itemMatchesQuery(item, state.selectedFoodTag));
  }
  const filter = state.selectedFilter;
  if (filter === "Pay 50%") products = products.filter((item) => /pay|weekly|monthly|daily|twice/i.test(item.tag));
  if (filter === "Top Rated") products = [...products].sort((a, b) => itemRating(b) - itemRating(a)).slice(0, 10);
  if (filter === "Group Buy") products = allMarketplaceItems().filter((item) => /group/i.test(`${item.tag} ${item.title}`));
  if (filter === "Near Me") products = products.filter((item) => item.location === (state.liveLocation?.area || state.onboarding.city || "Lagos"));
  if (filter === "Lowest Price") products = [...products].sort((a, b) => Number(a.price) - Number(b.price)).slice(0, 8);
  if (filter === "Verified Vendor") products = products.filter((item) => /verified|approved/i.test(`${item.tag} ${item.vendor}`));
  const filtered = applyMoreOptionFilters(products);
  return filtered.length ? filtered : fallbackProducts;
}

function applyMoreOptionFilters(products) {
  const options = state.selectedMoreOptions || [];
  if (!options.length) return products;
  return products.filter((item) => {
    const text = marketItemText(item);
    return options.every((option) => {
      if (option === "Bulk discount") return /bulk|discount|promo|5%|group|package|basket|saver/i.test(text);
      if (option === "Free shipping") return /free shipping|free delivery|shipping included/i.test(text);
      if (option === "Same day delivery") return /same day|few hours|fresh|perishable|farm|produce|fruit|vegetable/i.test(text);
      if (option === "Pay 50%, get delivery") return /pay 50|50%|weekly|monthly|daily|quarterly|pay twice|installment/i.test(text);
      if (option === "Group buy available") return /group buy|group|split|circle/i.test(text);
      return true;
    });
  });
}

function proximityDots() {
  return [
    { label: "Mile 12 Fresh Hub", short: "F", distance: "0.8km", kind: "Vendor", type: "vendor", note: "Tomatoes, pepper, onions, and fresh produce available nearby.", action: "selectSearchChip('Fresh Produce')" },
    { label: "QML Logistics Bike", short: "L", distance: "1.2km", kind: "Logistics", type: "logistics", note: "Closest delivery partner for small basket orders.", action: "goToScreen('logisticsTrips')" },
    { label: "Mainland Grain Depot", short: "G", distance: "2.4km", kind: "Food", type: "food", note: "Rice, beans, garri, and staff packs matched by proximity.", action: "selectSearchChip('Rice')" },
    { label: "Verified food financier", short: "₦", distance: "3.1km", kind: "Finance", type: "finance", note: "Finance opportunity available for eligible food baskets.", action: "goToScreen('financierOpportunities')" }
  ];
}

function supportTickets() {
  return JSON.parse(localStorage.getItem("qmlSupportTickets") || "null") || [
    { title: "Wallet funding check", meta: "Payment support", status: "Open", note: "Deposit receipt and wallet ledger available." },
    { title: "Delivery address confirmation", meta: "Logistics support", status: "Pending", note: "Live location and address verification requested." }
  ];
}

function persistSupportTickets(items) {
  localStorage.setItem("qmlSupportTickets", JSON.stringify(items));
}

function creditScoreValue() {
  const details = state.profileDetails || {};
  let score = 540;
  if (details.nin) score += 45;
  if (details.bvn) score += 45;
  if (details.nextOfKin && details.nextPhone) score += 30;
  if (details.workHistory || details.employer) score += 28;
  if (state.addresses.length > 1) score += 22;
  score += Math.min(60, state.userWallet.ledger.length * 6);
  score += Math.min(45, state.orderHistory.length * 5);
  return Math.max(300, Math.min(850, score));
}

function creditFactor(title, status, value, screen) {
  return `
    <button class="credit-factor-card interactive-card" onclick="goToScreen('${screen}')">
      <span>${title}</span>
      <strong>${status}</strong>
      <i><b style="width:${Math.max(8, Math.min(100, value))}%"></b></i>
    </button>
  `;
}

function itemRating(item) {
  const text = `${item.title} ${item.vendor} ${item.tag}`;
  if (/verified|approved|premium/i.test(text)) return 4.9;
  if (/promo|discount|group/i.test(text)) return 4.7;
  return 4.4 + (Number(item.price || 0) % 4) / 10;
}

function filteredUpdates() {
  if (state.selectedUpdateFilter === "All") return activityUpdates;
  const key = state.selectedUpdateFilter.toLowerCase().replace(/s$/, "");
  return activityUpdates.filter(([type, title, text, time, tag]) => `${type} ${title} ${text} ${tag}`.toLowerCase().includes(key));
}

function selectedMarketplaceItem() {
  return allMarketplaceItems().find((item) => item.id === state.selectedProductId)
    || allMarketplaceItems().find((item) => item.id === state.selectedPackageId)
    || allMarketplaceItems()[0];
}

function metric(label, value) {
  return `<article class="admin-card"><span>${label}</span><strong>${value ?? 0}</strong></article>`;
}

function commandCard(title, text, value) {
  return `
    <article class="command-card interactive-card" role="button" tabindex="0" onclick="manageAdminCommand('${title}')" onkeydown="adminCardKeyOpen(event, '${title}')">
      <span>${value}</span>
      <h3>${title}</h3>
      <p>${text}</p>
      <button class="btn secondary" onclick="event.stopPropagation(); manageAdminCommand('${title}')">Manage</button>
    </article>
  `;
}

function portalCard(title, text) {
  return `<article class="portal-card"><h3>${title}</h3><p>${text}</p><button class="btn secondary" onclick="manageAdminCommand('${title}')">Manage</button></article>`;
}

function panel(title, action, rows) {
  return `<article class="panel"><div class="panel-header"><h2>${title}</h2><button class="btn secondary" onclick="handleAdminPanelAction('${title}', '${action}')">${action}</button></div>${rows.join("")}</article>`;
}

function row(title, meta, status) {
  return `<div class="table-row"><div><strong>${title}</strong><small>${meta}</small></div><span class="pill">${formatStatus(status)}</span></div>`;
}

function adminActionRow(title, meta, status, handler) {
  return `<div class="table-row admin-action-row"><div><strong>${title}</strong><small>${meta}</small></div><span class="pill">${formatStatus(status)}</span><button class="btn secondary" onclick="${handler}">Action</button></div>`;
}

function adminModuleCard(title, text, value, section, status = "Live") {
  return `
    <button class="admin-module-card interactive-card" onclick="selectAdminSection('${section}')">
      <span class="pill good">${status}</span>
      <strong>${value}</strong>
      <h3>${title}</h3>
      <p>${text}</p>
    </button>
  `;
}

function adminMiniStat(title, value, text, section) {
  return `
    <button class="admin-mini-stat" onclick="selectAdminSection('${section}')">
      <span>${title}</span>
      <strong>${value}</strong>
      <small>${text}</small>
    </button>
  `;
}

function adminMarketplaceRows() {
  return allMarketplaceItems().slice(0, 8).map((item) => {
    const score = Math.round((itemRating(item) * 18) + (itemAllowedForUserRegion(item) ? 8 : 0));
    return adminActionRow(item.title, `${item.vendor || "Verified vendor"} - ${item.category} - ${money.format(Number(item.price || 0))} - rank score ${score}`, item.tag || "Listed", `openItemFromAdmin('${item.id}')`);
  });
}

function adminOrderRows() {
  return state.orderHistory.slice(0, 8).map((item) => adminActionRow(item.title, `${item.id || "QML order"} - ${item.meta}`, item.status, "adminOpenOrderFlow()"));
}

function adminRoleAccessRows() {
  return [
    adminActionRow("Customer account", "Buy products, join groups, use wallet, verify profile, reviews, support.", "Default", "selectAdminSection('Users & KYC')"),
    adminActionRow("Vendor role", "Create products, packages, plans, promos, stock, order movement, wallet settlement.", hasRole("vendor") ? "Active" : "Available", "selectAdminSection('Vendors')"),
    adminActionRow("Financier role", "Fund nearby opportunities, monitor repayments, sign off transactions, profit wallet.", hasRole("financier") ? "Active" : "Available", "selectAdminSection('Financiers')"),
    adminActionRow("Logistics role", "Accept nearby trips, manage vehicle, submit proof, collect payout.", hasRole("logistics") ? "Active" : "Available", "selectAdminSection('Logistics')"),
    adminActionRow("Corporate role", "Staff packs, payroll deductions, company wallet, sign-off and delivery lists.", hasRole("corporate") ? "Active" : "Available", "selectAdminSection('Users & KYC')")
  ];
}

function adminKycRows() {
  const details = state.profileDetails || {};
  return [
    row("Personal identity", `NIN ${details.nin ? "captured" : "pending"} - BVN ${details.bvn ? "captured" : "pending"} - marital status ${details.maritalStatus || "pending"}`, details.nin && details.bvn ? "verified" : "action"),
    row("Employment and affordability", `Work history ${details.workHistory || details.employer || "pending"} - education ${details.education || "pending"}`, "review"),
    row("Next of kin", `${details.nextOfKin || "Not submitted"} - ${details.nextPhone || "phone pending"}`, details.nextOfKin ? "ready" : "required"),
    row("Delivery address proof", `${state.addresses.length}/5 addresses saved - live location ${state.liveLocation ? "enabled" : "not enabled"}`, state.liveLocation ? "active" : "review"),
    row("Payment instrument", `${state.cards.length} card(s), bank/card not both required`, state.cards.length ? "ready" : "required")
  ];
}

function adminUsers() {
  const user = normalizeUser(state.user);
  const current = {
    id: "usr_ada",
    name: user.name || "Ada Okonkwo",
    email: user.email || "ada@example.com",
    phone: user.phone || state.onboarding.contact || "+234 801 234 5678",
    location: `${state.onboarding.city || "Lagos"}, ${state.onboarding.country || "Nigeria"}`,
    qmlId: user.referralCode || state.onboarding.referralCode || "QML-ADA-4821",
    type: "Customer + roles",
    status: state.authComplete ? "Active" : "Onboarding",
    risk: creditScoreValue() > 700 ? "Low" : "Medium",
    creditScore: creditScoreValue(),
    walletBalance: state.userWallet.balance,
    kycLevel: state.profileDetails?.nin && state.profileDetails?.bvn ? "Tier 3 verified" : "KYC pending",
    roles: ["Customer"].concat(Object.keys(state.activeRoles || {}).filter((role) => state.activeRoles[role]).map(roleLabel)),
    addresses: state.addresses,
    cards: state.cards,
    orders: state.orderHistory,
    ledger: state.userWallet.ledger,
    support: supportTickets(),
    reports: reportQueue().filter((item) => /account|payment|listing|delivery|vendor/i.test(`${item.meta} ${item.note}`)),
    groups: state.groupBuys,
    activities: activityUpdates.map(([type, title, text, time, tag]) => ({ type, title, text, time, tag }))
  };
  const samples = [
    {
      id: "usr_tomi",
      name: "Tomi Balogun",
      email: "tomi.balogun@example.com",
      phone: "+234 809 551 2030",
      location: "Yaba, Nigeria",
      qmlId: "QML-TOMI-1182",
      type: "Customer",
      status: "Active",
      risk: "Low",
      creditScore: 742,
      walletBalance: 224500,
      kycLevel: "Tier 2 verified",
      roles: ["Customer"],
      addresses: [{ label: "Home", address: "Yaba, Lagos", status: "Verified" }],
      cards: [{ label: "Verve card", meta: "XXXX 4482", status: "Active" }],
      orders: [{ id: "QML-09122", title: "Balanced Diet Family Basket", meta: "Weekly contribution - ₦35,000", status: "Track" }],
      ledger: [{ title: "Wallet deposit", meta: "Successful - Today", amount: 50000 }, { title: "Plan contribution", meta: "Weekly basket", amount: -35000 }],
      support: [{ title: "Address update", meta: "Delivery", status: "Resolved", note: "Customer changed weekend delivery address." }],
      reports: [],
      groups: [{ title: "Office stew pack group", status: "Active", price: 90000, members: ["Tomi", "Ife", "Sola"] }],
      activities: [{ title: "Payment received", text: "Weekly contribution posted.", time: "18 min ago", tag: "Wallet" }]
    },
    {
      id: "usr_greenbridge",
      name: "Greenbridge Capital",
      email: "ops@greenbridge.example",
      phone: "+234 802 009 7781",
      location: "Victoria Island, Nigeria",
      qmlId: "QML-FIN-7401",
      type: "Financier",
      status: "Active",
      risk: "Low-Med",
      creditScore: 806,
      walletBalance: roleWallet("financier").balance,
      kycLevel: "Business verified",
      roles: ["Customer", "Financier"],
      addresses: [{ label: "Office", address: "Victoria Island, Lagos", status: "Verified" }],
      cards: [{ label: "Business bank", meta: "Providus **** 8001", status: "Default" }],
      orders: state.roleData.financier.transactions.map((item) => ({ id: item.id, title: item.title, meta: money.format(item.amount), status: item.status })),
      ledger: roleWallet("financier").ledger,
      support: [],
      reports: [],
      groups: [],
      activities: state.roleData.financier.activities.map((text) => ({ title: "Financier activity", text, time: "Today", tag: "Finance" }))
    },
    {
      id: "usr_vendor",
      name: "My Vendor Store",
      email: "vendor@qml.example",
      phone: "+234 805 443 1100",
      location: "Mile 12, Nigeria",
      qmlId: "QML-VEN-2109",
      type: "Vendor",
      status: "Review",
      risk: "Medium",
      creditScore: 688,
      walletBalance: roleWallet("vendor").balance,
      kycLevel: "Merchant documents pending",
      roles: ["Customer", "Vendor"],
      addresses: [{ label: "Warehouse", address: "Mile 12 Market, Lagos", status: "Verified" }],
      cards: [{ label: "Settlement bank", meta: "Wema **** 2710", status: "Default" }],
      orders: state.roleData.vendor.orders,
      ledger: roleWallet("vendor").ledger,
      support: [{ title: "Listing document review", meta: "AI approval", status: "Open", note: "High-value bundle needs stock proof." }],
      reports: reportQueue().slice(0, 1),
      groups: [],
      activities: state.roleData.vendor.activities.map((text) => ({ title: "Vendor activity", text, time: "Today", tag: "Vendor" }))
    }
  ];
  return [current, ...samples];
}

function selectedAdminUser() {
  return adminUsers().find((user) => user.id === state.selectedAdminUserId) || adminUsers()[0];
}

function adminUserList() {
  return adminUsers().map((user) => `
    <button class="admin-user-row ${selectedAdminUser().id === user.id ? "active" : ""}" onclick="selectAdminUser('${user.id}')">
      <span>${user.name[0]}</span>
      <div><strong>${user.name}</strong><small>${user.type} - ${user.location}</small></div>
      <b>${user.status}</b>
    </button>
  `).join("");
}

function adminUserDetail() {
  const user = selectedAdminUser();
  return `
    <article class="panel admin-user-detail">
      <div class="admin-account-hero">
        <div class="admin-account-avatar">${user.name[0]}</div>
        <div>
          <p class="eyebrow">${user.type} account</p>
          <h2>${user.name}</h2>
          <p>${user.email} - ${user.phone} - ${user.location}</p>
          <div class="admin-chip-row">${user.roles.map((role) => `<span>${role}</span>`).join("")}</div>
        </div>
        <button class="btn secondary" onclick="adminFlagSelectedUser()">Risk action</button>
      </div>
      <div class="admin-account-stats">
        ${adminMiniStat("Credit score", user.creditScore, `${user.risk} risk`, "Users & KYC")}
        ${adminMiniStat("Wallet balance", money.format(user.walletBalance), "Personal/role wallet view", "Wallets")}
        ${adminMiniStat("KYC level", user.kycLevel, user.qmlId, "Users & KYC")}
        ${adminMiniStat("Open activities", user.orders.length + user.ledger.length + user.support.length, "Orders, wallet, support", "Audit")}
      </div>
    </article>
  `;
}

function adminUserTables() {
  const user = selectedAdminUser();
  return [
    panel("Account Profile & Verification", "Request KYC", [
      row("Name and contact", `${user.name} - ${user.email} - ${user.phone}`, user.status),
      row("QML account ID", `${user.qmlId} - ${user.location}`, "verified"),
      row("Roles and access", user.roles.join(", "), "active"),
      row("KYC and credit", `${user.kycLevel} - score ${user.creditScore} - ${user.risk} risk`, user.risk)
    ]),
    panel("Wallet Ledger", "Open wallet", user.ledger.slice(0, 7).map((item) => walletRow([item.title, item.meta || item.type || "Wallet activity", item.amount || 0]))),
    panel("Orders & Plans", "Track order", user.orders.slice(0, 7).map((item) => adminActionRow(item.title || item.id, `${item.id || item.meta || ""} ${item.meta || ""}`.trim(), item.status || "Active", "adminOpenOrderFlow()"))),
    panel("Addresses & Payment", "Inspect", [
      ...user.addresses.slice(0, 4).map((item) => row(item.label, item.address, item.status)),
      ...user.cards.slice(0, 4).map((item) => row(item.label, item.meta, item.status))
    ]),
    panel("Support, Reports & Risk", "Open safety", [
      ...user.support.slice(0, 4).map((item) => adminActionRow(item.title, `${item.meta} - ${item.note}`, item.status, "selectAdminSection('Support')")),
      ...user.reports.slice(0, 4).map((item) => adminActionRow(item.title, `${item.meta} - ${item.note}`, item.status, "selectAdminSection('Reports')"))
    ]),
    panel("Full Activity Timeline", "Audit", user.activities.slice(0, 8).map((item) => row(item.title, `${item.text} - ${item.time}`, item.tag)))
  ].join("");
}

function adminOperationsOverview() {
  return [
    adminModuleCard("AI approval desk", "Auto-review merchant/admin product uploads, 3-image rule, pricing, delivery zone, and document thresholds.", merchantUploads.length, "AI Approvals"),
    adminModuleCard("Marketplace control", "Oversee home/shop ranking, categories, tags, products, packages, plans, promos, discounts, and reviews.", allMarketplaceItems().length, "Marketplace"),
    adminModuleCard("Users and KYC", "Customer credit score, NIN, BVN, address, next of kin, card/bank and role access requirements.", creditScoreValue(), "Users & KYC"),
    adminModuleCard("Wallet operations", "Deposits, transfers, PayVessel accounts/cards, escrow, receipts, refunds, settlements, and payouts.", money.format(state.userWallet.balance), "Wallets"),
    adminModuleCard("Order movement", "Cart checkout, contribution plans, delivery proof, cancel flow, success/error states and invoices.", state.orderHistory.length, "Orders"),
    adminModuleCard("Safety and support", "Encrypted chats, tickets, reports, refund requests, no outside-payment enforcement, and account actions.", supportTickets().length + reportQueue().length, "Support")
  ].join("");
}

function refundQueue() {
  return state.refundRequests.length ? state.refundRequests : [
    { title: "Order cancellation refund", meta: "Monthly Family Food Pack", amount: 25000, status: "Review" },
    { title: "Duplicate wallet payment", meta: "Customer wallet activity", amount: 18000, status: "Pending" }
  ];
}

function reportQueue() {
  return state.accountReports.length ? state.accountReports : [
    { title: "Payment outside app request", meta: "Vendor chat safety", status: "Open", note: "Customer reported external transfer request." },
    { title: "Misleading listing", meta: "Marketplace product", status: "Review", note: "Product images and received goods mismatch." }
  ];
}

function adminSystemEvents() {
  return state.systemEvents.length ? state.systemEvents : [
    { title: "AI policy scan", meta: "Merchant uploads checked for 3+ images and writeups", status: "complete" },
    { title: "Wallet monitor", meta: "Refund, escrow, deposit, and payout ledgers synced", status: "live" },
    { title: "Safety desk", meta: "Reports and support queues available for admin action", status: "ready" }
  ];
}

function aiUploadRow(item) {
  return `
    <div class="admin-work-row">
      <div>
        <div class="split"><strong>${item.title}</strong><span class="ai-score">${item.aiScore}% AI</span></div>
        <small>${item.merchant} - ${money.format(item.value)} listing value</small>
        <div class="admin-chip-row">${item.checks.map((check) => `<span>${check}</span>`).join("")}</div>
      </div>
      <span class="pill ${item.status === "auto approved" ? "good" : "risk"}">${item.status}</span>
    </div>
  `;
}

function financierRow([title, district, amount, expectedReturn, risk]) {
  return `
    <div class="admin-work-row">
      <div>
        <strong>${title}</strong>
        <small>${district} - ${money.format(amount)} available - ${money.format(expectedReturn)} expected return</small>
        <div class="mini-meter"><i style="width:${risk === "Low risk" ? 78 : 54}%"></i></div>
      </div>
      <span class="pill ${risk === "Low risk" ? "good" : ""}">${risk}</span>
    </div>
  `;
}

function logisticsRow([pickup, dropoff, vehicle, payout, distance]) {
  return `
    <div class="admin-work-row">
      <div>
        <strong>${pickup} to ${dropoff}</strong>
        <small>${vehicle} - ${distance} - ${money.format(payout)} payout + weekly performance bonus</small>
      </div>
      <span class="pill good">available</span>
    </div>
  `;
}

function adminPanels() {
  const panels = {
    Overview: [
      `<article class="panel admin-span"><div class="panel-header"><h2>Admin Operating System</h2><button class="btn secondary" onclick="selectAdminSection('Control Center')">Open controls</button></div><div class="admin-module-grid">${adminOperationsOverview()}</div></article>`,
      panel("Executive Pulse", "Inspect", [
        adminMiniStat("Revenue in motion", money.format(88800000), "Wallet, escrow, and settlement activity", "Wallets"),
        adminMiniStat("Marketplace supply", allMarketplaceItems().length, "Products, packages, and plans", "Marketplace"),
        adminMiniStat("Safety queue", refundQueue().length + reportQueue().length, "Refunds and reports needing action", "Reports"),
        adminMiniStat("Role portals", "5", "Customer, vendor, financier, logistics, corporate", "Users & KYC")
      ]),
      panel("Platform Updates", "Live feed", activityUpdates.map(([type, title, text, time, tag]) => row(title, `${text} - ${time}`, tag))),
      panel("Role Operations", "Manage roles", adminRoleRows())
    ],
    "Control Center": [
      panel("Live Control Tools", "Operate", [
        adminActionRow("AI approval engine", "Auto-approve compliant merchant uploads and hold high-risk listings.", "Active", "toggleAdminControl('AI approval engine')"),
        adminActionRow("Wallet settlement monitor", "Track deposits, deductions, refunds, escrow, and payout approvals.", "Live", "selectAdminSection('Wallets')"),
        adminActionRow("Marketplace ranking monitor", "Watch home/shop listing score from verification, reviews, demand, and recency.", "Live", "toggleAdminControl('Marketplace ranking monitor')"),
        adminActionRow("Safety escalation desk", "Reports, unsafe behavior, payment outside app, and support escalations.", "Review", "selectAdminSection('Reports')")
      ]),
      panel("System Events", "Audit", adminSystemEvents().map((item) => row(item.title, item.meta, item.status)))
    ],
    "AI Approvals": [
      panel("AI Merchant Upload Review", "Policy rules", merchantUploads.map(aiUploadRow)),
      panel("Verification & Value Requirements", "Risk tiers", adminRiskRules.map(([tier, requirement]) => row(tier, requirement, "required")))
    ],
    "Users & KYC": [
      `<article class="panel admin-span"><div class="panel-header"><h2>User Account Access</h2><button class="btn secondary" onclick="adminExportSelectedUser()">Export summary</button></div><div class="admin-user-workspace"><div class="admin-user-list">${adminUserList()}</div><div>${adminUserDetail()}</div></div></article>`,
      `<div class="admin-span admin-grid">${adminUserTables()}</div>`,
      panel("Role Access Matrix", "Review roles", adminRoleAccessRows()),
      panel("Customer Credit & KYC Score", "Open profile", adminKycRows()),
      panel("Verification Coverage", "Customer requirements", adminRiskRules.map(([tier, requirement]) => row(tier, requirement, "required"))),
      panel("Profile Signals", "Identity status", [
        row("Identity", "NIN/BVN pending for high value purchases", "action"),
        row("Email address", "Verified", "good"),
        row("Delivery address", `${state.addresses.length}/5 saved`, "review")
      ])
    ],
    Marketplace: [
      panel("Marketplace Listing Control", "Review listing", adminMarketplaceRows()),
      panel("Home & Shop Placement Rules", "Tune ranking", [
        adminActionRow("Recently uploaded", "New vendor/admin listings feed into home rails.", "Live", "selectAdminSection('Marketplace')"),
        adminActionRow("Farm Fresh", "Perishables require same-day or hours-based delivery.", "Enforced", "selectAdminSection('Logistics')"),
        adminActionRow("Retailers Price", "Products compare price, location, vendor verification, and demand.", "Live", "selectAdminSection('Marketplace')"),
        adminActionRow("Going out of stock", "Low inventory items surface with urgency.", "Live", "selectAdminSection('Vendors')"),
        adminActionRow("Best price", "Discount, group buy, pay options, and unit price affect ranking.", "Live", "selectAdminSection('Policies')")
      ]),
      panel("Review Signals", "Open details", productComments.map(([name, rating, text]) => row(name, `${rating} rating - ${text}`, "public review")))
    ],
    Vendors: [
      panel("Vendor Control Room", "Create listing", [
        adminActionRow("Create product", "Requires title, category, price, stock, vendor writeup, and minimum 3 images.", "Required", "openRoleDashboard('vendor')"),
        adminActionRow("Create package or plan", "Bundle local foods with daily, weekly, monthly, quarterly, pay twice, pay once, and outright options.", "Ready", "openRoleDashboard('vendor')"),
        adminActionRow("Promos and pricing", "5% outright discount, seasonal offers, group buy and price changes.", "Ready", "selectAdminSection('Marketplace')"),
        adminActionRow("Stock and low inventory", "Update quantity, low-stock alerts, and same-day perishable handling.", "Live", "openRoleDashboard('vendor')")
      ]),
      panel("Vendor Products", "Listings", state.roleData.vendor.products.map((item) => row(item.title, `${item.stock} - ${money.format(item.price)}`, item.status))),
      panel("Vendor Orders", "Movement", state.roleData.vendor.orders.map((item) => row(item.id, `${item.title} - ${money.format(item.amount)}`, item.status)))
    ],
    Financiers: [
      panel("Finance Control Room", "Open finance", [
        adminActionRow("Nearby finance opportunities", "Food plans and baskets within 1-5km can be funded from financier wallet.", "Live", "openRoleDashboard('financier')"),
        adminActionRow("Funded portfolio", "Shows financed plans, expected return, risk, and repayment status.", "Live", "selectAdminSection('Financiers')"),
        adminActionRow("Bank sign-off", "Review paycycle, deductions, principal return, and profit generation.", "Review", "selectAdminSection('Wallets')"),
        adminActionRow("Risk scoring", "Customer verification, repayment history, delivery status, and wallet activity.", "Live", "selectAdminSection('Users & KYC')")
      ]),
      panel("Financier Dashboard", "Opportunities", state.roleData.financier.opportunities.map((item) => row(item.title, `${item.district} - ${money.format(item.amount)} - ${money.format(item.expectedReturn)} return`, item.funded ? "funded" : item.risk))),
      panel("Finance Transactions", "Sign off", state.roleData.financier.transactions.map((item) => row(item.id, `${item.title} - ${money.format(item.amount)}`, item.status)))
    ],
    Logistics: [
      panel("Logistics Control Room", "Dispatch", [
        adminActionRow("Live proximity matching", "Closest available bike, van, or truck is matched to order location.", "Live", "selectAdminSection('Logistics')"),
        adminActionRow("Vehicle and availability", "Driver can set radius, vehicle capacity, districts, and delivery mode.", "Ready", "openRoleDashboard('logistics')"),
        adminActionRow("Delivery proof", "OTP, photo proof, recipient confirmation, notes, and payout ledger.", "Required", "selectAdminSection('Orders')"),
        adminActionRow("Weekly deductions and payout", "Auxiliary revenue, available balance, bonuses, and payout processing.", "Live", "selectAdminSection('Wallets')")
      ]),
      panel("Logistics Dispatch Board", "Nearby jobs", state.roleData.logistics.trips.map((item) => row(`${item.pickup} to ${item.dropoff}`, `${item.vehicle} - ${item.distance} - ${money.format(item.payout)}`, item.status))),
      panel("Logistics Earnings", "Payouts", state.roleData.logistics.earnings.map(walletRow))
    ],
    Wallets: [
      panel("Reconciliation Center", "Ledger health", reconciliationMetricRows()),
      panel("Webhook Exceptions", "PayVessel", reconciliationExceptionRows()),
      panel("Settlement Review", "Admin action", reconciliationSettlementRows()),
      panel("Recent Reconciliation Actions", "Audit", reconciliationActionRows()),
      panel("Wallets & Settlement Pulse", "Transactions", walletActivities.map(walletRow)),
      panel("Role Wallets", "Live prototype balances", [
        walletRow(["Personal wallet", "Customer payments, refunds, and role transfers", state.userWallet.balance]),
        walletRow(["Vendor wallet", "Sales, escrow, settlements, withdrawals", roleWallet("vendor").balance]),
        walletRow(["Financier wallet", "Available funding, escrow, repayments", roleWallet("financier").balance]),
        walletRow(["Logistics wallet", "Delivery payout, deductions, bonuses", roleWallet("logistics").balance])
      ])
    ],
    Orders: [
      panel("Order Lifecycle", "Open flow", adminOrderRows()),
      panel("Payment & Delivery States", "Inspect states", [
        adminActionRow("Checkout success", "Payment receipt, invoice, activity receipt, and delivery tracking are generated.", "Ready", "selectAdminSection('Wallets')"),
        adminActionRow("Checkout error", "Low wallet balance, failed card, missing KYC, unavailable product, and delivery mismatch states.", "Handled", "selectAdminSection('Policies')"),
        adminActionRow("Cancel order", "Before dispatch can trigger refund queue and wallet reversal rules.", "Available", "selectAdminSection('Refunds')"),
        adminActionRow("Delivery complete", "Requires OTP/live address check/photo proof before settlement.", "Required", "selectAdminSection('Logistics')")
      ]),
      panel("Group Buy & Bill Split", "Monitor groups", state.groupBuys.map((item) => row(item.title, `${item.members?.length || item.filled || 0} participants - ${money.format(item.price || item.total || 0)}`, item.status || "active")))
    ],
    Support: [
      panel("Support Tickets", "Resolve", supportTickets().map((item, index) => adminActionRow(item.title, `${item.meta} - ${item.note}`, item.status, `adminResolveSupport(${index})`))),
      panel("Customer Help Coverage", "Monitor", [
        row("Encrypted chat", "Delivery, wallet, KYC, vendor, and account support", "active"),
        row("Toll-free calls", "Call center handoff available from support screen", "ready"),
        row("Safety warning", "No payment outside QML wallet policy visible in product chat", "enforced")
      ])
    ],
    Refunds: [
      panel("Refund Queue", "Process", refundQueue().map((item, index) => adminActionRow(item.title, `${item.meta} - ${money.format(item.amount || 0)}`, item.status, `adminProcessRefund(${index})`))),
      panel("Refund Policies", "Rules", [
        row("Cancelled before dispatch", "Eligible for wallet reversal after vendor status check", "eligible"),
        row("Product unavailable", "Refund or substitution after merchant confirmation", "review"),
        row("Delivered disputes", "Requires delivery proof, OTP, chat log, and support review", "evidence")
      ])
    ],
    Reports: [
      panel("Account Reports", "Investigate", reportQueue().map((item, index) => adminActionRow(item.title, `${item.meta} - ${item.note}`, item.status, `adminReviewReport(${index})`))),
      panel("Risk Controls", "Safety", [
        row("Payment outside app", "Immediate account review and wallet protection warning", "high risk"),
        row("Unsafe delivery", "Logistics suspension review and proof audit", "urgent"),
        row("Misleading listing", "AI approval reversal and merchant warning", "review")
      ])
    ],
    Policies: [
      panel("Verification & Value Requirements", "Risk tiers", adminRiskRules.map(([tier, requirement]) => row(tier, requirement, "required"))),
      panel("AI Approval Rules", "Automation", merchantUploads.map(aiUploadRow)),
      panel("Provider Readiness", "External APIs", [
        ...providerReadinessRows()
      ])
    ],
    Audit: [
      panel("Admin Audit Trail", "Refresh", adminSystemEvents().concat(state.systemEvents).slice(0, 12).map((item) => row(item.title, item.meta, item.status))),
      panel("Wallet Reconciliation Audit", "Exceptions", reconciliationExceptionRows()),
      panel("Reconciliation Decisions", "History", reconciliationActionRows()),
      panel("Critical Controls", "Run check", [
        adminActionRow("AI approval state", "Approval engine, rejected queue, human override log, and product policy history.", "Active", "toggleAdminControl('AI approval state')"),
        adminActionRow("Financial reconciliation", "Wallet deposits, transfers, escrow, refunds, invoices, and payout receipts.", "Live", "toggleAdminControl('Financial reconciliation')"),
        adminActionRow("Delivery reconciliation", "Trip acceptance, proof, failed delivery, refund/cancel impact, and settlement release.", "Live", "toggleAdminControl('Delivery reconciliation')"),
        adminActionRow("Account enforcement", "Report user/vendor, suspend unsafe accounts, warn outside-payment attempts.", "Ready", "toggleAdminControl('Account enforcement')")
      ])
    ]
  };
  return (panels[state.adminSection] || panels.Overview).join("");
}

function adminRoleRows() {
  return [
    ...state.vendors.map((vendor) => row(vendor.business_name || vendor.businessName, `Vendor - ${vendor.city} - products ${vendor.products}`, vendor.status)),
    row("Greenbridge Capital", "Financier - funds nearby verified plans and sees expected returns", "active"),
    row("Ibrahim Sani", "Logistics - bike driver, waits for closest available delivery", "available"),
    row("Silver School Paycycle", "Corporate/staff pay-as-you-go buyer profile", "document review")
  ];
}

function walletRow([title, meta, amount]) {
  return `
    <div class="table-row">
      <div><strong>${title}</strong><small>${meta}</small></div>
      <span class="money-pill">${money.format(amount)}</span>
    </div>
  `;
}

function reconciliationMetricRows() {
  const totals = state.reconciliation?.totals || {};
  return [
    row("Ledger credits", money.format(Number(totals.credits || 0)), "credit"),
    row("Ledger debits", money.format(Number(totals.debits || 0)), "debit"),
    row("Duplicate webhooks", `${totals.duplicates || 0} blocked from double-credit`, Number(totals.duplicates || 0) ? "review" : "clear"),
    row("Wallet lookup failures", `${totals.failedWalletLookups || 0} unmatched PayVessel events`, Number(totals.failedWalletLookups || 0) ? "review" : "clear"),
    row("Settlement review", `${totals.settlementReview || 0} escrow/refund/order items`, Number(totals.settlementReview || 0) ? "review" : "clear")
  ];
}

function reconciliationExceptionRows() {
  const items = reconciliationExceptions();
  return items.length
    ? items.map((item, index) => adminActionRow(item.title, item.meta, item.status, `adminRecordReconciliationAction('exception', ${index}, 'acknowledge')`))
    : [row("No webhook exceptions", "Duplicate and unmatched PayVessel events are clear", "clear")];
}

function reconciliationSettlementRows() {
  const items = state.reconciliation?.settlementReview || [];
  if (!items.length) return [row("No settlement holds", "Escrow, refund, and delivery proof queues are clear", "clear")];
  return items.slice(0, 8).map((item, index) => adminActionRow(item.title, `${item.meta} - ${money.format(Number(item.amount || 0))}`, item.status, `adminRecordReconciliationAction('settlement', ${index}, 'mark_reviewed')`));
}

function reconciliationActionRows() {
  const items = state.reconciliation?.recentActions || [];
  return items.length
    ? items.map((item) => row(item.title, item.meta, item.status))
    : [row("No reconciliation decisions", "Admin settlement and exception actions will appear here", "empty")];
}

function reconciliationExceptions() {
  return [
    ...(state.reconciliation?.duplicateWebhookEvents || []).map((item) => ({ ...item, itemType: "duplicate_webhook" })),
    ...(state.reconciliation?.failedWalletLookups || []).map((item) => ({ ...item, itemType: "wallet_lookup_failure" }))
  ];
}

function providerReadinessRows() {
  const services = state.readiness?.services;
  if (!Array.isArray(services) || !services.length) {
    return [
      row("PayVessel", "Wallet account/card issuing, deposits, transfers, KYC and webhook settlement.", "unknown"),
      row("Supabase", "Production database, auth profile tables, role data, ledgers and audit logs.", "unknown"),
      row("Production auth", "JWT/session checks, OTP/OAuth, and role-based authorization.", "unknown"),
      row("AI approval service", "Policy scoring, product image/writeup review, risk thresholds.", "unknown")
    ];
  }
  return services.map((service) => row(service.label, service.detail, service.status));
}

function roleApplicationCard([name, status, text]) {
  const role = name.toLowerCase();
  const active = hasRole(role);
  return `
    <article class="role-card">
      <span class="pill ${active ? "good" : ""}">${active ? "Active" : status}</span>
      <h3>${name}</h3>
      <p>${text}</p>
      <button class="btn secondary full" onclick="${active ? `openRoleDashboard('${role}')` : `applyForRole('${role}')`}">${active ? "Open dashboard" : "Apply / Add role"}</button>
    </article>
  `;
}

function roleDashboardPanel() {
  const active = ["vendor", "financier", "logistics", "corporate"].filter(hasRole);
  if (!active.length) {
    return `
      <section class="role-dashboard-panel">
        <h2>Role dashboards</h2>
        <p>Add a vendor, financier, logistics, or corporate role from Settings to unlock its dedicated dashboard.</p>
        <button class="btn secondary full" onclick="goToScreen('settings')">Add role</button>
      </section>
    `;
  }
  return `
    <section class="role-dashboard-panel">
      <h2>Role dashboards</h2>
      <div class="role-dashboard-links">
        ${active.map((role) => `<button onclick="openRoleDashboard('${role}')"><strong>${roleLabel(role)}</strong><span>${roleSummary(role)}</span></button>`).join("")}
      </div>
    </section>
  `;
}

function roleLockedScreen(label, text) {
  return `
    <main class="mobile-frame">
      ${screenHeader(`${label} role required`, text, "settings")}
      <section class="empty-state">
        <h2>Add ${label} role</h2>
        <p>${text}</p>
        <button class="btn primary full" onclick="applyForRole('${label.toLowerCase()}')">Apply / Add role</button>
      </section>
    </main>
  `;
}

function roleMetric(label, value, screen = "", action = "Open") {
  const handler = screen ? `goToScreen('${screen}')` : `showToast('${label} opened')`;
  return `<button type="button" class="role-metric-card interactive-card" onclick="${handler}" aria-label="${label}: ${action}"><span>${label}</span><strong>${value}</strong><b>${action}</b></button>`;
}

function roleAction(title, text, screen) {
  return `<button type="button" class="role-action-card" onclick="${screen ? `goToScreen('${screen}')` : `showToast('${title} opened')`}" aria-label="${title}"><strong>${title}</strong><span>${text}</span><b>Open</b></button>`;
}

function rolePanel(title, rows) {
  return `<section class="role-panel"><h2>${title}</h2>${rows.map((item) => `<p>${item}</p>`).join("")}</section>`;
}

function roleCapabilityChecklist(title, rows) {
  return `
    <section class="role-capability-list">
      <h2>${title}</h2>
      ${rows.map((item) => `<div><span>✓</span><p>${item}</p></div>`).join("")}
    </section>
  `;
}

function rolePage(role, title, subtitle, backScreen, body) {
  if (!hasRole(role)) return roleLockedScreen(roleLabel(role), subtitle);
  return `
    <main class="mobile-frame role-dashboard">
      ${screenHeader(title, subtitle, backScreen)}
      ${body}
    </main>
  `;
}

function roleRecord(title, meta, status, note, action, handler) {
  const actionHandler = handler || `showToast('${action}: ${title}')`;
  return `
    <article class="role-record" role="button" tabindex="0" onclick="${actionHandler}" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); ${actionHandler}; }">
      <div>
        <strong>${title}</strong>
        <span>${meta}</span>
        <p>${note}</p>
      </div>
      <button class="btn secondary" onclick="event.stopPropagation(); ${actionHandler}">${action}</button>
      <em>${status}</em>
    </article>
  `;
}

function formField(label, placeholder, id, value = "") {
  return `<label><span>${label}</span><input ${id ? `id="${id}"` : ""} placeholder="${placeholder}" value="${value}" /></label>`;
}

function textAreaField(label, placeholder, id, value = "") {
  return `<label><span>${label}</span><textarea ${id ? `id="${id}"` : ""} placeholder="${placeholder}">${value}</textarea></label>`;
}

function optionSet(options, selected = "") {
  return options.map((option) => `<option value="${option}" ${option === selected ? "selected" : ""}>${option}</option>`).join("");
}

function fileUploadField(label, id, hint) {
  return `
    <label class="role-file-field">
      <span>${label}</span>
      <input id="${id}" type="file" accept="image/*" multiple onchange="previewSelectedFiles('${id}')" />
      <small>${hint}</small>
      <div id="${id}Preview" class="role-file-preview">No photos selected yet</div>
    </label>
  `;
}

function selectedFileNames(id) {
  return Array.from(document.querySelector(`#${id}`)?.files || []).map((file) => file.name);
}

function selectedFileImages(id) {
  return state.pendingUploadImages[id] || selectedFileNames(id).map((name) => ({ name, url: "" }));
}

function photoSummary(photos = []) {
  const count = Array.isArray(photos) ? photos.length : 0;
  return count ? `${count} photo${count === 1 ? "" : "s"} uploaded` : "No photos yet";
}

function imageUrlFromPhoto(photo) {
  return typeof photo === "string" ? "" : photo?.url || "";
}

function itemGalleryImages(item) {
  const base = item.image || item.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";
  const uploaded = Array.isArray(item.photos) ? item.photos.map(imageUrlFromPhoto).filter(Boolean) : [];
  const extras = [
    base,
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80"
  ];
  return Array.from(new Set(uploaded.concat(extras).filter(Boolean))).slice(0, 5);
}

function imageGallery(item, title = "Product photos") {
  const images = itemGalleryImages(item);
  return `
    <section class="product-picture-view" aria-label="${title}">
      <div class="picture-main" style="background-image:url('${images[0]}')"></div>
      <div class="picture-thumbs">
        ${images.slice(0, 5).map((image, index) => `<button onclick="previewGalleryImage(this)" class="${index === 0 ? "active" : ""}" style="background-image:url('${image}')" aria-label="View image ${index + 1}"></button>`).join("")}
      </div>
    </section>
  `;
}

function walletRoleRow([title, meta, amount]) {
  const value = amount < 0 ? `-${money.format(Math.abs(amount))}` : money.format(amount);
  return `
    <article class="role-wallet-row">
      <div><strong>${title}</strong><span>${meta}</span></div>
      <b>${value}</b>
    </article>
  `;
}

function defaultUserWallet() {
  return {
    id: "wal_usr_ada",
    balance: 185000,
    ledger: [
      { title: "Opening balance", meta: "Personal QML wallet", amount: 185000 }
    ]
  };
}

function normalizeUserWallet(saved) {
  const wallet = saved || defaultUserWallet();
  return {
    id: wallet.id || "wal_usr_ada",
    balance: Number(wallet.balance || 0),
    ledger: Array.isArray(wallet.ledger) && wallet.ledger.length ? wallet.ledger : defaultUserWallet().ledger
  };
}

function normalizeApiUserWallet(wallets = [], transactions = []) {
  const wallet = wallets.find((item) => item.owner_type === "customer" || /personal/i.test(item.label || "")) || wallets[0];
  if (!wallet) return null;
  const ledger = transactions
    .filter((txn) => txn.wallet_id === wallet.id)
    .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")))
    .map((txn) => ({
      title: formatStatus(txn.type || "Wallet activity"),
      meta: txn.description || txn.status || "Wallet activity",
      amount: Number(txn.amount || 0),
      time: txn.created_at
    }));
  return normalizeUserWallet({
    id: wallet.id,
    balance: Number(wallet.available_balance ?? wallet.balance ?? 0),
    ledger: ledger.length ? ledger : [{ title: "Opening balance", meta: wallet.label || "Personal QML wallet", amount: Number(wallet.balance || 0) }]
  });
}

function normalizeApiRoleWallets(roleData, wallets = [], transactions = []) {
  return ["vendor", "financier", "logistics", "corporate"].reduce((next, role) => {
    const wallet = wallets.find((item) => item.owner_type === role || String(item.label || "").toLowerCase().includes(role));
    if (!wallet) return next;
    const current = next[role]?.walletAccount || defaultRoleWallet(role);
    const ledger = transactions
      .filter((txn) => txn.wallet_id === wallet.id)
      .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")))
      .map((txn) => ({
        title: formatStatus(txn.type || "Wallet activity"),
        meta: txn.description || txn.status || "Wallet activity",
        amount: Number(txn.amount || 0),
        time: txn.created_at
      }));
    next[role] = {
      ...next[role],
      walletAccount: {
        ...current,
        id: wallet.id,
        label: wallet.label || current.label,
        balance: Number(wallet.available_balance ?? wallet.balance ?? current.balance ?? 0),
        escrow: Number(wallet.escrow_balance ?? current.escrow ?? 0),
        ledger: ledger.length ? ledger : current.ledger
      }
    };
    return next;
  }, { ...roleData });
}

function normalizeApiActiveRoles(roles) {
  if (Array.isArray(roles)) {
    return roles.reduce((next, item) => {
      if (item.status === "active") next[String(item.role).toLowerCase()] = true;
      return next;
    }, {});
  }
  return Object.entries(roles || {}).reduce((next, [role, status]) => {
    if (status === "active") next[String(role).toLowerCase()] = true;
    return next;
  }, {});
}

function applyAuthBundle(bundle, { onboardingComplete = true, showPromo = true } = {}) {
  state.authSession = bundle.session || null;
  state.user = bundle.user || state.user;
  state.plans = bundle.plans || state.plans;
  state.activeRoles = normalizeApiActiveRoles(bundle.roles);
  state.roleData = normalizeApiRoleWallets(state.roleData, bundle.wallets, bundle.transactions);
  state.userWallet = normalizeApiUserWallet(bundle.wallets, bundle.transactions) || state.userWallet;
  state.authComplete = true;
  state.onboardingComplete = onboardingComplete;
  state.screen = "home";
  state.loginPromoVisible = showPromo;
  localStorage.setItem("qmlAuthSession", JSON.stringify(state.authSession));
  localStorage.setItem("qmlAuthComplete", "true");
  localStorage.setItem("qmlOnboardingComplete", String(onboardingComplete));
  localStorage.setItem("qmlScreen", "home");
  localStorage.setItem("qmlUserProfile", JSON.stringify(state.user));
  localStorage.setItem("qmlActiveRoles", JSON.stringify(state.activeRoles));
  persistUserWallet();
  persistRoleData();
}

function handleAuthContinuation(response) {
  if (response?.authorizationUrl) {
    window.location.href = response.authorizationUrl;
    return true;
  }
  if (response?.requiresConfirmation || response?.session?.status === "pending_confirmation") {
    state.authSession = response.session || null;
    state.authScreen = "signin";
    localStorage.setItem("qmlAuthSession", JSON.stringify(state.authSession));
    localStorage.setItem("qmlAuthScreen", "signin");
    renderMobileApp();
    setTimeout(() => window.showToast(response.message || "Check your email or phone to confirm your account."), 0);
    return true;
  }
  return false;
}

function roleWallet(role) {
  if (!state.roleData[role]) return defaultRoleWallet(role);
  if (!state.roleData[role].walletAccount) {
    state.roleData[role].walletAccount = defaultRoleWallet(role);
  }
  return state.roleData[role].walletAccount;
}

function defaultRoleWallet(role) {
  const labels = {
    vendor: "Vendor wallet",
    financier: "Financier wallet",
    logistics: "Logistics wallet",
    corporate: "Corporate wallet"
  };
  const seed = {
    vendor: 245000,
    financier: 42100000,
    logistics: 30200,
    corporate: 1200000
  };
  return {
    id: {
      vendor: "wal_vendor_001",
      financier: "wal_financier_ada",
      logistics: "wal_logistics_demo",
      corporate: "wal_corporate_demo"
    }[role],
    label: labels[role],
    balance: seed[role] || 0,
    escrow: role === "vendor" ? 612000 : role === "financier" ? 8200000 : 0,
    pending: role === "logistics" ? 188000 : 0,
    ledger: [
      { title: `${labels[role]} created`, meta: "Role activated on this account", amount: seed[role] || 0 }
    ]
  };
}

function activeRoleWalletCards() {
  return ["vendor", "financier", "logistics", "corporate"].filter(hasRole).map((role) => {
    const wallet = roleWallet(role);
    return `
      <article class="role-wallet-row">
        <div><strong>${wallet.label}</strong><span>${roleSummary(role)} - escrow/pending ${money.format(Number(wallet.escrow || wallet.pending || 0))}</span></div>
        <b>${money.format(wallet.balance)}</b>
      </article>
    `;
  });
}

function roleWalletLedgerRows() {
  return ["vendor", "financier", "logistics", "corporate"].filter(hasRole).flatMap((role) => {
    const wallet = roleWallet(role);
    return wallet.ledger.slice(0, 4).map((item) => orderRow(`${wallet.label}: ${item.title}`, item.meta, money.format(item.amount)));
  });
}

function addWalletLedger(target, title, meta, amount) {
  const entry = { title, meta, amount: Number(amount || 0), time: new Date().toLocaleString() };
  if (target === "user") {
    state.userWallet.ledger = [entry, ...state.userWallet.ledger].slice(0, 30);
    state.userWallet.balance += entry.amount;
    return;
  }
  const wallet = roleWallet(target);
  wallet.ledger = [entry, ...wallet.ledger].slice(0, 30);
  wallet.balance += entry.amount;
}

function walletQuickAction(label, icon, handler) {
  return `<button class="wallet-quick-action ${icon}" onclick="${handler}"><span aria-hidden="true"></span><b>${label}</b></button>`;
}

function combinedWalletHistory() {
  const personal = state.userWallet.ledger.map((item) => ({ ...item, wallet: "Personal wallet" }));
  const roleItems = ["vendor", "financier", "logistics", "corporate"].filter(hasRole).flatMap((role) => {
    const wallet = roleWallet(role);
    return wallet.ledger.map((item) => ({ ...item, wallet: wallet.label }));
  });
  return personal.concat(roleItems).slice(0, 60);
}

function walletHistoryRow(item) {
  const amount = Number(item.amount || 0);
  const payload = encodeURIComponent(JSON.stringify(item));
  return `
    <article class="wallet-history-row" onclick="openWalletDocument('${payload}', '${amount < 0 ? "invoice" : "receipt"}')" role="button" tabindex="0">
      <div>
        <strong>${item.title}</strong>
        <span>${item.wallet || "Wallet"} - ${item.meta}</span>
        <small>${item.time || "Recent"}</small>
      </div>
      <b class="${amount < 0 ? "negative" : "positive"}">${amount < 0 ? "-" : "+"}${money.format(Math.abs(amount))}</b>
    </article>
  `;
}

function renderDocumentScreen(kind, subtitle) {
  const doc = state.documentView || {};
  const amount = Number(doc.amount || 0);
  return `
    <main class="mobile-frame">
      ${screenHeader(kind, subtitle, "wallet")}
      <section class="document-card">
        <div class="document-mark">QML</div>
        <p class="eyebrow">${kind.toUpperCase()} #${doc.id || Date.now().toString().slice(-6)}</p>
        <h1>${doc.title || "Wallet activity"}</h1>
        <div class="role-status-row"><span>Wallet</span><strong>${doc.wallet || "Personal wallet"}</strong></div>
        <div class="role-status-row"><span>Description</span><strong>${doc.meta || "QML transaction"}</strong></div>
        <div class="role-status-row"><span>Amount</span><strong>${amount < 0 ? "-" : "+"}${money.format(Math.abs(amount))}</strong></div>
        ${doc.trackingId ? `<div class="role-status-row"><span>Tracking ID</span><strong>${doc.trackingId}</strong></div>` : ""}
        ${doc.deliveryType ? `<div class="role-status-row"><span>Delivery type</span><strong>${doc.deliveryType}</strong></div>` : ""}
        ${doc.driverDetails ? `<div class="role-status-row"><span>${/bike/i.test(doc.deliveryType || "") ? "Bike tracking" : "Driver details"}</span><strong>${doc.driverDetails}</strong></div>` : ""}
        <div class="role-status-row"><span>Date</span><strong>${doc.time || new Date().toLocaleString()}</strong></div>
        <button class="btn primary full" onclick="showToast('${kind} downloaded')">Download ${kind.toLowerCase()}</button>
        <button class="btn ghost full" onclick="goToScreen('transactions')">Back to history</button>
      </section>
    </main>
  `;
}

function defaultRoleData() {
  return {
    vendor: {
      products: vendorInventoryRows.map(([title, stock, status, note], index) => ({
        id: `ven_prd_${index + 1}`,
        title,
        category: index % 2 ? "Oil & Protein" : "Local food",
        price: [64000, 72000, 34000, 118000][index] || 50000,
        stock,
        status,
        note,
        photos: []
      })),
      packages: extraPackages.slice(0, 4).map((item) => ({
        id: item.id,
        title: item.title,
        items: item.category,
        price: item.price,
        paymentOptions: item.tag,
        discount: "5%",
        type: "Package",
        photos: []
      })),
      promos: [
        { id: "promo_1", title: "Palm Oil Outright Deal", applies: "25L Palm Oil Keg", discount: "5% outright" },
        { id: "promo_2", title: "Plantain Weekly Saver", applies: "Plantain Bunches", discount: "3% weekly contribution" }
      ],
      orders: vendorOrderRows.map(([id, title, status, amount]) => ({ id, title, status, amount })),
      wallet: vendorWalletRows,
      activities: [
        "Palm Oil Keg listing auto-approved by AI",
        "Protein Plus Family Plan sold to 3 customers",
        "Delivery for Lekki order moved to dispatch",
        "Settlement of ₦245,000 ready for wallet withdrawal"
      ]
    },
    financier: {
      opportunities: financierPortfolio.map(([title, district, amount, expectedReturn, risk], index) => ({
        id: `fin_${index + 1}`,
        title,
        district,
        amount,
        expectedReturn,
        risk,
        funded: false
      })),
      transactions: financierTransactionRows.map(([id, title, status, amount]) => ({ id, title, status, amount })),
      wallet: [
        ["Available to finance", "Usable balance for verified opportunities", 42100000],
        ["Currently financed", "Active capital across plans", 8200000]
      ],
      activities: [
        "Monthly Family Food Pack funded - repayment active",
        "Corporate staff packs generated ₦180,000 expected return",
        "Wallet settlement pending risk-cycle confirmation"
      ]
    },
    logistics: {
      trips: logisticsQueue.map(([pickup, dropoff, vehicle, payout, distance], index) => ({
        id: `trip_${index + 1}`,
        pickup,
        dropoff,
        vehicle,
        payout,
        distance,
        status: "Available"
      })),
      earnings: logisticsEarningsRows,
      vehicle: { type: "Bike", plate: "ABC-123XY", capacity: "Small box and cartons", docs: "License and insurance uploaded" },
      availability: { radius: "1-5km", districts: "Yaba, Lekki, Ikeja" },
      activities: [
        "Bonuses unlock after verified proof uploads.",
        "Weekly deductions are calculated before payout.",
        "Discount availability depends on completed delivery streak."
      ]
    },
    corporate: {
      paycycle: "Monthly payroll deduction",
      deduction: 180000,
      staff: [
        { id: "corp_staff_1", name: "Amaka Yusuf", address: "Lekki Phase 1, Lagos", plan: "Monthly Family Food Pack", budget: 180000 },
        { id: "corp_staff_2", name: "Tunde Afolabi", address: "Yaba, Lagos", plan: "Staff Lunch Staples", budget: 150000 },
        { id: "corp_staff_3", name: "Miriam Okafor", address: "Ikeja, Lagos", plan: "Market Saver Weekly Pack", budget: 95000 }
      ],
      orders: [
        { id: "CORP-1024", title: "Staff food distribution", status: "Bank sign-off", amount: 1500000, delivery: "12 staff addresses" },
        { id: "CORP-1025", title: "Weekly produce basket", status: "Vendor preparing", amount: 620000, delivery: "6 staff addresses" }
      ],
      activities: [
        "Payroll deduction file generated for 12 staff members.",
        "Corporate staff packs awaiting bank sign-off.",
        "Closest logistics partner matched within 1.2km.",
        "Funding invoice available for staff distribution."
      ]
    }
  };
}

function normalizeRoleData(saved) {
  const defaults = defaultRoleData();
  const vendor = { ...defaults.vendor, ...(saved.vendor || {}), activities: saved.vendor?.activities || defaults.vendor.activities };
  const financier = { ...defaults.financier, ...(saved.financier || {}), activities: saved.financier?.activities || defaults.financier.activities };
  const logistics = { ...defaults.logistics, ...(saved.logistics || {}), activities: saved.logistics?.activities || defaults.logistics.activities };
  const corporate = { ...defaults.corporate, ...(saved.corporate || {}), activities: saved.corporate?.activities || defaults.corporate.activities };
  vendor.walletAccount = saved.vendor?.walletAccount || defaultRoleWallet("vendor");
  financier.walletAccount = saved.financier?.walletAccount || defaultRoleWallet("financier");
  logistics.walletAccount = saved.logistics?.walletAccount || defaultRoleWallet("logistics");
  corporate.walletAccount = saved.corporate?.walletAccount || defaultRoleWallet("corporate");
  return {
    vendor,
    financier,
    logistics,
    corporate
  };
}

function defaultAddresses() {
  return [
    { id: "addr_home", label: "Home", address: "Lekki Phase 1, Lagos", status: "Default" },
    { id: "addr_office", label: "Office", address: "Victoria Island, Lagos", status: "Verified" }
  ];
}

function defaultCards() {
  return [
    { id: "card_8790", label: "Debit Card", meta: "XXXX XXXX XXXX 8790", status: "Active" },
    { id: "bank_virtual", label: "Bank Transfer", meta: "Virtual account enabled", status: "Open" }
  ];
}

function defaultOrderHistory() {
  return [
    { id: "ord_1", title: "Monthly Family Food Pack", meta: "Delivery eligible - balance remains", status: "Track" },
    { id: "ord_2", title: "1 Bag Rice Group Buy", meta: "2 of 4 members confirmed", status: "Open" },
    { id: "ord_3", title: "Protein Family Pack", meta: "Completed", status: "Review" }
  ];
}

function defaultGroupBuys() {
  return [{
    id: "grp_family_rice",
    name: "Family Rice Circle",
    itemId: "pkg_festive",
    itemTitle: "Festive Bulk Celebration Pack",
    total: 300000,
    memberLimit: 4,
    createdAt: "Today",
    members: [
      { name: "Ada Okafor", status: "Paid", paid: 75000, isOrganizer: true },
      { name: "Chioma O.", status: "Paid", paid: 75000 },
      { name: "Tunde K.", status: "Invited", paid: 0 }
    ]
  }];
}

function persistRoleData() {
  localStorage.setItem("qmlRoleData", JSON.stringify(state.roleData));
}

function persistUserWallet() {
  localStorage.setItem("qmlUserWallet", JSON.stringify(state.userWallet));
}

function persistAdminQueues() {
  localStorage.setItem("qmlRefundRequests", JSON.stringify(state.refundRequests));
  localStorage.setItem("qmlAccountReports", JSON.stringify(state.accountReports));
  localStorage.setItem("qmlSystemEvents", JSON.stringify(state.systemEvents.slice(0, 50)));
}

function addRoleActivity(role, message) {
  const bucket = state.roleData[role];
  if (!bucket) return;
  bucket.activities = [message, ...(bucket.activities || [])].slice(0, 20);
}

function persistCustomerData() {
  localStorage.setItem("qmlFavorites", JSON.stringify(state.favorites));
  localStorage.setItem("qmlAddresses", JSON.stringify(state.addresses));
  localStorage.setItem("qmlCards", JSON.stringify(state.cards));
  localStorage.setItem("qmlUserReviews", JSON.stringify(state.userReviews));
  localStorage.setItem("qmlOrderHistory", JSON.stringify(state.orderHistory));
  localStorage.setItem("qmlCustomPlans", JSON.stringify(state.customPlans));
  localStorage.setItem("qmlCartQuantities", JSON.stringify(state.cartQuantities));
  localStorage.setItem("qmlSelectedPaymentOption", state.selectedPaymentOption);
  localStorage.setItem("qmlGroupBuys", JSON.stringify(state.groupBuys));
}

function inputValue(id, fallback = "") {
  return document.querySelector(`#${id}`)?.value?.trim() || fallback;
}

function emptyInline(text) {
  return `<article class="empty-state compact"><p>${text}</p></article>`;
}

function selectedFinanceOpportunity() {
  return state.roleData.financier.opportunities.find((item) => item.id === state.selectedFinanceOpportunityId) || state.roleData.financier.opportunities[0];
}

function selectedLogisticsTrip() {
  return state.roleData.logistics.trips.find((item) => item.id === state.selectedLogisticsTripId) || state.roleData.logistics.trips[0];
}

function goToRoleSuccess({ title, text, dashboard, nextScreen, nextLabel }) {
  state.roleSuccess = { title, text, dashboard, nextScreen, nextLabel };
  localStorage.setItem("qmlRoleSuccess", JSON.stringify(state.roleSuccess));
  window.goToScreen("roleSuccess");
}

function hasRole(role) {
  const normalized = String(role || "").toLowerCase();
  return Boolean(state.activeRoles?.[normalized]);
}

function roleLabel(role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function roleSummary(role) {
  const summaries = {
    vendor: "Products, stock, sales, promos",
    financier: "Opportunities, returns, risk",
    logistics: "Nearby trips, payout, proof",
    corporate: "Staff packs, paycycle, orders"
  };
  return summaries[role] || "Open dashboard";
}

function updateStat(label, value) {
  return `<article><span>${label}</span><strong>${value}</strong></article>`;
}

function updateCard([type, title, text, time, tag]) {
  return `
    <article class="update-card">
      <div class="update-icon ${type}">${type[0].toUpperCase()}</div>
      <div>
        <div class="split"><strong>${title}</strong><span>${time}</span></div>
        <p>${text}</p>
        <small>${tag}</small>
      </div>
    </article>
  `;
}

function financeRow(item) {
  const amount = Number(item.amount_needed ?? item.amountNeeded ?? 0);
  const expected = Number(item.expected_return ?? item.expectedReturn ?? 0);
  const funded = Number(item.funded_percent ?? item.fundedPercent ?? 0);
  return `<div class="table-row"><div><strong>${item.package_title || item.packageTitle}</strong><small>${money.format(amount)} needed - ${money.format(expected)} return - ${item.risk_rating || item.riskRating} risk</small><div class="progress"><i style="width:${funded}%"></i></div></div></div>`;
}

function quickAction(label, icon, screen) {
  return `<button class="quick-action" onclick="goToScreen('${screen}')"><b>${icon}</b>${label}</button>`;
}

function bottomNav() {
  const item = (screen, icon, label, count = 0) => `<button class="${state.screen === screen ? "active" : ""}" onclick="goToScreen('${screen}')" aria-label="${label}"><b class="nav-icon ${icon}" aria-hidden="true"></b>${count ? `<em class="nav-count">${count}</em>` : ""}<span>${label}</span></button>`;
  return `
    <nav class="bottom-nav">
      ${item("home", "nav-home", "Home")}
      ${item("shop", "nav-shop", "Shop")}
      ${item("cart", "nav-cart", "Cart", cartCount())}
      ${item("plans", "nav-plans", "Plans")}
      ${item("profile", "nav-profile", "Profile", wishlistCount())}
    </nav>
  `;
}

function toastMarkup() {
  return `<div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}

function screenHeader(title, subtitle, backScreen) {
  return `
    <header class="mobile-header">
      <button class="icon-btn" onclick="goToScreen('${backScreen}')" aria-label="Back">&lt;</button>
      <div class="screen-heading">
        <p class="eyebrow">${subtitle}</p>
        <h1>${title}</h1>
      </div>
      <button class="icon-btn count-btn" onclick="goToScreen('cart')" aria-label="Cart">${cartCount()}</button>
    </header>
  `;
}

function selectedPackage() {
  return marketplacePackages().find((item) => item.id === state.selectedPackageId) || marketplacePackages()[0] || {};
}

function cartItems() {
  return state.cart.map((id) => {
    const item = marketplacePackages().find((entry) => entry.id === id);
    if (item) return { ...item, kind: "package", quantity: itemQuantity(id) };
    const product = marketplaceProducts().find((entry) => entry.id === id);
    return product ? { ...product, kind: "product", quantity: itemQuantity(id) } : null;
  }).filter(Boolean);
}

function cartCount() {
  return state.cart.reduce((sum, id) => sum + itemQuantity(id), 0);
}

function wishlistCount() {
  return state.favorites.length;
}

function favoriteIcon(id) {
  return state.favorites.includes(id) ? "♥" : "♡";
}

function cartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.price || 0) * itemQuantity(item.id), 0);
}

function itemQuantity(id) {
  return Math.max(1, Number(state.cartQuantities[id] || 1));
}

function cartRow(item) {
  const meta = item.kind === "product" ? `${item.category} - ${item.vendor}` : `${item.category} - ${item.vendor || "Verified vendor"}`;
  return `
    <article class="cart-row">
      <div>
        <strong>${item.title}</strong>
        <span>${meta} - ${money.format(Number(item.price))} x ${itemQuantity(item.id)}</span>
      </div>
      <div class="cart-row-actions">
        <button class="btn ghost" onclick="changeCartQuantity('${item.id}', -1)">-</button>
        <button class="btn ghost" onclick="changeCartQuantity('${item.id}', 1)">+</button>
        <button class="btn ghost" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    </article>
  `;
}

function emptyState(title, text) {
  return `<article class="empty-state"><h2>${title}</h2><p>${text}</p><button class="btn primary" onclick="goToScreen('shop')">Go to Shop</button></article>`;
}

function paymentOption(key, title, text) {
  return `<button class="${state.selectedPaymentOption === key ? "selected" : ""}" onclick="selectPaymentOption('${key}')"><strong>${title}</strong><span>${text}</span></button>`;
}

function paymentMethod(key, title, text) {
  return `<button class="${state.paymentMethod === key ? "selected" : ""}" onclick="selectPaymentMethod('${key}')"><strong>${title}</strong><span>${text}</span></button>`;
}

function settingsRow(title, text, screen) {
  return `<button class="settings-row" onclick="goToScreen('${screen}')"><div><strong>${title}</strong><span>${text}</span></div><b>></b></button>`;
}

function toggleRow(title, key) {
  const active = Boolean(state.settingsToggles[key]);
  return `<button type="button" class="settings-row" onclick="toggleSetting('${key}')"><div><strong>${title}</strong><span>${active ? "Enabled" : "Disabled"}</span></div><span class="toggle ${active ? "on" : ""}"><i></i></span></button>`;
}

function appearanceToggleRow() {
  const dark = state.theme === "dark";
  return `<button type="button" class="settings-row appearance-row" onclick="toggleTheme()"><div class="appearance-label"><span class="appearance-icon">${dark ? "&#9790;" : "&#9728;"}</span><section><strong>Dark appearance</strong><span>${dark ? "Dark mode enabled" : "Light mode enabled"}</span></section></div><span class="toggle ${dark ? "on" : ""}"><i></i></span></button>`;
}

function chipSection(title, chips) {
  return `
    <section class="chip-section">
      <div class="split"><h2>${title}</h2><button class="text-link" onclick="clearSearchHistory('${title}')">clear</button></div>
      <div class="chip-cloud">${chips.map((chip) => `<button onclick="selectSearchChip('${chip}')">${chip}</button>`).join("")}</div>
    </section>
  `;
}

function checkRow(title) {
  const active = state.selectedMoreOptions.includes(title);
  return `<button type="button" class="check-row ${active ? "active" : ""}" onclick="toggleMoreOption('${title}')"><span>${title}</span><b>${active ? "✓" : ""}</b></button>`;
}

function customBasketFoodOptions() {
  return [
    ["Rice", "10kg", 24000],
    ["Beans", "5kg", 14500],
    ["Garri", "5kg", 7500],
    ["Palm oil", "5L", 11200],
    ["Groundnut oil", "5L", 16000],
    ["Yam", "1 tuber", 4500],
    ["Plantain", "1 bunch", 6500],
    ["Tomatoes", "1 basket", 18500],
    ["Onions", "1 paint bucket", 6200],
    ["Egusi", "2kg", 9800],
    ["Crayfish", "1kg", 8700],
    ["Chicken", "2kg", 15500],
    ["Fish", "2kg", 13200],
    ["Pepper", "1 paint bucket", 7800]
  ];
}

function customBasketOption([name, quantity, price], index) {
  return `
    <button type="button" class="custom-basket-option ${index < 5 ? "selected" : ""}" data-name="${name}" data-quantity="${quantity}" data-price="${price}" onclick="toggleCustomBasketOption(this)">
      <span><strong>${name}</strong><small>${quantity}</small></span>
      <b>${money.format(price)}</b>
    </button>
  `;
}

function vendorCompetitionRows() {
  return [
    ["Mile 12 Fresh Hub", 142000, "best basket price, same-day produce"],
    ["Mainland Grain Depot", 149500, "strong grains and oils pricing"],
    ["Northern Fresh Market", 153000, "bulk discount available"],
    ["QML Verified Retailers", 158500, "balanced stock across all items"]
  ];
}

function orderRow(title, meta, action) {
  return `<article class="list-row"><div><strong>${title}</strong><span>${meta}</span></div><button onclick="handleListAction('${action}', '${title}')">${action}</button></article>`;
}

function simpleListScreen(title, subtitle, backScreen, rows) {
  return `
    <main class="mobile-frame">
      ${screenHeader(title, subtitle, backScreen)}
      <section class="stack">${rows.join("")}</section>
    </main>
  `;
}

function formScreen(title, subtitle, backScreen, fields, action, nextScreen, formType = "generic") {
  return `
    <main class="mobile-frame">
      ${screenHeader(title, subtitle, backScreen)}
      <section class="auth-card form-card">
        ${fields.map((field, index) => `<label>${field}</label><input id="${formType}Field${index}" placeholder="${field}" />`).join("")}
        <button class="btn primary full" onclick="submitGenericForm('${formType}', '${nextScreen}')">${action}</button>
      </section>
    </main>
  `;
}

async function api(path, options = {}) {
  const response = await fetch(path, { headers: requestHeaders(options) });
  if (!response.ok) throw new Error(`API failed: ${path}`);
  return response.json();
}

async function safeApi(path, fallback, options = {}) {
  try {
    return await api(path, options);
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

async function postApi(path, body, options = {}) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...requestHeaders(options) },
    body: JSON.stringify(body)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `API failed: ${path}`);
  return payload;
}

function requestHeaders(options = {}) {
  const headers = { ...authHeaders() };
  if (options.admin) {
    headers["X-Admin-Role"] = localStorage.getItem("qmlAdminRole") || "super_admin";
    const key = localStorage.getItem("qmlAdminApiKey");
    if (key) headers["X-Admin-Api-Key"] = key;
  }
  return headers;
}

function authHeaders() {
  const token = state.authSession?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function clientReference(prefix) {
  return `${prefix}_${currentProfileId()}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`.replace(/[^a-zA-Z0-9_:-]/g, "_");
}

function currentProfileId() {
  return state.user?.id || state.user?.profile_id || "usr_ada";
}

function userWalletId() {
  return state.userWallet?.id || "wal_usr_ada";
}

function roleWalletId(role) {
  const walletIds = {
    vendor: "wal_vendor_001",
    financier: "wal_financier_ada",
    logistics: "wal_logistics_demo",
    corporate: "wal_corporate_demo"
  };
  return roleWallet(role).id || walletIds[role] || `wal_${role}_demo`;
}

function normalizeUser(user) {
  return {
    name: user.full_name || user.name,
    city: user.city,
    country: user.country,
    walletBalance: Number(user.wallet_balance ?? user.walletBalance ?? 0),
    qmlScore: Number(user.qml_score ?? user.qmlScore ?? 0),
    creditLimit: Number(user.credit_limit ?? user.creditLimit ?? 0),
    referralCode: user.referral_code ?? user.referralCode
  };
}

function normalizePlan(plan) {
  return {
    title: plan.title,
    total: Number(plan.total_amount ?? plan.total ?? 0),
    paid: Number(plan.paid_amount ?? plan.paid ?? 0),
    status: plan.status
  };
}

function firstName(name) {
  return String(name || "there").split(" ")[0];
}

function formatStatus(value = "") {
  return String(value).replaceAll("_", " ");
}

function purposeHint(purpose) {
  const hints = {
    "Buy food for myself": "Shop packages and pay small-small.",
    "Buy food for family/group": "Create group buys and split bulk food.",
    "Sell food as a vendor": "Apply to upload products and packages.",
    "Finance food plans": "Fund verified baskets and track returns.",
    "Deliver orders": "Register vehicles and accept trips.",
    "Buy for staff/business": "Distribute food directly to staff."
  };
  return hints[purpose] || "Continue with QML.";
}

function persistOnboardingStep() {
  localStorage.setItem("qmlOnboardingStep", String(state.onboardingStep));
}

window.goToScreen = function goToScreen(screen) {
  if (screen === "signout") {
    state.authComplete = false;
    state.authSession = null;
    state.authScreen = "splash";
    localStorage.removeItem("qmlAuthComplete");
    localStorage.removeItem("qmlAuthSession");
    localStorage.setItem("qmlAuthScreen", "splash");
    renderMobileApp();
    resetPageScroll();
    return;
  }
  state.screen = screen;
  localStorage.setItem("qmlScreen", screen);
  renderMobileApp();
  resetPageScroll();
};

window.goAuth = function goAuth(screen) {
  state.authScreen = screen;
  localStorage.setItem("qmlAuthScreen", screen);
  renderMobileApp();
  resetPageScroll();
};

function resetPageScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.querySelector("#app")?.scrollTo?.(0, 0);
  document.querySelector("main")?.scrollTo?.(0, 0);
}

window.startGroupForItem = function startGroupForItem(id) {
  state.selectedPackageId = id;
  localStorage.setItem("qmlSelectedPackageId", id);
  window.goToScreen("createGroup");
};

window.previewGroupSplit = function previewGroupSplit() {
  const item = allMarketplaceItems().find((entry) => entry.id === inputValue("groupItem", "")) || allMarketplaceItems()[0];
  const count = Number(inputValue("groupSize", "4")) || 4;
  const preview = document.querySelector("#groupSplitPreview");
  if (preview) preview.innerHTML = groupSplitPreview(item, count);
};

window.createGroupBuy = function createGroupBuy() {
  if (!document.querySelector("#groupAgreement")?.checked) {
    showToast("Accept the protected payment agreement to continue");
    return;
  }
  const item = allMarketplaceItems().find((entry) => entry.id === inputValue("groupItem", "")) || allMarketplaceItems()[0];
  const memberLimit = Math.max(2, Number(inputValue("groupSize", "4")) || 4);
  const group = {
    id: `grp_${Date.now()}`,
    name: inputValue("groupName", `${firstName(normalizeUser(state.user).name)}'s Food Circle`),
    itemId: item.id,
    itemTitle: item.title,
    total: Number(item.price || 0),
    memberLimit,
    createdAt: "Just now",
    members: [{ name: normalizeUser(state.user).name, status: "Pending", paid: 0, isOrganizer: true }]
  };
  state.groupBuys.unshift(group);
  state.selectedGroupId = group.id;
  localStorage.setItem("qmlSelectedGroupId", group.id);
  persistCustomerData();
  window.goToScreen("groupInvite");
  showToast("Group created. Invite members to join");
};

window.openGroupBuy = function openGroupBuy(id) {
  state.selectedGroupId = id;
  localStorage.setItem("qmlSelectedGroupId", id);
  window.goToScreen("groupDetail");
};

window.inviteGroupMember = function inviteGroupMember() {
  const group = selectedGroupBuy();
  if (!group) return;
  if (group.members.length >= group.memberLimit) {
    showToast("This group already has all member slots filled");
    return;
  }
  const name = inputValue("groupInviteName", "Invited member");
  const contact = inputValue("groupInviteContact", "Private invitation");
  group.members.push({ name, contact, status: "Invited", paid: 0 });
  persistCustomerData();
  window.goToScreen("groupDetail");
  showToast(`Invitation sent to ${name}`);
};

window.copyGroupLink = async function copyGroupLink() {
  const group = selectedGroupBuy();
  const link = `${window.location.origin}/app?group=${encodeURIComponent(group?.id || "invite")}`;
  try { await navigator.clipboard.writeText(link); } catch (error) { /* Clipboard may require browser permission. */ }
  showToast("Private group invitation link copied");
};

window.payGroupShare = function payGroupShare() {
  const group = selectedGroupBuy();
  if (!group) return;
  const member = group.members.find((entry) => entry.isOrganizer);
  if (member?.status === "Paid") {
    showToast("Your group share is already paid");
    return;
  }
  const share = Math.ceil(group.total / group.memberLimit);
  if (state.userWallet.balance < share) {
    showToast("Fund your QML wallet to pay this share");
    window.goToScreen("deposit");
    return;
  }
  state.userWallet.balance -= share;
  member.status = "Paid";
  member.paid = share;
  state.userWallet.ledger.unshift({ id: `GRP-${Date.now()}`, title: `Group share - ${group.name}`, meta: "Successful - Just now", amount: -share, type: "Group payment" });
  persistUserWallet();
  persistCustomerData();
  renderMobileApp();
  showToast("Your group share was paid successfully");
};

window.markGroupMemberPaid = function markGroupMemberPaid(index) {
  const group = selectedGroupBuy();
  const member = group?.members[index];
  if (!member || member.status === "Paid") return;
  member.status = "Paid";
  member.paid = Math.ceil(group.total / group.memberLimit);
  persistCustomerData();
  renderMobileApp();
  showToast(`${member.name}'s payment confirmed`);
};

window.completeGroupCheckout = function completeGroupCheckout() {
  const group = selectedGroupBuy();
  if (!group) return;
  const paid = group.members.reduce((sum, member) => sum + Number(member.paid || 0), 0);
  if (paid < group.total) {
    showToast("Every share must be paid before checkout");
    return;
  }
  if (!state.cart.includes(group.itemId)) state.cart.push(group.itemId);
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  window.goToScreen("checkout");
  showToast("Group fully funded. Complete delivery details");
};

window.nextIntroSlide = function nextIntroSlide() {
  state.introSlide = Math.min(introSlides.length - 1, state.introSlide + 1);
  localStorage.setItem("qmlIntroSlide", String(state.introSlide));
  renderMobileApp();
};

window.previousIntroSlide = function previousIntroSlide() {
  state.introSlide = Math.max(0, state.introSlide - 1);
  localStorage.setItem("qmlIntroSlide", String(state.introSlide));
  renderMobileApp();
};

window.setIntroSlide = function setIntroSlide(index) {
  state.introSlide = Math.max(0, Math.min(introSlides.length - 1, Number(index || 0)));
  localStorage.setItem("qmlIntroSlide", String(state.introSlide));
  renderMobileApp();
};

window.startSplashSwipe = function startSplashSwipe(event) {
  state.splashDragStart = event.clientX || 0;
};

window.finishSplashSwipe = function finishSplashSwipe(event) {
  const delta = (event.clientX || 0) - Number(state.splashDragStart || 0);
  if (Math.abs(delta) < 36) return;
  if (delta < 0) window.nextIntroSlide();
  else window.previousIntroSlide();
};

window.selectSignupRole = function selectSignupRole(role) {
  state.signupRole = role;
  localStorage.setItem("qmlSignupRole", role);
  renderMobileApp();
};

window.beginRoleSignup = async function beginRoleSignup() {
  state.onboarding.purpose = signupPurposeForRole(state.signupRole);
  localStorage.setItem("qmlSignupRole", state.signupRole);
  const name = inputValue("signupName", "Ada Okonkwo");
  const identifier = inputValue("signupIdentifier", "+2348012345678");
  const referralCode = inputValue("signupReferral", "");
  try {
    const bundle = await postApi("/api/auth/signup", {
      name,
      identifier,
      password: inputValue("signupPassword", ""),
      role: state.signupRole,
      referralCode
    });
    if (handleAuthContinuation(bundle)) return;
    applyAuthBundle(bundle, { onboardingComplete: false, showPromo: false });
    state.onboardingStep = 1;
    persistOnboardingStep();
    renderMobileApp();
    setTimeout(() => window.showToast(`${roleLabel(state.signupRole)} account created`), 0);
  } catch (error) {
    console.warn(error);
    window.showToast(error.message || "Could not create account");
  }
};

function signupPurposeForRole(role) {
  const map = {
    customer: "Buy food for myself",
    vendor: "Sell food as a vendor",
    financier: "Finance food plans",
    logistics: "Deliver orders",
    corporate: "Buy for staff/business"
  };
  return map[role] || map.customer;
}

window.continueWithProvider = async function continueWithProvider(provider, mode) {
  try {
    const bundle = await postApi("/api/auth/provider", {
      provider,
      name: provider === "google" ? "Google User" : "Apple User",
      email: `${provider}.user@qml.local`,
      referralCode: state.onboarding.referralCode || ""
    });
    if (handleAuthContinuation(bundle)) return;
    const onboardingComplete = mode === "signin";
    applyAuthBundle(bundle, { onboardingComplete, showPromo: onboardingComplete });
    if (!onboardingComplete) {
      state.onboardingStep = 1;
      persistOnboardingStep();
    }
    renderMobileApp();
    setTimeout(() => window.showToast(`${provider === "google" ? "Google" : "Apple"} ${mode} connected`), 0);
  } catch (error) {
    console.warn(error);
    window.showToast(error.message || "Provider sign in failed");
  }
};

window.toggleSetting = function toggleSetting(key) {
  state.settingsToggles[key] = !state.settingsToggles[key];
  localStorage.setItem("qmlSettingsToggles", JSON.stringify(state.settingsToggles));
  renderMobileApp();
};

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.colorScheme = state.theme;
}

window.toggleTheme = function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("qmlTheme", state.theme);
  applyTheme();
  renderMobileApp();
  showToast(`${state.theme === "dark" ? "Dark" : "Light"} appearance enabled`);
};

window.finishAuth = async function finishAuth() {
  try {
    const bundle = await postApi("/api/auth/signin", {
      identifier: inputValue("authIdentifier", "ada@example.com"),
      password: inputValue("authPassword", "")
    });
    if (handleAuthContinuation(bundle)) return;
    applyAuthBundle(bundle, { onboardingComplete: true, showPromo: true });
    renderMobileApp();
  } catch (error) {
    console.warn(error);
    window.showToast(error.message || "Sign in failed");
  }
};

window.dismissLoginPromo = function dismissLoginPromo() {
  state.loginPromoVisible = false;
  renderMobileApp();
};

window.openLoginPromoOffer = function openLoginPromoOffer() {
  state.loginPromoVisible = false;
  window.goToScreen("rewards");
};

window.scrollChipRow = function scrollChipRow(button, direction) {
  const shell = button.closest(".scroll-chip-shell");
  const row = shell?.querySelector(".scroll-chip-row");
  if (!row) return;
  row.scrollBy({ left: direction * Math.max(180, row.clientWidth * 0.72), behavior: "smooth" });
};

window.selectFilterRating = function selectFilterRating(button, rating) {
  button.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  button.dataset.rating = rating;
};

function activateSignupRole() {
  if (!state.signupRole || state.signupRole === "customer") return;
  state.activeRoles = { ...state.activeRoles, [state.signupRole]: true };
  if (state.roleData[state.signupRole]) {
    roleWallet(state.signupRole);
    addWalletLedger(state.signupRole, `${roleLabel(state.signupRole)} signup activated`, "Role access granted from signup", 0);
  }
  localStorage.setItem("qmlActiveRoles", JSON.stringify(state.activeRoles));
  persistRoleData();
}

window.selectCategory = function selectCategory(category) {
  state.selectedCategory = category;
  localStorage.setItem("qmlSelectedCategory", category);
  window.goToScreen("products");
};

window.selectMarketplaceFilter = function selectMarketplaceFilter(filter) {
  state.selectedFilter = filter;
  localStorage.setItem("qmlSelectedFilter", filter);
  renderMobileApp();
};

window.toggleMoreOption = function toggleMoreOption(option) {
  const selected = new Set(state.selectedMoreOptions || []);
  if (selected.has(option)) selected.delete(option);
  else selected.add(option);
  state.selectedMoreOptions = Array.from(selected);
  localStorage.setItem("qmlSelectedMoreOptions", JSON.stringify(state.selectedMoreOptions));
  renderMobileApp();
};

window.openProductReview = function openProductReview(id) {
  state.selectedProductId = id;
  localStorage.setItem("qmlSelectedProductId", id);
  window.goToScreen("productReview");
};

window.openItemDetail = function openItemDetail(id) {
  const item = allMarketplaceItems().find((entry) => entry.id === id);
  const isPackage = marketplacePackages().some((entry) => entry.id === id) || item?.unit === "package";
  if (isPackage) {
    window.selectPackage(id);
    return;
  }
  window.openProductReview(id);
};

window.cardKeyOpen = function cardKeyOpen(event, id) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    window.openItemDetail(id);
  }
};

window.openPlanDetail = function openPlanDetail(id) {
  state.selectedPlanId = id;
  localStorage.setItem("qmlSelectedPlanId", id);
  window.goToScreen("payment");
};

window.cardKeyOpenPlan = function cardKeyOpenPlan(event, id) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    window.openPlanDetail(id);
  }
};

window.openPlanDelivery = function openPlanDelivery(id) {
  state.selectedPlanId = id;
  localStorage.setItem("qmlSelectedPlanId", id);
  window.goToScreen("shippingMethod");
};

window.selectPackage = function selectPackage(id) {
  state.selectedPackageId = id;
  state.selectedProductId = id;
  localStorage.setItem("qmlSelectedPackageId", id);
  localStorage.setItem("qmlSelectedProductId", id);
  window.goToScreen("detail");
};

window.addToCart = function addToCart(id) {
  if (!state.cart.includes(id)) state.cart.push(id);
  state.cartQuantities[id] = itemQuantity(id);
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  persistCustomerData();
  window.goToScreen("cart");
};

window.buyNow = function buyNow(id) {
  if (!state.cart.includes(id)) state.cart.push(id);
  state.cartQuantities[id] = itemQuantity(id);
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  persistCustomerData();
  window.goToScreen("checkout");
};

window.addProductToCart = function addProductToCart(id) {
  if (!state.cart.includes(id)) state.cart.push(id);
  state.cartQuantities[id] = itemQuantity(id);
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  persistCustomerData();
  renderMobileApp();
  setTimeout(() => window.showToast(`Added to cart (${cartCount()})`), 0);
};

window.addProductAndCheckout = function addProductAndCheckout(id) {
  if (!state.cart.includes(id)) state.cart.push(id);
  state.cartQuantities[id] = itemQuantity(id);
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  persistCustomerData();
  window.goToScreen("checkout");
};

window.removeFromCart = function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item !== id);
  delete state.cartQuantities[id];
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  persistCustomerData();
  renderMobileApp();
};

window.changeCartQuantity = function changeCartQuantity(id, delta) {
  if (!state.cart.includes(id)) state.cart.push(id);
  state.cartQuantities[id] = Math.max(1, itemQuantity(id) + Number(delta || 0));
  localStorage.setItem("qmlCart", JSON.stringify(state.cart));
  persistCustomerData();
  renderMobileApp();
};

window.selectPaymentOption = function selectPaymentOption(option) {
  state.selectedPaymentOption = option;
  persistCustomerData();
  renderMobileApp();
};

window.toggleCustomChip = function toggleCustomChip(button) {
  button.classList.toggle("selected");
};

window.toggleCustomBasketOption = function toggleCustomBasketOption(button) {
  button.classList.toggle("selected");
};

window.selectBasketVendor = function selectBasketVendor(button, vendor, price) {
  button.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");
  document.querySelector("#customPlanVendor").value = vendor;
  document.querySelector("#customPlanVendorPrice").value = String(price);
};

window.createCustomPlan = function createCustomPlan() {
  const budget = Number(inputValue("customPlanBudget", "150000").replace(/[^\d.]/g, "")) || 150000;
  const selectedFoods = Array.from(document.querySelectorAll(".custom-basket-option.selected")).map((button) => ({
    name: button.dataset.name,
    quantity: button.dataset.quantity,
    price: Number(button.dataset.price || 0)
  }));
  const selectedFoodNames = selectedFoods.map((item) => `${item.name} (${item.quantity})`);
  const paymentOption = document.querySelector("#customPlanPaymentOption")?.value || "Weekly";
  const duration = document.querySelector("#customPlanDuration")?.value || "1 month food basket";
  const vendor = inputValue("customPlanVendor", "Mile 12 Fresh Hub");
  const vendorPrice = Number(inputValue("customPlanVendorPrice", "142000")) || budget;
  const plan = {
    id: `custom_plan_${Date.now()}`,
    title: inputValue("customPlanName", "My Custom Food Basket"),
    total: budget,
    paid: 0,
    status: "custom_active",
    cadence: paymentOption,
    paymentOptions: paymentOption,
    duration,
    vendor,
    vendorPrice,
    priceVariance: budget - vendorPrice,
    items: selectedFoodNames.length ? selectedFoodNames : ["Rice (10kg)", "Beans (5kg)", "Palm oil (5L)", "Tomatoes (1 basket)"],
    selectedFoods,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
  };
  state.customPlans.unshift(plan);
  persistCustomerData();
  goToRoleSuccess({
    title: "Custom basket created",
    text: `${plan.title} was created for ${duration} with ${vendor} at ${money.format(vendorPrice)} and ${paymentOption} payment.`,
    dashboard: "plans",
    nextScreen: "payment",
    nextLabel: "Start saving"
  });
};

window.startPlanPayment = function startPlanPayment(id) {
  state.selectedPlanId = id;
  localStorage.setItem("qmlSelectedPlanId", id);
  window.goToScreen("payment");
};

window.openPlanShare = function openPlanShare(id) {
  state.selectedPlanId = id;
  localStorage.setItem("qmlSelectedPlanId", id);
  window.goToScreen("sharePlan");
};

window.buyPlanForFamily = function buyPlanForFamily(id) {
  state.selectedPlanId = id;
  localStorage.setItem("qmlSelectedPlanId", id);
  window.goToScreen("sharePlan");
  setTimeout(() => window.showToast("Enter the family/friend username and share quantity"), 0);
};

window.confirmPlanShare = function confirmPlanShare() {
  const plan = selectedActivePlan();
  const normalized = normalizePlan(plan);
  const recipient = inputValue("shareRecipient", "@family_member");
  const quantityText = document.querySelector("#shareQuantity")?.value || "1 share";
  const deliveryType = document.querySelector("#shareDeliveryType")?.value || "Bike delivery";
  const address = inputValue("shareAddress", "Receiver address pending");
  const amount = Number((quantityText.match(/₦([\d,]+)/) || [])[1]?.replaceAll(",", "")) || Math.max(1000, Math.round((normalized.total || 100000) / 10));
  const isBike = /bike/i.test(deliveryType);
  const trackingId = `QML-${isBike ? "BIKE" : "DRV"}-${Date.now().toString().slice(-6)}`;
  const driverDetails = isBike
    ? `Bike tracking ID ${trackingId}`
    : `Driver: Ibrahim Sani - ${deliveryType.replace(" delivery", "")} - Plate QML-4821 - Phone +234 801 555 0199`;
  state.orderHistory.unshift({
    id: trackingId,
    title: `${normalized.title} shared with ${recipient}`,
    meta: `${quantityText} - ${deliveryType} - ${address}`,
    status: "Track"
  });
  addWalletLedger("user", "Plan shared", `${recipient} - ${quantityText}`, 0);
  persistUserWallet();
  persistCustomerData();
  openDocumentFromEntry({
    title: `${normalized.title} shared`,
    meta: `${recipient} receives ${quantityText} at ${address}`,
    amount,
    wallet: "Personal wallet",
    trackingId,
    deliveryType,
    driverDetails
  }, "receipt");
};

window.topUpUserWallet = async function topUpUserWallet() {
  const amount = 100000;
  try {
    await postApi("/api/wallets/deposit", { walletId: userWalletId(), amount, description: "Card/bank prototype top up", reference: clientReference("topup") });
  } catch (error) {
    console.warn(error);
    window.showToast("Wallet top up saved locally; backend sync pending");
  }
  addWalletLedger("user", "Wallet top up", "Card/bank prototype top up", amount);
  persistUserWallet();
  window.showToast("Personal wallet topped up by ₦100,000");
  renderMobileApp();
};

window.transferToRoleWallet = async function transferToRoleWallet() {
  const role = ["vendor", "financier", "logistics"].find(hasRole);
  if (!role) {
    window.showToast("Add a role before transferring");
    return;
  }
  const amount = Math.min(50000, state.userWallet.balance);
  if (amount <= 0) {
    window.showToast("Personal wallet balance is too low");
    return;
  }
  try {
    await postApi("/api/wallets/transfer", {
      fromWalletId: userWalletId(),
      toWalletId: roleWalletId(role),
      amount,
      description: `Transfer to ${roleLabel(role)} wallet`,
      reference: clientReference(`transfer_${role}`)
    });
  } catch (error) {
    console.warn(error);
    window.showToast("Transfer saved locally; backend sync pending");
  }
  addWalletLedger("user", `Transfer to ${roleLabel(role)}`, "Role wallet funding", -amount);
  addWalletLedger(role, "Transfer from personal wallet", "Same account role wallet", amount);
  persistUserWallet();
  persistRoleData();
  window.showToast(`${money.format(amount)} transferred to ${roleLabel(role)} wallet`);
  renderMobileApp();
};

window.completeDeposit = async function completeDeposit() {
  const amount = Number(inputValue("depositAmount", "100000").replace(/[^\d.]/g, "")) || 100000;
  const source = document.querySelector("#depositSource")?.value || "Saved card";
  try {
    await postApi("/api/wallets/deposit", { walletId: userWalletId(), amount, description: source, reference: clientReference("deposit") });
  } catch (error) {
    console.warn(error);
    window.showToast("Deposit saved locally; backend sync pending");
  }
  addWalletLedger("user", "Wallet deposit", source, amount);
  persistUserWallet();
  openDocumentFromEntry({ title: "Wallet deposit", meta: source, amount, wallet: "Personal wallet" }, "receipt");
};

window.completeTransfer = async function completeTransfer() {
  const amount = Number(inputValue("transferAmount", "50000").replace(/[^\d.]/g, "")) || 50000;
  const role = document.querySelector("#transferRole")?.value;
  if (!role || !hasRole(role)) {
    window.showToast("Add a role before transferring");
    return;
  }
  if (state.userWallet.balance < amount) {
    window.showToast("Personal wallet balance is too low");
    return;
  }
  try {
    await postApi("/api/wallets/transfer", {
      fromWalletId: userWalletId(),
      toWalletId: roleWalletId(role),
      amount,
      description: `Transfer to ${roleLabel(role)} wallet`,
      reference: clientReference(`transfer_${role}`)
    });
  } catch (error) {
    console.warn(error);
    window.showToast("Transfer saved locally; backend sync pending");
  }
  addWalletLedger("user", `Transfer to ${roleLabel(role)}`, "Role wallet funding", -amount);
  addWalletLedger(role, "Transfer from personal wallet", "Same account role wallet", amount);
  persistUserWallet();
  persistRoleData();
  openDocumentFromEntry({ title: `Transfer to ${roleLabel(role)}`, meta: "Role wallet funding", amount: -amount, wallet: "Personal wallet" }, "receipt");
};

window.activateAutoDebit = function activateAutoDebit() {
  const amount = Number(inputValue("autoDebitAmount", "25000").replace(/[^\d.]/g, "")) || 25000;
  const bank = inputValue("autoDebitBank", "External bank account");
  const frequency = document.querySelector("#autoDebitFrequency")?.value || "Weekly";
  addWalletLedger("user", "Auto debit activated", `${bank} - ${frequency}`, 0);
  persistUserWallet();
  openDocumentFromEntry({ title: "Auto debit mandate", meta: `${bank} - ${frequency} - ${money.format(amount)}`, amount: 0, wallet: "External account" }, "invoice");
};

window.openWalletDocument = function openWalletDocument(payload, type) {
  const item = JSON.parse(decodeURIComponent(payload));
  openDocumentFromEntry(item, type);
};

function openDocumentFromEntry(item, type) {
  state.documentView = { ...item, id: Date.now().toString().slice(-6) };
  localStorage.setItem("qmlDocumentView", JSON.stringify(state.documentView));
  window.goToScreen(type === "invoice" ? "invoice" : "receipt");
}

window.selectPaymentMethod = function selectPaymentMethod(method) {
  state.paymentMethod = method;
  renderMobileApp();
};

window.previewSelectedFiles = function previewSelectedFiles(id) {
  const preview = document.querySelector(`#${id}Preview`);
  const files = Array.from(document.querySelector(`#${id}`)?.files || []);
  state.pendingUploadImages[id] = files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
  if (!preview) return;
  preview.innerHTML = files.length
    ? state.pendingUploadImages[id].map((file) => `<span><i style="background-image:url('${file.url}')"></i>${file.name}</span>`).join("")
    : "No photos selected yet";
  if (files.length && files.length < 3) {
    window.showToast("Minimum 3 images required");
  }
};

window.previewGalleryImage = function previewGalleryImage(button) {
  const gallery = button.closest(".product-picture-view");
  const main = gallery?.querySelector(".picture-main");
  if (!main) return;
  main.style.backgroundImage = button.style.backgroundImage;
  gallery.querySelectorAll(".picture-thumbs button").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
};

window.setReviewRating = function setReviewRating(star) {
  state.pendingRating = star;
  window.showToast(`${star} star rating selected`);
};

window.submitProductReview = function submitProductReview() {
  const text = document.querySelector("#reviewComment")?.value?.trim();
  window.showToast(text ? "Review submitted for moderation" : "Add a comment before submitting");
};

window.startVendorChat = function startVendorChat(vendor) {
  window.showToast(`Encrypted private chat opened with ${vendor}`);
};

window.sendVendorChat = function sendVendorChat(vendor) {
  const input = document.querySelector("#vendorChatInput");
  const text = input?.value?.trim();
  if (!text) {
    window.showToast("Type a delivery question first");
    return;
  }
  const thread = vendorChatMessages(vendor);
  thread.push({ from: "You", text });
  thread.push({ from: vendor, text: "Received. I will only discuss delivery here and payment must stay inside QML wallet." });
  state.vendorChats[vendor] = thread.slice(-12);
  localStorage.setItem("qmlVendorChats", JSON.stringify(state.vendorChats));
  input.value = "";
  window.showToast(`Encrypted private message sent to ${vendor}`);
  renderMobileApp();
};

function vendorChatMessages(vendor) {
  return state.vendorChats[vendor] || [
    { from: "QML secure chat", text: `Messages are encrypted in transit and visible only to this customer and ${vendor}.` },
    { from: vendor, text: "Hi, I can confirm delivery timing once your wallet payment is verified in-app." }
  ];
}

window.selectFoodTag = function selectFoodTag(tag) {
  state.selectedFoodTag = tag;
  state.searchQuery = tag === "All Food" ? "" : tag;
  localStorage.setItem("qmlSelectedFoodTag", state.selectedFoodTag);
  localStorage.setItem("qmlSearchQuery", state.searchQuery);
  renderMobileApp();
};

window.createFoodTag = function createFoodTag() {
  const tag = inputValue("newFoodTagInput", "").trim();
  if (!tag) {
    window.showToast("Enter a food tag first");
    return;
  }
  if (!state.foodTags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
    state.foodTags.push(tag);
    localStorage.setItem("qmlFoodTags", JSON.stringify(state.foodTags));
  }
  state.selectedFoodTag = tag;
  localStorage.setItem("qmlSelectedFoodTag", tag);
  window.showToast(`${tag} tag added`);
  renderMobileApp();
};

window.createFoodTagFromSearch = function createFoodTagFromSearch() {
  state.searchQuery = inputValue("searchInput", state.searchQuery).trim();
  if (!state.searchQuery) {
    window.showToast("Enter food name first");
    return;
  }
  if (!state.foodTags.some((item) => item.toLowerCase() === state.searchQuery.toLowerCase())) {
    state.foodTags.push(state.searchQuery);
    localStorage.setItem("qmlFoodTags", JSON.stringify(state.foodTags));
  }
  state.selectedFoodTag = state.searchQuery;
  localStorage.setItem("qmlSelectedFoodTag", state.selectedFoodTag);
  localStorage.setItem("qmlSearchQuery", state.searchQuery);
  renderMobileApp();
  setTimeout(() => window.showToast(`${state.searchQuery} saved as food tag`), 0);
};

window.applyFoodFilter = function applyFoodFilter() {
  state.selectedFilter = state.selectedFilter || "All";
  localStorage.setItem("qmlSelectedFilter", state.selectedFilter);
  window.goToScreen("shop");
};

window.clearFoodFilter = function clearFoodFilter() {
  state.selectedFoodTag = "All Food";
  state.selectedFilter = "All";
  state.selectedMoreOptions = [];
  state.searchQuery = "";
  localStorage.setItem("qmlSelectedFoodTag", "All Food");
  localStorage.setItem("qmlSelectedFilter", "All");
  localStorage.setItem("qmlSelectedMoreOptions", JSON.stringify([]));
  localStorage.setItem("qmlSearchQuery", "");
  renderMobileApp();
};

window.enableLiveLocation = function enableLiveLocation() {
  state.liveLocation = {
    status: "Live",
    area: inputValue("locationArea", state.onboarding.city || "Lagos"),
    radius: inputValue("locationRadius", "1-5km"),
    lat: "6.5244",
    lng: "3.3792",
    updated: new Date().toLocaleTimeString()
  };
  localStorage.setItem("qmlLiveLocation", JSON.stringify(state.liveLocation));
  state.selectedFilter = "Near Me";
  localStorage.setItem("qmlSelectedFilter", "Near Me");
  goToRoleSuccess({
    title: "Live location enabled",
    text: `Nearby food, vendor, financier, and logistics matching is active around ${state.liveLocation.area}.`,
    dashboard: "profile",
    nextScreen: "proximityMap",
    nextLabel: "View map"
  });
};

window.activateBiometric = function activateBiometric() {
  state.biometricEnabled = true;
  localStorage.setItem("qmlBiometricEnabled", "true");
  addWalletLedger("user", "Biometric security enabled", "Wallet and checkout protection", 0);
  persistUserWallet();
  goToRoleSuccess({
    title: "Biometric activated",
    text: "Fingerprint or face verification is now enabled for wallet, checkout, transfer, and role actions.",
    dashboard: "settings",
    nextScreen: "settings",
    nextLabel: "Back to settings"
  });
};

window.copyReferralCode = function copyReferralCode() {
  const code = normalizeUser(state.user).referralCode;
  navigator.clipboard?.writeText(code);
  window.showToast(`${code} copied`);
};

window.redeemRewards = function redeemRewards() {
  const earned = state.referralRewards.filter((item) => item.status === "Earned");
  const amount = earned.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  if (!amount) {
    window.showToast("No earned reward ready yet");
    return;
  }
  state.referralRewards = state.referralRewards.map((item) => item.status === "Earned" ? { ...item, status: "Redeemed" } : item);
  localStorage.setItem("qmlReferralRewards", JSON.stringify(state.referralRewards));
  addWalletLedger("user", "Referral reward redeemed", "Glow reward wallet credit", amount);
  persistUserWallet();
  goToRoleSuccess({
    title: "Reward redeemed",
    text: `${money.format(amount)} was added to your personal QML wallet.`,
    dashboard: "referrals",
    nextScreen: "wallet",
    nextLabel: "View wallet"
  });
};

window.assignCorporatePack = function assignCorporatePack(id) {
  const staff = state.roleData.corporate.staff.find((item) => item.id === id);
  if (!staff) return;
  state.roleData.corporate.orders.unshift({
    id: `CORP-${Date.now().toString().slice(-4)}`,
    title: `${staff.name} - ${staff.plan}`,
    status: "Assigned",
    amount: staff.budget,
    delivery: staff.address
  });
  addRoleActivity("corporate", `${staff.plan} assigned to ${staff.name}.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Staff pack assigned",
    text: `${staff.name} now has ${staff.plan} linked to ${staff.address}.`,
    dashboard: "corporateDashboard",
    nextScreen: "corporateOrders",
    nextLabel: "View orders"
  });
};

window.addCorporateStaffPack = function addCorporateStaffPack() {
  const staff = {
    id: `corp_staff_${Date.now()}`,
    name: inputValue("corporateStaffName", "New Staff"),
    address: inputValue("corporateStaffAddress", "Staff address"),
    plan: "Custom corporate food basket",
    budget: Number(inputValue("corporateStaffBudget", "180000").replace(/[^\d.]/g, "")) || 180000
  };
  state.roleData.corporate.staff.unshift(staff);
  addRoleActivity("corporate", `${staff.name} added for ${money.format(staff.budget)} staff basket.`);
  persistRoleData();
  window.assignCorporatePack(staff.id);
};

window.moveCorporateOrder = function moveCorporateOrder(id) {
  const order = state.roleData.corporate.orders.find((item) => item.id === id);
  if (!order) return;
  const flow = ["Bank sign-off", "Assigned", "Vendor preparing", "Logistics matched", "Delivered"];
  order.status = flow[Math.min(flow.indexOf(order.status) + 1, flow.length - 1)] || "Assigned";
  addRoleActivity("corporate", `${order.id} moved to ${order.status}.`);
  persistRoleData();
  renderMobileApp();
  window.showToast(`${order.id} moved to ${order.status}`);
};

window.fundCorporateWallet = function fundCorporateWallet() {
  addWalletLedger("corporate", "Corporate wallet funded", "Funding receipt generated", 500000);
  addRoleActivity("corporate", "Corporate wallet funded with ₦500,000.");
  persistRoleData();
  openDocumentFromEntry({ title: "Corporate wallet funded", meta: "Funding receipt generated", amount: 500000, wallet: "Corporate wallet" }, "receipt");
};

window.approveCorporatePayroll = function approveCorporatePayroll() {
  const amount = Number(state.roleData.corporate.deduction || 0);
  addWalletLedger("corporate", "Payroll deduction approved", state.roleData.corporate.paycycle, -amount);
  addRoleActivity("corporate", `${money.format(amount)} payroll deduction approved.`);
  persistRoleData();
  openDocumentFromEntry({ title: "Payroll deduction approved", meta: state.roleData.corporate.paycycle, amount: -amount, wallet: "Corporate wallet" }, "invoice");
};

window.showToast = function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.qmlToastTimer);
  window.qmlToastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
};

window.toggleFavorite = function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((item) => item !== id);
    window.showToast("Removed from favorites");
  } else {
    state.favorites.push(id);
    window.showToast("Saved to favorites");
  }
  persistCustomerData();
  renderMobileApp();
};

window.triggerProfilePhotoUpload = function triggerProfilePhotoUpload() {
  document.querySelector("#profilePhotoInput")?.click();
};

window.uploadProfilePhoto = function uploadProfilePhoto() {
  const file = document.querySelector("#profilePhotoInput")?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.userAvatar = String(reader.result || "");
    localStorage.setItem("qmlUserAvatar", state.userAvatar);
    renderMobileApp();
    setTimeout(() => window.showToast("Profile photo updated"), 0);
  };
  reader.readAsDataURL(file);
};

window.toggleBalanceVisibility = function toggleBalanceVisibility() {
  state.balanceVisible = !state.balanceVisible;
  localStorage.setItem("qmlBalanceVisible", String(state.balanceVisible));
  renderMobileApp();
};

window.submitKycProfile = function submitKycProfile() {
  const details = {
    fullName: inputValue("profileFullName", normalizeUser(state.user).name),
    email: inputValue("profileEmail", ""),
    phone: inputValue("profilePhone", state.onboarding.contact),
    gender: document.querySelector("#profileGender")?.value || "",
    maritalStatus: document.querySelector("#profileMaritalStatus")?.value || "",
    religion: inputValue("profileReligion", ""),
    education: inputValue("profileEducation", ""),
    nin: inputValue("profileNin", ""),
    bvn: inputValue("profileBvn", ""),
    idType: inputValue("profileIdType", ""),
    idPhotos: selectedFileNames("profileIdPhotos"),
    occupation: inputValue("profileOccupation", ""),
    employer: inputValue("profileEmployer", ""),
    workHistory: inputValue("profileWorkHistory", ""),
    income: inputValue("profileIncome", ""),
    nextOfKin: inputValue("profileNextOfKin", ""),
    nextRelation: inputValue("profileNextRelation", ""),
    nextPhone: inputValue("profileNextPhone", ""),
    nextAddress: inputValue("profileNextAddress", "")
  };
  state.profileDetails = details;
  state.user = {
    ...normalizeUser(state.user),
    full_name: details.fullName,
    name: details.fullName,
    email: details.email,
    phone: details.phone,
    country: state.onboarding.country,
    city: state.onboarding.city
  };
  localStorage.setItem("qmlProfileDetails", JSON.stringify(state.profileDetails));
  localStorage.setItem("qmlUserProfile", JSON.stringify(state.user));
  goToRoleSuccess({
    title: "KYC profile saved",
    text: "Your personal, identity, work, education, BVN/NIN, and next-of-kin details were saved for verification.",
    dashboard: "profile",
    nextScreen: "profile",
    nextLabel: "Back to profile"
  });
};

window.selectSearchChip = function selectSearchChip(chip) {
  state.selectedCategory = categories.includes(chip) ? chip : state.selectedCategory;
  state.searchQuery = chip;
  localStorage.setItem("qmlSearchQuery", chip);
  if (categories.includes(chip)) {
    window.goToScreen("products");
    return;
  }
  renderMobileApp();
  setTimeout(() => window.showToast(`Showing results for ${chip}`), 0);
};

window.runSearch = function runSearch() {
  state.searchQuery = inputValue("searchInput", "");
  localStorage.setItem("qmlSearchQuery", state.searchQuery);
  renderMobileApp();
};

window.runAssistedSearch = function runAssistedSearch(mode) {
  state.searchQuery = mode === "image" ? "Fresh produce" : "Rice";
  localStorage.setItem("qmlSearchQuery", state.searchQuery);
  renderMobileApp();
  setTimeout(() => window.showToast(`${mode === "image" ? "Image" : "Voice"} search matched ${state.searchQuery}`), 0);
};

window.contactSupport = function contactSupport() {
  window.goToScreen("support");
};

window.startSupportChat = async function startSupportChat(topic) {
  try {
    await postApi("/api/support/tickets", {
      profileId: currentProfileId(),
      topic,
      message: "Support ticket created. A QML agent can respond inside this secure flow."
    });
  } catch (error) {
    console.warn(error);
    window.showToast("Support ticket saved locally; backend sync pending");
  }
  const tickets = supportTickets();
  tickets.unshift({
    title: topic,
    meta: "Encrypted support chat",
    status: "Open",
    note: "Support ticket created. A QML agent can respond inside this secure flow."
  });
  persistSupportTickets(tickets.slice(0, 8));
  state.selectedUpdateFilter = "Messages";
  localStorage.setItem("qmlSelectedUpdateFilter", "Messages");
  renderMobileApp();
  setTimeout(() => window.showToast(`${topic} support opened`), 0);
};

window.callSupport = function callSupport() {
  window.showToast("Toll-free support call started");
};

window.submitCancelOrder = async function submitCancelOrder() {
  const orderId = document.querySelector("#cancelOrderId")?.value;
  const reason = inputValue("cancelReason", "Customer requested cancellation");
  const order = state.orderHistory.find((item) => item.id === orderId) || state.orderHistory[0];
  if (!order) {
    window.goToScreen("errorState");
    return;
  }
  try {
    await postApi(`/api/orders/${encodeURIComponent(order.id)}/cancel`, { actorId: currentProfileId(), reason });
  } catch (error) {
    console.warn(error);
    window.showToast("Cancellation saved locally; backend sync pending");
  }
  order.status = "Cancelled";
  state.refundRequests.unshift({
    title: "Cancelled order refund",
    meta: `${order.title} - ${reason}`,
    amount: 0,
    status: "Review"
  });
  state.systemEvents.unshift({ title: "Order cancelled", meta: `${order.title} moved to refund review`, status: "review" });
  persistCustomerData();
  persistAdminQueues();
  goToRoleSuccess({
    title: "Order cancelled",
    text: `${order.title} was cancelled and moved to refund review where applicable.`,
    dashboard: "orders",
    nextScreen: "refundRequest",
    nextLabel: "Refund process"
  });
};

window.submitRefundRequest = async function submitRefundRequest() {
  const orderId = document.querySelector("#refundOrderId")?.value;
  const order = state.orderHistory.find((item) => item.id === orderId) || state.orderHistory[0];
  const amount = Number(inputValue("refundAmount", "0").replace(/[^\d.]/g, "")) || 0;
  const reason = document.querySelector("#refundReason")?.value || "Refund review";
  const details = inputValue("refundDetails", "No extra details");
  try {
    await postApi("/api/refunds", {
      profileId: currentProfileId(),
      orderId: order?.id || "ord_001",
      amount,
      reason: `${reason}: ${details}`
    });
  } catch (error) {
    console.warn(error);
    window.showToast("Refund request saved locally; backend sync pending");
  }
  state.refundRequests.unshift({
    title: reason,
    meta: `${order?.title || "Wallet activity"} - ${details}`,
    amount,
    status: "Pending admin review"
  });
  state.systemEvents.unshift({ title: "Refund requested", meta: `${reason} - ${money.format(amount)}`, status: "pending" });
  persistAdminQueues();
  goToRoleSuccess({
    title: "Refund request submitted",
    text: "Your refund request has been submitted. Admin will review wallet, order, delivery, and support evidence before reversal.",
    dashboard: "orders",
    nextScreen: "support",
    nextLabel: "Track support"
  });
};

window.submitAccountReport = async function submitAccountReport() {
  const title = inputValue("reportName", "Reported account");
  const type = document.querySelector("#reportType")?.value || "Safety report";
  const details = inputValue("reportDetails", "No details provided");
  try {
    await postApi("/api/reports", {
      reporterId: currentProfileId(),
      subjectId: title,
      subjectType: "account",
      reason: `${type}: ${details}`
    });
  } catch (error) {
    console.warn(error);
    window.showToast("Report saved locally; backend sync pending");
  }
  state.accountReports.unshift({ title, meta: type, status: "Open", note: details });
  state.systemEvents.unshift({ title: "Account reported", meta: `${title} - ${type}`, status: "safety" });
  persistAdminQueues();
  goToRoleSuccess({
    title: "Report submitted",
    text: "Your report has been sent to the admin safety desk for investigation.",
    dashboard: "support",
    nextScreen: "support",
    nextLabel: "Back to support"
  });
};

window.resendVerificationCode = function resendVerificationCode() {
  state.lastVerificationCodeSent = new Date().toLocaleTimeString();
  window.showToast(`Verification code resent at ${state.lastVerificationCodeSent}`);
};

window.clearSearchHistory = function clearSearchHistory(title) {
  if (/history/i.test(title)) {
    state.searchQuery = "";
    localStorage.removeItem("qmlSearchQuery");
    renderMobileApp();
    return;
  }
  window.showToast(`${title} reset`);
};

window.selectUpdateFilter = function selectUpdateFilter(filter) {
  state.selectedUpdateFilter = filter;
  localStorage.setItem("qmlSelectedUpdateFilter", filter);
  renderMobileApp();
};

window.manageAdminCommand = function manageAdminCommand(title) {
  const map = {
    "AI content approval": "AI Approvals",
    "Wallet pulse": "Wallets",
    "Verification coverage": "Users & KYC",
    "Marketplace ranking": "Marketplace",
    "Refund control": "Refunds",
    "Reports & safety": "Reports"
  };
  window.selectAdminSection(map[title] || "Overview");
};

window.adminCardKeyOpen = function adminCardKeyOpen(event, title) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  window.manageAdminCommand(title);
};

window.openItemFromAdmin = function openItemFromAdmin(id) {
  const item = allMarketplaceItems().find((entry) => entry.id === id);
  if (!item) {
    window.showToast("Listing could not be opened");
    return;
  }
  if (marketplacePackages().some((entry) => entry.id === id) || item.unit === "package") {
    state.selectedPackageId = id;
    localStorage.setItem("qmlSelectedPackageId", id);
  } else {
    state.selectedProductId = id;
    localStorage.setItem("qmlSelectedProductId", id);
  }
  state.systemEvents.unshift({ title: "Admin opened listing", meta: item.title, status: "viewed" });
  persistAdminQueues();
  window.history.pushState({}, "", "/app");
  window.goToScreen("detail");
};

window.adminOpenOrderFlow = function adminOpenOrderFlow() {
  state.systemEvents.unshift({ title: "Admin inspected order flow", meta: "Checkout, payment, delivery, cancel and refund states reviewed", status: "viewed" });
  persistAdminQueues();
  window.history.pushState({}, "", "/app");
  window.goToScreen("trackOrder");
};

window.selectAdminUser = function selectAdminUser(id) {
  state.selectedAdminUserId = id;
  localStorage.setItem("qmlSelectedAdminUserId", id);
  renderAdmin();
};

window.adminExportSelectedUser = function adminExportSelectedUser() {
  const user = selectedAdminUser();
  state.systemEvents.unshift({
    title: "User account summary exported",
    meta: `${user.name} - ${user.qmlId} - ${user.roles.join(", ")}`,
    status: "exported"
  });
  persistAdminQueues();
  window.showToast(`${user.name} account summary prepared`);
  renderAdmin();
};

window.adminFlagSelectedUser = function adminFlagSelectedUser() {
  const user = selectedAdminUser();
  state.accountReports.unshift({
    title: `Admin risk review - ${user.name}`,
    meta: user.type,
    status: "Investigating",
    note: `Credit ${user.creditScore}, KYC ${user.kycLevel}, wallet ${money.format(user.walletBalance)}`
  });
  state.systemEvents.unshift({ title: "Admin account risk action", meta: `${user.name} moved to investigation queue`, status: "risk" });
  persistAdminQueues();
  window.showToast(`${user.name} added to risk review`);
  renderAdmin();
};

window.handleAdminPanelAction = function handleAdminPanelAction(title, action) {
  if (/upload|approval|policy/i.test(title + action)) window.selectAdminSection("AI Approvals");
  else if (/wallet|settlement|transaction/i.test(title + action)) window.selectAdminSection("Wallets");
  else if (/refund/i.test(title + action)) window.selectAdminSection("Refunds");
  else if (/report|risk|safety/i.test(title + action)) window.selectAdminSection("Reports");
  else if (/support|ticket|help/i.test(title + action)) window.selectAdminSection("Support");
  else if (/finance/i.test(title + action)) window.selectAdminSection("Financiers");
  else if (/logistics|dispatch|job/i.test(title + action)) window.selectAdminSection("Logistics");
  else if (/vendor/i.test(title + action)) window.selectAdminSection("Vendors");
  else window.showToast(`${title}: ${action}`);
};

window.adminProcessRefund = function adminProcessRefund(index) {
  const queue = refundQueue();
  if (!state.refundRequests.length) state.refundRequests = queue;
  const item = queue[index];
  if (!item) return;
  item.status = item.status === "Approved" ? "Settled" : "Approved";
  if (item.amount && item.status === "Approved") {
    addWalletLedger("user", "Refund approved", item.meta, Number(item.amount));
    persistUserWallet();
  }
  state.refundRequests = queue;
  state.systemEvents.unshift({ title: "Refund processed", meta: `${item.title} - ${item.status}`, status: item.status });
  persistAdminQueues();
  renderAdmin();
};

window.adminReviewReport = function adminReviewReport(index) {
  const queue = reportQueue();
  if (!state.accountReports.length) state.accountReports = queue;
  const item = queue[index];
  if (!item) return;
  item.status = item.status === "Open" ? "Investigating" : "Resolved";
  state.accountReports = queue;
  state.systemEvents.unshift({ title: "Report reviewed", meta: `${item.title} - ${item.status}`, status: item.status });
  persistAdminQueues();
  renderAdmin();
};

window.adminResolveSupport = function adminResolveSupport(index) {
  const tickets = supportTickets();
  const item = tickets[index];
  if (!item) return;
  item.status = item.status === "Open" ? "In progress" : "Resolved";
  persistSupportTickets(tickets);
  state.systemEvents.unshift({ title: "Support updated", meta: `${item.title} - ${item.status}`, status: item.status });
  persistAdminQueues();
  renderAdmin();
};

window.toggleAdminControl = function toggleAdminControl(name) {
  state.systemEvents.unshift({ title: name, meta: "Admin control action executed", status: "updated" });
  persistAdminQueues();
  renderAdmin();
};

window.adminRecordReconciliationAction = async function adminRecordReconciliationAction(kind, index, action) {
  const source = kind === "settlement" ? (state.reconciliation?.settlementReview || []) : reconciliationExceptions();
  const item = source[index];
  if (!item) {
    window.showToast("Reconciliation item could not be found");
    return;
  }
  const status = action === "acknowledge" ? "acknowledged" : "reviewed";
  try {
    await postApi("/api/admin/wallet-reconciliation/actions", {
      action,
      itemType: item.itemType || item.source || kind,
      itemId: item.id || item.reference || `${kind}_${index}`,
      reference: item.reference || "",
      amount: item.amount || 0,
      status,
      note: `${item.title}: ${item.meta}`
    }, { admin: true });
    state.reconciliation = await safeApi("/api/admin/wallet-reconciliation", state.reconciliation, { admin: true });
    state.systemEvents.unshift({ title: "Reconciliation action recorded", meta: `${item.title} - ${status}`, status });
    persistAdminQueues();
    window.showToast("Reconciliation action recorded");
  } catch (error) {
    console.warn(error);
    window.showToast(error.message || "Reconciliation action failed");
  }
  renderAdmin();
};

window.handleListAction = function handleListAction(action, title) {
  const normalized = String(action).toLowerCase();
  if (normalized.includes("track")) {
    window.goToScreen("trackOrder");
    return;
  }
  if (normalized.includes("review")) {
    window.goToScreen("reviews");
    return;
  }
  if (normalized.includes("open")) {
    window.goToScreen("detail");
    return;
  }
  if (/₦|pay|deposit|wallet|transfer/i.test(normalized + title)) {
    const amount = Number(String(action).replace(/[^\d.]/g, "")) || 0;
    openDocumentFromEntry({ title, meta: "Wallet activity", amount, wallet: "Personal wallet" }, "receipt");
    return;
  }
  if (normalized.includes("use") || normalized.includes("default")) {
    state.addresses = state.addresses.map((item) => ({ ...item, status: item.label === title ? "Default" : "Verified" }));
    persistCustomerData();
    window.showToast(`${title} set as default address`);
    renderMobileApp();
    return;
  }
  if (normalized.includes("active")) {
    state.cards = state.cards.map((item) => ({ ...item, status: item.label === title ? "Active" : "Saved" }));
    persistCustomerData();
    window.showToast(`${title} confirmed active`);
    renderMobileApp();
    return;
  }
  window.showToast(`${action}: ${title}`);
};

window.submitGenericForm = function submitGenericForm(type, nextScreen) {
  const values = [0, 1, 2, 3, 4].map((index) => inputValue(`${type}Field${index}`, "")).filter(Boolean);
  if (type === "address") {
    if (state.addresses.length >= 5) {
      window.showToast("You can save up to 5 addresses");
      return;
    }
    state.addresses.push({
      id: `addr_${Date.now()}`,
      label: values[0] || "New address",
      address: [values[1], values[2], values[3]].filter(Boolean).join(", ") || "Address pending",
      status: "Needs verification"
    });
    persistCustomerData();
    window.showToast("Address saved for verification");
  } else if (type === "card") {
    const cardNumber = values[1] || "0000";
    state.cards.push({
      id: `card_${Date.now()}`,
      label: values[0] || "Payment card",
      meta: `XXXX XXXX XXXX ${cardNumber.slice(-4)}`,
      status: "Active"
    });
    addWalletLedger("user", "Card added", `XXXX ${cardNumber.slice(-4)}`, 0);
    persistUserWallet();
    persistCustomerData();
    window.showToast("Card saved and marked active");
  } else if (type === "profile") {
    state.user = {
      ...normalizeUser(state.user),
      full_name: values[0] || normalizeUser(state.user).name,
      name: values[0] || normalizeUser(state.user).name,
      email: values[1] || "ada@example.com",
      phone: values[2] || state.onboarding.contact,
      country: values[3] || state.onboarding.country,
      city: values[4] || state.onboarding.city
    };
    localStorage.setItem("qmlUserProfile", JSON.stringify(state.user));
    window.showToast("Profile updated");
  } else if (type === "review") {
    state.userReviews.unshift({
      name: normalizeUser(state.user).name,
      rating: values[0] || "5.0",
      text: values[2] || values[1] || "Helpful marketplace experience."
    });
    persistCustomerData();
    window.showToast("Review submitted");
  } else {
    window.showToast("Saved");
  }
  window.goToScreen(nextScreen);
};

window.confirmPayment = async function confirmPayment() {
  const items = cartItems();
  const plan = selectedActivePlan();
  const total = cartTotal(items) || Math.max(0, normalizePlan(plan).total - normalizePlan(plan).paid);
  const charge = state.selectedPaymentOption === "outright" ? Math.round(total * 0.95) : total;
  if (state.paymentMethod === "wallet" && state.userWallet.balance < charge) {
    window.showToast("Wallet balance is too low");
    return;
  }
  if (items.length) {
    const title = `${items.length} item QML food order`;
    const meta = `${state.selectedPaymentOption} via ${state.paymentMethod} - ${money.format(charge)}`;
    let createdOrderId = `ord_${Date.now()}`;
    try {
      const created = await postApi("/api/orders", {
        profileId: currentProfileId(),
        packageId: items[0]?.id?.startsWith("pkg_") ? items[0].id : undefined,
        title,
        amount: total,
        paidAmount: charge,
        metadata: {
          paymentMethod: state.paymentMethod,
          paymentOption: state.selectedPaymentOption,
          items: items.map((item) => ({ id: item.id, title: item.title, quantity: item.quantity || 1, price: Number(item.price || 0) }))
        }
      });
      createdOrderId = created.order?.id || createdOrderId;
      if (state.paymentMethod === "wallet") {
        await postApi("/api/wallets/transactions", {
          walletId: userWalletId(),
          amount: -charge,
          type: "order_payment",
          description: meta,
          reference: `order_payment_${createdOrderId}`
        });
      }
    } catch (error) {
      console.warn(error);
      window.showToast("Checkout saved locally; backend sync pending");
    }
    if (state.paymentMethod === "wallet") {
      addWalletLedger("user", "Order payment", `${state.selectedPaymentOption} checkout`, -charge);
      persistUserWallet();
    } else {
      addWalletLedger("user", "Order payment", `${state.paymentMethod} - ${state.selectedPaymentOption} checkout`, 0);
      persistUserWallet();
    }
    state.orderHistory.unshift({
      id: createdOrderId,
      title,
      meta,
      status: "Track"
    });
    persistCustomerData();
  } else if (plan) {
    const normalized = normalizePlan(plan);
    const payAmount = state.selectedPaymentOption === "outright" ? charge : Math.max(1000, Math.min(charge, Math.round(normalized.total * 0.25)));
    let createdOrderId = `plan_pay_${Date.now()}`;
    try {
      const created = await postApi("/api/orders", {
        profileId: currentProfileId(),
        packageId: plan.id?.startsWith("pkg_") ? plan.id : undefined,
        title: normalized.title,
        amount: normalized.total,
        paidAmount: Math.min(normalized.total, normalized.paid + payAmount),
        metadata: {
          kind: "plan_contribution",
          paymentMethod: state.paymentMethod,
          paymentOption: state.selectedPaymentOption,
          planId: plan.id
        }
      });
      createdOrderId = created.order?.id || createdOrderId;
      if (state.paymentMethod === "wallet") {
        await postApi("/api/wallets/transactions", {
          walletId: userWalletId(),
          amount: -payAmount,
          type: "plan_payment",
          description: normalized.title,
          reference: `plan_payment_${createdOrderId}`
        });
      }
    } catch (error) {
      console.warn(error);
      window.showToast("Plan payment saved locally; backend sync pending");
    }
    applyPlanPayment(plan.id, payAmount);
    if (state.paymentMethod === "wallet") {
      addWalletLedger("user", "Plan contribution", plan.title, -payAmount);
      persistUserWallet();
    } else {
      addWalletLedger("user", "Plan contribution", `${state.paymentMethod} - ${plan.title}`, 0);
      persistUserWallet();
    }
    state.orderHistory.unshift({
      id: createdOrderId,
      title: plan.title,
      meta: `${state.selectedPaymentOption} contribution - ${money.format(payAmount)}`,
      status: "Track"
    });
    persistCustomerData();
  }
  state.cart = [];
  state.cartQuantities = {};
  localStorage.setItem("qmlCart", "[]");
  persistCustomerData();
  state.screen = "orderSuccess";
  localStorage.setItem("qmlScreen", "orderSuccess");
  renderMobileApp();
};

window.applyForRole = async function applyForRole(role) {
  const normalized = String(role || "").toLowerCase();
  await postApi("/api/role-applications", { userId: currentProfileId(), role: normalized, referralCode: state.onboarding.referralCode || "QML-ADA-4821" });
  state.activeRoles = { ...state.activeRoles, [normalized]: true };
  if (state.roleData[normalized]) {
    roleWallet(normalized);
    addWalletLedger(normalized, `${roleLabel(normalized)} wallet activated`, "Role wallet created for this account", 0);
  }
  localStorage.setItem("qmlActiveRoles", JSON.stringify(state.activeRoles));
  persistRoleData();
  window.showToast(`${roleLabel(normalized)} role added`);
  window.openRoleDashboard(normalized);
};

window.openRoleDashboard = function openRoleDashboard(role) {
  const screens = {
    vendor: "vendorDashboard",
    financier: "financierDashboard",
    logistics: "logisticsDashboard",
    corporate: "corporateDashboard"
  };
  window.goToScreen(screens[role] || "settings");
};

window.submitVendorProduct = function submitVendorProduct() {
  const title = inputValue("vendorProductName", "New Local Food Product");
  const price = Number(inputValue("vendorProductPrice", "50000").replace(/[^\d.]/g, "")) || 50000;
  const photos = selectedFileImages("vendorProductPhotos");
  if (photos.length < 3) {
    window.showToast("Upload at least 3 product photos");
    return;
  }
  const product = {
    id: `ven_prd_${Date.now()}`,
    title,
    category: inputValue("vendorProductCategory", "Local food"),
    price,
    stock: inputValue("vendorProductStock", "25 units"),
    status: price > 500000 ? "Needs documents" : "AI approved",
    note: inputValue("vendorProductDocs", "Stock proof submitted"),
    vendorInfo: inputValue("vendorProductInfo", `${title} is available from verified stock with clear packaging, quantity, and delivery handling information.`),
    photos
  };
  state.roleData.vendor.products.unshift(product);
  productCatalog.unshift({
    id: product.id,
    title: product.title,
    category: product.category,
    vendor: "My Vendor Store",
    location: state.onboarding.city || "Lagos",
    price: product.price,
    unit: "unit",
    tag: product.status,
    image: itemGalleryImages(product)[0],
    photos: product.photos,
    vendorInfo: product.vendorInfo
  });
  addRoleActivity("vendor", `${title} submitted with ${photoSummary(photos)} and ${product.status.toLowerCase()}.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Product submitted",
    text: `${title} was submitted and ${product.status.toLowerCase()} for marketplace listing.`,
    dashboard: "vendorDashboard",
    nextScreen: "vendorProducts",
    nextLabel: "View products"
  });
};

window.submitVendorPackage = function submitVendorPackage() {
  const title = inputValue("vendorPackageName", "New Food Package");
  const price = Number(inputValue("vendorPackagePrice", "175000").replace(/[^\d.]/g, "")) || 175000;
  const photos = selectedFileImages("vendorPackagePhotos");
  if (photos.length < 3) {
    window.showToast("Upload at least 3 package or plan photos");
    return;
  }
  const item = {
    id: `ven_pkg_${Date.now()}`,
    title,
    items: inputValue("vendorPackageItems", "Rice, beans, oil, protein"),
    price,
    paymentOptions: inputValue("vendorPackagePayments", "Daily, weekly, monthly, quarterly, pay twice, pay once, outright"),
    discount: inputValue("vendorPackageDiscount", "5%"),
    type: inputValue("vendorPackageType", "Package"),
    vendorInfo: inputValue("vendorPackageInfo", `${title} includes verified local food items with payment and delivery eligibility details.`),
    photos
  };
  state.roleData.vendor.packages.unshift(item);
  state.packages.unshift({
    id: item.id,
    title: item.title,
    category: "Vendor Package",
    vendor: "My Vendor Store",
    city: state.onboarding.city || "Lagos",
    price: item.price,
    tag: item.paymentOptions,
    image_url: itemGalleryImages(item)[0],
    photos: item.photos,
    vendorInfo: item.vendorInfo
  });
  addRoleActivity("vendor", `${item.type} ${title} created with ${photoSummary(photos)} and ${item.paymentOptions} payment options.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Package created",
    text: `${title} is ready with ${item.paymentOptions} payment options and ${item.discount} outright discount.`,
    dashboard: "vendorDashboard",
    nextScreen: "vendorPackages",
    nextLabel: "View packages"
  });
};

window.updateVendorStock = function updateVendorStock(id) {
  const product = state.roleData.vendor.products.find((item) => item.id === id);
  if (!product) return;
  product.stock = `${parseInt(product.stock, 10) + 10 || 10} units`;
  product.status = "Stock updated";
  product.note = "Stock quantity refreshed for customer ordering.";
  addRoleActivity("vendor", `${product.title} stock updated to ${product.stock}.`);
  persistRoleData();
  window.showToast(`${product.title} stock updated`);
  renderMobileApp();
};

window.saveVendorPromo = function saveVendorPromo() {
  const promo = {
    id: `promo_${Date.now()}`,
    title: inputValue("vendorPromoTitle", "New Promo"),
    applies: inputValue("vendorPromoApplies", "Selected products"),
    discount: inputValue("vendorPromoDiscount", "5%")
  };
  state.roleData.vendor.promos.unshift(promo);
  addRoleActivity("vendor", `${promo.title} promo saved for ${promo.applies}.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Promo saved",
    text: `${promo.title} is active for ${promo.applies} with ${promo.discount}.`,
    dashboard: "vendorDashboard",
    nextScreen: "vendorPromo",
    nextLabel: "View promos"
  });
};

window.moveVendorOrder = function moveVendorOrder(id) {
  const order = state.roleData.vendor.orders.find((item) => item.id === id);
  if (!order) return;
  const flow = ["Preparing", "Dispatch assigned", "Out for delivery", "Completed"];
  const next = flow[Math.min(flow.indexOf(order.status) + 1, flow.length - 1)] || "Preparing";
  order.status = next;
  if (next === "Completed") {
    const settlement = Math.round(order.amount * 0.87);
    addWalletLedger("vendor", "Order settlement", `${order.id} completed`, settlement);
    roleWallet("vendor").escrow = Math.max(0, Number(roleWallet("vendor").escrow || 0) - order.amount);
  }
  addRoleActivity("vendor", `${order.id} moved to ${next}.`);
  persistRoleData();
  window.showToast(`${order.id} moved to ${next}`);
  renderMobileApp();
};

window.requestVendorWithdrawal = function requestVendorWithdrawal() {
  const available = roleWallet("vendor").balance;
  if (available <= 0) {
    window.showToast("No settlement available");
    return;
  }
  addWalletLedger("vendor", "Withdrawal requested", "Pending payout review", -available);
  addRoleActivity("vendor", `${money.format(available)} withdrawal requested.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Withdrawal requested",
    text: `${money.format(available)} settlement has been sent for payout review.`,
    dashboard: "vendorDashboard",
    nextScreen: "vendorWallet",
    nextLabel: "View wallet"
  });
};

window.openFinanceOpportunity = function openFinanceOpportunity(id) {
  state.selectedFinanceOpportunityId = id;
  localStorage.setItem("qmlSelectedFinanceOpportunityId", id);
  window.goToScreen("financierOpportunityDetail");
};

window.financeOpportunity = function financeOpportunity(id) {
  const item = state.roleData.financier.opportunities.find((entry) => entry.id === id);
  if (!item || item.funded) {
    window.showToast("Opportunity already funded");
    return;
  }
  const wallet = roleWallet("financier");
  const available = wallet.balance;
  if (available < item.amount) {
    window.showToast("Wallet balance is too low");
    return;
  }
  item.funded = true;
  addWalletLedger("financier", "Opportunity funded", item.title, -item.amount);
  wallet.escrow = Number(wallet.escrow || 0) + item.amount;
  state.roleData.financier.transactions.unshift({
    id: `QML-FIN-${Date.now().toString().slice(-4)}`,
    title: item.title,
    status: "Funded - awaiting repayment",
    amount: item.amount
  });
  addRoleActivity("financier", `${item.title} funded with ${money.format(item.amount)}.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Opportunity funded",
    text: `${item.title} was funded with ${money.format(item.amount)}. It now appears in your portfolio.`,
    dashboard: "financierDashboard",
    nextScreen: "financierPortfolio",
    nextLabel: "View portfolio"
  });
};

window.signOffFinanceTransaction = function signOffFinanceTransaction(id) {
  const transaction = state.roleData.financier.transactions.find((item) => item.id === id);
  if (!transaction || transaction.status === "Settled") {
    window.showToast("Transaction already settled");
    return;
  }
  transaction.status = "Settled";
  const opportunity = state.roleData.financier.opportunities.find((item) => item.title === transaction.title);
  const earned = opportunity?.expectedReturn || Math.round(transaction.amount * 0.08);
  addWalletLedger("financier", "Repayment settled", `${transaction.title} principal + profit`, transaction.amount + earned);
  roleWallet("financier").escrow = Math.max(0, Number(roleWallet("financier").escrow || 0) - transaction.amount);
  addRoleActivity("financier", `${transaction.title} settled with ${money.format(earned)} profit.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Transaction settled",
    text: `${transaction.title} settled with ${money.format(earned)} profit returned to wallet.`,
    dashboard: "financierDashboard",
    nextScreen: "financierWallet",
    nextLabel: "View wallet"
  });
};

window.topUpFinancierWallet = function topUpFinancierWallet() {
  addWalletLedger("financier", "Wallet top up", "Manual prototype top up", 500000);
  addRoleActivity("financier", "Wallet topped up by ₦500,000.");
  persistRoleData();
  goToRoleSuccess({
    title: "Wallet topped up",
    text: "Your financier wallet was topped up by ₦500,000.",
    dashboard: "financierDashboard",
    nextScreen: "financierWallet",
    nextLabel: "View wallet"
  });
};

window.acceptLogisticsTrip = function acceptLogisticsTrip(id) {
  const trip = state.roleData.logistics.trips.find((item) => item.id === id);
  if (!trip) return;
  if (trip.status === "Available") trip.status = "Accepted";
  state.selectedLogisticsTripId = id;
  localStorage.setItem("qmlSelectedLogisticsTripId", id);
  addRoleActivity("logistics", `${trip.dropoff} delivery accepted from ${trip.pickup}.`);
  persistRoleData();
  window.showToast(`${trip.dropoff} delivery active`);
  window.goToScreen("logisticsTripDetail");
};

window.submitDeliveryProof = function submitDeliveryProof() {
  const trip = selectedLogisticsTrip();
  if (!trip || trip.status === "Completed") {
    window.showToast("Delivery already completed");
    return;
  }
  const photos = selectedFileNames("logisticsPhotos");
  trip.status = "Completed";
  trip.proofPhotos = photos;
  trip.recipient = inputValue("logisticsRecipient", "Recipient confirmed");
  trip.notes = inputValue("logisticsNotes", "Delivery condition confirmed");
  addWalletLedger("logistics", "Delivery payout", `${trip.pickup} to ${trip.dropoff}`, trip.payout);
  roleWallet("logistics").pending = Number(roleWallet("logistics").pending || 0) + trip.payout;
  addRoleActivity("logistics", `${trip.dropoff} delivery completed with ${photoSummary(photos)} and ${money.format(trip.payout)} payout.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Delivery completed",
    text: `Proof was submitted for ${trip.dropoff}. ${money.format(trip.payout)} was added to logistics earnings.`,
    dashboard: "logisticsDashboard",
    nextScreen: "logisticsEarnings",
    nextLabel: "View earnings"
  });
};

window.saveLogisticsVehicle = function saveLogisticsVehicle() {
  state.roleData.logistics.vehicle = {
    type: inputValue("logisticsVehicleType", "Bike"),
    plate: inputValue("logisticsVehiclePlate", "ABC-123XY"),
    capacity: inputValue("logisticsVehicleCapacity", "Small box and cartons"),
    docs: inputValue("logisticsVehicleDocs", "License and insurance uploaded")
  };
  addRoleActivity("logistics", `${state.roleData.logistics.vehicle.type} vehicle profile updated.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Vehicle saved",
    text: "Your logistics vehicle profile was updated and can be matched to suitable jobs.",
    dashboard: "logisticsDashboard",
    nextScreen: "logisticsVehicle",
    nextLabel: "Review vehicle"
  });
};

window.updateLogisticsAvailability = function updateLogisticsAvailability() {
  state.roleData.logistics.availability = {
    radius: inputValue("logisticsRadius", "1-5km"),
    districts: inputValue("logisticsDistricts", "Yaba, Lekki, Ikeja")
  };
  addRoleActivity("logistics", `Availability updated for ${state.roleData.logistics.availability.districts}.`);
  persistRoleData();
  goToRoleSuccess({
    title: "Availability updated",
    text: `You are available within ${state.roleData.logistics.availability.radius} for ${state.roleData.logistics.availability.districts}.`,
    dashboard: "logisticsDashboard",
    nextScreen: "logisticsTrips",
    nextLabel: "Find trips"
  });
};

window.selectAdminSection = function selectAdminSection(section) {
  state.adminSection = section;
  localStorage.setItem("qmlAdminSection", section);
  renderAdmin();
};

window.nextOnboarding = function nextOnboarding() {
  state.onboardingStep += 1;
  persistOnboardingStep();
  renderOnboarding();
};

window.previousOnboarding = function previousOnboarding() {
  state.onboardingStep = Math.max(0, state.onboardingStep - 1);
  persistOnboardingStep();
  renderOnboarding();
};

window.saveLocationAndNext = function saveLocationAndNext() {
  state.onboarding.country = document.querySelector("#countryInput")?.value || "Nigeria";
  state.onboarding.city = document.querySelector("#cityInput")?.value || "Lagos";
  window.nextOnboarding();
};

window.saveContactAndNext = function saveContactAndNext() {
  state.onboarding.contact = document.querySelector("#contactInput")?.value || "+2348012345678";
  window.nextOnboarding();
};

window.selectPurpose = function selectPurpose(purpose) {
  state.onboarding.purpose = purpose;
  renderOnboarding();
};

window.saveReferralAndNext = function saveReferralAndNext() {
  state.onboarding.referralCode = document.querySelector("#referralInput")?.value || "";
  window.nextOnboarding();
};

window.completeOnboarding = function completeOnboarding() {
  state.onboardingComplete = true;
  state.screen = "home";
  activateSignupRole();
  localStorage.setItem("qmlOnboardingComplete", "true");
  localStorage.setItem("qmlOnboardingStep", "0");
  localStorage.setItem("qmlScreen", "home");
  renderMobileApp();
};

window.restartOnboarding = function restartOnboarding() {
  state.onboardingStep = 0;
  state.onboardingComplete = false;
  state.authComplete = false;
  state.authSession = null;
  state.authScreen = "splash";
  state.screen = "home";
  localStorage.removeItem("qmlAuthComplete");
  localStorage.removeItem("qmlAuthSession");
  localStorage.setItem("qmlAuthScreen", "splash");
  localStorage.removeItem("qmlOnboardingComplete");
  localStorage.setItem("qmlOnboardingStep", "0");
  localStorage.setItem("qmlScreen", "home");
  renderMobileApp();
};

window.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled || button.closest("#toast")) return;
  if (button.getAttribute("onclick")) return;
  const label = button.textContent.trim() || button.getAttribute("aria-label") || "Action";
  window.showToast(`${label} selected`);
});

window.addEventListener("popstate", render);
