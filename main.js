let row = document.querySelector('.youtube_items_sections .currentYouTube')

function render(movie){

    let index = 0

    row.innerHTML = ''

    movie.map(item => {
        let col = document.createElement('div')
        col.classList.add('col-4')
        col.classList.add('my-3')
        
        let iframe = document.createElement('iframe')
        iframe.src = item.video
    
        let text =document.createElement('p')
        text.innerText=item.title

        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn', 'btn-danger')
        deleteBtn.innerText = 'Delete'
        
        let updateBtn = document.createElement('button')
        updateBtn.classList.add('btn', 'btn-warning', 'mx-4')
        updateBtn.innerText = 'Edit'

        
        deleteBtn.setAttribute('onclick', `deleteItemById(${index})`)

        updateBtn.setAttribute('onclick', `editItemById(${index})`)
        updateBtn.setAttribute('data-bs-target', '#Update')
        updateBtn.setAttribute('data-bs-toggle', 'offcanvas')



        col.appendChild(iframe)
        col.appendChild(text)
        col.appendChild(deleteBtn)
        col.appendChild(updateBtn)
        row.appendChild(col)
        
        index++
    })
}


render(youtube)



let searchInput = document.querySelector('.youtube_items_sections .searchInput')


searchInput.addEventListener('input', function (event) {
    let searchKey = event.target.value

    let resultSearch = youtube.filter(item => {
        return item.title.toLowerCase().includes(searchKey.toLowerCase())
    })


    render(resultSearch)
})



function filter() {
    let filter = document.getElementById("youtube").value

    let getFilter = []
    
    youtube.map(item => {
        if (item.categories.toLowerCase().includes(filter)){
            getFilter.push(item)
        }
    })

    render(getFilter)
}



let addBtn = document.querySelector('.addBtn')

addBtn.addEventListener('click', function() {

     let yt_title = document.querySelector('.yt_title').value
     let yt_link = document.querySelector('.yt_link').value
     let yt_categor = document.querySelector('.yt_categor').value


     let singleItem = {
        title: yt_title,
        video: yt_link,
        categories: yt_categor
     }

     youtube.push(singleItem)
     render(youtube)

     document.querySelector('.yt_title').value = ''
     document.querySelector('.yt_link').value = ''
     document.querySelector('.yt_categor').value = ''
})


function deleteItemById(index){
    console.log(index);

    youtube.splice(index, 1)

    render(youtube)
}





let editingIndex


function editItemById(index) {
    editingIndex = index

    document.querySelector('.EditYouTube .yt_title').value = youtube[index].title

     document.querySelector('.EditYouTube .yt_link').value = youtube[index].video

     document.querySelector('.EditYouTube .yt_categor').value = youtube[index].categories.toLowerCase()

}


let editBtn = document.querySelector('.editButton')
editBtn.addEventListener('click', function() {
    let title = document.querySelector('.EditYouTube .yt_title').value

    let link = document.querySelector('.EditYouTube .yt_link').value 

    let categor =  document.querySelector('.EditYouTube .yt_categor').value

    youtube[editingIndex].title = title
    youtube[editingIndex].video = link
    youtube[editingIndex].categories = categor

    render(youtube)
})
