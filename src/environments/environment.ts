// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
      postFromCateg: '/posts/cats/:categs',

      newUser: '/users/register',
      patchUser: '/users/:pseudo',
      oneUserId: '/users/user/:id',
      oneFromPseudo: '/users/:pseudo',

      newComment: '/comments',
      commentsFromPost: '/comments/from/:id',

      getFileByName: '/media/:filename',
      sendUserImage: '/media/user/:pseudo',
      sendPostImage: '/media/post/:id',

      newLike : '/likes',
      getLikeByPost : '/likes/from/post/:postId',
      getLikeByPostAndAuthor : '/likes/from/:postId/:authorId',
      getNbLike : '/likes/nbLike/:postId',
      getNbLikeAuthor : '/likes/from/author/:pseudo',
      getUserLiked: '/likes/liked/:authorId'

    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
