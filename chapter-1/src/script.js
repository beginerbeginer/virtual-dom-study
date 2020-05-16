$(function () {
  $(".js-follow-btn").on("click", function () {
    var $this = $(this);
    var $accountItem = $this.parents(".js-account-item");
    var $thisData = $accountItem.data();

    if ($thisData.follow) {
      // ajax

      $this.removeClass("isFollow");
      $accountItem.data("follow", false);
    } else {
      // ajax

      $this.addClass("isFollow");
      $accountItem.data("follow", true);
    }
  });
});
