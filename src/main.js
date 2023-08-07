// Variables
const dom_strings = {
    filter_by_btns: document.querySelectorAll('.filter-by'),
    filter_bar: document.getElementById('search-bar-list'),
    clear_btn: document.getElementById('clear-btn'),
    job_list: document.getElementById('jobs-list'),
}
let filter_bar = []
let jobs_to_show = []
// Functions
const filter_by = () => {
    if(dom_strings.filter_bar.classList.contains('disabled')) {

    } else {
        dom_strings.filter_bar.classList.toggle('disabled')
    }
}
const add_event_listeners = () => {
    console.log('hey')
    console.log(document.querySelectorAll('.filter-by'))
    document.querySelectorAll('.filter-by').forEach(element => {
        console.log(element)
        element.addEventListener('click', (e) => {
            filter_bar.push(e.target.innerHTML)
            console.log(filter_bar)
            console.log('hey')
        })
    });

}
const create_job_card = (
    icon,
    company,
    is_new,
    is_featured,
    position,
    posted_at,
    contract,
    location,
    languages,
    tools) => {

    let html = `<li>
    <div class="job-card">
        <div class="cell">
            <div>
                <img src="./assets/${icon}" alt="">
            </div>
            <div>
                <p>
                    ${company}
                    ${is_new == true ?  '<span> NEW ! </span>': '' }
                    ${is_featured == true ? '<span> FEATURED </span>' : ''}
                </p>
                <p>${position}</p>
                <p>
                    <span>${posted_at}</span>
                    <span>${contract}</span>
                    <span>${location}</span>
                </p>
            </div>
        </div>
        <div class="cell">
        ${function() {
            let tools_str = ''
            if(tools.length < 0) {
                return ''
            }
            for(let i = 0;i < tools.length;i++) {
                tools_str += `<span class="filter-by">${tools[i]}</span>`
            }
            return tools_str
        }()}
        ${function() {
            let languages_str = '';
            if(languages.length < 0) {
                return ''
            }
            for(let i = 0; i< languages.length;i++) {
                languages_str += `<span class="filter-by">${languages[i]}</span>`
            }
            return languages_str
        }()}
        </div>
    </div>
</li>`
    return html
}
const fetch_and_show = () => {
    fetch('./src/data.json').then(response => response.json()).then(res => {
        for(let i = 0; i < 10; i++) {
            dom_strings.job_list.insertAdjacentHTML('beforeend', create_job_card(
                res[i].logo,
                res[i].company,
                res[i].new,
                res[i].featured,
                res[i].position,
                res[i].postedAt,
                res[i].contract,
                res[i].location,
                res[i].languages,
                res[i].tools
            ))
        }
    })
}
// Action
fetch_and_show()
setTimeout(add_event_listeners(), 1000)








