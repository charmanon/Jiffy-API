var topics = ["Adventure Time", "Gravity Falls", "Bob's Burgers", "Regular Show", "Steven Universe"];

for (var i = 0; i < topics.length; i++) {

      // Creating and storing a button tag
      var charButton = $("<button>");

      charButton.html(topics[i]);
      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#characterButtons").prepend(charButton);
}

$("#add-to-do").on("click", function(event) {
      event.preventDefault();

      // Get the to-do "value" from the textbox and store it a variable
      var toDoTask = $("#to-do").val().trim();

      // Create a new variable that will hold a "<p>" tag.
      // Then give it an ID in the following form:
      // "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
      // Then append the to-do "value" as text to this <p> element.
      var toDoItem = $("<p>");

      toDoItem.attr("id", "item-" + toDoCount);
      toDoItem.append(" " + toDoTask);

      // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
      // Give your button a data attribute called data-to-do and a class called "checkbox".
      // Lastly append the letter X inside.

      var toDoClose = $("<button>");

      toDoClose.attr("data-to-do", toDoCount);
      toDoClose.addClass("checkbox");
      toDoClose.append("✓");

      // Append the button to the to do item
      toDoItem = toDoItem.prepend(toDoClose);

      // Add the button and to do item to the to-dos div
      $("#to-dos").append(toDoItem);

      // Clear the textbox when done
      $("#to-do").val("");

      // Add to the toDoCount
      toDoCount++;
    });

// Adding click event listen listener to all buttons
$("button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var char = $(this).html();

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        char + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
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

$('.gif').click(function() {
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
  