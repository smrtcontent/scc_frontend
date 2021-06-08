import { openUrl } from "../../app/config/URLs";

/**
 * Function to open the selected file
 *
 * @param {*} filename -> Name of the document to be searched
 * @param {*} setOpenFileContent -> Hook to change the content of text editor
 * @param {*} setName -> Hook to change the file name in the text editor
 * @param {*} setOpen -> Hook to toggle the success alert
 * @param {*} setError -> Hook to toggle the error alert
 */
const Open = (filename, setOpenFileContent, setName, setSaved,setFileId, setOpen, setError) => {
  const URL =
    // "http://localhost:8088/scc/api/getFileByUserIdAndName?fileName=" +
    openUrl +
    filename +
    "&userId=34";
  fetch(URL)
    .then((res) => res.json())
    .then((result) => {
      if (result.content === undefined) {
        setError(true);
        return;
      }
      setOpenFileContent(result.content);
      setName(result.fileName);
      setSaved(true)
      setFileId(result.id)
      setOpen(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Open;
