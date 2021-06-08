import { saveUrl } from "../../app/config/URLs";

const save = (setFileId, content, name, setSuccess) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: content,
      fileName: name,
      userId: 34,
    }),
  };
  fetch(saveUrl, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      setFileId(result.id)
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};

export default save;
