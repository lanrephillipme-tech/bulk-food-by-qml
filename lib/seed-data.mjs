export const users = [
  {
    id: "usr_ada",
    full_name: "Ada Okonkwo",
    name: "Ada Okonkwo",
    email: "ada@example.com",
    phone: "+2348012345678",
    country: "Nigeria",
    state: "Lagos",
    city: "Lagos",
    wallet_balance: 42500,
    walletBalance: 42500,
    qml_score: 720,
    qmlScore: 720,
    credit_limit: 180000,
    creditLimit: 180000,
    referral_code: "QML-ADA-4821",
    referralCode: "QML-ADA-4821",
    roles: {
      customer: "active",
      vendor: "pending",
      financier: "active",
      logistics: undefined,
      corporate: undefined,
      admin: undefined
    }
  }
];

export const packages = [
  {
    id: "pkg_family",
    title: "Monthly Family Food Pack",
    description: "Rice, oil, beans, tomato, and chicken cuts for the month.",
    country: "Nigeria",
    city: "Lagos",
    vendor: "Adebayo Farms & Foods",
    category: "Family",
    price: 150000,
    deposit_percent: 50,
    depositPercent: 50,
    group_buy_slots: 0,
    groupBuySlots: 0,
    group_buy_filled: 0,
    groupBuyFilled: 0,
    items: ["25kg rice", "5L groundnut oil", "Beans", "Tomato basket", "Chicken cuts"],
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_rice_group",
    title: "1 Bag Rice Group Buy",
    description: "Four users split one full bag at wholesale price.",
    country: "Nigeria",
    city: "Lagos",
    vendor: "Mainland Grain Depot",
    category: "Group Buy",
    price: 80000,
    deposit_percent: 100,
    depositPercent: 100,
    group_buy_slots: 4,
    groupBuySlots: 4,
    group_buy_filled: 2,
    groupBuyFilled: 2,
    items: ["50kg rice split into 4 equal shares"],
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pkg_festive",
    title: "Festive Bulk Celebration Pack",
    description: "Bulk festive food package for families and teams.",
    country: "Nigeria",
    city: "Abuja",
    vendor: "Northern Fresh Market",
    category: "Festive",
    price: 300000,
    deposit_percent: 50,
    depositPercent: 50,
    group_buy_slots: 6,
    groupBuySlots: 6,
    group_buy_filled: 4,
    groupBuyFilled: 4,
    items: ["Rice", "Oil", "Turkey", "Spices", "Drinks", "Vegetables"],
    image_url: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80"
  }
];

export const plans = [
  {
    id: "plan_001",
    user_id: "usr_ada",
    userId: "usr_ada",
    package_id: "pkg_family",
    packageId: "pkg_family",
    title: "Monthly Family Food Pack",
    total_amount: 150000,
    total: 150000,
    paid_amount: 82000,
    paid: 82000,
    interval: "weekly",
    next_due_date: "2026-08-22",
    nextDueDate: "2026-08-22",
    status: "delivery_eligible"
  }
];

export const vendors = [
  {
    id: "ven_001",
    business_name: "Adebayo Farms & Foods",
    businessName: "Adebayo Farms & Foods",
    owner_name: "Tunde Adebayo",
    ownerName: "Tunde Adebayo",
    country: "Nigeria",
    city: "Lagos",
    products: 42,
    pending_orders: 18,
    pendingOrders: 18,
    settlement_due: 2450000,
    settlementDue: 2450000,
    status: "active"
  },
  {
    id: "ven_002",
    business_name: "Northern Fresh Market",
    businessName: "Northern Fresh Market",
    owner_name: "Halima Musa",
    ownerName: "Halima Musa",
    country: "Nigeria",
    city: "Abuja",
    products: 27,
    pending_orders: 9,
    pendingOrders: 9,
    settlement_due: 970000,
    settlementDue: 970000,
    status: "pending"
  }
];

export const opportunities = [
  {
    id: "fin_001",
    customer_name: "Ada Okonkwo",
    customerName: "Ada Okonkwo",
    package_title: "Monthly Family Food Pack",
    packageTitle: "Monthly Family Food Pack",
    amount_needed: 68000,
    amountNeeded: 68000,
    expected_return: 8500,
    expectedReturn: 8500,
    duration_weeks: 8,
    durationWeeks: 8,
    risk_rating: "Low",
    riskRating: "Low",
    qml_score: 720,
    qmlScore: 720,
    funded_percent: 35,
    fundedPercent: 35
  },
  {
    id: "fin_002",
    customer_name: "Bright Ventures Staff Cooperative",
    customerName: "Bright Ventures Staff Cooperative",
    package_title: "Corporate Staff Food Distribution",
    packageTitle: "Corporate Staff Food Distribution",
    amount_needed: 1500000,
    amountNeeded: 1500000,
    expected_return: 180000,
    expectedReturn: 180000,
    duration_weeks: 12,
    durationWeeks: 12,
    risk_rating: "Medium",
    riskRating: "Medium",
    qml_score: 680,
    qmlScore: 680,
    funded_percent: 62,
    fundedPercent: 62
  }
];

export const deliveries = [
  {
    id: "del_001",
    rider_name: "Unassigned",
    riderName: "Unassigned",
    vehicle_type: "van",
    vehicleType: "van",
    pickup: "Adebayo Farms, Mile 12",
    dropoff: "Lekki Phase 1",
    payout: 8500,
    status: "available"
  },
  {
    id: "del_002",
    rider_name: "Ibrahim Sani",
    riderName: "Ibrahim Sani",
    vehicle_type: "bike",
    vehicleType: "bike",
    pickup: "Mainland Grain Depot",
    dropoff: "Yaba",
    payout: 3200,
    status: "accepted"
  }
];
