<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PricingSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name'        => 'Dry Cleaning',
                'slug'        => 'dry_cleaning',
                'description' => 'Professional dry cleaning for delicate and formal garments.',
                'sort_order'  => 1,
                'categories'  => [
                    [
                        'name'        => 'Tops',
                        'slug'        => 'tops',
                        'sort_order'  => 1,
                        'products'    => [
                            ['name' => 'Shirts',  'price' => 5.50,  'sort_order' => 1],
                            ['name' => 'Polo',    'price' => 6.50,  'sort_order' => 2],
                            ['name' => 'T-Shirt', 'price' => 6.50,  'sort_order' => 3],
                            ['name' => 'Blouse',  'price' => 8.00,  'sort_order' => 4],
                            ['name' => 'Sweater', 'price' => 8.00,  'sort_order' => 5],
                            ['name' => 'Blazer',  'price' => 9.00,  'sort_order' => 6],
                            ['name' => 'Vest',    'price' => 6.50,  'sort_order' => 7],
                            ['name' => 'Hoodie',  'price' => 12.00, 'sort_order' => 8],
                            ['name' => 'Jacket',  'price' => 8.00,  'sort_order' => 9],
                        ],
                    ],
                    [
                        'name'       => 'Bottoms',
                        'slug'       => 'bottoms',
                        'sort_order' => 2,
                        'products'   => [
                            ['name' => 'Pants',       'price' => 8.00, 'sort_order' => 1],
                            ['name' => 'Skirt',       'price' => 7.50, 'sort_order' => 2],
                            ['name' => 'Shorts',      'price' => 7.50, 'sort_order' => 3],
                            ['name' => 'Jeans',       'price' => 8.00, 'sort_order' => 4],
                            ['name' => 'Sweat Pants', 'price' => 8.50, 'sort_order' => 5],
                        ],
                    ],
                    [
                        'name'       => 'Full Body',
                        'slug'       => 'full_body',
                        'sort_order' => 3,
                        'products'   => [
                            ['name' => 'Suit (Blazer & Pants)', 'price' => 16.00, 'sort_order' => 1],
                            ['name' => 'Casual Dress',          'price' => 20.00, 'sort_order' => 2],
                            ['name' => 'Formal Dress',          'price' => 30.00, 'sort_order' => 3],
                            ['name' => 'Coat',                  'price' => 26.75, 'sort_order' => 4],
                            ['name' => 'Uniform',               'price' => 16.00, 'sort_order' => 5],
                            ['name' => 'Jump Suit',             'price' => 20.00, 'sort_order' => 6],
                            ['name' => 'Robe',                  'price' => 20.00, 'sort_order' => 7],
                            ['name' => 'Jogging Suit',          'price' => 18.00, 'sort_order' => 8],
                        ],
                    ],
                    [
                        'name'       => 'Household',
                        'slug'       => 'household',
                        'sort_order' => 4,
                        'products'   => [
                            ['name' => 'Table Cloth', 'price' => 18.00, 'sort_order' => 1],
                        ],
                    ],
                    [
                        'name'       => 'Accessories',
                        'slug'       => 'accessories',
                        'sort_order' => 5,
                        'products'   => [
                            ['name' => 'Tie',        'price' => 6.50, 'sort_order' => 1],
                            ['name' => 'Pillowcase', 'price' => 5.00, 'sort_order' => 2],
                            ['name' => 'Scarves',    'price' => 6.50, 'sort_order' => 3],
                        ],
                    ],
                ],
            ],
            [
                'name'        => 'Wash & Fold',
                'slug'        => 'wash_fold',
                'description' => 'Fresh, clean, and neatly folded laundry for everyday needs.',
                'sort_order'  => 2,
                'categories'  => [
                    [
                        'name'       => 'Comforters',
                        'slug'       => 'comforter',
                        'sort_order' => 1,
                        'products'   => [
                            ['name' => 'Comforter (Twin)',  'price' => 20.00, 'sort_order' => 1],
                            ['name' => 'Comforter (King)',  'price' => 25.00, 'sort_order' => 2],
                            ['name' => 'Comforter (Queen)', 'price' => 40.00, 'sort_order' => 3],
                            ['name' => 'Comforter (Full)',  'price' => 35.00, 'sort_order' => 4],
                        ],
                    ],
                    [
                        'name'       => 'Dawn Comforters',
                        'slug'       => 'dawn_comforter',
                        'sort_order' => 2,
                        'products'   => [
                            ['name' => 'Comforter (Twin)',  'price' => 30.00, 'sort_order' => 1],
                            ['name' => 'Comforter (King)',  'price' => 35.00, 'sort_order' => 2],
                            ['name' => 'Comforter (Queen)', 'price' => 50.00, 'sort_order' => 3],
                            ['name' => 'Comforter (Full)',  'price' => 40.00, 'sort_order' => 4],
                        ],
                    ],
                ],
            ],
            [
                'name'        => 'Hang Dry',
                'slug'        => 'hang_dry',
                'description' => 'Gentle hang dry service for delicate fabrics.',
                'sort_order'  => 3,
                'categories'  => [
                    [
                        'name'       => 'Blankets',
                        'slug'       => 'blanket',
                        'sort_order' => 1,
                        'products'   => [
                            ['name' => 'Blanket (Short)',  'price' => 16.50, 'sort_order' => 1],
                            ['name' => 'Blanket (Full)',   'price' => 20.00, 'sort_order' => 2],
                            ['name' => 'Blanket (Queen)',  'price' => 27.00, 'sort_order' => 3],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($data as $serviceData) {
            $service = Service::updateOrCreate(
                ['slug' => $serviceData['slug']],
                [
                    'name'        => $serviceData['name'],
                    'description' => $serviceData['description'],
                    'sort_order'  => $serviceData['sort_order'],
                    'is_active'   => true,
                ]
            );

            foreach ($serviceData['categories'] as $categoryData) {
                $category = Category::updateOrCreate(
                    ['slug' => $categoryData['slug']],
                    [
                        'service_id'  => $service->id,
                        'name'        => $categoryData['name'],
                        'sort_order'  => $categoryData['sort_order'],
                    ]
                );

                foreach ($categoryData['products'] as $productData) {
                    Product::updateOrCreate(
                        [
                            'category_id' => $category->id,
                            'name'        => $productData['name'],
                        ],
                        [
                            'price'      => $productData['price'],
                            'sort_order' => $productData['sort_order'],
                            'is_active'  => true,
                        ]
                    );
                }
            }
        }
    }
}