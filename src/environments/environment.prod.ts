export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      connection:'/auth/login',

      allPosts: '/posts',
      postFromPseudo: '/posts/from/:pseudo',
      onePost: '/posts/:id',

      newUser: '/users/register',
      oneUserId: '/users/user/:id',
      oneFromPseudo: '/users/:pseudo',

      commentsFromPost: '/comments/from/:id',

      getFileByName: '/media/:filename',
    }
  }
};
