<?php

namespace App\Http\Controllers;

use App\Models\PickupSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrdersController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $orders = PickupSchedule::where('user_id', $user->id)
            ->with('orderItems.product')
            ->latest()
            ->paginate(15)
            ->through(fn ($schedule) => [
                'id'             => $schedule->id,
                'status'         => $schedule->status,
                'status_label'   => $schedule->getStatusLabel(),
                'status_color'   => $schedule->getStatusColor(),
                'payment_status' => $schedule->payment_status,
                'pickup_date'    => $schedule->pickup_date->format('M d, Y'),
                'preferred_time' => \Carbon\Carbon::parse($schedule->preferred_time)->format('h:i A'),
                'full_address'   => $schedule->full_address,
                'is_terminal'    => $schedule->isTerminal(),
                'items_count'    => $schedule->orderItems->count(),
                'items'          => $schedule->orderItems->map(fn ($item) => [
                    'name'     => $item->product?->name ?? '—',
                    'quantity' => $item->quantity,
                ]),
                'created_at'     => $schedule->created_at->format('M d, Y · h:i A'),
            ]);

        return Inertia::render('Orders', [
            'orders' => $orders,
        ]);
    }
}