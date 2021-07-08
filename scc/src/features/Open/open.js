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
  let myHeaders = new Headers();
  myHeaders.append("content-type", "application/json");
  myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem("uTID"));
  // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjI1NTg3OTgzLCJleHAiOjE2MjY0NTE5ODN9.2F0eDyqWbi8BsC7GDwoB3CM_pZ_95ROfeGbDsE7-79NEqwXHd-B1_bHg5DIGlWALuSjolUEOeFis6e1HYK0B_A");
  const uuid=localStorage.getItem("ccid")

  const URL =
    // "http://localhost:8088/scc/api/getFileByUserIdAndName?fileName=" +
    openUrl +
    filename +
    "&userId="+uuid;
  fetch(URL,{method: 'get',
  headers: myHeaders})
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
