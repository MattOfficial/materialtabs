import { FC, ReactNode, useState } from "react";
import { Tabs, Tab, Box, TabScrollButton } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface TabData {
  label: string;
  content: ReactNode;
}

interface TabsPageProps {
  tabs: TabData[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const TabsPage: FC<TabsPageProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleScrollButtonClick = (direction: "left" | "right") => {
    console.log("direction - ", direction);
    const newValue =
      direction === "left"
        ? Math.max(0, value - 1)
        : Math.min(tabs.length - 1, value + 1);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
          ScrollButtonComponent={(props) => (
            <TabScrollButton
              onClick={() => handleScrollButtonClick(props.direction)}
              direction={value === 0 ? "right" : "left"}
              orientation="horizontal"
            />
          )}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};
