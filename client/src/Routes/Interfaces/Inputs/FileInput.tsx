import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";

interface IProps {
  ClassName?: string;
  Id: string;
  Name: string;
  Accept?: string;
  WrapperBackgroundColor?: string;
  labelColor?: string;
  labelOpacity?: number;
  onChange?: (e: any) => void;
}

const FileInput: React.FunctionComponent<IProps> = props => {
  const classes = useStyles();
  const [files, setFiles] = useState<any[]>([]);

  const handleChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.currentTarget.value) return;

      //   const value = e.currentTarget.value.replace(/^.*[\\\/]/, "");
      // const getFiles = e.target.files;
      // const filesArr = Array.prototype.slice.call(files);

      if (props.onChange) {
        props.onChange(e);
      }
    } catch (error) {
      console.error("FileInput - handleChange error", error);
      throw error;
    }
  };
  return (
    <div className={classes.fileWrapper}>
      <label className={classes.customFileUpload}>
        <input
          type="file"
          name={props.Name}
          id={props.Id}
          accept={props.Accept}
          onChange={handleChange()}
          style={{ display: "none" }}
        />
        <span>파일 등록</span>
      </label>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  fileWrapper: {
    flex: 1,
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: 5
  },
  customFileUpload: {
    border: "1px solid rgba(63,81,181,1)",
    backgroundColor: "rgba(63,81,181,1)",
    color: "white",
    display: "inline-block",
    padding: "3px",
    margin: 0,
    width: 90,
    fontWeight: 300,
    cursor: "pointer",
    "&:hover": { border: "1px solid rgba(63,81,181,.7)", backgroundColor: "rgba(63,81,181,.7)" }
  }
}));

export default FileInput;
