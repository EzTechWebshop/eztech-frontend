import { Text } from "@radix-ui/themes";

type DetailTextProps = {
    label: string;
    text: any;
};
const DetailText = ({ ...props }: DetailTextProps) => {
    const { label, text } = props;
    return (
        <div className="flex justify-between gap-4">
            <Text className="font-semibold select-none">{label}</Text>
            <Text className="select-text">{text}</Text>
        </div>
    );
};

export default DetailText;
