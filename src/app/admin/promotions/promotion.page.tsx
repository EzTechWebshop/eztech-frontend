import AdminItemDetails from "@/components/admin-components/admin-items-details-field";
import AdminTable from "@/components/admin-components/admin-items-table";
import AdminMenuBar from "@/components/admin-components/admin-menu-bar";
import AddPromotionModal from "@/components/admin-components/modals/add-promotion-modal";
import { AdminManagementPromotions } from "@/types/admin-types/admin-promotion-types";

type PromotionManagementProps = {
  data: AdminManagementPromotions;
};
export default function PromotionManagement({
  ...props
}: PromotionManagementProps) {
  const { data } = props;
  if (!data) {
    return <div>Loading...</div>;
  }

  const labels: string[] = ["ID", "Title", "Start Date", "End Date", "Active"];
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <AdminMenuBar
          href="/admin/promotions"
          totalItems={data.totalPromotions}
          totalPages={data.totalPages}
          page={data.page}
          pageSize={data.pageSize}
          menuButtons={<MenuButtons />}
          customInfo={<CustomInfo promotionCount={data.totalPromotions} />}
        />
        {data.totalPromotions > 0 ? (
          <AdminTable
            type="promotions"
            labels={labels}
            items={data.promotions}
          />
        ) : (
          <p>No promotions found</p>
        )}
      </div>
      <div>
        {data.promotion && (
          <AdminItemDetails
            type="promotions"
            item={{
              promotion: data.promotion,
              products: data.promotionProducts,
            }}
          />
        )}
      </div>
    </div>
  );
}

function MenuButtons() {
  return (
    <>
      <AddPromotionModal />
    </>
  );
}

type CustomInfoProps = {
  promotionCount: number;
};
function CustomInfo({ ...props }: CustomInfoProps) {
  const { promotionCount } = props;
  return <>{`${promotionCount} promotions found`}</>;
}
