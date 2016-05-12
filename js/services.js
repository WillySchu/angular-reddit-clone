angular.module('app')
  .factory('Posts', function($uibModal) {
    const posts = [
      {
        index: 0,
        title: "Monkey costumes are totally in this season",
        author: "Linus Lane",
        image: "https://scontent-lga3-1.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/11809944_1676694042554573_495250395_n.jpg",
        description: "Hey, hey, we're the Monkees, and people say we monkey around. But we're too busy singing to put anybody down. We're just tryin' to be friendly, come and watch us sing and play. We're the young gneration, and we've got something to say.",
        date: moment().subtract(2, 'days').subtract(3, 'hours').calendar(),
        votes: 10,
        comments: [
          {
            author: "Matt",
            text: "Cool costume."
          }
        ],
        commentsVisible: false,
        newCommentVisible: false
      }, {
        index: 1,
        title: "2016 Baseball",
        author: "Andrew Baggarly",
        image: "https://pbs.twimg.com/profile_images/632061069205225476/-3wXELim_400x400.jpg",
        description: "The Giants win it all in even years. Next year is an even year. Therefore, the Giants will win it all next year.",
        date: moment().subtract(2, 'hours').calendar(),
        votes: 2,
        comments: [
          {
            author: "Matt",
            text: "Sound reasoning!"
          }, {
            author: "Billy Bean",
            text: "Oakland rulez"
          }
        ],
        commentsVisible: false,
        newCommentVisible: false
      }, {
        index: 2,
        title: "New Years",
        author: "Ryan Seacrest",
        image: "https://tribzap2it.files.wordpress.com/2012/12/ryan-seacrest-new-years-rockin-eve-400.jpg",
        description: "Come hang out with me on New Year's Eve!",
        date: moment("20151010","YYYYMMDD").calendar(),
        votes: -3,
        comments: [],
        commentsVisible: false,
        newCommentVisible: false
      }, {
        index: 3,
        title: "XKCD",
        author: "Randall Munroe",
        image: "http://www.userlogos.org/files/logos/Mafia_Penguin/xkcdLogo.png",
        description: "rofl. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum excepturi ad totam autem dignissimos molestiae a consequatur cupiditate, eum enim. Magni expedita, nam in eligendi sed totam fugiat numquam consequatur.",
        date: moment().subtract(14, 'days').calendar(),
        votes: 2,
        comments: [],
        commentsVisible: false,
        newCommentVisible: false
      }
    ]
    
    return {
      getPosts: function() {
        return posts;
      },
      addPost: () => {
        const modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'postModal.html',
          controller: 'PostModal',
        });

        modalInstance.result.then((result) => {
          result.date = moment().calendar();
          result.votes = 0;
          result.comments = [];
          result.commentsVisible = false;
          result.index = posts.length;
          posts.push(result);
        }, () => {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }
    }
  })
