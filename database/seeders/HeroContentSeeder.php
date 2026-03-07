<?php

namespace Database\Seeders;

use App\Models\ContentBlock;
use Illuminate\Database\Seeder;

class HeroContentSeeder extends Seeder
{
    public function run(): void
    {
        $content = [

            'badge' => [
                'type' => 'text',
                'translations' => [
                    'en' => 'Trusted by 1000+ Happy Customers',
                    'es' => 'Con la confianza de más de 1000 clientes',
                    'pt' => 'Confiado por mais de 1000 clientes',
                    'fr' => 'Approuvé par plus de 1000 clients',
                    'zh' => '深受1000多名客户信赖',
                    'ht' => 'Fè konfyans pa plis pase 1000 kliyan',
                ]
            ],

            'heading' => [
                'type' => 'textarea',
                'translations' => [
                    'en' => 'Professional Dry Cleaning & Laundry Services',
                    'es' => 'Servicios profesionales de limpieza en seco y lavandería',
                    'pt' => 'Serviços profissionais de lavagem a seco e lavanderia',
                    'fr' => 'Services professionnels de nettoyage à sec et de blanchisserie',
                    'zh' => '专业干洗和洗衣服务',
                    'ht' => 'Sèvis pwofesyonèl netwayaj sèk ak lesiv',
                ]
            ],

            'subheading' => [
                'type' => 'textarea',
                'translations' => [
                    'en' => 'Premium care for your garments with convenient pickup and delivery in Brockton, MA',
                    'es' => 'Cuidado premium para tus prendas con servicio conveniente de recogida y entrega en Brockton, MA',
                    'pt' => 'Cuidado premium para suas roupas com coleta e entrega convenientes em Brockton, MA',
                    'fr' => 'Soin premium pour vos vêtements avec service pratique de collecte et livraison à Brockton, MA',
                    'zh' => '为您的衣物提供高端护理，并在马萨诸塞州布罗克顿提供便捷的取送服务',
                    'ht' => 'Swen prim pou rad ou yo ak sèvis ranmase ak livrezon fasil nan Brockton, MA',
                ]
            ],

            'hero_image' => [
                'type'         => 'image',
                'translations' => [],
                'meta'         => [
                    'disk'      => 'public',
                    'directory' => 'hero',
                ],
            ],

        ];

        foreach ($content as $key => $block) {

            $order = 0;
            $record = ContentBlock::firstOrCreate(
                ['section' => 'hero', 'key' => $key],
                [
                    'type'      => $block['type'],
                    'is_active' => true,
                    'order'     => $order++,
                    'meta'      => $block['meta'] ?? null, // ← add
                ]
            );

            if (!empty($block['translations'])) {
                foreach ($block['translations'] as $locale => $value) {
                    $record->translations()->updateOrCreate(
                        ['locale' => $locale],
                        ['value'  => $value]
                    );
                }
            }
        }
    }
}