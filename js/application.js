App.onLaunch = function(options) {
  var resourceLoader;
  
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`
  ];
  
  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      resourceLoader.loadResource(`${options.BASERL}templates/RWDevConTemplate.xml.js`,
        function(resource) {
          var doc = Presenter.makeDocument(resource);
          Presenter.pushDocument(doc);
        });  
    } else {
      //Handle error
      var error = createAlert("Evaluate Script Error", "Error attempting to evaluate external JavaScript files.");
      navigationDocument.presentModal(error);
    }
  })
}
 
// Previous create alert
var createAlert = function(title, description) {
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
        <button>
          <text> Ok </text>
        </button>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}

// Initial hello world
var helloWorld = function() {
  var alert = createAlert("Hello World", "this is my description"); //leaving 2nd parameter with an empty string
  navigationDocument.presentModal(alert);
}