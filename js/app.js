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

            document.getElementById(`${category.category_id}`).addEventListener('click', function(){
                fetch(`https://openapi.programming-hero.com/api/news/category/${category.category_id}`)
                    .then(res => res.json())
                    .then(data => {
                        data.data.forEach(news => {
                            console.log(news)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
    })
    .catch(err => {
        console.log(err)
    })



