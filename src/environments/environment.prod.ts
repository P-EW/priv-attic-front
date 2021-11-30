export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      connection:'/auth/login',

      newPost: '/posts',
      allPosts: '/posts',
      postFromPseudo: '/posts/from/:pseudo',
      onePost: '/posts/:id',

      newUser: '/users/register',
      patchUser: '/users/:pseudo',
      oneUserId: '/users/user/:id',
      oneFromPseudo: '/users/:pseudo',

      commentsFromPost: '/comments/from/:id',

      getFileByName: '/media/:filename',
      sendUserImage: '/media/user/:pseudo',
      sendPostImage: '/media/post/:id',
    }
  }
};
