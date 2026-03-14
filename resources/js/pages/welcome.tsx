import AppHeaderLayout from "@/layouts/app/app-header-layout";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import Howitworks from "@/components/home/Howitworks";
import Testimonial from "@/components/home/Testimonial";
import Contactme from "@/components/home/Contact";
import { usePage } from "@inertiajs/react";

export default function Welcome() {
    const { testimonials } = usePage().props as any;

    return (
        <AppHeaderLayout>
            <Hero />
            <Services />
            <Pricing />
            <Howitworks />
            <Testimonial testimonials={testimonials} />
            <Contactme />
        </AppHeaderLayout>
    );
}
