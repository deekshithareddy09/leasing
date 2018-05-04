$(document).ready(function() {

  // $("main#spapp > section").height($(document).height() - 60);

  // var app = $.spapp({pageNotFound : 'error_404'}); // initialize

  // // define routes
  // app.route({view: 'login', load: 'login.html' });
  // app.route({view: 'signup', load: 'SignUp.html' });
  

  // // run app
  // app.run();

  var app = $.spapp({
    defaultView  : "#home",
    templateDir  : "../../views/",
    pageNotFound : "error_404"
  });


  app.route({
    view : "home",
    load : "home.html",
    onCreate: function() {  },
    onReady: function() {  }
  });

  app.route({
    view : "login",
    load : "login.html",
    onCreate: function() {  },
    onReady: function() {  }
  });

  app.route({
    view : "signup",
    load : "SignUp.html",
    onCreate: function() {  },
    onReady: function() {  }
  });

  app.route({
    view : "dashboard",
    load : "dashboard.html",
    onCreate: function() {  },
    onReady: function() {  }
  });

  app.route({
    view : "error_404",
    load : "error_404.html",
    onCreate: function() {  },
    onReady: function() {  }
  });

  app.run();

});