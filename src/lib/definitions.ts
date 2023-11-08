export interface User {
  id: Number,
  email: String,
  name: String,
  password: String,
  posts?: Post[] | [] | undefined,
  profile?: Profile | undefined
}

interface Post {
  title: String
}

interface Profile {
  id: Number,
  avatar: String,
  introduction: String,
  weixin: String,
  qq: String,
  github: String,
  university: String,
  hometown: String,
  grade: String,
  user: User,
  userId: Number
}