import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'

@Entity()
class Post {
  @PrimaryColumn()
  id!: string

  @Column({
    length: 25,
  })
  title!: string

  @Column({
    length: 255,
  })
  content!: string

  @CreateDateColumn()
  createdAt!: Date
}

export default Post
