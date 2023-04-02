const DataAPI2 = async () => {
    try {
      let data = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1Q1O_vjp0bDg3PRkkk224PkvbLb02kclj5ltx32WcPhQ/values/sheet3?valueRenderOption=FORMATTED_VALUE&key=AIzaSyCrcFHcn9BAxzYNQRmJfzuPUott4GrCvNo"
      );
      let { values } = await data.json();
      let [, ...Data] = values.map((data) => data);
  
      return Data;
    } catch {
      console.log("Error");
    }
  };
  export default DataAPI2;