import { deleteUrl } from "../../app/config/URLs";

const deleteFile = (setSuccess, fileId) => {
  const uuid=localStorage.getItem("ccid")
  const Url = deleteUrl + fileId;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization":'Bearer ' + localStorage.getItem("uTID")
    },
    body: JSON.stringify({
      id: fileId,
      userId: uuid,
    }),
  };

  fetch(Url, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if(result.status!==401){
      setSuccess(true);
      }
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};

export default deleteFile;
