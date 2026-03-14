<?php

namespace App\Repositories;

use App\Models\OrderItem;
use App\Models\Product;
use App\Repositories\Contracts\OrderItemRepositoryInterface;

class OrderItemRepository implements OrderItemRepositoryInterface
{
    public function createForSchedule(string $scheduleId, array $items): void
    {
        $productIds = array_column($items, 'id');
        $products   = Product::whereIn('id', $productIds)
            ->pluck('price', 'id');

        foreach ($items as $item) {
            OrderItem::create([
                'pickup_schedule_id' => $scheduleId,
                'product_id'         => $item['id'],
                'quantity'           => $item['quantity'],
                'unit_price'         => $products[$item['id']] ?? 0, // always DB price
                'total_price'        => ($products[$item['id']] ?? 0) * $item['quantity'],
            ]);
        }
    }
}