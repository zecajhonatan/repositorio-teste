import {
  HtmlHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import style from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input({ ...rest }: InputProps) {
  return <input type="text" className={style.input} {...rest} />;
}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className={style.input} {...rest}></textarea>;
}
