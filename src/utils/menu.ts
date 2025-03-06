import { BillType, MenuItem } from "./types";

// export const menuData: MenuItem[] = [
//   {
//     name: "Paneer Tikka",
//     image:
//       "https://cdn.tasteatlas.com//images/dishes/16dbebbff2e04e0d984f4ed83be93b97.jpg?w=905&h=510",
//    count:true, category: "Starter",
//     sizes: {
//       quarter: { price: 70, quantity: 0 },
//       half: { price: 120, quantity: 0 },
//       full: { price: 199, quantity: 0 },
//     },
//   },
//   {
//     name: "Dahi Vada",
//     image:
//       "https://cdn.tasteatlas.com//Images/Dishes/bf8970f08f764a01b9b416c5c3330204.jpg?w=905&h=510",
//    count:true, category: "Starter",
//     sizes: {
//       quarter: { price: 50, quantity: 0 },
//       half: { price: 90, quantity: 0 },
//       full: { price: 149, quantity: 0 },
//     },
//   },
//   {
//     name: "Gobi Manchurian",
//     image:
//       "https://cdn.tasteatlas.com//images/dishes/cba6279ae21445539df7e5f35b063bcb.jpg?w=905&h=510",
//    count:true, category: "Starter",
//     sizes: {
//       quarter: { price: 60, quantity: 0 },
//       half: { price: 110, quantity: 0 },
//       full: { price: 179, quantity: 0 },
//     },
//   },
//   {
//     name: "Papadum",
//     image:
//       "https://cdn.tasteatlas.com//Images/Dishes/824335caa36140c6ae24be176b2d2a5e.jpg?w=905&h=510",
//    count:true, category: "Starter",
//     sizes: {
//       quarter: { price: 50, quantity: 0 },
//       half: { price: 90, quantity: 0 },
//       full: { price: 149, quantity: 0 },
//     },
//   },
//   {
//     name: "Chilli Paneer",
//     image:
//       "https://cdn.tasteatlas.com//images/dishes/3c3fae0fcdb64009a564a28b50b41ef1.jpg?w=905&h=510",
//    count:true, category: "Starter",
//     sizes: {
//       quarter: { price: 70, quantity: 0 },
//       half: { price: 120, quantity: 0 },
//       full: { price: 199, quantity: 0 },
//     },
//   },
//   {
//     name: "Briyani",
//     image:
//       "https://b.zmtcdn.com/data/dish_photos/0dd/70f2942df45d70792c1dddc845b270dd.png",
//    count:true, category: "Main Course",
//     sizes: {
//       quarter: { price: 70, quantity: 0 },
//       half: { price: 130, quantity: 0 },
//       full: { price: 200, quantity: 0 },
//     },
//   },
//   {
//     name: "Coconut Chickpea Curry",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtDLIKMqwnFmXXXKIlRGQC2c4iKP1Aerx9lQ&s",
//    count:true, category: "Main Course",
//     sizes: {
//       quarter: { price: 50, quantity: 0 },
//       half: { price: 90, quantity: 0 },
//       full: { price: 150, quantity: 0 },
//     },
//   },
//   {
//     name: "Creamy Baked Pasta",
//     image:
//       "https://www.allrecipes.com/thmb/ze2kJbntum17IP5zmNjvsRlZopA=/364x242/filters:no_upscale():max_bytes(150000):strip_icc():focal(589x495:591x497):format(webp)/7375794-Creamy_Vegan_Baked_Pasta_w_Brussels_Sprouts__01-4x3-3ca6dcae7d8a4692868c34f0257f967d.jpg",
//    count:true, category: "Main Course",
//     sizes: {
//       quarter: { price: 50, quantity: 0 },
//       half: { price: 85, quantity: 0 },
//       full: { price: 145, quantity: 0 },
//     },
//   },
//   {
//     name: "Gulab Jamun",
//     image:
//       "https://pipingpotcurry.com/wp-content/uploads/2023/12/Gulab-Jamun-Recipe-Piping-Pot-Curry.jpg",
//    count:true, category: "Desserts",
//     sizes: {
//       quarter: { price: 60, quantity: 0 },
//       half: { price: 110, quantity: 0 },
//       full: { price: 179, quantity: 0 },
//     },
//   },
//   {
//     name: "Kulfi",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1P_EOR8LZiMRBE09p6Gl8suGrpAPB9vFHSA&s",
//    count:true, category: "Desserts",
//     sizes: {
//       quarter: { price: 45, quantity: 0 },
//       half: { price: 80, quantity: 0 },
//       full: { price: 129, quantity: 0 },
//     },
//   },
// ];
export const emptyBill: BillType = {
  billcontent: [],
  totalAmount: 0,
  totalDishes: 0,
  tableId: "0",
  credited: false,
  paymentMethod: "cash",
  discount: 0,
  customerName: "",
};

// export default menuItems;

export const menuData: MenuItem[] = [
  {
    name: "Chicken Lollipops",
    image: "chicken_lollipops.jpg",
    count: true,
    category: "Snacks",

    sizes: {
      Quarter: { price: 150, quantity: 0 },
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Chicken Broast",
    image: "chicken_broast.jpg",
    count: true,
    category: "Snacks",

    sizes: {
      "6 pcs": { price: 300, quantity: 0 },
      "12 pcs": { price: 600, quantity: 0 },
    },
  },
  {
    name: "Chicken Popcorn",
    image: "chicken_popcorn.jpg",
    count: true,
    category: "Snacks",

    sizes: {
      Quarter: { price: 150, quantity: 0 },
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Chicken Burger",
    image: "chicken_burger.jpg",
    count: true,
    category: "Burger",

    sizes: {
      Regular: { price: 80, quantity: 0 },
    },
  },
  {
    name: "Boneless Strips",
    image: "boneless_strips.jpg",
    count: true,
    category: "Snacks",

    sizes: {
      Quarter: { price: 150, quantity: 0 },
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Twister Roll",
    image: "twister_roll.jpg",
    count: true,
    category: "Wraps",

    sizes: {
      Regular: { price: 80, quantity: 0 },
    },
  },
  {
    name: "Tandoori Chicken",
    image: "tandoori_chicken.jpg",
    count: true,
    category: "Tandoori",

    sizes: {
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Chicken Biryani",
    image: "chicken_biryani.jpg",
    count: true,
    category: "Rice",

    sizes: {
      Quarter: { price: 50, quantity: 0 },
      Half: { price: 100, quantity: 0 },
      Full: { price: 200, quantity: 0 },
    },
  },
  {
    name: "Afghani Tandoori",
    image: "afghani_tandoori.jpg",
    count: true,
    category: "Tandoori",

    sizes: {
      Half: { price: 500, quantity: 0 },
      Full: { price: 1000, quantity: 0 },
    },
  },
  {
    name: "Butter Roti",
    image: "butter_roti.jpg",
    count: true,
    category: "Bread",
    // Count: false,
    sizes: {
      Regular: { price: 12, quantity: 0 },
    },
  },
  {
    name: "Rumali Roti",
    image: "rumali_roti.jpg",
    count: true,
    category: "Bread",
    // Count: false,
    sizes: {
      Regular: { price: 7, quantity: 0 },
    },
  },
  {
    name: "Mutton Rara",
    image: "mutton_rara.jpg",
    count: true,
    category: "Mutton Dishes",

    sizes: {
      Half: { price: 350, quantity: 0 },
      Full: { price: 700, quantity: 0 },
    },
  },
  {
    name: "Mutton Handi",
    image: "mutton_handi.jpg",
    count: true,
    category: "Mutton Dishes",

    sizes: {
      Half: { price: 400, quantity: 0 },
      Full: { price: 800, quantity: 0 },
    },
  },
  {
    name: "Shahi Paneer",
    image: "shahi_paneer.jpg",
    count: true,
    category: "Vegetarian",

    sizes: {
      Quarter: { price: 150, quantity: 0 },
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Paneer Lababdar",
    image: "paneer_lababdar.jpg",
    count: true,
    category: "Vegetarian",

    sizes: {
      Quarter: { price: 150, quantity: 0 },
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Malai Tikka",
    image: "malai_tikka.jpg",
    count: true,
    category: "Tandoori",

    sizes: {
      Half: { price: 300, quantity: 0 },
      Full: { price: 600, quantity: 0 },
    },
  },
  {
    name: "Reshmi Kebab",
    image: "reshmi_kebab.jpg",
    count: true,
    category: "Tandoori",

    sizes: {
      Regular: { price: 200, quantity: 0 },
    },
  },
  {
    name: "Fish Fry",
    image: "fish_fry.jpg",
    count: true,
    category: "Seafood",

    sizes: {
      Quarter: { price: 180, quantity: 0 },
      Half: { price: 350, quantity: 0 },
    },
  },
  {
    name: "Tandoori Roti",
    image: "tandoori_roti.jpg",
    count: true,
    category: "Bread",
    // Count: false,
    sizes: {
      Regular: { price: 7, quantity: 0 },
    },
  },
  {
    name: "Matka Raan",
    image: "matka_raan.jpg",
    count: true,
    category: "Mutton Dishes",

    sizes: {
      Regular: { price: 1800, quantity: 0 },
    },
  },
];
