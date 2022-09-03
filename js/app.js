fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => {
        const categories = data.data.news_category
        categories.forEach(category => {
            const categoriesDiv = document.getElementById('categories')
            const button = document.createElement('button')
            button.setAttribute('id', `${category.category_id}`)
            button.setAttribute('class', 'button')
            button.innerHTML = category.category_name
            categoriesDiv.appendChild(button)
        })
    })
    .catch(err => {
        console.log(err)
    })



