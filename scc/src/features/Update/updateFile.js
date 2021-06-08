import { updateUrl } from "../../app/config/URLs";

const updateFile = (content, name, setSuccess, fileId) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: fileId,
      content: content,
      fileName: name,
      userId: 34,
    }),
  };
  fetch(updateUrl, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};

export default updateFile;
