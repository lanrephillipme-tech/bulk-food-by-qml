// Reference definitions only. These are not seller stock or current offers.
export const catalogSources = [
  { id: 'fao-icc', url: 'https://www.fao.org/statistics/caliper/classifications/icc/en', note: 'Classification reference; product descriptions are QML-authored. No reference photos imported.' },
  { id: 'supermart', url: 'https://www.supermart.ng/collections/naija-food', note: 'Regional ingredient naming reference; no prices, stock or retailer images copied.' },
  { id: 'tesco', url: 'https://www.tesco.com/shop/en-GB/category/food-cupboard', note: 'Pantry category reference; no retailer descriptions or images copied.' },
  { id: 'fao-aquatic', url: 'https://www.fao.org/statistics/methods-and-standards/fishery-and-aquaculture/en', note: 'Aquatic classification reference, not blanket permission for trade.' }
];
const groups = [
  ['food', 'produce', 'vegetables', 'Tomato|Onion|Shallot|Garlic|Carrot|Cabbage|Cucumber|Okra|Garden egg|Eggplant|Broccoli|Cauliflower|Celery|Leek|Pumpkin|Zucchini|Radish|Beetroot|Asparagus|Sweetcorn|Bell pepper|Chilli pepper|Ginger|Turmeric'],
  ['food', 'produce', 'leaves', 'Spinach|Kale|Lettuce|Amaranth greens|Fluted pumpkin leaves|Jute leaves|Waterleaf|Bitterleaf|Scent leaf|Uziza leaves|Utazi|Oha|Afang|Moringa leaves|Bok choy|Mustard greens'],
  ['food', 'produce', 'fruit', 'Banana|Orange|Lemon|Lime|Grapefruit|Pineapple|Mango|Papaya|Watermelon|Apple|Pear|Grape|Avocado|Coconut|Guava|Passion fruit|Strawberry|Blueberry|Date|Fig|Pomegranate|Tamarind|Jackfruit|Durian|Lychee|Dragon fruit|African star apple|African pear'],
  ['food', 'staples', 'grains', 'Rice|Maize|Wheat|Oats|Barley|Millet|Sorghum|Fonio|Teff|Rye|Quinoa|Buckwheat'],
  ['food', 'staples', 'pulses', 'Cowpea|Common bean|Chickpea|Lentil|Split pea|Pigeon pea|Mung bean|Soybean|Bambara groundnut|Green pea|Fava bean'],
  ['food', 'staples', 'tubers', 'Yam|Cassava|Cocoyam|Taro|Potato|Sweet potato|Plantain|Breadfruit|Arrowroot'],
  ['food', 'staples', 'flours', 'Wheat flour|Rice flour|Maize flour|Millet flour|Cassava flour|Yam flour|Plantain flour|Bean flour|Chickpea flour|Oat flour|Almond flour|Coconut flour|Semolina|Garri|Lafun|Fufu|Ogi'],
  ['food', 'pantry', 'oils', 'Palm oil|Palm kernel oil|Groundnut oil|Soybean oil|Sunflower oil|Canola oil|Corn oil|Coconut oil|Olive oil|Sesame oil|Rice bran oil|Avocado oil|Grapeseed oil'],
  ['food', 'pantry', 'fats', 'Butter|Ghee|Margarine|Vegetable shortening|Beef tallow|Lard|Duck fat'],
  ['food', 'pantry', 'nuts-seeds', 'Groundnut|Cashew|Almond|Walnut|Pecan|Hazelnut|Pistachio|Sesame|Sunflower seed|Pumpkin seed|Egusi|Ogbono|Chia|Flaxseed|Tiger nut'],
  ['food', 'pantry', 'spices', 'Black pepper|White pepper|Paprika|Cinnamon|Clove|Nutmeg|Mace|Cumin|Coriander seed|Cardamom|Fennel|Fenugreek|Mustard seed|Allspice|Star anise|Saffron|Sumac|Uziza seed|Uda|Ehuru'],
  ['food', 'pantry', 'herbs', 'Thyme|Rosemary|Oregano|Basil|Parsley|Dill|Mint|Sage|Bay leaf|Lemongrass'],
  ['food', 'pantry', 'seasonings', 'Salt|Chicken stock|Beef stock|Fish stock|Vegetable stock|Bouillon|Curry powder|Garam masala|Berbere|Suya spice|Pepper soup spice|Jollof seasoning|Iru|Ogiri|Ugba'],
  ['food', 'pantry', 'sauces', 'Tomato paste|Tomato puree|Passata|Soy sauce|Tamari|Fish sauce|Oyster sauce|Hoisin|Worcestershire sauce|Mustard|Miso|Gochujang|Shrimp paste|Curry paste|Pesto|Tahini|Harissa|Vinegar|Lemon juice|Tamarind paste'],
  ['food', 'pantry', 'pasta', 'Spaghetti|Macaroni|Penne|Lasagne sheets|Egg noodles|Rice noodles|Vermicelli|Soba|Udon|Couscous|Bulgur|Rice paper|Dumpling wrappers'],
  ['food', 'pantry', 'baking', 'Baking powder|Baking soda|Baking yeast|Cream of tartar|Cocoa powder|Cooking chocolate|Custard powder|Breadcrumbs|Vanilla extract|Cornstarch|Tapioca starch|Potato starch|Gelatin|Agar|Pectin|Xanthan gum'],
  ['food', 'pantry', 'sweeteners', 'White sugar|Brown sugar|Icing sugar|Palm sugar|Jaggery|Honey|Molasses|Golden syrup|Maple syrup|Date syrup'],
  ['food', 'pantry', 'preserved', 'Raisin|Sultana|Prune|Dried apricot|Candied peel|Olives|Capers|Pickled cucumber'],
  ['food', 'protein', 'meat', 'Beef|Goat meat|Lamb|Mutton|Pork|Rabbit meat|Beef liver|Tripe|Cow foot|Edible cow skin'],
  ['food', 'protein', 'poultry', 'Chicken meat|Turkey meat|Duck meat|Goose meat|Guinea fowl meat|Quail meat'],
  ['food', 'protein', 'eggs', 'Chicken egg|Duck egg|Quail egg'],
  ['food', 'protein', 'fish-seafood', 'Catfish|Tilapia|Mackerel|Horse mackerel|Hake|Croaker|Sardine|Tuna|Salmon|Cod|Snapper|Prawn|Shrimp|Crayfish|Crab|Lobster|Mussel|Oyster|Clam|Periwinkle|Squid|Octopus|Stockfish'],
  ['food', 'protein', 'dairy', 'Milk|Evaporated milk|Condensed milk|Cream|Sour cream|Buttermilk|Yoghurt|Cheese|Paneer|Cottage cheese'],
  ['food', 'protein', 'plant-based', 'Coconut milk|Soy milk|Oat milk|Almond milk|Tofu|Tempeh|Textured vegetable protein|Seitan|Nutritional yeast'],
  ['food', 'produce', 'mushrooms', 'Button mushroom|Oyster mushroom|Shiitake|Enoki|Portobello|Wood ear'],
  ['food', 'pantry', 'beverages', 'Coffee|Tea|Hibiscus|Rooibos|Yerba mate'],
  ['live-animals', 'livestock', 'farm-animals', 'Live cattle|Live goat|Live sheep|Live pig|Live rabbit|Live chicken|Live turkey|Live duck|Live guinea fowl|Live quail|Live catfish|Live tilapia|Farmed edible snail'],
  ['non-food-agro', 'materials', 'fibres', 'Cotton fibre|Flax fibre|Hemp fibre|Jute fibre|Sisal|Coir|Wool|Bamboo|Natural rubber|Gum arabic'],
  ['farm-supplies', 'inputs', 'growing', 'Planting seeds|Seedlings|Nursery plants|Animal feed|Hay|Silage|Compost|Manure']
];
const aliases = {
  Rice: ['Oryza sativa', '米', 'أرز', 'riz', 'arroz'], Maize: ['corn', 'Zea mays'],
  Cowpea: ['black-eyed pea', 'beans oloyin'], 'Fluted pumpkin leaves': ['ugu'],
  'Jute leaves': ['ewedu'], 'Amaranth greens': ['efo'], Fonio: ['acha'],
  'Yam flour': ['elubo'], Ogi: ['akamu', 'pap'], 'African star apple': ['agbalumo', 'udara'],
  'Groundnut oil': ['peanut oil'], Groundnut: ['peanut'], Hibiscus: ['zobo', 'roselle'],
  'Edible cow skin': ['ponmo'], 'Eggplant': ['aubergine', 'brinjal'], Iru: ['dawadawa']
};
const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const catalogCategories = [...new Map(groups.flatMap(([d,c,s]) => [
  { id:d, name:d.replaceAll('-', ' '), parent_id:null, level:0 },
  { id:`${d}/${c}`, name:c.replaceAll('-', ' '), parent_id:d, level:1 },
  { id:`${d}/${c}/${s}`, name:s.replaceAll('-', ' '), parent_id:`${d}/${c}`, level:2 }
]).map(row => [row.id,row])).values()];
export const catalogProducts = groups.flatMap(([d,c,s,names]) => names.split('|').map(name => ({
  id:`qml-${slug(name)}`, name, category_id:`${d}/${c}/${s}`,
  description:`${name}: a catalog reference. Specification and availability depend on the seller's offer.`,
  aliases:aliases[name] || [], local_names:[], scientific_name:null,
  tags:[s], status:'active', merged_into:null,
  source_ids:[s === 'fish-seafood' ? 'fao-aquatic' : ['seasonings','flours','leaves'].includes(s) ? 'supermart' : c === 'pantry' ? 'tesco' : 'fao-icc'],
  reference_image:null, review_status:'starter-reviewed'
})));
export const catalogForms = ['fresh','dried','frozen','smoked','fermented','milled','peeled','ground','whole','cut','canned','liquid','powder','live'];
export const catalogUnits = ['kg','g','litre','ml','piece','dozen','pack','bag','basket','crate','bunch','paint bucket','milk cup'];
export const catalogHabitats = ['farm','plantation','orchard','greenhouse','pasture','woodland','forest','bush','river','lake','wetland','coast','sea'];
export const countryCodes = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
