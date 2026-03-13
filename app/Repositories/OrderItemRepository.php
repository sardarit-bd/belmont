<?php

namespace App\Repositories;

use App\Models\OrderItem;
use App\Repositories\Contracts\OrderItemRepositoryInterface;

class OrderItemRepository implements OrderItemRepositoryInterface
{
    public function createForSchedule(string $scheduleId, array $items): void
    {
        foreach ($items as $item) {
            OrderItem::create([
                'pickup_schedule_id' => $scheduleId,
                'product_id'         => $item['id'],
                'quantity'           => $item['quantity'],
                'unit_price'         => $item['price'],
                'total_price'        => $item['price'] * $item['quantity'],
            ]);
        }
    }
}