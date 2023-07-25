const userAction = async () => {
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9lxKVAVsVoUjvYg12hJEYRvqD_7gdtlw&channelId=UCEO_A1gEiGZfsZaw6ssucAQ&part=snippet,id&order=date&maxResults=20",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  let videoHtml = "";
  let onevideoHtml = "";
  myJson.items.forEach((item) => {
    const postDate = new Date(item.snippet.publishedAt);
    const date =
      postDate.getDate() +
      "-" +
      (postDate.getMonth() + 1) +
      "-" +
      postDate.getFullYear();

    var hours = postDate.getHours();
    var AmOrPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    var minutes = postDate.getMinutes();
    var time = "Time  - " + hours + ":" + minutes + " " + AmOrPm;

    videoHtml += `<div>
            <div class="event">
              <img
                src="${item.snippet.thumbnails.medium.url}"
                alt="Event Image 2"
              />

              <div class="event-data">
              
                <h4>
                  <a href="https://www.youtube.com/watch?v=${item.id.videoId}"
                    >${item.snippet.title}</a
                  >
                </h4>

                <ul>
                  <li>
                    <img
                      src="assets/images/calendar.svg"
                      alt="calendar 2"
                    />${date}
                  </li>

                  <li>
                    <img src="assets/images/clock.svg" alt="clock 2" />${time}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
  });

  onevideoHtml = `<div class="sermon" data-aos="zoom-in-right" data-aos-duration="1000">
            <div class="sermon-img">
              <div class="sermon-media">
                <img
                  src="assets/images/church/sermon-bg.jpeg"
                  alt="Sermon Image"
                />

                <video controls>
                  <source src="assets/videos/video.mp4" type="video/mp4" />

                  Your browser does not support the video tag.
                </video>
              </div>

              <ul>
                <li>
                  <a class="s_audio" href="JavaScript:void(0)"
                    ><img src="assets/images/music-note.svg" alt="volume"
                  /></a>
                </li>

                <li>
                  <a class="s_video" href="JavaScript:void(0)"
                    ><img
                      src="assets/images/play-button-2.svg"
                      alt="Play Button"
                  /></a>
                </li>

                <li>
                  <a class="s_pdf" href="JavaScript:void(0)"
                    ><img src="assets/images/book.svg" alt="Book"
                  /></a>
                </li>

                <li>
                  <a class="s_music" href="JavaScript:void(0)"
                    ><img src="assets/images/download.svg" alt="download"
                  /></a>
                </li>
              </ul>
            </div>

            <div class="sermon-data">
              <h3>
                <a href="https://www.youtube.com/watch?v=${myJson.items[0].id.videoId}"
                  >${myJson.items[0].snippet.title}</a
                >
              </h3>

              <p>
               ${myJson.items[0].snippet.description}
              </p>
            </div>
          </div>`;

  document.getElementById("video-slider").innerHTML =
    "<div id='video-slider' class='events-carousal-slider'>" +
    videoHtml +
    "</div>";
  document.getElementById("one-video-sec").innerHTML = onevideoHtml;
};

userAction();
