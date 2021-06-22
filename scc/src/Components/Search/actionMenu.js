import { MenuItem } from "@material-ui/core";
import React from "react";
import { actionMenuList } from "../../app/config/Constanst";

const ActionMenu = (props) => {
  const handleCommand = (e) => {
    if (e === "copy") {
      props.setRepText(props.selected);
      props.handleClose();
    } else {
      props.handleKeyCommand(e);
      props.handleClose();
    }
  };
  return (
    <div>
      {actionMenuList.map((x, index) =>
        props.selected === undefined ? (
          <MenuItem key={index} disabled>
            {x.val}
          </MenuItem>
        ) : (
          <MenuItem
            key={Math.random() * 100}
            onClick={() => handleCommand(x.command)}
          >
            {x.val}
          </MenuItem>
        )
      )}
    </div>
  );
};

export default ActionMenu;
