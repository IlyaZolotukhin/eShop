import s from './Error404.module.scss'

import error404 from '../../assets/404.svg'
const Error404 = () => {
  return (
    //поправить
    <div id={'hw5-page-404'}>
      <div className={s.wrapper}>
        <img alt={'404'} className={s.error404} src={error404} />
      </div>
    </div>
  )
}

export default Error404
