export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allPosts: '/posts',
      postFromPseudo: '/posts/from/:pseudo',
      onePost: '/posts/:id',
      oneUserId: '/users/user/:id',
      commentsFromPost: '/comments/from/:id',
    }
  }
};
