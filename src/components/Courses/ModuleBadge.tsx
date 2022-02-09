import { Badge } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../../scripts/fetcher";

type Props = {
  item: any;
};

export default function ModuleBadge({ item }: Props) {
  const { data }: any = useSWR(
    `/api/getModuleData?module=${item.path}`,
    fetcher
  );
  return (
    <>
      {item.tag == "coming soon" && (
        <Badge w="fit-content" colorScheme="purple">
          coming soon
        </Badge>
      )}

      {item.tag != "coming soon" && data?.tag != "no tag" && (
        <Badge w="fit-content" colorScheme={data?.color}>
          {data?.tag}
        </Badge>
      )}
    </>
  );
}
