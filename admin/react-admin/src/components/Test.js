import React, { useState } from "react";
import DatePicker from "react-date-picker";

const Test = () => {
  const [date, setValue] = useState(new Date());
  console.log(date.toLocaleDateString());
  return (
    <>
      <DatePicker
        format="y-MM-dd"
        onChange={(date) => setValue(date)}
        value={date}
      />
    </>
  );
};

export default Test;
