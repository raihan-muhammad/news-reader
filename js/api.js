const base_url = "https://readerapi.codepolitan.com/";

const getAPI = async () => {
  try {
    if ("caches" in window) {
      const resCaches = await caches.match(`${base_url}articles`);
      if (resCaches) {
        const resJsonCaches = await resCaches.json();
        let articlesHTML = "";
        resJsonCaches.result.forEach((article) => {
          articlesHTML += `
                <div class="card">
                    <a href="./article.html?id=${article.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.thumbnail}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.title}</span>
                      <p>${article.description}</p>
                    </div>
                  </div>
            `;
        });

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("articles").innerHTML = articlesHTML;
      }
    }
    const res = await fetch(`${base_url}articles`);
    const resJson = await res.json();
    let articlesHTML = "";
    resJson.result.forEach((article) => {
      articlesHTML += `
            <div class="card">
                <a href="article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.thumbnail}" id="gambar-articles"/>
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.title}</span>
                  <p>${article.description}</p>
                </div>
              </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    });
  } catch (err) {
    console.log(err);
  }
};

const getDetailAPI = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  const res = await fetch(`${base_url}article/${idParam}`);
  const resJson = await res.json();
  let articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${resJson.result.cover}" />
            </div>
            <div class="card-content">
              <span class="card-title">${resJson.result.post_title}</span>
              ${snarkdown(resJson.result.post_content)}
            </div>
          </div>
        `;
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("body-content").innerHTML = articleHTML;
};
