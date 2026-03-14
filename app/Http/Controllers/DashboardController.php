<?php

namespace App\Http\Controllers;

use App\Models\PickupSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        // Active schedules — anything not delivered or cancelled
        $activeSchedules = PickupSchedule::where('user_id', $user->id)
            ->whereNotIn('status', ['delivered', 'cancelled'])
            ->with('orderItems.product')
            ->latest()
            ->get()
            ->map(fn ($schedule) => [
                'id'                => $schedule->id,
                'status'            => $schedule->status,
                'status_label'      => $schedule->getStatusLabel(),
                'status_color'      => $schedule->getStatusColor(),
                'payment_status'    => $schedule->payment_status,
                'pickup_date'       => $schedule->pickup_date->format('M d, Y'),
                'preferred_time'    => \Carbon\Carbon::parse($schedule->preferred_time)->format('h:i A'),
                'full_address'      => $schedule->full_address,
                'next_status'       => $schedule->getNextStatus(),
                'next_status_label' => $schedule->getNextStatusLabel(),
                'is_terminal'       => $schedule->isTerminal(),
                'items_count'       => $schedule->orderItems->count(),
                'items'             => $schedule->orderItems->map(fn ($item) => [
                    'name'        => $item->product?->name ?? $item->product_id,
                    'quantity'    => $item->quantity,
                    'unit_price'  => $item->unit_price,
                    'total_price' => $item->total_price,
                ]),
            ]);

        // My Garments — distinct items from all schedules
        $myGarments = \App\Models\OrderItem::whereHas('pickupSchedule', fn ($q) =>
                $q->where('user_id', $user->id)
            )
            ->with('product.category')
            ->get()
            ->groupBy('product_id')
            ->map(fn ($items) => [
                'product_id'    => $items->first()->product_id,
                'name'          => $items->first()->product?->name,
                'category'      => $items->first()->product?->category?->name,
                'category_slug' => $items->first()->product?->category?->slug,
                'total_qty'     => $items->sum('quantity'),
                'order_count'   => $items->count(),
            ])
            ->values()
            ->take(6);

        // Most recent active schedule for the tracker
        $trackerSchedule = $activeSchedules->first();

        // Stats
        $totalOrders     = PickupSchedule::where('user_id', $user->id)->count();
        $completedOrders = PickupSchedule::where('user_id', $user->id)->where('status', 'delivered')->count();
        $pendingOrders   = PickupSchedule::where('user_id', $user->id)->whereNotIn('status', ['delivered', 'cancelled'])->count();

        // Database notifications
        $notifications = $user->notifications()
            ->latest()
            ->limit(10)
            ->get()
            ->map(fn ($n) => [
                'id'   => $n->id,
                'data' => $n->data,
                'read' => !is_null($n->read_at),
                'time' => $n->created_at->diffForHumans(),
            ]);

        $unreadCount = $user->unreadNotifications()->count();

        return Inertia::render('Dashboard', [
            'activeSchedules' => $activeSchedules,
            'trackerSchedule' => $trackerSchedule,
            'stats'           => [
                'total'     => $totalOrders,
                'completed' => $completedOrders,
                'pending'   => $pendingOrders,
            ],
            'notifications'   => $notifications,
            'unreadCount'     => $unreadCount,
            'myGarments'      => $myGarments,
        ]);
    }
}