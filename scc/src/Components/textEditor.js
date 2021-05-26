import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import PageContainer from "./pageContainer";
import { isMobile } from "react-device-detect";
import ActionButtons from "./Search/actionButtons";
import Legends from "./legends";
import Suggestions from "./Suggestions/suggestions";
import customCard from "../app/themes/customCard";
import WarningAlert from "./Alerts/warningAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  secondary: {
    color: "#141414",
    fontSize: 16,
    userSelect: "none",
    padding: theme.spacing(1, 1, 0, 1),
  },
  secondaryTitle: {
    fontSize: 26,
    userSelect: "none",
    padding: theme.spacing(1),
  },
  subHeading: {
    userSelect: "none",
    fontSize: 16,
    padding: theme.spacing(1, 0),
    color: "#4756ca",
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function TextEditor(props) {
  const classes = useStyles();
  const customCards = customCard();

  const [dataList, setWords] = useState([]); // Stores the words fetched by the api
  const [type, setType] = useState(); // Stores the type of fetch that was made
  const [repText, setRepText] = useState(); // Stores the text that can be pasted
  const [definitions, setDefinitions] = useState([]); // Stores definitions featched by the api
  const [information, setInformation] = useState([]); // Stores definitions featched by the api
  const [portmanteaus, setPortmanteaus] = useState([]); // Stores portamanteaus
  const [rhymes, setRhymes] = useState([]); // Stores dual rhymes
  const [funChange, setFunChange] = useState(); // Stores the function to change focus to the editor
  const [buttonCommand, setButtonCommand] = useState(); // Stores the command of the pressed button
  const [selectedText, setSelectedText] = useState(); // Stores the selected text
  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [isLoading, setIsLoading] = useState(false); // Stores if the component results are being loaded

  const setRep = (e) => setRepText(e);
  const typeChange = (e) => setType(e);

  const handleDataChange = (command, newData) => {
    setInformation([]);
    setDefinitions([]);
    setPortmanteaus([]);
    setWords([]);
    setRhymes([]);

    const baseUrl = "http://localhost:8088/scc/api/" + command;
    let URL = undefined;

    if (
      command === "findSimilarEndsWith" ||
      command === "findSimilarStartsWith" ||
      command === "wordsStartingWithEndingWith"
    ) {
      if (command === "findSimilarEndsWith")
        URL = baseUrl + "?endLetter=" + newData[0] + "&word=" + newData[1];
      else if (command === "wordsStartingWithEndingWith")
        URL =
          baseUrl + "?startLetter=" + newData[0] + "&endLetter=" + newData[1];
      else {
        URL = baseUrl + "?startLetter=" + newData[0] + "&word=" + newData[1];
      }

      fetch(URL)
        .then((res) => res.json())
        .then((wordList) => {
          setWords(wordList);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (newData !== undefined) {
        const URL = baseUrl + "?word=" + newData.trim();
        if (command === "findPortmanteaus") {
          fetch(URL)
            .then((res) => res.json())
            .then((wordList) => {
              setPortmanteaus(wordList);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (command === "findWordInformation") {
          fetch(URL)
            .then((res) => res.json())
            .then((wordList) => {
              setInformation(wordList);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (command === "findDualRhymes") {
          let data = newData.split(" ");
          let newURL =
            baseUrl + "?firstWord=" + data[0] + "&secondWord=" + data[1];
          fetch(newURL)
            .then((res) => res.json())
            .then((wordList) => {
              setRhymes(wordList);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          fetch(URL)
            .then((res) => res.json())
            .then((wordList) => {
              setWords(wordList);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  const handleDefinitionChange = (command, newData) => {
    setWords([]);
    const URL = "http://localhost:8088/scc/api/" + command + "?word=" + newData;
    fetch(URL)
      .then((res) => res.json())
      .then((wordList) => {
        setDefinitions(wordList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const legends = () => {
    if (!isMobile) return <Legends />;
  };

  const description = () => {
    if (isMobile)
      return {
        text: `* Type the content you want to and once you feel the need,
              select the word and press the specific button to get the 
              type of suggestion you desire.`,
        style: classes.secondary + " text-white mt-5",
      };
    else
      return {
        text: `* Type the content you want to and once you feel the need,
            select the word and press the specific key combination or 
            the button to get the type of suggestion you desire.`,
        style: classes.secondary + " text-white",
      };
  };

  return (
    <div className="container-fluid">
      <Typography
        className={description().style}
        style={{ fontSize: "0.75rem" }}
      >
        {description().text}
      </Typography>
      <div className="row">
        <div className="col-md-8 col-12 mt-2 ps-2 pe-1">
          <Card className={classes.root + " " + customCards.root}>
            <CardContent className="TextEditor">
              <PageContainer
                onSearch={handleDataChange}
                onDefChange={handleDefinitionChange}
                onChange={typeChange}
                reptext={repText}
                buttonCommand={buttonCommand}
                setButtonCommand={setButtonCommand}
                setContent={props.setContent}
                changeFun={setFunChange}
                selectedText={selectedText}
                setSelectedText={setSelectedText}
                name={props.name}
                setName={props.setName}
                saved={props.saved}
                setSaved={props.setSaved}
                setIsLoading={setIsLoading}
                openFileContent={props.openFileContent}
                setOpenFileContent={props.setOpenFileContent}
                setOpenWarningAlert={setOpenWarningAlert}
                setWarningMessage={setWarningMessage}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4 col-12 mt-2 ps-2 pe-1">
          <Suggestions
            type={type}
            dataList={dataList}
            portmanteaus={portmanteaus}
            definitions={definitions}
            information={information}
            rhymes={rhymes}
            onClick={setRep}
            isLoading={isLoading}
            funChange={funChange}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12 ps-2 pe-1">
          <ActionButtons onClick={setButtonCommand} />
          {legends()}
        </div>
      </div>
      <Snackbar
        open={openWarningAlert}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") return;
          setOpenWarningAlert(false);
        }}
      >
        <WarningAlert
          open={openWarningAlert}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            setOpenWarningAlert(false);
          }}
          message={warningMessage}
        />
      </Snackbar>
    </div>
  );
}
