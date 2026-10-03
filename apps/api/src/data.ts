export type Role = "customer" | "vendor" | "financier" | "logistics" | "corporate" | "admin";
export type RoleStatus = "active" | "pending" | "rejected";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  walletBalance: number;
  qmlScore: number;
  referralCode: string;
  referredBy?: string;
  roles: Record<Role, RoleStatus | undefined>;
};

export type FoodPackage = {
  id: string;
  title: string;
  country: string;
  city: string;
  vendor: string;
  category: string;
  price: number;
  depositPercent: number;
  groupBuySlots: number;
  groupBuyFilled: number;
  items: string[];
  image: string;
};

export type Plan = {
  id: string;
  userId: string;
  packageId: string;
  title: string;
  total: number;
  paid: number;
  interval: "daily" | "weekly" | "monthly";
  nextDueDate: string;
  status: "active" | "delivery_eligible" | "delivered" | "completed";
};

export type Vendor = {
  id: string;
  businessName: string;
  ownerName: string;
  country: string;
  city: string;
  products: number;
  pendingOrders: number;
  settlementDue: number;
  status: RoleStatus;
};

export type FinancingOpportunity = {
  id: string;
  customerName: string;
  packageTitle: string;
  amountNeeded: number;
  expectedReturn: number;
  durationWeeks: number;
  riskRating: "Low" | "Medium" | "High";
  qmlScore: number;
  fundedPercent: number;
};

export type Delivery = {
  id: string;
  riderName: string;
  vehicleType: "bike" | "car" | "van" | "truck" | "trailer";
  pickup: string;
  dropoff: string;
  payout: number;
  status: "available" | "accepted" | "picked_up" | "delivered";
};

export const users: User[] = [
  {
    id: "usr_ada",
    name: "Ada Okonkwo",
    email: "ada@example.com",
    phone: "+2348012345678",
    country: "Nigeria",
    city: "Lagos",
    walletBalance: 42500,
    qmlScore: 720,
    referralCode: "QML-ADA-4821",
    roles: {
      customer: "active",
      vendor: "pending",
      financier: "active",
      logistics: undefined,
      corporate: undefined,
      admin: undefined
    }
  },
  {
    id: "usr_admin",
    name: "QML Super Admin",
    email: "admin@qml.local",
    phone: "+2348000000000",
    country: "Nigeria",
    city: "Abuja",
    walletBalance: 0,
    qmlScore: 900,
    referralCode: "QML-ADMIN",
    roles: {
      customer: "active",
      admin: "active"
    }
  }
];

export const packages: FoodPackage[] = [
  {
    id: "pkg_family",
    title: "Monthly Family Food Pack",
    country: "Nigeria",
    city: "Lagos",
    vendor: "Adebayo Farms & Foods",
    category: "Family",
    price: 150000,
    depositPercent: 50,
    groupBuySlots: 0,
    groupBuyFilled: 0,
    items: ["25kg rice", "5L groundnut oil", "Beans", "Tomato basket", "Chicken cuts"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e"
  },
  {
    id: "pkg_rice_group",
    title: "1 Bag Rice Group Buy",
    country: "Nigeria",
    city: "Lagos",
    vendor: "Mainland Grain Depot",
    category: "Group Buy",
    price: 80000,
    depositPercent: 100,
    groupBuySlots: 4,
    groupBuyFilled: 2,
    items: ["50kg rice split into 4 equal shares"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
  },
  {
    id: "pkg_festive",
    title: "Festive Bulk Celebration Pack",
    country: "Nigeria",
    city: "Abuja",
    vendor: "Northern Fresh Market",
    category: "Festive",
    price: 300000,
    depositPercent: 50,
    groupBuySlots: 6,
    groupBuyFilled: 4,
    items: ["Rice", "Oil", "Turkey", "Spices", "Drinks", "Vegetables"],
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904"
  }
];

export const plans: Plan[] = [
  {
    id: "plan_001",
    userId: "usr_ada",
    packageId: "pkg_family",
    title: "Monthly Family Food Pack",
    total: 150000,
    paid: 82000,
    interval: "weekly",
    nextDueDate: "2026-08-22",
    status: "delivery_eligible"
  }
];

export const vendors: Vendor[] = [
  {
    id: "ven_001",
    businessName: "Adebayo Farms & Foods",
    ownerName: "Tunde Adebayo",
    country: "Nigeria",
    city: "Lagos",
    products: 42,
    pendingOrders: 18,
    settlementDue: 2450000,
    status: "active"
  },
  {
    id: "ven_002",
    businessName: "Northern Fresh Market",
    ownerName: "Halima Musa",
    country: "Nigeria",
    city: "Abuja",
    products: 27,
    pendingOrders: 9,
    settlementDue: 970000,
    status: "pending"
  }
];

export const opportunities: FinancingOpportunity[] = [
  {
    id: "fin_001",
    customerName: "Ada Okonkwo",
    packageTitle: "Monthly Family Food Pack",
    amountNeeded: 68000,
    expectedReturn: 8500,
    durationWeeks: 8,
    riskRating: "Low",
    qmlScore: 720,
    fundedPercent: 35
  },
  {
    id: "fin_002",
    customerName: "Bright Ventures Staff Cooperative",
    packageTitle: "Corporate Staff Food Distribution",
    amountNeeded: 1500000,
    expectedReturn: 180000,
    durationWeeks: 12,
    riskRating: "Medium",
    qmlScore: 680,
    fundedPercent: 62
  }
];

export const deliveries: Delivery[] = [
  {
    id: "del_001",
    riderName: "Unassigned",
    vehicleType: "van",
    pickup: "Adebayo Farms, Mile 12",
    dropoff: "Lekki Phase 1",
    payout: 8500,
    status: "available"
  },
  {
    id: "del_002",
    riderName: "Ibrahim Sani",
    vehicleType: "bike",
    pickup: "Mainland Grain Depot",
    dropoff: "Yaba",
    payout: 3200,
    status: "accepted"
  }
];
