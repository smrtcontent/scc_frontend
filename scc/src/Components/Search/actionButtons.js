import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import customButton from "../../app/themes/customButton";
import customCard from "../../app/themes/customCard";

const ActionButtons = (props) => {
  const customCards = customCard();
  const classes = customButton();
  const handleClick = (value) => props.onClick(value);

  return (
    <>
      <Card className={customCards.root}>
        <CardContent className="p-1">
          <div className="row my-1">
            <div className="col-12">
              {[
                { command: "find-antonyms", val: "Antonyms" },
                { command: "find-adjectives", val: "Adjectives" },
                {
                  command: "find-approximate-rhymes",
                  val: "Approximate Rhymes",
                },
                { command: "find-consonant-match", val: "Consonant Match" },
                { command: "find-definitions", val: "Definition" },
                { command: "find-frequent-follower", val: "Frequent Follower" },
                { command: "find-hyponyms", val: "Hyponyms" },
                {
                  command: "find-frequent-predecessors",
                  val: "Frequent Predecessors",
                },
                { command: "find-nouns", val: "Nouns" },
                { command: "find-rhymes", val: "Rhymes" },
                { command: "find-dual-rhymes", val: "Dual Rhymes" },
                { command: "find-holonyms", val: "Holonyms" },
                { command: "find-homophones", val: "Homophones" },
                { command: "find-hypernyms", val: "Hypernyms" },
                { command: "find-information", val: "Information" },
                { command: "find-meronyms", val: "Meronyms" },
                { command: "find-portmanteaus", val: "Portmanteaus" },
                { command: "find-prefix-hints", val: "Prefix Hints" },
                { command: "find-advance-rhymes", val: "Advance Rhymes" },
                { command: "find-similar", val: "Similar Words" },
                { command: "find-similar-sound", val: "Similar Sounding Word" },
                { command: "find-spelt-similar", val: "Spelt Similar" },
                { command: "find-similar-start", val: "Similar Start" },
                { command: "find-similar-end", val: "Similar End" },
                {
                  command: "find-similar-start-end",
                  val: "Similar Start & End",
                },
                { command: "find-sentences", val: "Sentences using word" },
                { command: "find-sentences-syllable", val: "Sentences using word and Syllable" },
                { command: "find-sentences-srw", val: "Sentences using rhyme word and Syllable" },
                { command: "find-triggers", val: "Triggers" },
              ].map((x, index) => (
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
