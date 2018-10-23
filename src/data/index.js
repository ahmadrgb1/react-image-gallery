

const index = JSON.parse(localStorage.getItem("index")) || [];
if (!index.length) {
    for (let i = 0; i < 7; i++) {
        index.push({ id: i, url: i % 2 ? "/fl2.jpg" : "/fl1.jpg" });
    }
    localStorage.setItem("index", JSON.stringify(index));
}

export default index;