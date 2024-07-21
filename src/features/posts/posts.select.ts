export const createPostSelect = {
  id: true
}

export const getOnePostSelect = {
  id: true,
  created_at: true,
  updated_at: true,
  image: true,
  title: true,
  content: true,
  views: true,
  desc: true,
  tags: true
}

export const getOnePostUserSelect = {
  id: true,
  created_at: true,
  updated_at: true,
  username: true,
  email: true,
  image: true,
  status: true
}
