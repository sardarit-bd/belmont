import AppHeaderLayout from "@/layouts/app/app-header-layout";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import Howitworks from "@/components/home/Howitworks";
import Testimonial from "@/components/home/Testimonial";
import Contactme from "@/components/home/Contact";
import { Contact } from "lucide-react";

export default function welcome() {
    return (
        <AppHeaderLayout>
            <Hero />
            <Services />
            <Pricing />
            <Howitworks />
            <Testimonial />
            <Contactme/>
        </AppHeaderLayout>
    )
}
