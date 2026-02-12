import React from 'react'

const Rodape = ({children}) => {
  return (
    <div>
      <p>
        Feito com ❤️ por <a href='https://github.com'>{children}</a>
      </p>
    </div>
  )
}

export default Rodape
