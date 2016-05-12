app.controller('controller', [ '$scope', '$uibModal', '$log', 'Posts', ($scope, $uibModal, $log, Posts) => {
  $scope.view = {};
  $scope.view.orderBy = '-votes';

  $scope.view.addPost = Posts.addPost;
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

  $scope.view.posts = Posts.getPosts();
}]);



app.controller('CommentModalInstanceCtrl', [ '$scope', '$uibModalInstance', 'index', ($scope, $uibModalInstance, index) => {
  $scope.vm = {};
  $scope.vm.index = index;
  $scope.vm.newComment = {}
  $scope.ok = () => {
    $uibModalInstance.close($scope.vm);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('PostModal', [ '$scope', '$uibModalInstance', ($scope, $uibModalInstance) => {
  $scope.vm = {};
  $scope.vm.newPost = {};
  $scope.ok = () => {
    $uibModalInstance.close($scope.vm.newPost);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };
}]);
