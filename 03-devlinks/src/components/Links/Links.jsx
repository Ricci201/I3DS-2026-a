import React, { Children } from 'react';

const Links = ({url, children}) => {
  return (
    <li>
      <a href={url}>{children}</a>
    </li>
  )
}

export default Links
