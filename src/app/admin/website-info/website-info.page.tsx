import AdminWebsiteTextEdit from "@/components/admin-components/admin-website-text-edit";
import EditWebsiteInfoForm from "@/components/forms/website-info/edit-website-info-form";
import { AdminManagementWebsiteInfo } from "@/types/admin-types/admin-website-info-types";
import { Heading } from "@radix-ui/themes";
import React from "react";

type WebsiteInfoManagementProps = {
    data: AdminManagementWebsiteInfo;
};
export default function WebsiteInfoManagement({ ...props }: WebsiteInfoManagementProps) {
    const { data } = props;
    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 mt-4 mx-8">
            <div className="flex flex-1 justify-center">
                <div>
                    <Heading size={"6"}>Website Info</Heading>
                    <div className=" border-2 rounded-lg shadow-lg p-8 max-w-3xl">
                        <EditWebsiteInfoForm details={data.websiteInfo} />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 justify-center">
                <div>
                    <Heading size={"6"}>Website Text</Heading>
                    <div className="flex flex-1 border-2 rounded-lg shadow-lg p-8 max-w-3xl">
                        <AdminWebsiteTextEdit topic={data.topic} websiteInfoFields={data.websiteInfoFields} />
                    </div>
                </div>
            </div>
        </div>
    );
}
