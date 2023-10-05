import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
class Products {
  @PrimaryColumn()
  id!: number

  @Column({
    length: 100,
  })
  name!: string

  @Column({
    length: 255,
  })
  department!: string

  @Column()
  price!: number

  @Column()
  weight!: number
}

export default Products
