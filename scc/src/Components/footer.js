import React from "react";
import { Box } from "@material-ui/core";

const Footer = () => {
  return (
    <div style={{ width: "100%", color: "#ffffff", backgroundColor: "inherit" }}>
      <Box display="flex">
        <Box
          display="block"
          flexGrow={1}
          p={1}
          m={1.1}
          justifyContent="flex-start"
        >
          Copyright &#169; 2021 Surgestreams. Designed and Developed by
          Surgestreams IT Team
        </Box>
        {/* <Box
                display="block" 
                p={1} 
                m={1}
                justifyContent='flex-end'
            >
            </Box> */}
      </Box>
    </div>
  );
};

export default Footer;
