// default news
fetch('https://openapi.programming-hero.com/api/news/category/08')
    .then(res => res.json())
    .then(data => {
        const defaultNews = data.data
        defaultNews.sort((a, b) => b.total_view - a.total_view)
        showNews(defaultNews)
    })
    .catch(err => alert(err.message))

// fetch categories
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => getCategories(data.data))
    .catch(err => alert(err.message))

// get categories
const getCategories = data => {
    const categories = data.news_category
        categories.forEach(category => {
            const {category_id, category_name} = category
            const categoriesDiv = document.getElementById('categories')
            const button = document.createElement('button')
            button.setAttribute('id', `${category_id}`)
            button.setAttribute('class', 'button')
            button.innerHTML = category_name
            categoriesDiv.appendChild(button)
            eventHandler(category_id, category_name)
        })
}

// event handler
const eventHandler = (category_id, category_name) => {
    document.getElementById(`${category_id}`).addEventListener('click', function(){
        // show spinner
        const spinnerDiv = document.getElementById('spinner')
        spinnerDiv.style.display = 'block'

        // empty previous news
        const itemsContainer = document.getElementById('items')
        itemsContainer.innerHTML = ''

        fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
            .then(res => res.json())
            .then(data => {
                spinnerDiv.style.display = 'none'
                getCategoryInfo(data.data, category_name)
            })
            .catch(err => alert(err.message))
    })
}

// get category information
const getCategoryInfo = (data, category_name) => {
    const itemElement = document.getElementById('item-info')
        itemElement.innerHTML = `${data.length} items found for category ${category_name}`
        if(data.length === 0){
            itemElement.innerHTML = `No news found for category ${category_name}`
        }
        getCategoryId(data)
}

// get category id
const getCategoryId = data => {
    data.sort((a, b) => b.total_view - a.total_view).forEach(newsId => {
        fetch(`https://openapi.programming-hero.com/api/news/${newsId._id}`)
            .then(res => res.json())
            .then(data => showNews(data.data))
            .catch(err => alert(err.message))
    })
}


// show news
const showNews = newes => {
    const itemsContainer = document.getElementById('items')
    newes.forEach(news => {
        const {author, thumbnail_url, rating, title, details, total_view, image_url} = news
        const item = document.createElement('div')
        item.classList.add('news-items')
        item.innerHTML = `
            <img class="news-thumbnail" src="${thumbnail_url}" alt="thumbnail of news">
            <div class="news-article">
                <div>
                    <h4 class="fw-bold fs-4 mb-3">${title}</h4>
                    <p class="text-secondary">${details.length > 550 ? details.slice(0, 550) + '...' : details}</p>
                </div>
                <div class="news-item-footer">
                    <div class="author-info">
                        <img class="image" src="${author.img}" alt="profile picture of author">
                        <div class="text">
                            <p class="name">${author.name === '' || author.name === null ? 'Name not available' : author.name}</p>
                            <p class="date">${new Date(author.published_date).toDateString()}</p>
                        </div>
                    </div>
                    <div class="view-container">
                        <i class="fa-regular fa-eye t"></i>
                        <p class="views">${total_view === null ? 'Views ot found' : total_view}</p>
                    </div>
                    <div class="show-more">
                        <!-- Button trigger modal -->
                        <button onclick="showModal('${author.name}', '${author.published_date}', '${title}', '${total_view}', '${rating.number}', '${rating.badge}', '${image_url}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Show Details
                        </button>
                    </div>
                </div>
            </div>
        `
        itemsContainer.appendChild(item)
    })
}

// show modal function
const showModal = (author, published_date, title, total_view, rating, badge, image ) => {
    const modalBodyDiv = document.getElementById('modal-body')
    modalBodyDiv.innerHTML = `
        <h5>${title}</h5>
        <div style="display: flex; justify-content: center; margin: 20px 0 40px 0;">
            <img style="width: 100%;" src="${image}" alt="news thumbnail">
        </div>
        <p class="fw-semibold">Views: <span class="fw-bold">${total_view === 'null' ? 'Not found' : total_view}</span></p>
        <p class="fw-semibold">Rating: <span class="fw-bold">${rating}</span></p>
        <p class="fw-semibold">Badge: <span class="fw-bold">${badge}</span></p>
        <p class="fw-semibold">Author: <span class="fw-bold">${author === 'null' || author === '' ? 'Not found' : author}</span></p>
        <p class="fw-semibold">Published Date: <span class="fw-bold">${new Date(published_date).toDateString()}</span></p>
    `
}