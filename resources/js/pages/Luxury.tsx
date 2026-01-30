import ServiceCatergories from "@/components/luxury/ServiceCategories";
import Breadcrumber from "@/components/luxury/Bredcrumb";
import EventPackages from "@/components/luxury/EventPackages";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
export default function Breadcrumb() {
    return (
        <AppHeaderLayout>
            <Breadcrumber />
            <ServiceCatergories/>
            <EventPackages/>
        </AppHeaderLayout>
    );
}
