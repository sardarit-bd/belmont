<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Database\Seeder;

class TranslationSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedServices();
        $this->seedCategories();
        $this->seedProducts();
    }

    private function seedServices(): void
    {
        $translations = [
            'dry_cleaning' => [
                'es' => ['name' => 'Lavado en Seco',       'description' => 'Limpieza profesional en seco para prendas delicadas y formales.'],
                'pt' => ['name' => 'Lavagem a Seco',        'description' => 'Limpeza profissional a seco para roupas delicadas e formais.'],
                'fr' => ['name' => 'Nettoyage à Sec',       'description' => 'Nettoyage professionnel à sec pour vêtements délicats et formels.'],
                'zh' => ['name' => '干洗',                  'description' => '为精致和正式服装提供专业干洗服务。'],
                'ht' => ['name' => 'Nettoye Sèk',           'description' => 'Netwayaj pwofesyonèl sèk pou rad delika ak fòmèl.'],
            ],
            'wash_fold' => [
                'es' => ['name' => 'Lavar y Doblar',        'description' => 'Ropa fresca, limpia y bien doblada para el uso diario.'],
                'pt' => ['name' => 'Lavar e Dobrar',         'description' => 'Roupa fresca, limpa e dobrada para necessidades diárias.'],
                'fr' => ['name' => 'Laver et Plier',         'description' => 'Linge frais, propre et soigneusement plié pour un usage quotidien.'],
                'zh' => ['name' => '洗涤折叠',               'description' => '为日常需求提供新鲜、干净、整齐折叠的衣物。'],
                'ht' => ['name' => 'Lave ak Pliye',          'description' => 'Rad fre, pwòp, ak pliye pou bezwen chak jou.'],
            ],
            'hang_dry' => [
                'es' => ['name' => 'Secado en Percha',      'description' => 'Servicio de secado suave para telas delicadas.'],
                'pt' => ['name' => 'Secar no Cabide',        'description' => 'Serviço de secagem suave para tecidos delicados.'],
                'fr' => ['name' => 'Séchage sur Cintre',     'description' => 'Service de séchage doux pour les tissus délicats.'],
                'zh' => ['name' => '挂晾',                   'description' => '为娇嫩面料提供温和晾干服务。'],
                'ht' => ['name' => 'Sèche sou Sèch',         'description' => 'Sèvis sèchaj dou pou twal delika.'],
            ],
        ];

        foreach ($translations as $slug => $locales) {
            $service = Service::where('slug', $slug)->first();

            if (!$service) {
                $this->command->warn("⚠ Service not found: {$slug} — skipping");
                continue;
            }

            foreach ($locales as $locale => $fields) {
                foreach ($fields as $key => $value) {
                    try {
                        $service->translations()->updateOrCreate(
                            ['locale' => $locale, 'key' => $key],
                            ['value' => $value, 'field_type' => $key === 'description' ? 'textarea' : 'text']
                        );
                    } catch (\Exception $e) {
                        $this->command->error("✗ Service [{$slug}] [{$locale}.{$key}]: {$e->getMessage()}");
                    }
                }
            }

            $this->command->info("✓ Service: {$slug}");
        }
    }

    private function seedCategories(): void
    {
        $translations = [
            'tops'           => ['es' => 'Partes de Arriba',    'pt' => 'Partes de Cima',     'fr' => 'Hauts',              'zh' => '上衣',   'ht' => 'Tèt Rad'],
            'bottoms'        => ['es' => 'Partes de Abajo',     'pt' => 'Partes de Baixo',    'fr' => 'Bas',                'zh' => '下装',   'ht' => 'Ba Rad'],
            'full_body'      => ['es' => 'Cuerpo Completo',     'pt' => 'Corpo Inteiro',      'fr' => 'Corps Entier',       'zh' => '全身',   'ht' => 'Kò Antye'],
            'household'      => ['es' => 'Hogar',               'pt' => 'Casa',               'fr' => 'Maison',             'zh' => '家居',   'ht' => 'Kay'],
            'accessories'    => ['es' => 'Accesorios',          'pt' => 'Acessórios',         'fr' => 'Accessoires',        'zh' => '配件',   'ht' => 'Akseswa'],
            'comforter'      => ['es' => 'Edredones',           'pt' => 'Edredons',           'fr' => 'Couettes',           'zh' => '被子',   'ht' => 'Kouvèti'],
            'dawn_comforter' => ['es' => 'Edredones de Plumón', 'pt' => 'Edredons de Plumas', 'fr' => 'Couettes en Duvet',  'zh' => '羽绒被', 'ht' => 'Kouvèti Plim'],
            'blanket'        => ['es' => 'Mantas',              'pt' => 'Cobertores',         'fr' => 'Couvertures',        'zh' => '毯子',   'ht' => 'Couvrèt'],
        ];

        foreach ($translations as $slug => $locales) {
            $category = Category::where('slug', $slug)->first();

            if (!$category) {
                $this->command->warn("⚠ Category not found: {$slug} — skipping");
                continue;
            }

            foreach ($locales as $locale => $translatedName) {
                try {
                    $category->translations()->updateOrCreate(
                        ['locale' => $locale, 'key' => 'name'],
                        ['value' => $translatedName, 'field_type' => 'text']
                    );
                } catch (\Exception $e) {
                    $this->command->error("✗ Category [{$slug}] [{$locale}]: {$e->getMessage()}");
                }
            }

            $this->command->info("✓ Category: {$slug}");
        }
    }

    private function seedProducts(): void
    {
        $translations = [
            // TOPS
            'Shirts'                => ['es' => 'Camisas',                       'pt' => 'Camisas',                    'fr' => 'Chemises',                      'zh' => '衬衫',           'ht' => 'Chemiz'],
            'Polo'                  => ['es' => 'Polo',                          'pt' => 'Polo',                       'fr' => 'Polo',                          'zh' => 'Polo衫',         'ht' => 'Polo'],
            'T-Shirt'               => ['es' => 'Camiseta',                      'pt' => 'Camiseta',                   'fr' => 'T-Shirt',                       'zh' => 'T恤',            'ht' => 'T-Shirt'],
            'Blouse'                => ['es' => 'Blusa',                         'pt' => 'Blusa',                      'fr' => 'Blouse',                        'zh' => '女衬衫',         'ht' => 'Blòz'],
            'Sweater'               => ['es' => 'Suéter',                        'pt' => 'Suéter',                     'fr' => 'Pull',                          'zh' => '毛衣',           'ht' => 'Sweatè'],
            'Blazer'                => ['es' => 'Blazer',                        'pt' => 'Blazer',                     'fr' => 'Blazer',                        'zh' => '西装外套',       'ht' => 'Blazer'],
            'Vest'                  => ['es' => 'Chaleco',                       'pt' => 'Colete',                     'fr' => 'Gilet',                         'zh' => '背心',           'ht' => 'Jilet'],
            'Hoodie'                => ['es' => 'Sudadera con Capucha',          'pt' => 'Moletom com Capuz',           'fr' => 'Sweat à Capuche',               'zh' => '连帽衫',         'ht' => 'Kapichon'],
            'Jacket'                => ['es' => 'Chaqueta',                      'pt' => 'Jaqueta',                    'fr' => 'Veste',                         'zh' => '夹克',           'ht' => 'Jak'],
            // BOTTOMS
            'Pants'                 => ['es' => 'Pantalones',                    'pt' => 'Calças',                     'fr' => 'Pantalon',                      'zh' => '裤子',           'ht' => 'Pantalon'],
            'Skirt'                 => ['es' => 'Falda',                         'pt' => 'Saia',                       'fr' => 'Jupe',                          'zh' => '裙子',           'ht' => 'Jip'],
            'Shorts'                => ['es' => 'Pantalones Cortos',             'pt' => 'Shorts',                     'fr' => 'Short',                         'zh' => '短裤',           'ht' => 'Chòt'],
            'Jeans'                 => ['es' => 'Jeans',                         'pt' => 'Jeans',                      'fr' => 'Jean',                          'zh' => '牛仔裤',         'ht' => 'Jeans'],
            'Sweat Pants'           => ['es' => 'Pantalones de Chándal',         'pt' => 'Calça de Moletom',            'fr' => 'Jogging',                       'zh' => '运动裤',         'ht' => 'Pantalon Espò'],
            // FULL BODY
            'Suit (Blazer & Pants)' => ['es' => 'Traje (Blazer y Pantalón)',     'pt' => 'Terno (Blazer e Calça)',      'fr' => 'Costume (Veste et Pantalon)',   'zh' => '西装（外套和裤子）', 'ht' => 'Kostim (Blazer ak Pantalon)'],
            'Casual Dress'          => ['es' => 'Vestido Casual',                'pt' => 'Vestido Casual',              'fr' => 'Robe Décontractée',             'zh' => '休闲连衣裙',     'ht' => 'Rad Dékontrakte'],
            'Formal Dress'          => ['es' => 'Vestido Formal',                'pt' => 'Vestido Formal',              'fr' => 'Robe Formelle',                 'zh' => '正式礼服',       'ht' => 'Rad Fòmèl'],
            'Coat'                  => ['es' => 'Abrigo',                        'pt' => 'Casaco',                     'fr' => 'Manteau',                       'zh' => '大衣',           'ht' => 'Manto'],
            'Uniform'               => ['es' => 'Uniforme',                      'pt' => 'Uniforme',                   'fr' => 'Uniforme',                      'zh' => '制服',           'ht' => 'Inifòm'],
            'Jump Suit'             => ['es' => 'Mono',                          'pt' => 'Macacão',                    'fr' => 'Combinaison',                   'zh' => '连体裤',         'ht' => 'Konbinezon'],
            'Robe'                  => ['es' => 'Bata',                          'pt' => 'Roupão',                     'fr' => 'Robe de Chambre',               'zh' => '浴袍',           'ht' => 'Rad Chanm'],
            'Jogging Suit'          => ['es' => 'Traje de Jogging',              'pt' => 'Agasalho',                   'fr' => 'Survêtement',                   'zh' => '运动套装',       'ht' => 'Kostim Jogging'],
            // HOUSEHOLD
            'Table Cloth'           => ['es' => 'Mantel',                        'pt' => 'Toalha de Mesa',              'fr' => 'Nappe',                         'zh' => '桌布',           'ht' => 'Twal Tab'],
            // ACCESSORIES
            'Tie'                   => ['es' => 'Corbata',                       'pt' => 'Gravata',                    'fr' => 'Cravate',                       'zh' => '领带',           'ht' => 'Kravat'],
            'Pillowcase'            => ['es' => 'Funda de Almohada',             'pt' => 'Fronha',                     'fr' => 'Taie d\'Oreiller',              'zh' => '枕套',           'ht' => 'Zòrye'],
            'Scarves'               => ['es' => 'Bufandas',                      'pt' => 'Lenços',                     'fr' => 'Écharpes',                      'zh' => '围巾',           'ht' => 'Foula'],
            // COMFORTERS
            'Comforter (Twin)'      => ['es' => 'Edredón (Individual)',           'pt' => 'Edredom (Solteiro)',          'fr' => 'Couette (Une Place)',           'zh' => '单人被子',       'ht' => 'Kouvèti (Yon Plas)'],
            'Comforter (King)'      => ['es' => 'Edredón (King)',                 'pt' => 'Edredom (King)',              'fr' => 'Couette (King)',                'zh' => '特大被子',       'ht' => 'Kouvèti (King)'],
            'Comforter (Queen)'     => ['es' => 'Edredón (Queen)',                'pt' => 'Edredom (Queen)',             'fr' => 'Couette (Queen)',               'zh' => '大号被子',       'ht' => 'Kouvèti (Queen)'],
            'Comforter (Full)'      => ['es' => 'Edredón (Completo)',             'pt' => 'Edredom (Casal)',             'fr' => 'Couette (Double)',              'zh' => '双人被子',       'ht' => 'Kouvèti (Plen)'],
            // BLANKETS
            'Blanket (Short)'       => ['es' => 'Manta (Pequeña)',               'pt' => 'Cobertor (Pequeno)',          'fr' => 'Couverture (Petite)',           'zh' => '小毯子',         'ht' => 'Couvrèt (Piti)'],
            'Blanket (Full)'        => ['es' => 'Manta (Completa)',              'pt' => 'Cobertor (Casal)',            'fr' => 'Couverture (Double)',           'zh' => '双人毯子',       'ht' => 'Couvrèt (Plen)'],
            'Blanket (Queen)'       => ['es' => 'Manta (Queen)',                 'pt' => 'Cobertor (Queen)',            'fr' => 'Couverture (Queen)',            'zh' => '大号毯子',       'ht' => 'Couvrèt (Queen)'],
        ];

        foreach ($translations as $productName => $locales) {
            $product = Product::where('name', $productName)->first();

            if (!$product) {
                $this->command->warn("⚠ Product not found: {$productName} — skipping");
                continue;
            }

            foreach ($locales as $locale => $translatedName) {
                try {
                    $product->translations()->updateOrCreate(
                        ['locale' => $locale, 'key' => 'name'],
                        ['value' => $translatedName, 'field_type' => 'text']
                    );
                } catch (\Exception $e) {
                    $this->command->error("✗ Product [{$productName}] [{$locale}]: {$e->getMessage()}");
                }
            }

            $this->command->info("✓ Product: {$productName}");
        }
    }
}