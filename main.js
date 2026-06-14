const GAS_URL =
"https://script.google.com/macros/s/AKfycbwPNjiSo4zKXXrrvKP1YkLuOvokQ5U5DPZHhIVyiDD_wyBvd9636z-dudSylWu1BzA4cw/exec";

/* =========================
ハンバーガーメニュー
========================= */

function toggleMenu(){


const nav =
document.getElementById("nav");

if(!nav) return;

if(nav.style.display === "flex"){

    nav.style.display = "none";

}else{

    nav.style.display = "flex";

}


}

/* =========================
最新ニュース3件
========================= */

async function loadLatestNews(){


const container =
document.getElementById(
"latestNews"
);

if(!container) return;

try{

    const response =
    await fetch(
        GAS_URL +
        "?action=newsList"
    );

    const result =
    await response.json();

    if(!result.success){

        container.innerHTML =
        "<div class='card'>ニュースを取得できませんでした。</div>";

        return;

    }

    const latest =
    result.news.slice(0,3);

    let html = "";

    latest.forEach(news => {

        html += `
        <div class="card news-card">

            <span class="category">
                ${news.category}
            </span>

            <h3>
                ${news.title}
            </h3>

            <p>
                ${
                    news.content.length > 60
                    ?
                    news.content.substring(0,60) + "..."
                    :
                    news.content
                }
            </p>

            <a
            href="news-detail.html?id=${news.id}"
            class="btn">
            詳細を見る
            </a>

        </div>
        `;

    });

    if(latest.length === 0){

        html =
        "<div class='card'>ニュースはまだありません。</div>";

    }

    container.innerHTML =
    html;

}catch(error){

    console.error(error);

    container.innerHTML =
    "<div class='card'>エラーが発生しました。</div>";

}


}

/* =========================
ログイン確認
========================= */

function getUser(){


const user =
localStorage.getItem("user");

if(!user){

    return null;

}

return JSON.parse(user);


}

/* =========================
ログアウト
========================= */

function logout(){


localStorage.removeItem(
"user"
);

location.href =
"index.html";


}
