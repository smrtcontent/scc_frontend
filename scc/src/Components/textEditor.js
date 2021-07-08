import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import PageContainer from "./pageContainer";
import { isMobileOnly } from "react-device-detect";
import ActionButtons from "./Search/actionButtons";
import Legends from "./legends";
import Suggestions from "./Suggestions/suggestions";
import customCard from "../app/themes/customCard";
import WarningAlert from "./Alerts/warningAlert";
import { core } from "./../app/config/URLs";

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
  // const [definitions, setDefinitions] = useState([]); // Stores definitions featched by the api
  const [information, setInformation] = useState([]); // Stores Informations featched by the api
  const [portmanteaus, setPortmanteaus] = useState([]); // Stores portamanteaus
  const [rhymes, setRhymes] = useState([]); // Stores dual rhymes
  const [scrappedRhymes, setScrappedRhymes] = useState([]); // Stores scrapped rhymes
  const [sentences, setSentences] = useState([]); // Stores sentences fetched by the api
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
    // setDefinitions([]);
    setPortmanteaus([]);
    setWords([]);
    setRhymes([]);
    setSentences([]);
    setScrappedRhymes([]);

    const baseUrl = core + command;
    let URL = undefined;

    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem("uTID"));
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjI1NTg3OTgzLCJleHAiOjE2MjY0NTE5ODN9.2F0eDyqWbi8BsC7GDwoB3CM_pZ_95ROfeGbDsE7-79NEqwXHd-B1_bHg5DIGlWALuSjolUEOeFis6e1HYK0B_A");

    if (
      command === "findSimilarEndsWith" ||
      command === "findSimilarStartsWith" ||
      command === "wordsStartingWithEndingWith"||
      command === "wordsStartingWithEndingWithLetters"
    ) {
      if (command === "findSimilarEndsWith")
        URL = baseUrl + "?endLetter=" + newData[0] + "&word=" + newData[1];

      else if (command === "wordsStartingWithEndingWith")
        URL = baseUrl + "?startLetter=" + newData[0] + "&endLetter=" + newData[1];

      else if (command === "wordsStartingWithEndingWithLetters")
        URL = baseUrl + "?startLetter=" + newData[0] +"&numberMissing="+newData[1]+ "&endLetter=" + newData[2];
     
        else {
        URL = baseUrl + "?startLetter=" + newData[0] + "&word=" + newData[1];
      }

      fetch(URL,{method: 'get',
      headers: myHeaders})
        .then((res) => res.json())
        .then((wordList) => {
          if(wordList.status!==401){
          setWords(wordList);
          setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (newData !== undefined) {
        if (command === "getSentencesByWord") {
          const URL = baseUrl + "?word=" + newData.trim();
          fetch(URL,{method: 'get',
            headers: myHeaders})
            .then((res) => res.json())
            .then((sentenceList) => {
              if(sentenceList.status!==401){
              console.log("hi",sentenceList)
              setSentences(sentenceList);
              setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (command === "getSentencesByWordAndSyllable") {
          const URL =
            baseUrl +
            "?numberOfSyllables=" +
            newData[0].trim() +
            "&word=" +
            newData[1].trim();
            fetch(URL,{method: 'get',
      headers: myHeaders})
            .then((res) => res.json())
            .then((sentenceList) => {
              if(sentenceList.status!==401){
              setSentences(sentenceList);
              setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (command === "getSentencesByEndingRhymeWordAndSyllable") {
          const URL =
            baseUrl +
            "?numberOfSyllables=" +
            newData[0].trim() +
            "&word=" +
            newData[1].trim();
            fetch(URL,{method: 'get',
      headers: myHeaders})
            .then((res) => res.json())
            .then((sentenceList) => {
              if(sentenceList.status!==401){
              setSentences(sentenceList);
              setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const URL = baseUrl + "?word=" + newData.trim();
          if (command === "getSentencesByWord") {
            fetch(URL,{method: 'get',
      headers: myHeaders})
              .then((res) => res.json())
              .then((sentenceList) => {
                if(sentenceList.status!==401){
                setSentences(sentenceList);
                setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (command === "findPortmanteaus") {
            fetch(URL,{method: 'get',
      headers: myHeaders})
              .then((res) => res.json())
              .then((wordList) => {
                if(wordList.status!==401){
                setPortmanteaus(wordList);
                setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (command === "findWordInformation") {
           fetch(URL,{method: 'get',
      headers: myHeaders})
              .then((res) => res.json())
              .then((wordList) => {
                if(wordList.status!==401){
                setInformation(wordList);
                setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (command === "findDualRhymes") {
            let data = newData.split(" ");
            let newURL =
              baseUrl + "?firstWord=" + data[0] + "&secondWord=" + data[1];
            fetch(newURL,{method: 'get',
      headers: myHeaders})
              .then((res) => res.json())
              .then((wordList) => {
                if(wordList.status!==401){
                setRhymes(wordList);
                setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (command === "getRhymeWordsByScraping") {
            fetch(URL,{method: 'get',
      headers: myHeaders})
              .then((res) => res.json())
              .then((wordList) => {
                if(wordList.status!==401){
                setScrappedRhymes(wordList);
                setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            fetch(URL,{method: 'get',
      headers: myHeaders})
              .then((res) => res.json())
              .then((wordList) => {
                console.log("hi",wordList)
                if(wordList.status!==401){
                setWords(wordList);
                setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
    }
  };

  // const handleDefinitionChange = (command, newData) => {
  //   setWords([]);
  //   const URL = "http://localhost:8088/scc/api/" + command + "?word=" + newData;
  //   fetch(URL)
  //     .then((res) => res.json())
  //     .then((wordList) => {
  //       setDefinitions(wordList);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const legends = () => {
    if (!isMobileOnly) return <Legends />;
  };

  const description = () => {
    if (isMobileOnly)
      return {
        text: `* Type the content you want to and once you feel the need,
              select the word and press the specific button to get the 
              type of suggestion you desire.`,
        style: classes.secondary + " text-white ",
      };
    else
      return {
        text: `* Type the content you want to and once you feel the need,
            select the word and press the specific key combination or 
            the button to get the type of suggestion you desire.`,
        style: classes.secondary + " text-white ",
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
        <div className="col-md-8 col-12 mt-2 ps-2 pe-1 me-0">
          <Card className={classes.root + " " + customCards.root}>
            <CardContent className="TextEditor">
              <PageContainer
                onSearch={handleDataChange}
                // onDefChange={handleDefinitionChange}
                onChange={typeChange}
                repText={repText}
                setRepText={setRep}
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
                newFile={props.newFile}
                setNewFile={props.setNewFile}
                fileId={props.fileId}
                setFileId={props.setFileId}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4 col-12 mt-2 ps-2 pe-1">
          <Suggestions
            type={type}
            dataList={dataList}
            portmanteaus={portmanteaus}
            // definitions={definitions}
            information={information}
            rhymes={rhymes}
            scrappedRhymes={scrappedRhymes}
            sentences={sentences}
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
