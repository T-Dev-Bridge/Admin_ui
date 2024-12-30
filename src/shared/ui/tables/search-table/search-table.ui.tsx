import { Box } from "@mui/material";
import { pathKeys } from "@/shared/lib/react-router";
import { Breadcrumb } from "../../breadcrumb";
import { PageContainer } from "../../container";

const BCrumb = [
  {
    to: pathKeys.root,
    title: "Home",
  },
  {
    title: "Search Table",
  },
];

export function SearchTable() {
  return (
    <PageContainer
      title="Search Table"
      description="this is Search Table page"
    >
      {/* breadcrumb */}
      <Breadcrumb
        title="Search Table"
        items={BCrumb}
      />
      {/* end breadcrumb */}
      <Box />
    </PageContainer>
  );
}

export default SearchTable;
