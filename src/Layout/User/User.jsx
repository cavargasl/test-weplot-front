
import { useAuth } from '../../provider/AuthProvider'
import img from '../../asset/img/img1.png'

import './User.scss'

export default function User() {
  const { userData } = useAuth()
  
  return (
    <div className='user'>
      <header>
        <img src={img} alt="imagen" />
      </header>
      <div className='user__content'>
        <h1>Información de mi cuenta</h1>
        <table class="user__content__table table">
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre completo</th>
              <th scope="col">Correo</th>
              <th scope="col">Telefono</th>
              {userData.question.map((item, idx) => <td key={idx}>{`¿${item.question}?`}</td>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='user__content__table--img' scope="row">
                <img src={userData.avatar} alt="avatar" />
              </th>
              <td>{userData.fname + userData.lname}</td>
              <td>{userData.email}</td>
              <td>{userData.tel}</td>
              {userData.question.map((item, idx) => <td key={idx}>{item.answer}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
