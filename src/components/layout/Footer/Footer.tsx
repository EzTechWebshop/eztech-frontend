import PageLogo from "@/components/layout/page-logo";
import { Button } from "@/components/ui/button";
import { DayOfWeek, OpeningHours, WebsiteInfo } from "@/types/domain-types";
import { Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { SiTrustpilot } from "react-icons/si";

type FooterProps = {
    data: WebsiteInfo;
};
export default async function Footer({ ...props }: FooterProps) {
    const { data } = props;
    return (
        <div className="flex flex-1 max-w-7xl mx-auto my-8">
            <div className="flex flex-col gap-4 w-full">
                <FooterInfo data={data} />
                <FooterLinks data={data} />
                <FooterText data={data} />
            </div>
        </div>
    );
}

type FooterInfoProps = {
    data: WebsiteInfo;
};
const FooterInfo = ({ ...props }: FooterInfoProps) => {
    const { data } = props;
    return (
        <div className="flex flex-1 justify-between">
            <div className="flex flex-col gap-1">
                <PageLogo />
                <Text size={"2"}>{data.companyName}</Text>
                <Text size={"2"}>{data.phoneNumber}</Text>
                <Text size={"2"}>{data.address}</Text>
                <Text size={"2"}>{data.email}</Text>
            </div>
            <div className="flex flex-col w-[200px]">
                <div className="border-b-2 mb-2">
                    <Heading size={"2"}>Opening Hours</Heading>
                </div>
                {data.weeklyOpeningHours.map((day) => (
                    <div className="flex flex-1 justify-between border-b" key={day.id}>
                        <Text size={"2"}>{DayOfWeek[day.dayOfWeek]}</Text>
                        {day.isClosed && <Text size={"2"}>Closed</Text>}
                        {!day.isClosed && day.openTime != null && day.closeTime != null && (
                            <FooterOpeningHours openingHours={day} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
function FooterOpeningHours({ openingHours }: { openingHours: OpeningHours }) {
    const openTime = new Date("1970-01-01T" + openingHours.openTime)
        .toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        })
        .replace(/^0/, "");

    const closeTime = new Date("1970-01-01T" + openingHours.closeTime)
        .toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        })
        .replace(/^0/, "");

    return (
        <Text size={"2"}>
            {openTime} - {closeTime}
        </Text>
    );
}

type FooterLinksProps = {
    data: WebsiteInfo;
};
const FooterLinks = ({ ...props }: FooterLinksProps) => {
    const { data } = props;
    return (
        <div className="flex gap-6 pt-4 items-center border-t-2">
            <Link href={data.facebook}>
                <Button variant={"iconGhost"} size={"badge"}>
                    <IoLogoFacebook size={50} />
                </Button>
            </Link>
            <Link href={data.instagram}>
                <Button variant={"iconGhost"} size={"badge"}>
                    <IoLogoInstagram size={50} />
                </Button>
            </Link>
            <Link href="#">
                <Button variant={"iconGhost"} size={"badge"}>
                    <SiTrustpilot size={50} />
                </Button>
            </Link>
        </div>
    );
};
type FooterTextProps = {
    data: WebsiteInfo;
};
const FooterText = ({ ...props }: FooterTextProps) => {
    const { data } = props;
    return (
        <div className="flex flex-1 pt-4 items-center border-t-2">
            <Text size={"1"}>{data.footerInfo}</Text>
        </div>
    );
};
