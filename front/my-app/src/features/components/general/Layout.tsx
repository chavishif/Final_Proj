import HomePage  from "./HomePage";
import { Box } from "./Box";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
  </Box>
);
