import { Button, ButtonVariant } from '@/shared/ui/Button'
import { IPrimeItem } from '../../model/mainChildrenPage.model'
import cl from './_PrimeList.module.scss'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/button.model'
import { cls } from '@/shared/lib/classes.lib'

export const PrimeList = () => {

  const primeListArray: IPrimeItem[] = [
    { name: 'Одежда', quantity: 0 },
    { name: 'Автомобили и мотоциклы', quantity: 0 },
    { name: 'Красота и уход', quantity: 0 },
    { name: 'Обувь и аксессуары', quantity: 0 }
  ]


  return (
    <section className={cl.PrimeList}>
      <div className={cl.itemsContainer}>
        {primeListArray.map((it, index) => (
          <div className={cls(cl.listItem, index === primeListArray.length - 1 ? cl.noBorderBottom : '')}>
            <div className={cl.topContainer}>
              <span className={cl.name}>
                {it.name}
              </span>
            </div>
            <span className={cl.quantity}>
              {it.quantity} товаров
            </span>
          </div>
        ))}
      </div>

      <div className={cl.bottomContainer}>
        <div className={cl.mainProductQuantityContainer}>
          <h4>Уже 1 250 000+ товаров</h4>
        </div>
        <div className={cl.buttonContainer}>
          <Button
            className={cl.button}
            title='Разместить заявку'
            variant={ButtonVariant.FILL}
            size={ButtonSize.Big}
          />
        </div>
      </div>

    </section>
  )
}
