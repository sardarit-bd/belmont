export type StepState = 'done' | 'active' | 'pending';

export interface Stats {
    total: number;
    completed: number;
    pending: number;
}

export interface OrderItem { 
    name: string; 
    quantity: number; 
}

export interface Schedule {
    id: string; 
    order_number: string; 
    status: string; 
    status_label: string;
    pickup_date: string; 
    preferred_time: string; 
    full_address: string;
    items_count: number; 
    items: OrderItem[]; 
    payment_status?: string;
}

export interface Garment {
    product_id: string;
    name: string;
    category: string;
    category_slug: string;
    total_qty: number;
    order_count: number;
}
