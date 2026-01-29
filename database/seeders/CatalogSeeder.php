<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $dryCleaning = Service::create([
            'name' => 'Dry Cleaning', 
            'slug' => 'dry-cleaning', 
            'description' => 'Professional dry cleaning for delicate garments.'
        ]);
        
        $washFold = Service::create([
            'name' => 'Wash & Fold', 
            'slug' => 'wash-fold', 
            'description' => 'Everyday laundry, washed, dried, and folded.'
        ]);
        
        $household = Service::create([
            'name' => 'Household & Bedding', 
            'slug' => 'household',
            'description' => 'Comforters, linens, and tablecloths.'
        ]);

        $catShirts = Category::create(['name' => 'Shirts', 'slug' => 'shirts', 'sort_order' => 1]);
        $catBottoms = Category::create(['name' => 'Bottoms', 'slug' => 'bottoms', 'sort_order' => 2]);
        $catSuits = Category::create(['name' => 'Suits & Formal', 'slug' => 'suits', 'sort_order' => 3]);
        $catBedding = Category::create(['name' => 'Bedding', 'slug' => 'bedding', 'sort_order' => 4]);

        // Shirts Category
        $this->createProduct($dryCleaning, $catShirts, 'Shirt (Hanger)', 'Professional cleaning on hanger', 5.50);
        $this->createProduct($dryCleaning, $catShirts, 'Shirt (Box)', 'Professional cleaning boxed', 6.00);
        $this->createProduct($washFold, $catShirts, 'Shirt (Laundry)', 'Laundered and pressed', 4.45);
        $this->createProduct($dryCleaning, $catShirts, 'Blouse', 'Silk or delicate fabric', 8.50);

        // Bottoms Category
        $this->createProduct($dryCleaning, $catBottoms, 'Pants / Trousers', 'Pressed and creased', 7.00);
        $this->createProduct($dryCleaning, $catBottoms, 'Jeans', 'Cleaned and pressed', 7.00);
        $this->createProduct($dryCleaning, $catBottoms, 'Shorts', 'Summer wear', 6.00);

        // Suits Category
        $this->createProduct($dryCleaning, $catSuits, '2 Piece Suit', 'Jacket and pants', 14.50);
        $this->createProduct($dryCleaning, $catSuits, 'Sport Coat / Blazer', 'Jacket only', 8.50);
        $this->createProduct($dryCleaning, $catSuits, 'Tie', 'Silk tie cleaning', 5.00);

        // Bedding Category
        $this->createProduct($household, $catBedding, 'Comforter (King)', 'Down or synthetic', 35.00);
        $this->createProduct($household, $catBedding, 'Comforter (Queen)', 'Down or synthetic', 30.00);
        $this->createProduct($household, $catBedding, 'Sheets (Set)', 'Flat, fitted, and pillowcases', 15.00);
    }

    private function createProduct($service, $category, $name, $desc, $price)
    {
        Product::create([
            'service_id' => $service->id,
            'category_id' => $category->id,
            'name' => $name,
            'description' => $desc,
            'price' => $price,
            'is_active' => true,
        ]);
    }
}
