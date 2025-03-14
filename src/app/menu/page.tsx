// app/menu/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface MenuItem {
  name: string;
  image: string;
  category: string;
  count: boolean;
  sizes: Record<string, { price: number }>;
}

export default function MenuPage() {
  // Sample data matching your schema
  const menuItems: MenuItem[] = [
    {
      name: "Classic Burger",
      image: "/images/burger.jpg",
      category: "Mains",
      count: false,
      sizes: {
        Regular: { price: 12.99 },
        Large: { price: 15.99 },
      },
    },
    {
      name: "Caesar Salad",
      image: "/images/salad.jpg",
      category: "Starters",
      count: true,
      sizes: {
        Standard: { price: 9.99 },
      },
    },
  ];

  // Group items by category
  const menuByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Restaurant Menu
          </h1>
        </div>

        {Object.entries(menuByCategory).map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card
                  key={item.name}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(item.sizes).map(([size, details]) => (
                        <div
                          key={size}
                          className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            {size}
                          </span>
                          <span className="font-semibold text-primary">
                            ${details.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {item.count && (
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        * Price per piece
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
