$(document).ready(function () {
  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON("../../search_data.json");

  window.data.then(data => {
    // Initialize lunr with the fields to be searched, plus the boost.
    window.idx = lunr(function () {
      this.ref("id");
      this.field("title"), { boost: 10 };
      this.field("content");
      this.field("author");
      this.field("categories");
      this.field("date");

      // Add the data to lunr
      Object.keys(data).forEach(key => {
        // Add the data to lunr
        this.add({
          id: key,
          title: data[key].title,
          categories: data[key].categories,
          content: data[key].content,
          author: data[key].author,
          date: data[key].date,
        });
      }, this);
    });
  });

  // // Event when the the input box is changed
  $(document).on("change keyup", "#search_box", function (event) {
    let boxValue = $("#search_box").val();
    if (boxValue !== "") {
      $("#default-post-list").css({ display: "none" });
      let results = window.idx.search(boxValue); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
    } else {
      $("#search_results li").remove();
      $("#default-post-list").css({ display: "unset" });
    }
  });

  function display_search_results(results) {
    const $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function (loaded_data) {
      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function (result) {
          let post = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          let appendString = `
          <li>
            <time>${post.date}</time>
            <h3><a href=${post.url}>${post.title}</a></h3>
          </li>
          `;

          // Add the snippet to the collection of results.
          $search_results.append(appendString);
        });
      } else {
        // If there are no results, let the user know.
        $search_results.html("<li>No results found</li>");
      }
    });
  }
});
