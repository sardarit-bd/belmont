import ServiceCatergories from "@/components/luxury/ServiceCategories";
import Breadcrumber from "@/components/luxury/Bredcrumb";
import EventPackages from "@/components/luxury/EventPackages";
import Benefits from "@/components/luxury/Benefits";
import Volume from "@/components/luxury/Volume";
import Consultation from "@/components/luxury/Consultation";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
export default function Breadcrumb() {
    return (
        <AppHeaderLayout>
            <Breadcrumber />
            <ServiceCatergories/>
            <EventPackages/>
            <Benefits />
            <Volume />
            <Consultation />
        </AppHeaderLayout>
    );
}
