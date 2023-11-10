export interface User {
  id: String,
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
  id: String,
  avatar: String,
  introduction: String,
  weixin: String,
  qq: String,
  github: String,
  university: String,
  hometown: String,
  grade: String,
  user: User,
  userId: String
}