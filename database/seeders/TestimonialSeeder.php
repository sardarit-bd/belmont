<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'customer_name' => 'Maria Rodriguez',
                'designation'   => 'Office Manager',
                'company'       => 'Brockton Legal Associates',
                'review'        => 'Absolutely incredible service! My suits come back perfectly pressed every single time. The pickup and delivery is so convenient — I don\'t know how I managed without them.',
                'rating'        => 5,
                'sort_order'    => 1,
                'translations'  => [
                    'es' => 'Servicio absolutamente increíble. Mis trajes regresan perfectamente planchados cada vez. La recogida y entrega es muy conveniente, no sé cómo me las arreglaba sin ellos.',
                    'fr' => 'Service absolument incroyable ! Mes costumes reviennent parfaitement repassés à chaque fois. Le service de ramassage et livraison est tellement pratique.',
                    'pt' => 'Serviço absolutamente incrível! Meus ternos voltam perfeitamente passados toda vez. A coleta e entrega é tão conveniente — não sei como me virava sem eles.',
                    'zh' => '服务绝对令人难以置信！我的西装每次都完美地烫好归还。取送服务非常方便，我不知道没有他们我是怎么过的。',
                    'ht' => 'Sèvis enkwayab! Kostim mwen yo tounen pafètman rebase chak fwa. Sèvis pran ak livrezon an trè pratik — mwen pa konnen kijan mwen te fè san yo.',
                ],
            ],
            [
                'customer_name' => 'James Thompson',
                'designation'   => 'Financial Advisor',
                'company'       => 'Thompson Wealth Management',
                'review'        => 'I\'ve been using Belmont for over two years now. The quality is consistent, the staff is professional, and they always handle my designer pieces with the utmost care.',
                'rating'        => 5,
                'sort_order'    => 2,
                'translations'  => [
                    'es' => 'Llevo más de dos años usando Belmont. La calidad es constante, el personal es profesional y siempre cuidan mis prendas de diseñador con el mayor cuidado.',
                    'fr' => 'J\'utilise Belmont depuis plus de deux ans. La qualité est constante, le personnel est professionnel et ils prennent toujours soin de mes pièces de créateur.',
                    'pt' => 'Uso a Belmont há mais de dois anos. A qualidade é consistente, a equipe é profissional e eles sempre tratam minhas peças de grife com o maior cuidado.',
                    'zh' => '我使用贝尔蒙特已经超过两年了。质量始终如一，员工专业，他们总是以最大的谨慎处理我的设计师单品。',
                    'ht' => 'Mwen itilize Belmont pou plis pase de zan kounye a. Kalite a konsistan, pèsonèl la pwofesyonèl, e yo toujou okipe pyès kreyatè mwen yo ak pi gwo swen.',
                ],
            ],
            [
                'customer_name' => 'Aisha Mensah',
                'designation'   => 'School Principal',
                'company'       => 'Brockton Academy',
                'review'        => 'They cleaned my daughter\'s wedding dress beautifully. It looked brand new. The team was so caring and kept me updated throughout the whole process. Highly recommend!',
                'rating'        => 5,
                'sort_order'    => 3,
                'translations'  => [
                    'es' => 'Limpiaron el vestido de boda de mi hija de manera hermosa. Se veía completamente nuevo. El equipo fue muy atento y me mantuvo informada durante todo el proceso. ¡Muy recomendado!',
                    'fr' => 'Ils ont nettoyé la robe de mariée de ma fille magnifiquement. Elle semblait toute neuve. L\'équipe était très attentionnée et m\'a tenue informée tout au long du processus.',
                    'pt' => 'Eles limparam o vestido de noiva da minha filha de forma linda. Parecia novo em folha. A equipe foi muito cuidadosa e me manteve atualizada durante todo o processo. Altamente recomendado!',
                    'zh' => '他们把我女儿的婚纱清洁得非常漂亮，看起来像全新的一样。团队非常体贴，在整个过程中一直更新我。强烈推荐！',
                    'ht' => 'Yo te rad maryaj pitit fi mwen an bèlman. Li te sanble tout nèf. Ekip la te trè atansyone e yo te kenbe mwen okouran pandan tout pwosesis la. Rekòmande anpil!',
                ],
            ],
            [
                'customer_name' => 'Carlos Ferreira',
                'designation'   => 'Restaurant Owner',
                'company'       => 'Casa Ferreira',
                'review'        => 'Best dry cleaners in Brockton by far. They handle our restaurant linens and staff uniforms every week without fail. Fast, reliable, and the results are always spotless.',
                'rating'        => 5,
                'sort_order'    => 4,
                'translations'  => [
                    'es' => 'Los mejores lavanderos en Brockton con diferencia. Manejan nuestra ropa de cama del restaurante y los uniformes del personal cada semana sin falta. Rápido, confiable y los resultados siempre son impecables.',
                    'fr' => 'Les meilleurs nettoyeurs à sec de Brockton de loin. Ils s\'occupent de notre linge de restaurant et des uniformes du personnel chaque semaine sans faute. Rapide, fiable et les résultats sont toujours impeccables.',
                    'pt' => 'Os melhores lavadores a seco em Brockton de longe. Eles cuidam das roupas de cama do nosso restaurante e dos uniformes da equipe toda semana sem falhar. Rápido, confiável e os resultados são sempre impecáveis.',
                    'zh' => '迄今为止布罗克顿最好的干洗店。他们每周处理我们餐厅的亚麻布和员工制服，从不出错。快速、可靠，结果总是一尘不染。',
                    'ht' => 'Pi bon netwayè sèk nan Brockton de lwen. Yo okipe rad tab restoran nou an ak inifòm anplwaye yo chak semèn san echèk. Rapid, fyab, e rezilta yo toujou san tach.',
                ],
            ],
            [
                'customer_name' => 'Linda Chen',
                'designation'   => 'Healthcare Professional',
                'company'       => null,
                'review'        => 'I trust Belmont with all my scrubs and professional attire. They understand the importance of cleanliness in my line of work and always deliver exceptional results on time.',
                'rating'        => 5,
                'sort_order'    => 5,
                'translations'  => [
                    'es' => 'Confío en Belmont con todos mis uniformes médicos y ropa profesional. Entienden la importancia de la limpieza en mi trabajo y siempre entregan resultados excepcionales a tiempo.',
                    'fr' => 'Je fais confiance à Belmont pour toutes mes tenues médicales et professionnelles. Ils comprennent l\'importance de la propreté dans mon domaine et livrent toujours des résultats exceptionnels à temps.',
                    'pt' => 'Confio na Belmont com todos os meus uniformes médicos e roupas profissionais. Eles entendem a importância da limpeza no meu trabalho e sempre entregam resultados excepcionais no prazo.',
                    'zh' => '我信任贝尔蒙特处理我所有的医疗制服和专业服装。他们了解我工作中清洁的重要性，总是按时提供卓越的结果。',
                    'ht' => 'Mwen fè konfyans Belmont ak tout inifòm medikal mwen yo ak rad pwofesyonèl mwen yo. Yo konprann enpòtans pwòpte nan travay mwen e yo toujou bay rezilta eksepsyonèl alè.',
                ],
            ],
            [
                'customer_name' => 'David Osei',
                'designation'   => 'Community Leader',
                'company'       => 'Brockton Community Center',
                'review'        => 'Wonderful family business that truly cares about the community. They cleaned our event tablecloths and banners and everything came back looking brand new. Very grateful for their service.',
                'rating'        => 4,
                'sort_order'    => 6,
                'translations'  => [
                    'es' => 'Maravilloso negocio familiar que realmente se preocupa por la comunidad. Limpiaron nuestros manteles y pancartas del evento y todo volvió como nuevo. Muy agradecido por su servicio.',
                    'fr' => 'Merveilleux commerce familial qui se soucie vraiment de la communauté. Ils ont nettoyé nos nappes et bannières d\'événement et tout est revenu comme neuf. Très reconnaissant pour leur service.',
                    'pt' => 'Maravilhoso negócio familiar que realmente se preocupa com a comunidade. Eles limparam nossas toalhas de mesa e banners de eventos e tudo voltou parecendo novo. Muito grato pelo serviço.',
                    'zh' => '美好的家族企业，真正关心社区。他们清洁了我们活动的桌布和横幅，一切都焕然一新。非常感谢他们的服务。',
                    'ht' => 'Biznis fanmi mèveye ki vrèman okipe kominote a. Yo te netwaye twal tab ak banyè evènman nou yo e tout bagay te tounen sanble tou nèf. Trè rekonesan pou sèvis yo.',
                ],
            ],
        ];

        foreach ($testimonials as $data) {
            $translations = $data['translations'];
            unset($data['translations']);

            $testimonial = Testimonial::updateOrCreate(
                ['customer_name' => $data['customer_name']],
                array_merge($data, ['is_active' => true])
            );

            foreach ($translations as $locale => $reviewText) {
                try {
                    $testimonial->translations()->updateOrCreate(
                        ['locale' => $locale, 'key' => 'review'],
                        ['value' => $reviewText, 'field_type' => 'textarea']
                    );
                } catch (\Exception $e) {
                    $this->command->error("✗ [{$data['customer_name']}] [{$locale}]: {$e->getMessage()}");
                }
            }

            $this->command->info("✓ Testimonial: {$data['customer_name']}");
        }
    }
}