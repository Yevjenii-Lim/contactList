import React from "react";
import s from "./list.module.css";
import avatar from "./../assets/photo_2020-09-09_00-57-40.jpg";
import { NavLink } from "react-router-dom";

let MyPage = (props) => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/" className={s.bringMeBack}>
        &#8592; back
      </NavLink>
      <img src={avatar} className={s.myPageAvatar} alt="" />
      <div className={s.info}>
        <p>Name: Yevhenii Lim</p>
        <p>
          Number: <a href="tel: +380680534746">+380 680 53 47 46</a>
        </p>
        <p>
          GitHub: <a href="https://github.com/Yevjenii-Lim/">Yevhenii Lim</a>
        </p>
      </div>
    </div>
  );
};

export default MyPage;
