app.controller('controller', ($scope, $uibModal, $log) => {
  $scope.view = {};
  $scope.view.orderBy = '-votes';
  $scope.view.animationsEnabled = true;

  $scope.view.addPost = () => {
    const modalInstance = $uibModal.open({
      animation: $scope.view.animationsEnabled,
      templateUrl: 'postModal.html',
      controller: 'PostModal',
    });

    modalInstance.result.then((result) => {
      result.date = moment().calendar();
      result.votes = 0;
      result.comments = [];
      result.commentsVisible = false;
      result.index = $scope.view.posts.length;
      $scope.view.posts.push(result)
    }, () => {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }
  $scope.view.upVote = (i) => {
    $scope.view.posts[i].votes++;
  }
  $scope.view.downVote = (i) => {
    $scope.view.posts[i].votes--;
  }
  $scope.view.showComments = (i) => {
    if ($scope.view.posts[i].comments.length) {
      $scope.view.posts[i].commentsVisible = !$scope.view.posts[i].commentsVisible;
    }
  }
  $scope.view.addComment = (i) => {
    const modalInstance = $uibModal.open({
      animation: $scope.view.animationsEnabled,
      templateUrl: 'modal.html',
      controller: 'CommentModalInstanceCtrl',
      resolve: {
        index: function () {
          return i;
        }
      }
    });

    modalInstance.result.then((result) => {
      $scope.view.posts[result.index].comments.push(result.newComment);
    }, () => {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

  $scope.view.posts = [
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
  ];
});



app.controller('CommentModalInstanceCtrl', ($scope, $uibModalInstance, index) => {
  $scope.vm = {};
  $scope.vm.index = index;
  $scope.vm.newComment = {}
  $scope.ok = () => {
    $uibModalInstance.close($scope.vm);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('PostModal', ($scope, $uibModalInstance) => {
  $scope.vm = {};
  $scope.vm.newPost = {};
  $scope.ok = () => {
    $uibModalInstance.close($scope.vm.newPost);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };
});
