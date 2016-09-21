var tokenwallTasks = [
  "Improved and integrated our native iOS and Android SDK to pull relevant data from user devices for analytics and loss prevention",
  "Created an analytics platform with internal tools to analyze reasons for low revenue and fraudulent user activity",
  "Scaled the application to support ~2M users",
  "Test-driven development – unit and integration tests using Rspec and Capybara",
  "Documented policies for setting up work stations and platform architecture",
  "Implemented mediation policies to facilitate revenue increase and boost ARPDAU (Average Revenue Per Daily Active User)"
]

var oopsyoudiedTasks = [
  "Implemented features, achievements, UI changes",
  "Integrated third-party and native SDKs (ad partners, mobile analytics, crash analytics)",
  "Bug fixes"
]

var purplecarrotTasks = [
  "Implemented promo-code features for client's food delivery application"
]

var quanttusTasks = [
  "Built automation tool to generate baseline user database and upload database backups to AWS S3",
  "Implemented natural language generation template tool using Java’s simplenlg library to encourage users to exercise",
  "Mobile app manual QA testing and bug documentation for different iterations of the device"
]

var projectsDictionary = {
  tokenwall: tokenwallTasks,
  oopsyoudied: oopsyoudiedTasks,
  barbershoplabs: purplecarrotTasks,
  quanttus: quanttusTasks
}

function listResume(array, className) {
  className = className.toString();
  var topic = document.getElementById(className);
  var list = document.createElement("ul");
  for(var i=0; i<array.length; i++) {
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(array[i]));
    list.appendChild(item);
    topic.appendChild(list);
  }
  return topic;
}

function buildResumeList(listResume, projectsDictionary) {
  for (var project in projectsDictionary) {
    listResume(projectsDictionary[project], project)
  }
}
