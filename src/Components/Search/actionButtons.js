import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import customButton from "../../app/themes/customButton";
import customCard from "../../app/themes/customCard";
import { actionButtonList } from "../../app/config/Constanst";

const ActionButtons = (props) => {
  const customCards = customCard();
  const classes = customButton();
  const handleClick = (value) => props.onClick(value);

  return (
    <>
      <Card className={customCards.root}>
        <CardContent className="p-1">
          <div className="row my-0">
            <div className="col-12">
              {actionButtonList.map((x, index) => (
                <Button
                  size="small"
                  key={index}
                  onClick={() => handleClick(x.command)}
                  color="primary"
                  variant="contained"
                  className={classes.root}
                >
                  {x.val}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ActionButtons;
