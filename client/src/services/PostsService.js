import Api from '@/services/Api'

export const fetchPosts = () => {
  return Api().get('posts')
}

export const addPost = (p) => {
  return Api().post('posts', p)
}

export const updatePost = (p) => {
  return Api().put('posts/' + p.id, p)
}

export const getPost = (p) => {
  return Api().get('post/' + p.id)
}

export const deletePost = (id) => {
  return Api().delete('posts/' + id)
}
