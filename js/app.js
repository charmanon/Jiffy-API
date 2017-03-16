var topics = ["Adventure Time", "Gravity Falls", "Bob's Burgers", "Regular Show", "Steven Universe"];

function displayTopic(){
      $("#characterButtons").text("");
      for (var i = 0; i < topics.length; i++) {
      // Creating and storing a button tag
      var charButton = $("<button>");

      charButton.html(topics[i]);
      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#characterButtons").append(charButton);
      }
}

displayTopic();

$(document).ready(function() {

$("#addChar").on("click", function(event) {
      event.preventDefault();

      // Get the to-do "value" from the textbox and store it a variable
      var addChar = $("#character-input").val().trim();
      topics.push(addChar);
      displayTopic();      
    });

// Adding click event listen listener to all buttons
$("#characterButtons").on("click", "button", function() {
      // Grabbing and storing the html property value from the button
      var char = $(this).html();

      // Constructing a queryURL using the character name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        char + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          dataType: "json",
          crossDomain: true,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var charDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var charImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            charImage.attr("src", results[i].images.fixed_height_still.url);
            charImage.attr("data-still", results[i].images.fixed_height_still.url);
            charImage.attr("data-state", "still");
            charImage.attr("data-animate", results[i].images.fixed_height.url);
            charImage.attr("class", "gif");
            // Appending the paragraph and image tag to the animalDiv
            charDiv.append(p);
            charDiv.append(charImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#characters").prepend(charDiv);
          }
        });
    });

$("body").on("click", ".gif", function() {
      console.log("hi");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

});
  