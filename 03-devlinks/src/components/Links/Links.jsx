import React, { Children } from 'react';
import styles from "./Link.module.css";

const Links = ({url, children}) => {
  return (
    <li>
      <a href={url}>{children}</a>
    </li>
  )
}

export default Links
