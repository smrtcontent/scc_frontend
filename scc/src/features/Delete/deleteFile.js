import { deleteUrl } from "../../app/config/URLs";

const deleteFile = (setSuccess, fileId) => {
  const Url = deleteUrl + fileId 
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: fileId,
      userId: 34,
    }),
  };
  fetch(Url, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};

export default deleteFile;