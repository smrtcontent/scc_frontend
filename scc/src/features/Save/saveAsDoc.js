const saveAsDoc = (text,name) => {
  console.log(text, name)
  const saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return ()=> {
      var data = new Blob([text], { type: "application/msword"});
      // data.append('document.doc')
      var textFile = window.URL.createObjectURL(data);
      a.href=textFile;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(textFile);
      // window.location = textFile;
    };
  }())

  saveData()
};


export default saveAsDoc;

// var saveData = (function () {
//   var a = document.createElement("a");
//   document.body.appendChild(a);
//   a.style = "display: none";
//   return function (data, fileName) {
//       var json = JSON.stringify(data),
//           blob = new Blob([json], {type: "octet/stream"}),
//           url = window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = fileName;
//       a.click();
//       window.URL.revokeObjectURL(url);
//   };
// }());

// var data = { x: 42, s: "hello, world", d: new Date() },
//   fileName = "my-download.json";

// saveData(data, fileName);
