import { AdminManagementWebsiteInfo } from "@/types/admin-types/admin-website-info-types";
import { WebsiteInfoFieldTopic } from "@/types/domain-types";
import api from "@/utils/api";
import WebsiteInfoManagement from "./website-info.page";

type WebsiteInfoManagementPageProps = {
    searchParams: {
        topic: WebsiteInfoFieldTopic;
    };
};
export default async function WebsiteInfoManagementPage({...props}: WebsiteInfoManagementPageProps) {
    const { searchParams } = props;
    let searchQuery = "?";
    const searchQueries = Object.entries(searchParams);
    searchQueries.forEach(([key, value]) => {
        if (value) {
            searchQuery += `${key}=${value}&`;
        }
    });
    const res = await api.management.getWebsiteInfoManagement(searchQuery);
    const data: AdminManagementWebsiteInfo = res.data;
    return <WebsiteInfoManagement data={data} />;
}
