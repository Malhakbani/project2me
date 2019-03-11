function getNewsapi() {
  $("#main").empty();
  $("#current_source").html("News Source: <span>News</span>")

  var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=fc36dad000394838bf2d8b8c33ef2b8d';
  var req = new Request(url);
  fetch(req)
    .then(function (response) {
      $("#main_loader").hide();
      response.json().then(data => {
        data.articles.length = 7
        articles = data.articles
        console.log(data.articles)
        data.articles.forEach((element, i) => {
          let date = element.publishedAt.toString().substring(0, 10)
          $("#main").append(`
            <article class="article">
            <section class="featuredImage">
              <img src="${element.urlToImage}" alt="" />
            </section>
            <section class="articleContent">
                <a id="article_button_${i}" href="#"><h3>${element.title}</h3></a>
                <h6>${element.description}</h6>
            </section>
            <section class="impressions">
            ${date}
            </section>
            <div class="clearfix"></div>
          </article>
        `)
        });
        articles.forEach((elem, i) => {
          $("#article_button_" + i).click(function () {
            openDetail(elem.title, elem.content, elem.url);
          })
        })


      });
    });
}
var articles = []
$(document).ready(function () {
  getNewsapi();
  $("#newsapi").click(function () {
    getNewsapi();
  });
  $("#guardianapis").click(function () {
    GurNewApi();
  });
  $(".closePopUp").click(function () {
    $("#popUp").addClass("loader")
    $("#popUp").addClass("hidden")
    $("#article_detail").addClass("container")
  })

});

function openDetail(title, content, url) {
  $("#popUp").removeClass("loader")
  $("#popUp").removeClass("hidden")
  $("#article_detail").removeClass("container")
  $("#detail_title").html(title)
  $("#detail_content").html(content)
  $("#article_detail").html(`
    <h1 id="detail_title">
    ${title}
    </h1>
    <p id="detail_content">
        ${content}
    </p>
    <a href="${url}" class="popUpAction" target="_blank">Read more from source</a>
  `)

}

function GurNewApi() {

  $("#main").empty();
  $("#current_source").html("News Source: <span>Guardian APIs</span>")
  var url = 'https://content.guardianapis.com/search?' +
    'api-key=e5463a25-4fd1-4344-b566-cbc843aaa49e';
  var req = new Request(url);
  fetch(req)
    .then(function (response) {
      $("#main_loader").hide();
      response.json().then(data => {
        data.response.results.length = 5
        articles = data.response.results
        data.response.results.forEach(element => {
          $("#main").append(`
            <article class="article">
            <section class="featuredImage">
              <img src="${element.urlToImage}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${element.webTitle}</h3></a>
                <h6>${element.type}</h6>
            </section>
            <section class="impressions">
            ${element.sectionName}
            </section>
            <div class="clearfix"></div>
          </article>
        `)
        });
        articles.forEach((elem, i) => {
          $("#article_button_" + i).click(function () {
            openDetail(elem.webTitle, elem.sectionName, elem.webUrl);
          })
        })

      });
    });
}