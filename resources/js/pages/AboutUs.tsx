import Hero from "@/components/about-us/Hero";
import Story from "@/components/about-us/Story";
import Value from "@/components/about-us/Value";
import Why from "@/components/about-us/Why";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function Breadcrumb() {
    return (
        <AppHeaderLayout>
            <Hero />
            <Story />
            <Value />
            <Why />
        </AppHeaderLayout>
    );
}